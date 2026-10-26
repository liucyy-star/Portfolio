"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/** Height of the sticky site nav, so pinned panels sit just below it. */
export const navOffset = () =>
  document.querySelector<HTMLElement>(".site-nav")?.offsetHeight ?? 0;

/**
 * The viewer's motion preference. Starts from the OS-level
 * prefers-reduced-motion setting, then remembers whatever they pick
 * with the on-page toggle. `null` until we've read it on the client.
 */
export function useReducedMotion(storageKey: string) {
  const [reduced, setReduced] = useState<boolean | null>(null);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(storageKey);
    } catch {}
    setReduced(
      stored !== null
        ? stored === "1"
        : window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, [storageKey]);

  const update = (next: boolean) => {
    setReduced(next);
    try {
      localStorage.setItem(storageKey, next ? "1" : "0");
    } catch {}
  };

  return [reduced, update] as const;
}

/** Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    // globals.css sets scroll-behavior: smooth, which fights Lenis.
    const html = document.documentElement;
    const prevBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      html.style.scrollBehavior = prevBehavior;
    };
  }, [enabled]);
}
