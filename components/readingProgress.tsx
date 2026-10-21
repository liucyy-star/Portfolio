"use client";

import { useEffect, useState } from "react";

// A bar that fills from 0% to 100% as the reader scrolls down the page.
export default function ReadingProgress({ className = "", doneClassName = ""}: { className?: string , doneClassName?: string }) {
  const [progress, setProgress] = useState(0); 
   const [done, setDone] = useState(false);

  useEffect(() => {
    function update() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const p = scrollable > 0 ? window.scrollY / scrollable : 0;
      setProgress(p);

      if (p > 0.98) setDone(true); // stays true, so the star only pops once
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

    return (
    <>
      <div className={className} style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      {done && (
        <div className={doneClassName} role="status">
          ⭐ You made it to the end. Thanks for reading!
        </div>
      )}
    </>
  );
}