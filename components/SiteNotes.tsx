"use client";

/**
 * Dev-only click-to-comment overlay.
 *
 * Turn on "Add note" (or press Alt+N), click anything on the page, and type
 * what should change. Each note records the page, a CSS selector for the
 * element, and some context (its text, nearest heading, CSS classes) so the
 * change can be found in the code later. Notes are saved to site-notes.json
 * at the project root via /api/site-notes.
 *
 * Only mounted when NODE_ENV === "development" (see app/layout.tsx).
 */

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import s from "./SiteNotes.module.css";

type Note = {
  id: string;
  path: string;
  selector: string;
  /** where inside the element the click landed, 0–1 of its width/height */
  offsetX: number;
  offsetY: number;
  note: string;
  context: {
    tag: string;
    text: string;
    heading: string;
    classes: string;
    src?: string;
  };
  viewport: { w: number; h: number };
  createdAt: string;
  done: boolean;
};

type Draft = {
  el: Element;
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
};

const API = "/api/site-notes";
const PENDING_KEY = "site-notes:goto";
const UI_ATTR = "data-site-notes";

/* ---------- element helpers ---------- */

function cssPath(el: Element): string {
  const parts: string[] = [];
  let node: Element | null = el;
  while (node && node !== document.body && node !== document.documentElement) {
    if (node.id) {
      parts.unshift(`#${CSS.escape(node.id)}`);
      return parts.join(" > ");
    }
    const parent: Element | null = node.parentElement;
    if (!parent) break;
    const tag = node.tagName;
    const same = Array.from(parent.children).filter((c) => c.tagName === tag);
    const name = tag.toLowerCase();
    parts.unshift(same.length > 1 ? `${name}:nth-of-type(${same.indexOf(node) + 1})` : name);
    node = parent;
  }
  return ["body", ...parts].join(" > ");
}

function clip(text: string, n: number) {
  const t = text.replace(/\s+/g, " ").trim();
  return t.length > n ? `${t.slice(0, n - 1)}…` : t;
}

/** Closest heading at or above the element in document order. */
function nearestHeading(el: Element): string {
  // Prefer a heading inside the element's own card/section (card images sit
  // above their titles, so "previous heading" would name the card before).
  const own = el
    .closest("article, section, figure, li")
    ?.querySelector("h1, h2, h3, h4, figcaption");
  if (own) return clip(own.textContent ?? "", 80);
  const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4"));
  let best = "";
  for (const h of headings) {
    if (h === el || h.contains(el)) return clip(h.textContent ?? "", 80);
    // heading comes before el in the document
    if (h.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) {
      best = clip(h.textContent ?? "", 80);
    } else break;
  }
  return best;
}

function describe(el: Element): Note["context"] {
  const img = el instanceof HTMLImageElement ? el : el.querySelector("img");
  const classes = Array.from(el.classList).join(" ");
  return {
    tag: el.tagName.toLowerCase(),
    text: clip((el as HTMLElement).innerText ?? el.textContent ?? "", 140),
    heading: nearestHeading(el),
    classes,
    ...(img ? { src: img.getAttribute("src") ?? undefined } : {}),
  };
}

function label(el: Element) {
  const tag = el.tagName.toLowerCase();
  const text = clip((el as HTMLElement).innerText ?? "", 40);
  return text ? `<${tag}> “${text}”` : `<${tag}>`;
}

const isUi = (t: EventTarget | null) =>
  t instanceof Element && !!t.closest(`[${UI_ATTR}]`);

/* ---------- component ---------- */

