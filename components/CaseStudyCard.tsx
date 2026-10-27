"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import type { CaseStudy } from "@/lib/caseStudies";
import type { BloomImage } from "@/lib/caseStudies/types";
import BloomIcon from "@/components/BloomIcons";
import { useReveal } from "@/hooks/useReveal";

// Slight tilt per card, like index cards scattered on a desk.
const TILTS = [-1.1, 0.8, -0.6];

// Crops one doodle out of an element sheet with a CSS mask, so it can be
// filled with the card's accent color.
function doodleMask({ src, x, y, size, w, h }: BloomImage): CSSProperties {
  const half = size / 2;
  const mask = {
    image: `url(${src})`,
    size: `${(w / size) * 100}% auto`,
    position: `${((x - half) / (w - size)) * 100}% ${((y - half) / (h - size)) * 100}%`,
  };
  return {
    maskImage: mask.image, maskSize: mask.size, maskPosition: mask.position,
    WebkitMaskImage: mask.image, WebkitMaskSize: mask.size, WebkitMaskPosition: mask.position,
  };
}

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
    <Link href={`/work/${study.slug}`} className="card-link" data-accent={study.accent}>
      {/* Icons tucked behind the card that fan out on hover, like a bouquet. */}
      <span className="card-bouquet" aria-hidden="true">
        {(study.bouquet ?? []).map((icon, i) => (
          typeof icon === "string" ? (
            <span key={i} className="bloom" style={{ "--i": i } as CSSProperties}>
              <BloomIcon name={icon} />
            </span>
          ) : (
            <span key={i} className="bloom bloom-doodle" style={{ "--i": i, ...doodleMask(icon) } as CSSProperties} />
          )
        ))}
      </span>
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