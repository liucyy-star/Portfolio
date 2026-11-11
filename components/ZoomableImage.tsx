"use client";

/**
 * An image you can click to open in a full-screen overlay.
 * Inside the overlay, click the image to toggle fit-to-screen vs. full size
 * (scrollable). Esc, the close button, or clicking the backdrop closes it.
 */

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import s from "./ZoomableImage.module.css";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  className?: string;
};

export default function ZoomableImage({ src, alt, width, height, sizes, className }: Props) {
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeBtn.current?.focus();
    const btn = trigger.current;
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      setZoomed(false);
      btn?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className={`${s.trigger} ${className ?? ""}`}
        onClick={() => setOpen(true)}
        aria-label={`Enlarge image: ${alt}`}
      >
        <Image src={src} alt={alt} width={width} height={height} sizes={sizes} />
        <span className={s.hint} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
          Enlarge
        </span>
      </button>

      {open &&
        createPortal(
          <div
            className={s.overlay}
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            data-lenis-prevent
            onClick={() => setOpen(false)}
          >
            <button
              ref={closeBtn}
              type="button"
              className={s.close}
              aria-label="Close"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
            <div className={`${s.stage}${zoomed ? ` ${s.zoomed}` : ""}`}>
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                sizes="100vw"
                quality={90}
                className={s.full}
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomed((z) => !z);
                }}
              />
            </div>
            <p className={s.tip}>{zoomed ? "Click to fit" : "Click image to zoom"} · Esc to close</p>
          </div>,
          document.body,
        )}
    </>
  );
}
