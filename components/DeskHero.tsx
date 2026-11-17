"use client";

import { useRouter } from "next/navigation";
import { useState, type MouseEvent, type ReactNode } from "react";
import { apexFintech } from "@/lib/caseStudies/apexFintech";
import { benefitsCal } from "@/lib/caseStudies/benefitsCal";
import { aggieMentalHealth } from "@/lib/caseStudies/aggieMentalHealth";
import styles from "./DeskHero.module.css";

/*
 * A flat, hand-drawn desk where every object is a shortcut to a project.
 * Pure inline SVG + CSS: no WebGL, no model files, nothing extra to download,
 * so it paints with the rest of the hero instead of behind a loading screen.
 */

type Obj = {
  id: string;
  href: string;
  label: string; // what the caption says on hover/focus
  kind: string;
  accent?: string; // matches the case-study card colors, so the cursor dot agrees
  tag: string; // the short label that's always visible on the desk
  at: [number, number]; // where that label sits, in the drawing's own coordinates (600 × 440)
  quiet?: boolean; // label only shows on hover/focus (these pages are already in the nav)
};

// Same colors as the case-study cards and the cursor dot.
const ACCENT_HEX: Record<string, string> = { "1": "#5a7bff", "2": "#0b8f94", "3": "#2f7d55" };

const OBJECTS: Obj[] = [
  { id: "apex", href: `/work/${apexFintech.slug}`, label: apexFintech.title, kind: apexFintech.tag, accent: apexFintech.accent, tag: "Fintech", at: [301, 100] },
  { id: "benefits", href: `/work/${benefitsCal.slug}`, label: benefitsCal.title, kind: benefitsCal.tag, accent: benefitsCal.accent, tag: "Civic tech", at: [517, 170] },
  { id: "aggie", href: `/work/${aggieMentalHealth.slug}`, label: aggieMentalHealth.title, kind: aggieMentalHealth.tag, accent: aggieMentalHealth.accent, tag: "Brand campaign", at: [111, 22] },
  { id: "sketch", href: "/graphic-design", label: "Graphic design", kind: "Sketchbook", tag: "Graphics", at: [178, 268], quiet: true },
  { id: "camera", href: "/photography", label: "Photography", kind: "Camera roll", tag: "Photos", at: [449, 244], quiet: true },
];

const byId = Object.fromEntries(OBJECTS.map((o) => [o.id, o])) as Record<string, Obj>;

