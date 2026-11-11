"use client";

import { useEffect } from "react";

// Wordmark colors a .btn's hover shadow can take.
const POPS = [
  "var(--accent-1)",
  "var(--accent-2)",
  "var(--accent-3)",
  "var(--pop-yellow)",
  "var(--pop-pink)",
  "var(--pop-green)",
  "var(--pop-aqua)",
  "var(--pop-rose)",
];

/**
 * Each time the pointer enters a .btn, give its hover shadow a new color
 * (never the same one twice in a row). Renders nothing.
 */
export default function ButtonPop() {
  useEffect(() => {
    let last = -1;
    const onOver = (e: PointerEvent) => {
      const btn = (e.target as Element | null)?.closest?.<HTMLElement>(".btn:not(.ghost)");
      if (!btn || btn.contains(e.relatedTarget as Node | null)) return;
      let next: number;
      if (last < 0) next = Math.floor(Math.random() * POPS.length);
      else {
        next = Math.floor(Math.random() * (POPS.length - 1));
        if (next >= last) next += 1; // skip the color it just had
      }
      last = next;
      btn.style.setProperty("--btn-pop", POPS[next]);
    };
    document.addEventListener("pointerover", onOver);
    return () => document.removeEventListener("pointerover", onOver);
  }, []);
  return null;
}
