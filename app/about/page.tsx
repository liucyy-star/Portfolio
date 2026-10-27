import type { CSSProperties } from "react";
import CursorBlob from "@/components/CursorBlob";
import { first_name, RESUME_URL } from "@/lib/site";
import styles from "./about.module.css";

export const metadata = {
  title: "About — Christina Liu",
  description: "A hello, a little about how I work, and my resume.",
};

const howIWork = [
  {
    title: "Start with the people",
    body: "I go where users are — county offices, interviews, testing sessions — before I open Figma.",
  },
  {
    title: "Say it plainly",
    body: "Policy, finance, and benefits rules get complicated. My job is to make the next step obvious.",
  },
  {
    title: "Leave tidy files",
    body: "Labeled, organized work means engineers and teammates can pick up right where I left off.",
  },
];

// Things I love outside of work. `color` picks one of the wordmark pops.
const favorites = [
  { label: "Film photography", detail: "Always a roll in my bag", color: "var(--pop-yellow)" },
  { label: "Sci-fi movies", detail: "The weirder the better", color: "var(--accent-2)" },
  { label: "Hey Riddle Riddle", detail: "Favorite podcast, no contest", color: "var(--pop-pink)" },
  { label: "Baking", detail: "Ask me for a recipe", color: "var(--pop-green)" },
];

export default function AboutMe() {
  return (
    <>
      <CursorBlob />

      <section className={styles.hello}>
        <div className={styles.copy}>
          <p className={`mono ${styles.eyebrow}`}>about me</p>
          <h1 className={styles.title}>
            Hello! I&apos;m {first_name}{" "}
            <span className={styles.wave} aria-hidden="true">👋</span>
          </h1>
          <p className={styles.lead}>
            I&apos;m a UX designer at Deloitte, where I work on BenefitsCal —
            the portal Californians use to apply for food, cash, and health
            benefits. I love turning dense rules into steps people can actually
            finish.
          </p>
          <p className={styles.body}>
            I studied Design at UC Davis with minors in Computer Science and
            Business, so I&apos;m happiest right where design, code, and the
            bottom line meet. I&apos;m based in Sacramento, CA.
          </p>
        </div>

        {/* Photo slot: swap the shapes for <img src="/christina.jpg" alt="Christina Liu" /> when ready. */}
        <div className={styles.portrait} aria-hidden="true">
          <span className={`${styles.blob} ${styles.bBlue}`} />
          <span className={`${styles.blob} ${styles.bOrange}`} />
          <span className={`${styles.blob} ${styles.bYellow}`} />
          <span className={`${styles.blob} ${styles.bPink}`} />
          <span className={styles.initials}>CL</span>
        </div>
      </section>

      <section className={styles.band}>
        <h2 className={styles.h2}>How I work</h2>
        <ol className={styles.principles}>
          {howIWork.map((item, i) => (
            <li key={item.title}>
              <span className={`mono ${styles.num}`}>0{i + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.band}>
        <h2 className={styles.h2}>When I&apos;m not designing</h2>
        <ul className={styles.favorites}>
          {favorites.map((f) => (
            <li key={f.label} style={{ "--chip": f.color } as CSSProperties}>
              <span className={styles.chipDot} />
              <span className={styles.chipLabel}>{f.label}</span>
              <span className={styles.chipDetail}>{f.detail}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.resumeHead}>
        <h2 className={styles.h2}>Resume</h2>
        <a className="btn ghost" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
          Download PDF ↓
        </a>
      </section>

      <iframe
        src={RESUME_URL}
        title="Resume"
        style={{ width: "100%", height: "100vh", border: "none" }}
      />
    </>
  );
}
