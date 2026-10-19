"use client";

import { useEffect, useRef, useState } from "react";
import { introState } from "@/lib/intro-state";

/**
 * Reveals an element (fade + slide up) once it's scrolled into view —
 * but never before the intro animation has finished, so nothing on
 * screen jumps around underneath it.
 *
 * Respects prefers-reduced-motion by skipping straight to visible.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const [introDone, setIntroDone] = useState(introState.done);

  useEffect(() => {
    if (introState.done) setIntroDone(true);
    const handler = () => setIntroDone(true);
    window.addEventListener("introdone", handler);
    return () => window.removeEventListener("introdone", handler);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible: inView && introDone };
}
