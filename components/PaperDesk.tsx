"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { GalleryItem } from "@/lib/galleries";
import PaperOverlay, { type Origin } from "./PaperOverlay";
import styles from "./PaperDesk.module.css";

type Spot = { x: number; y: number; w: number; h: number; rot: number };
type Motion = { bx: number; by: number; px: number; py: number; r: number };

const TAPE = ["var(--pop-yellow)", "var(--pop-aqua)", "var(--pop-rose)", "var(--pop-green)"];
const PUSH_RADIUS = 190; // how far the cursor's "hand" reaches past a paper's edge
const PUSH_MAX = 48; // px a paper slides away at most
const EASE = 0.14; // per-frame easing toward the target offset
const SHEET_PAD = 10; // white border around each print
const SHEET_FOOT = 30; // bigger bottom margin, where the number sits

// Small seeded random, so the scatter is the same on every visit.
function rand(seed: number) {
  let t = (seed + 0x6d2b79f5) | 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

// Deals the papers onto a loose grid, then jitters and tilts each one.
function scatter(items: GalleryItem[], deskWidth: number) {
  const inset = deskWidth < 640 ? 12 : 28;
  const usable = deskWidth - inset * 2;
  const paperW = usable >= 1000 ? 200 : usable >= 600 ? 170 : Math.floor(usable * 0.44);
  const cols = Math.max(2, Math.floor(usable / (paperW * 1.02)));
  const cellW = usable / cols;
  const cellH = paperW * (cols > 2 ? 1.08 : 1.12);

  let bottom = 0;
  const spots: Spot[] = items.map((item, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const w = paperW;
    const h = Math.round(((w - SHEET_PAD * 2) * item.height) / item.width) + SHEET_PAD + SHEET_FOOT;
    const shift = (row % 2 ? 0.14 : -0.14) * cellW;
    const jx = (rand(i * 3 + 1) - 0.5) * cellW * 0.4;
    const jy = (rand(i * 3 + 2) - 0.5) * cellH * 0.45;
    const x = clamp(inset + col * cellW + (cellW - w) / 2 + shift + jx, inset, deskWidth - inset - w);
    const y = Math.max(inset, inset + 10 + row * cellH + jy);
    bottom = Math.max(bottom, y + h);
    return { x, y, w, h, rot: (rand(i * 3 + 3) - 0.5) * 16 };
  });
  return { spots, height: Math.ceil(bottom + inset + 24) };
}

export default function PaperDesk({ items, label }: { items: GalleryItem[]; label: string }) {
  const deskRef = useRef<HTMLDivElement>(null);
  const paperRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [deskWidth, setDeskWidth] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const layout = useMemo(() => (deskWidth ? scatter(items, deskWidth) : null), [items, deskWidth]);

  // Everything that moves lives in refs, so sliding papers never re-renders React.
  const spotsRef = useRef<Spot[] | null>(null);
  spotsRef.current = layout?.spots ?? null;
  const motion = useRef<Motion[]>(items.map(() => ({ bx: 0, by: 0, px: 0, py: 0, r: 0 })));
  const cursor = useRef<{ x: number; y: number } | null>(null);
  const hovered = useRef<number | null>(null);
  const drag = useRef<{ i: number; x: number; y: number; bx: number; by: number; moved: boolean } | null>(null);
  const justDragged = useRef(false);
  const returnFocus = useRef<number | null>(null);
  const zTop = useRef(items.length);
  const frame = useRef(0);
  const calm = useRef(false); // prefers-reduced-motion

  useLayoutEffect(() => {
    calm.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desk = deskRef.current;
    if (!desk) return;
    // Ignore small changes (like the scrollbar vanishing) so the papers don't reshuffle.
    const measure = () =>
      setDeskWidth((w) => (Math.abs(desk.clientWidth - w) > 30 ? desk.clientWidth : w));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(desk);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, []);

  function paint(i: number) {
    const el = paperRefs.current[i];
    const s = spotsRef.current?.[i];
    if (!el || !s) return;
    const m = motion.current[i];
    el.style.transform = `translate(${s.x + m.bx + m.px}px, ${s.y + m.by + m.py}px) rotate(${s.rot + m.r}deg)`;
  }

  useLayoutEffect(() => {
    items.forEach((_, i) => paint(i));
  }, [layout, items]); // paint only reads refs

  // One animation frame: ease every paper toward where the cursor wants it.
  function tick() {
    frame.current = 0;
    const spots = spotsRef.current;
    if (!spots) return;
    const c = cursor.current;
    let moving = false;
    spots.forEach((s, i) => {
      const m = motion.current[i];
      let tx = 0;
      let ty = 0;
      let tr = 0;
      if (!calm.current) {
        if (i === hovered.current || drag.current?.i === i) {
          tr = -s.rot * 0.6; // the paper under your hand straightens up a little
        } else if (c) {
          const dx = s.x + m.bx + s.w / 2 - c.x;
          const dy = s.y + m.by + s.h / 2 - c.y;
          const d = Math.hypot(dx, dy) || 1;
          const reach = PUSH_RADIUS + Math.max(s.w, s.h) / 2;
          if (d < reach) {
            const f = (1 - d / reach) ** 1.4 * PUSH_MAX;
            tx = (dx / d) * f;
            ty = (dy / d) * f;
            tr = (dx / d) * f * 0.12;
          }
        }
      }
      m.px += (tx - m.px) * EASE;
      m.py += (ty - m.py) * EASE;
      m.r += (tr - m.r) * EASE;
      if (Math.abs(tx - m.px) + Math.abs(ty - m.py) + Math.abs(tr - m.r) > 0.05) moving = true;
      paint(i);
    });
    if (moving) frame.current = requestAnimationFrame(tick);
  }

  function kick() {
    if (!frame.current) frame.current = requestAnimationFrame(tick);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (e.pointerType === "touch") return;
    const rect = deskRef.current!.getBoundingClientRect();
    cursor.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    const paper = (e.target as HTMLElement).closest<HTMLElement>("[data-paper]");
    hovered.current = paper ? Number(paper.dataset.paper) : null;

    const d = drag.current;
    const s = d && spotsRef.current?.[d.i];
    if (d && s && layout) {
      const dx = e.clientX - d.x;
      const dy = e.clientY - d.y;
      if (Math.hypot(dx, dy) > 4) d.moved = true;
      const m = motion.current[d.i];
      // Let a paper hang off the edge a bit, but never get lost.
      m.bx = clamp(d.bx + dx, -s.x - s.w * 0.3, deskWidth - s.x - s.w * 0.7);
      m.by = clamp(d.by + dy, -s.y - s.h * 0.3, layout.height - s.y - s.h * 0.7);
    }
    kick();
  }

  function onPointerLeave() {
    cursor.current = null;
    hovered.current = null;
    kick();
  }

  function onPaperDown(e: React.PointerEvent<HTMLButtonElement>, i: number) {
    if (e.pointerType === "touch" || e.button !== 0) return; // on touch, a tap just opens it
    const m = motion.current[i];
    drag.current = { i, x: e.clientX, y: e.clientY, bx: m.bx, by: m.by, moved: false };
    e.currentTarget.setPointerCapture(e.pointerId);
    e.currentTarget.style.zIndex = String(++zTop.current);
    e.currentTarget.classList.add(styles.held);
  }

  function onPaperUp(e: React.PointerEvent<HTMLButtonElement>) {
    if (!drag.current) return;
    justDragged.current = drag.current.moved;
    drag.current = null;
    e.currentTarget.classList.remove(styles.held);
    kick();
  }

  function onPaperClick(i: number) {
    if (justDragged.current) {
      justDragged.current = false;
      return;
    }
    paperRefs.current[i]!.style.zIndex = String(++zTop.current);
    setOpen(i);
  }

  // Where the overlay's image should fly from (and back to).
  function getOrigin(i: number): Origin | null {
    const img = paperRefs.current[i]?.querySelector("img");
    const s = spotsRef.current?.[i];
    if (!img || !s) return null;
    const r = img.getBoundingClientRect();
    return {
      cx: r.left + r.width / 2,
      cy: r.top + r.height / 2,
      w: img.offsetWidth,
      h: img.offsetHeight,
      rot: s.rot + motion.current[i].r,
      src: img.currentSrc,
    };
  }

  function closeOverlay() {
    returnFocus.current = open;
    setOpen(null);
  }

  // Hand focus back to the paper once it's visible on the desk again.
  useEffect(() => {
    if (open !== null || returnFocus.current === null) return;
    paperRefs.current[returnFocus.current]?.focus({ preventScroll: true });
    returnFocus.current = null;
  }, [open]);

  return (
    <>
      <p className={`mono ${styles.hint}`}>
        <span className={styles.hintPointer}>Nudge the papers with your cursor · drag to rearrange · click one to pick it up</span>
        <span className={styles.hintTouch}>Tap a piece to pick it up</span>
      </p>

      <div
        ref={deskRef}
        className={`${styles.desk}${layout ? ` ${styles.ready}` : ""}`}
        style={layout ? { height: layout.height } : undefined}
        role="group"
        aria-label={`${label}: ${items.length} pieces`}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        {layout?.spots.map((s, i) => {
          const item = items[i];
          return (
            <button
              key={item.src}
              ref={(el) => {
                paperRefs.current[i] = el;
              }}
              type="button"
              data-paper={i}
              className={`${styles.paper}${open === i ? ` ${styles.lifted}` : ""}`}
              style={{ width: s.w, ["--delay" as string]: `${i * 35}ms` }}
              aria-label={`${item.title}, ${item.category}`}
              aria-haspopup="dialog"
              onPointerDown={(e) => onPaperDown(e, i)}
              onPointerUp={onPaperUp}
              onPointerCancel={onPaperUp}
              onClick={() => onPaperClick(i)}
            >
              <span className={styles.sheet}>
                {i % 3 === 0 && (
                  <span
                    className={styles.tape}
                    style={{
                      ["--tape" as string]: TAPE[(i / 3) % TAPE.length],
                      ["--tape-rot" as string]: `${(rand(i * 7) - 0.5) * 14}deg`,
                    }}
                  />
                )}
                <Image
                  src={item.src}
                  alt=""
                  width={item.width}
                  height={item.height}
                  sizes={`${s.w}px`}
                  draggable={false}
                />
                <span className={`mono ${styles.caption}`}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.captionTitle}>{item.title}</span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {open !== null && (
        <PaperOverlay
          items={items}
          index={open}
          series={label}
          getOrigin={getOrigin}
          onNavigate={setOpen}
          onClose={closeOverlay}
        />
      )}
    </>
  );
}
