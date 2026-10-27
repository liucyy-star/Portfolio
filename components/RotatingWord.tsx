"use client";

import { useEffect, useState } from "react";

const WORDS = [
  "clarity",
  "simplicity",
  "trust",
  "flows that work",
  "calm interfaces",
];

// One color per word, borrowed from the wordmark (deep enough to read on cream).
const WORD_COLORS = ["#ff7433", "#4f95ff", "#ef6f7c", "#1890a8", "#7fbf5a", "#e27fb2"];

/**
 * Cycles through a short list of words in the hero headline,
 * fading between each one.
 */
export default function RotatingWord() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      const timeout = setTimeout(() => {
        setIndex((i) => (i + 1) % WORDS.length);
        setVisible(true);
      }, 220);
      return () => clearTimeout(timeout);
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="rotator"
      style={{ opacity: visible ? 1 : 0, color: WORD_COLORS[index % WORD_COLORS.length] }}
    >
      {WORDS[index]}
    </span>
  );
}
