"use client";

import { useEffect, useState } from "react";
import { markIntroDone } from "@/lib/intro-state";
import { first_name, last_name, email } from "../app/globals/constants" ;

const WORDS = ["Hi there.",  "I'm " + first_name + " " + last_name + ".", "Let's look at some work."];
const WORD_INTERVAL = 700;

export default function IntroLoader() {
  const [wordIndex, setWordIndex] = useState(0);
  const [showSkip, setShowSkip] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      markIntroDone();
      setHidden(true);
      return;
    }

    document.body.style.overflow = "hidden";

    const timers: ReturnType<typeof setTimeout>[] = [];
    const skipTimer = setTimeout(() => setShowSkip(true), 500);
    timers.push(skipTimer);

    WORDS.forEach((_, i) => {
      if (i === 0) return;
      timers.push(setTimeout(() => setWordIndex(i), i * WORD_INTERVAL));
    });

    function handleExit() {
      timers.forEach(clearTimeout);
      setExiting(true);
      document.body.style.overflow = "";
      markIntroDone();
      setTimeout(() => setHidden(true), 700);
    }

    const autoExitTimer = setTimeout(
      handleExit,
      WORDS.length * WORD_INTERVAL + 500
    );
    timers.push(autoExitTimer);

    const handleClick = () => handleExit();
    window.addEventListener("click", handleClick, { once: true });

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("click", handleClick);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (hidden) return null;

  return (
    <div id="intro-loader" className={exiting ? "intro-exit" : ""}>
      <span key={wordIndex} className="intro-word">
        {WORDS[wordIndex]}
      </span>
      <span className={`intro-skip mono${showSkip ? " visible" : ""}`}>
        Click anywhere to skip
      </span>
    </div>
  );
}
