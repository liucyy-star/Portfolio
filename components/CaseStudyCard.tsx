"use client";

import { useState } from "react";
import type { CaseStudy } from "@/lib/case-studies";
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
  const [open, setOpen] = useState(false);
  const { ref, visible } = useReveal<HTMLElement>();
  const tilt = TILTS[index % TILTS.length];

  return (
    <article
      ref={ref}
      className={`card${open ? " open" : ""}`}
      data-accent={study.accent}
      onClick={() => setOpen((o) => !o)}
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
        <div className="toggle-hint">
          {open ? "Close" : "Read case study"}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 1V15M1 8H15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
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

      <div className="card-detail">
        <div className="card-detail-inner">
          <div className="detail-grid">
            <div className="detail-block">
              <div className="label">The problem</div>
              <p>{study.problem}</p>
            </div>
            <div className="detail-block">
              <div className="label">The process</div>
              <p>{study.process}</p>
            </div>
            <div className="detail-block">
              <div className="label">The solution</div>
              <p>{study.solution}</p>
            </div>
            <div className="detail-block">
              <div className="label">Constraints</div>
              <p>{study.constraints}</p>
            </div>
            <div className="impact-badge">
              <div className="big">{study.impactHeadline}</div>
              <p>{study.impactDetail}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
