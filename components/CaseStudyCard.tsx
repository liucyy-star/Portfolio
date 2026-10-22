"use client";

import Link from "next/link";
import type { CaseStudy } from "@/lib/caseStudies";
import { useReveal } from "@/hooks/useReveal";

// Slight tilt per card, like index cards scattered on a desk.
const TILTS = [-1.1, 0.8, -0.6];

export default function CaseStudyCard({
  study,
  index,
}: {
  study: CaseStudy;
  index: number;
}) {
  const { ref, visible } = useReveal<HTMLElement>();
  const tilt = TILTS[index % TILTS.length];

  return (
    <Link href={`/work/${study.slug}`} className="card-link">
      <article
        ref={ref}
        className="card"
        data-accent={study.accent}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible
            ? `rotate(${tilt}deg) translateY(0)`
            : `rotate(${tilt}deg) translateY(28px)`,
          transitionDelay: `${index * 110}ms`,
        }}
      >
        <div className="card-top">
          <div>
            <span className="card-tag">{study.tag}</span>
            <h3>{study.title}</h3>
            <p className="one-liner">{study.oneLiner}</p>
          </div>
          <div className="toggle-hint">Read case study →</div>
        </div>

        <div className="card-meta">
          <span>
            Role <b>{study.role}</b>
          </span>
          <span>
            Timeline <b>{study.timeline}</b>
          </span>
          <span>
            Tools <b>{study.tools}</b>
          </span>
        </div>
      </article>
    </Link>
  );
}