export default function DeskHero() {
  const router = useRouter();
  const [active, setActive] = useState<string | null>(null);
  const current = active ? byId[active] : null;

  // Client-side navigation, so the intro loader doesn't replay on the way back.
  function go(e: MouseEvent, href: string) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    router.push(href);
  }

  // A plain function (not a component), so re-rendering on hover doesn't remount the links.
  function thing(id: string, children: ReactNode) {
    const o = byId[id];
    return (
      <a
        href={o.href}
        className={`desk-obj ${styles.obj}`}
        data-desk-accent={o.accent}
        aria-label={`${o.label}, ${o.kind}`}
        onClick={(e) => go(e, o.href)}
        onPointerEnter={() => setActive(id)}
        onPointerLeave={() => setActive((a) => (a === id ? null : a))}
        onFocus={() => setActive(id)}
        onBlur={() => setActive((a) => (a === id ? null : a))}
      >
        <g className={styles.lift}>{children}</g>
      </a>
    );
  }

  return (
    <figure className={styles.wrap} data-active={active ?? undefined}>
      <div className={styles.stage}>
      <svg
        className={styles.svg}
        viewBox="0 0 600 440"
        role="group"
        aria-label="My desk. Each object opens a project."
      >
        {/* floor shadow + lamp light */}
        <ellipse cx="300" cy="420" rx="270" ry="14" className={styles.shadow} />
        <path d="M118 214 L60 296 L232 296 Z" className={styles.beam} />

        {/* ── wall poster → Aggie Mental Health ── */}
        {thing("aggie", <>
          <g transform="rotate(-4 110 110)">
            <rect x="52" y="34" width="118" height="156" rx="3" fill="#2f7d55" className={styles.ink} />
            <circle cx="111" cy="96" r="32" fill="#f08900" />
            <path d="M86 108 q12 -30 25 -4 q13 -26 25 4" fill="none" stroke="#fff3e4" strokeWidth="5" strokeLinecap="round" />
            <rect x="68" y="146" width="70" height="7" rx="3.5" fill="#fff3e4" />
            <rect x="68" y="160" width="46" height="7" rx="3.5" fill="#fff3e4" opacity="0.7" />
            <rect x="94" y="27" width="34" height="13" fill="var(--pop-yellow)" opacity="0.85" transform="rotate(6 111 33)" />
          </g>
        </>)}

        {/* desk */}
        <path d="M44 312 L556 312 L528 262 L72 262 Z" fill="#e9d6bd" className={styles.ink} />
        <rect x="36" y="312" width="528" height="16" rx="3" fill="#cfb593" className={styles.ink} />
        <rect x="60" y="328" width="16" height="88" fill="#cfb593" className={styles.ink} />
        <rect x="524" y="328" width="16" height="88" fill="#cfb593" className={styles.ink} />
        <rect x="408" y="328" width="116" height="66" fill="#dcc3a1" className={styles.ink} />
        <rect x="448" y="356" width="36" height="7" rx="3.5" fill="var(--ink)" opacity="0.5" />

        {/* lamp (decorative) */}
        <g className={styles.ink} fill="var(--ink)">
          <ellipse cx="86" cy="292" rx="26" ry="7" />
          <path d="M86 290 L66 232 L114 204" fill="none" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M104 196 L140 186 L128 228 Z" fill="var(--accent-1)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
        </g>

        {/* ── sketchbook → graphic design ── */}
        {thing("sketch", <>
          <path d="M126 302 L222 302 L212 276 L132 276 Z" fill="var(--pop-yellow)" className={styles.ink} />
          <path d="M150 292 q14 -12 26 -2 t28 -4" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
          <rect x="160" y="282" width="62" height="5" rx="2.5" fill="var(--pop-rose)" transform="rotate(-12 190 285)" className={styles.ink} />
        </>)}

        {/* ── monitor → Apex Fintech ── */}
        {thing("apex", <>
          <path d="M300 258 L318 292 L282 292 Z" fill="#b8bccb" className={styles.ink} />
          <rect x="262" y="290" width="76" height="9" rx="4" fill="#b8bccb" className={styles.ink} />
          <rect x="218" y="112" width="166" height="148" rx="10" fill="#1d1a2b" className={styles.ink} />
          <rect x="228" y="122" width="146" height="124" rx="4" fill="#141833" />
          <rect x="228" y="122" width="34" height="124" fill="#5a7bff" opacity="0.9" />
          <rect x="234" y="132" width="20" height="4" rx="2" fill="#fff" opacity="0.8" />
          <rect x="234" y="142" width="16" height="4" rx="2" fill="#fff" opacity="0.5" />
          <rect x="234" y="150" width="18" height="4" rx="2" fill="#fff" opacity="0.5" />
          <rect x="272" y="132" width="64" height="7" rx="3.5" fill="#fff" />
          <rect x="272" y="152" width="58" height="64" rx="6" fill="#262c55" stroke="#5a7bff" strokeWidth="1.5" />
          <rect x="280" y="162" width="30" height="4" rx="2" fill="#fff" opacity="0.7" />
          <rect x="280" y="174" width="42" height="4" rx="2" fill="#fff" opacity="0.35" />
          <rect x="280" y="184" width="36" height="4" rx="2" fill="#fff" opacity="0.35" />
          <rect x="336" y="152" width="30" height="64" rx="6" fill="#f0a20a" />
          <circle cx="351" cy="172" r="7" fill="#141833" opacity="0.6" />
          <rect x="342" y="196" width="18" height="5" rx="2.5" fill="#141833" opacity="0.6" />
        </>)}

        {/* keyboard + mug (decorative) */}
        <path d="M248 306 L352 306 L346 296 L254 296 Z" fill="#f5f0e8" className={styles.ink} />
        <g>
          <rect x="370" y="262" width="26" height="30" rx="4" fill="var(--pop-aqua)" className={styles.ink} />
          <path d="M396 270 q12 0 12 9 t-12 9" fill="none" stroke="var(--ink)" strokeWidth="2.5" />
          <path className={styles.steam} d="M378 254 q-5 -8 0 -16 t0 -16" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" />
          <path className={styles.steam} style={{ animationDelay: "-1.2s" }} d="M389 256 q-5 -8 0 -16 t0 -16" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* ── camera → photography ── */}
        {thing("camera", <>
          <rect x="420" y="258" width="58" height="38" rx="6" fill="var(--pop-pink)" className={styles.ink} />
          <rect x="430" y="251" width="18" height="9" rx="2" fill="var(--pop-pink)" className={styles.ink} />
          <circle cx="449" cy="277" r="13" fill="#1d1a2b" />
          <circle cx="449" cy="277" r="6" fill="var(--accent-2)" />
          <circle cx="469" cy="266" r="2.5" fill="#fff3e4" />
        </>)}

        {/* ── phone on a stand → BenefitsCal ── */}
        {thing("benefits", <>
          <path d="M490 302 L540 302 L532 290 L498 290 Z" fill="#b8bccb" className={styles.ink} />
          <g transform="rotate(8 515 240)">
            <rect x="492" y="184" width="50" height="100" rx="9" fill="#1d1a2b" className={styles.ink} />
            <rect x="497" y="192" width="40" height="84" rx="4" fill="#fff" />
            <rect x="497" y="192" width="40" height="14" rx="4" fill="#0b8f94" />
            <rect x="502" y="214" width="30" height="7" rx="2" fill="none" stroke="#0b8f94" strokeWidth="1.5" />
            <rect x="502" y="227" width="30" height="7" rx="2" fill="none" stroke="#0b8f94" strokeWidth="1.5" />
            <rect x="502" y="240" width="20" height="7" rx="2" fill="none" stroke="#0b8f94" strokeWidth="1.5" />
            <rect x="502" y="258" width="30" height="10" rx="5" fill="#ff5542" />
          </g>
        </>)}
      </svg>

      {/* Always-visible labels, so the desk reads as a table of contents even
          for people who never hover. HTML (not SVG text) so they stay a
          readable size on phones while the drawing scales. */}
      <div className={styles.tags} aria-hidden="true">
        {OBJECTS.map((o) => (
          <span
            key={o.id}
            className={`${styles.tag}${o.quiet ? ` ${styles.tagQuiet}` : ""}${active === o.id ? ` ${styles.tagOn}` : ""}`}
            style={{
              left: `${(o.at[0] / 600) * 100}%`,
              top: `${(o.at[1] / 440) * 100}%`,
              ["--tag" as string]: o.accent ? ACCENT_HEX[o.accent] : "var(--ink)",
            }}
          >
            {o.tag}
          </span>
        ))}
      </div>
      </div>

      <figcaption className={`mono ${styles.caption}`} aria-hidden="true">
        {current ? (
          <>
            <span className={styles.kind}>{current.kind}</span>
            <span className={styles.label}>{current.label} →</span>
          </>
        ) : (
          <span className={styles.idle}>Everything on the desk is clickable</span>
        )}
      </figcaption>
    </figure>
  );
}