export default function SiteNotes() {
  const pathname = usePathname();
  const router = useRouter();

  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState("");
  const [picking, setPicking] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [showPins, setShowPins] = useState(true);
  const [showDone, setShowDone] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [text, setText] = useState("");
  const [flash, setFlash] = useState<string | null>(null);

  const hoverRef = useRef<HTMLDivElement>(null);
  const hoverLabelRef = useRef<HTMLSpanElement>(null);
  const pinRefs = useRef(new Map<string, HTMLButtonElement>());

  /* ----- data ----- */

  const sync = useCallback(async (init?: RequestInit, query = "") => {
    try {
      const res = await fetch(API + query, { cache: "no-store", ...init });
      if (!res.ok) throw new Error(`${res.status}`);
      setNotes(await res.json());
      setError("");
    } catch (e) {
      setError(`Couldn't reach ${API} (${(e as Error).message})`);
    }
  }, []);

  useEffect(() => {
    sync();
  }, [sync]);

  const send = (method: string, body?: unknown, query = "") =>
    sync(
      {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
      },
      query,
    );

  /* ----- picking mode: hover outline + click capture ----- */

  useEffect(() => {
    if (!picking) return;
    const box = hoverRef.current;

    const onMove = (e: MouseEvent) => {
      if (!box) return;
      const el = e.target as Element;
      if (isUi(el) || el === document.documentElement || el === document.body) {
        box.style.display = "none";
        return;
      }
      const r = el.getBoundingClientRect();
      Object.assign(box.style, {
        display: "block",
        left: `${r.left}px`,
        top: `${r.top}px`,
        width: `${r.width}px`,
        height: `${r.height}px`,
      });
      if (hoverLabelRef.current) hoverLabelRef.current.textContent = label(el);
    };

    // Swallow the interaction so links/buttons don't fire while picking.
    const block = (e: Event) => {
      if (isUi(e.target)) return;
      e.preventDefault();
      e.stopPropagation();
    };

    const onClick = (e: MouseEvent) => {
      if (isUi(e.target)) return;
      e.preventDefault();
      e.stopPropagation();
      const el = e.target as Element;
      const r = el.getBoundingClientRect();
      setDraft({
        el,
        x: e.clientX,
        y: e.clientY,
        offsetX: r.width ? (e.clientX - r.left) / r.width : 0.5,
        offsetY: r.height ? (e.clientY - r.top) / r.height : 0.5,
      });
      setText("");
      setPicking(false);
    };

    document.addEventListener("mousemove", onMove, true);
    document.addEventListener("pointerdown", block, true);
    document.addEventListener("mousedown", block, true);
    document.addEventListener("click", onClick, true);
    document.documentElement.classList.add(s.pickingCursor);
    return () => {
      document.removeEventListener("mousemove", onMove, true);
      document.removeEventListener("pointerdown", block, true);
      document.removeEventListener("mousedown", block, true);
      document.removeEventListener("click", onClick, true);
      document.documentElement.classList.remove(s.pickingCursor);
      if (box) box.style.display = "none";
    };
  }, [picking]);

  /* ----- keyboard: Alt+N toggles picking, Esc cancels ----- */

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === "n") {
        e.preventDefault();
        setDraft(null);
        setPicking((p) => !p);
      } else if (e.key === "Escape") {
        setPicking(false);
        setDraft(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* ----- pins follow their elements (scroll, resize, animations) ----- */

  const pagePins = notes.filter((n) => n.path === pathname && (showDone || !n.done));

  useLayoutEffect(() => {
    if (!showPins || pagePins.length === 0) return;
    let raf = 0;
    const tick = () => {
      for (const n of pagePins) {
        const pin = pinRefs.current.get(n.id);
        if (!pin) continue;
        let el: Element | null = null;
        try {
          el = document.querySelector(n.selector);
        } catch {}
        const r = el?.getBoundingClientRect();
        if (!r || (r.width === 0 && r.height === 0)) {
          pin.style.display = "none";
          continue;
        }
        pin.style.display = "";
        pin.style.transform = `translate(${r.left + n.offsetX * r.width}px, ${r.top + n.offsetY * r.height}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  });

  /* ----- jumping to a note on another page ----- */

  const reveal = useCallback((n: Note) => {
    let el: Element | null = null;
    try {
      el = document.querySelector(n.selector);
    } catch {}
    if (!el) return false;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    setFlash(n.id);
    setTimeout(() => setFlash(null), 1600);
    return true;
  }, []);

  useEffect(() => {
    let id: string | null = null;
    try {
      id = sessionStorage.getItem(PENDING_KEY);
    } catch {}
    if (!id) return;
    const n = notes.find((x) => x.id === id);
    if (!n || n.path !== pathname) return;
    try {
      sessionStorage.removeItem(PENDING_KEY);
    } catch {}
    // let the page (and any intro/reveal animations) settle first
    const t = setTimeout(() => reveal(n), 700);
    return () => clearTimeout(t);
  }, [pathname, notes, reveal]);

  const goTo = (n: Note) => {
    setShowPins(true);
    if (n.path === pathname) {
      reveal(n);
      return;
    }
    try {
      sessionStorage.setItem(PENDING_KEY, n.id);
    } catch {}
    router.push(n.path);
  };

  /* ----- actions ----- */

  const save = async () => {
    if (!draft || !text.trim()) return;
    const note: Note = {
      id: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
      path: pathname,
      selector: cssPath(draft.el),
      offsetX: Number(draft.offsetX.toFixed(3)),
      offsetY: Number(draft.offsetY.toFixed(3)),
      note: text.trim(),
      context: describe(draft.el),
      viewport: { w: window.innerWidth, h: window.innerHeight },
      createdAt: new Date().toISOString(),
      done: false,
    };
    setDraft(null);
    setText("");
    await send("POST", note);
  };

  const toggleDone = (n: Note) => send("PATCH", { id: n.id, done: !n.done });
  const remove = (n: Note) => send("DELETE", undefined, `?id=${encodeURIComponent(n.id)}`);

  /* ----- derived ----- */

  const open = notes.filter((n) => !n.done);
  const listed = notes.filter((n) => showDone || !n.done);
  const byPage = listed.reduce<Record<string, Note[]>>((acc, n) => {
    (acc[n.path] ??= []).push(n);
    return acc;
  }, {});
  const pages = Object.keys(byPage).sort((a, b) =>
    a === pathname ? -1 : b === pathname ? 1 : a.localeCompare(b),
  );
  const numberOf = (n: Note) => notes.filter((x) => x.path === n.path).indexOf(n) + 1;

  // keep the composer on screen
  const composerPos = draft
    ? {
        left: Math.min(Math.max(12, draft.x + 12), window.innerWidth - 332),
        top: Math.min(Math.max(12, draft.y + 12), window.innerHeight - 220),
      }
    : null;

  return (
    <div {...{ [UI_ATTR]: "" }} className={s.root}>
      {/* hover outline while picking */}
      <div ref={hoverRef} className={s.hover} aria-hidden>
        <span ref={hoverLabelRef} className={s.hoverLabel} />
      </div>

      {/* pins */}
      {showPins &&
        pagePins.map((n) => (
          <button
            key={n.id}
            type="button"
            ref={(el) => {
              if (el) pinRefs.current.set(n.id, el);
              else pinRefs.current.delete(n.id);
            }}
            className={`${s.pin}${n.done ? ` ${s.pinDone}` : ""}${flash === n.id ? ` ${s.pinFlash}` : ""}`}
            title={n.note}
            onClick={() => {
              setPanelOpen(true);
              setFlash(n.id);
              setTimeout(() => setFlash(null), 1600);
            }}
          >
            {numberOf(n)}
          </button>
        ))}

      {/* composer */}
      {draft && composerPos && (
        <div className={s.composer} style={composerPos} role="dialog" aria-label="New note">
          <div className={s.composerTarget}>{label(draft.el)}</div>
          <textarea
            autoFocus
            className={s.textarea}
            value={text}
            placeholder="What should change here?"
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) save();
            }}
          />
          <div className={s.row}>
            <span className={s.hint}>Ctrl+Enter to save</span>
            <button type="button" className={s.ghost} onClick={() => setDraft(null)}>
              Cancel
            </button>
            <button type="button" className={s.primary} disabled={!text.trim()} onClick={save}>
              Save note
            </button>
          </div>
        </div>
      )}

      {/* panel */}
      {panelOpen && (
        <aside className={s.panel} aria-label="Site notes">
          <header className={s.panelHead}>
            <strong>Site notes</strong>
            <span className={s.count}>{open.length} open</span>
            <button type="button" className={s.close} aria-label="Close" onClick={() => setPanelOpen(false)}>
              ×
            </button>
          </header>
          <div className={s.toggles}>
            <label>
              <input type="checkbox" checked={showPins} onChange={(e) => setShowPins(e.target.checked)} /> Show pins
            </label>
            <label>
              <input type="checkbox" checked={showDone} onChange={(e) => setShowDone(e.target.checked)} /> Show done
            </label>
          </div>
          {error && <p className={s.error}>{error}</p>}
          {pages.length === 0 && (
            <p className={s.empty}>
              No notes yet. Click <b>Add note</b> (or press <kbd>Alt</kbd>+<kbd>N</kbd>), then click anything on the
              page.
            </p>
          )}
          <div className={s.list}>
            {pages.map((p) => (
              <section key={p}>
                <h4 className={s.pageName}>
                  {p}
                  {p === pathname && <span className={s.here}>this page</span>}
                </h4>
                {byPage[p].map((n) => (
                  <article
                    key={n.id}
                    className={`${s.item}${n.done ? ` ${s.itemDone}` : ""}${flash === n.id ? ` ${s.itemFlash}` : ""}`}
                  >
                    <span className={s.num}>{numberOf(n)}</span>
                    <div className={s.body}>
                      <p className={s.noteText}>{n.note}</p>
                      <p className={s.ctx}>
                        &lt;{n.context.tag}&gt; {n.context.text ? `“${clip(n.context.text, 60)}”` : ""}
                      </p>
                      <div className={s.actions}>
                        <button type="button" onClick={() => goTo(n)}>
                          Go to
                        </button>
                        <button type="button" onClick={() => toggleDone(n)}>
                          {n.done ? "Reopen" : "Done"}
                        </button>
                        <button type="button" className={s.danger} onClick={() => remove(n)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </section>
            ))}
          </div>
        </aside>
      )}

      {/* launcher */}
      <div className={s.launcher}>
        <button
          type="button"
          className={`${s.add}${picking ? ` ${s.addActive}` : ""}`}
          onClick={() => {
            setDraft(null);
            setPicking((p) => !p);
          }}
          title="Alt+N"
        >
          {picking ? "Click an element… (Esc)" : "+ Add note"}
        </button>
        <button type="button" className={s.listBtn} onClick={() => setPanelOpen((o) => !o)}>
          Notes <span className={s.badge}>{open.length}</span>
        </button>
      </div>
    </div>
  );
}
