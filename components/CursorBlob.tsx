"use client";

import { useEffect, useRef } from "react";

const ACCENT_COLORS: Record<string, string> = {
  "1": "#FF5A4E",
  "2": "#3D5AFE",
  "3": "#00B87A",
};

const DEFAULT_COLOR = ACCENT_COLORS["1"];

/**
 * A cursor-following dot that grows and picks up the accent color
 * of whichever case-study card it's hovering over.
 */
export default function CursorBlob() {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blob = blobRef.current;
    if (!blob) return;

    const handleMouseMove = (e: MouseEvent) => {
      blob.style.left = `${e.clientX}px`;
      blob.style.top = `${e.clientY}px`;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>(".card");
      if (!card) return;
      const accent = card.dataset.accent ?? "1";
      blob.style.background = ACCENT_COLORS[accent] ?? DEFAULT_COLOR;
      blob.style.width = "36px";
      blob.style.height = "36px";
    };

    const handleMouseOut = (e: MouseEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>(".card");
      if (!card) return;
      blob.style.background = DEFAULT_COLOR;
      blob.style.width = "22px";
      blob.style.height = "22px";
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return <div id="blob" ref={blobRef} />;
}
