"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { GalleryItem } from "@/lib/galleries";
import styles from "./PaperDesk.module.css";

/** Where a paper sits on the desk, in viewport pixels (unrotated size). */
export type Origin = { cx: number; cy: number; w: number; h: number; rot: number; src: string };

type Props = {
  items: GalleryItem[];
  index: number;
  series: string;
  getOrigin: (i: number) => Origin | null;
  onNavigate: (i: number) => void;
  onClose: () => void;
};

const calm = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// The transform that makes the overlay image sit exactly on top of its paper.
function fromPaper(origin: Origin, el: HTMLElement) {
  const r = el.getBoundingClientRect();
  const dx = origin.cx - (r.left + r.width / 2);
  const dy = origin.cy - (r.top + r.height / 2);
  return `translate(${dx}px, ${dy}px) scale(${origin.w / r.width}, ${origin.h / r.height}) rotate(${origin.rot}deg)`;
}

/**
 * The image's most prominent vivid color, as an rgb() string, for the panel's
 * shadow. Samples a tiny copy: groups pixels by hue, weights each group by how
 * saturated it is, and averages the winning group. Near-white, near-black and
 * gray pixels are skipped; a fully gray image falls back to its average tone.
 */
function pickAccent(img: HTMLImageElement): string | null {
  const N = 48;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = N;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  try {
    ctx.drawImage(img, 0, 0, N, N);
    const px = ctx.getImageData(0, 0, N, N).data;
    const buckets = Array.from({ length: 12 }, () => ({ w: 0, r: 0, g: 0, b: 0 }));
    let gr = 0, gg = 0, gb = 0, gn = 0;
    for (let i = 0; i < px.length; i += 4) {
      const r = px[i] / 255, g = px[i + 1] / 255, b = px[i + 2] / 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      const l = (max + min) / 2;
      const s = max === min ? 0 : (max - min) / (1 - Math.abs(2 * l - 1));
      gr += r; gg += g; gb += b; gn++;
      if (l < 0.12 || l > 0.9 || s < 0.28) continue;
      let h = 0;
      if (max === r) h = ((g - b) / (max - min) + 6) % 6;
      else if (max === g) h = (b - r) / (max - min) + 2;
      else h = (r - g) / (max - min) + 4;
      const bucket = buckets[Math.floor(h * 2) % 12];
      const w = s * s; // favor the punchy colors
      bucket.w += w; bucket.r += r * w; bucket.g += g * w; bucket.b += b * w;
    }
    const best = buckets.reduce((a, c) => (c.w > a.w ? c : a));
    const to255 = (v: number) => Math.round(v * 255);
    if (best.w < 2) {
      // nothing vivid (black & white photo): use a mid-tone of its average
      const avg = (gr + gg + gb) / (3 * gn);
      const t = to255(Math.min(0.62, Math.max(0.38, avg)));
      return `rgb(${t}, ${t}, ${t})`;
    }
    return `rgb(${to255(best.r / best.w)}, ${to255(best.g / best.w)}, ${to255(best.b / best.w)})`;
  } catch {
    return null; // canvas tainted or image not decodable
  }
}

function orientation({ width, height }: GalleryItem) {
  const ratio = width / height;
  return ratio > 1.05 ? "Landscape" : ratio < 0.95 ? "Portrait" : "Square";
}

export default function PaperOverlay({ items, index, series, getOrigin, onNavigate, onClose }: Props) {
  const item = items[index];
  const total = items.length;
  const dialogRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const firstIndex = useRef(index); // only the first piece flies up; flipping crossfades
  const [closing, setClosing] = useState(false);
  const [accent, setAccent] = useState<string | null>(null); // pulled from the image
  const [placeholder] = useState(() => getOrigin(index)?.src); // the desk's small copy, shown while the big one loads

  // Lift: fly the image up from its paper, lock the page, focus the dialog.
  useLayoutEffect(() => {
    const { body } = document;
    const gutter = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    body.style.paddingRight = `${gutter}px`;
    closeRef.current?.focus({ preventScroll: true });

    const el = imgRef.current;
    const origin = getOrigin(index);
    if (el && origin && !calm()) {
      el.animate([{ transform: fromPaper(origin, el) }, { transform: "none" }], {
        duration: 560,
        easing: "cubic-bezier(.2,.85,.25,1)",
      });
    }
    return () => {
      body.style.overflow = "";
      body.style.paddingRight = "";
    };
  }, []); // runs once, when the paper is picked up

  function close() {
    if (closing) return;
    setClosing(true);
    const el = imgRef.current;
    const origin = getOrigin(index);
    if (!el || !origin || calm()) return onClose();
    el.animate([{ transform: "none" }, { transform: fromPaper(origin, el) }], {
      duration: 420,
      easing: "cubic-bezier(.4,0,.2,1)",
      fill: "forwards",
    }).onfinish = onClose;
  }

  const go = (step: number) => onNavigate((index + step + total) % total);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab") {
        // keep focus inside the dialog
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button");
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const titleId = `piece-title-${index}`;
  const flipped = index !== firstIndex.current;

  return (
    <div
      ref={dialogRef}
      className={`${styles.overlay}${closing ? ` ${styles.closing}` : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className={styles.scrim} onClick={close} />

      <button ref={closeRef} type="button" className={styles.close} onClick={close}>
        Put it back <span aria-hidden="true">✕</span>
      </button>

      <div className={styles.stage} onClick={(e) => e.target === e.currentTarget && close()}>
        <Image
          key={item.src}
          ref={imgRef}
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
          sizes="(max-width: 860px) 92vw, 60vw"
          priority
          onLoad={(e) => setAccent(pickAccent(e.currentTarget))}
          className={`${styles.liftImg}${flipped ? ` ${styles.flip}` : ""}`}
          style={{
            ["--ratio" as string]: item.width / item.height,
            backgroundImage: !flipped && placeholder ? `url(${placeholder})` : undefined,
          }}
        />
      </div>

      <aside
        className={styles.panel}
        style={accent ? { ["--panel-pop" as string]: accent } : undefined}
      >
        <div className={`mono ${styles.panelKicker}`}>
          No. {String(index + 1).padStart(2, "0")} / {total}
        </div>
        <h2 id={titleId}>{item.title}</h2>
        <p className={styles.panelBody}>{item.description}</p>

        <dl className={styles.details}>
          <div>
            <dt className="mono">Type</dt>
            <dd>{item.category}</dd>
          </div>
          <div>
            <dt className="mono">Orientation</dt>
            <dd>{orientation(item)}</dd>
          </div>
          <div>
            <dt className="mono">Series</dt>
            <dd>{series}</dd>
          </div>
        </dl>

        <div className={styles.pager}>
          <button type="button" onClick={() => go(-1)}>
            <span aria-hidden="true">←</span> Previous
          </button>
          <button type="button" onClick={() => go(1)}>
            Next <span aria-hidden="true">→</span>
          </button>
        </div>
        <p className={`mono ${styles.keys}`}>← → to flip through · Esc to put it back</p>
      </aside>
    </div>
  );
}
