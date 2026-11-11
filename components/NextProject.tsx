import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/lib/caseStudies";
import s from "./NextProject.module.css";

/**
 * "Up next" card at the end of every case study, pointing at the next one in
 * homepage order (wrapping around). Colors come from CSS variables so each
 * template can theme it: --np-surface, --np-ink, --np-muted, --np-accent,
 * --np-line.
 */
export default function NextProject({
  slug,
  className = "",
  showBackLink = true,
}: {
  slug: string;
  className?: string;
  showBackLink?: boolean;
}) {
  const i = caseStudies.findIndex((c) => c.slug === slug);
  if (caseStudies.length < 2) return null;
  const next = caseStudies[(i + 1) % caseStudies.length];
  const tags = [next.tag, ...(next.extraTags ?? [])];

  return (
    <div className={`${s.root} ${className}`}>
      <p className={s.kicker}>Up next</p>
      <Link href={`/work/${next.slug}`} className={s.card}>
        {next.thumbnail && (
          <span className={s.thumb}>
            <Image
              src={next.thumbnail.src}
              alt=""
              fill
              sizes="(min-width: 900px) 420px, 92vw"
              style={{ objectFit: "cover", objectPosition: next.thumbnail.position ?? "center" }}
            />
          </span>
        )}
        <span className={s.body}>
          <span className={s.tags}>
            {tags.map((t) => (
              <span key={t} className={s.tag}>
                {t}
              </span>
            ))}
          </span>
          <span className={s.title}>{next.title}</span>
          <span className={s.oneLiner}>{next.oneLiner}</span>
          <span className={s.cta}>
            Read case study <span aria-hidden="true">→</span>
          </span>
        </span>
      </Link>
      {showBackLink && (
        <Link href="/#work" className={s.back}>
          ← Back to all work
        </Link>
      )}
    </div>
  );
}
