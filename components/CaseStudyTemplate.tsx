import Image from "next/image";
import type { ReactNode } from "react";
import type { CaseStudy, Step } from "@/lib/caseStudies/types";
import ReadingProgress from "@/components/readingProgress";
import Link from "next/link";
import { caseStudies } from "@/lib/caseStudies";

export default function CaseStudyTemplate({
  study,
  styles,
  fontClass = "",
}: {
  study: CaseStudy;
  styles: Record<string, string>; // each case study passes in its own CSS
  fontClass?: string;             // each case study passes in its own fonts
}) {
  // A section with a small label ("kicker"), an optional title, and content.
  function Section({ id, kicker, title, children }: { id: string; kicker: string; title?: string; children: ReactNode }) {
    return (
        
      <section id={id} className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.kicker}>{kicker}</div>
          {title && <h2 className={styles.h2}>{title}</h2>}
          {children}
        </div>
      </section>
    );
  }

  // A numbered list of steps (used for the user flow).
  function Steps({ steps }: { steps: Step[] }) {
    return (
      <ol className={styles.flow}>
        {steps.map((step, i) => (
          <li key={step.title} className={`${styles.step} ${step.highlight ? styles.stepKey : ""}`}>
            <span className={styles.dot}>{i + 1}</span>
            <h3 className={styles.stepTitle}>
              {step.title}
              {step.highlight && <span className={styles.flag}>key moment</span>}
            </h3>
            <p className={styles.stepDesc}>{step.description}</p>
          </li>
        ))}
      </ol>
    );
  }

    // A bulleted list; shows nothing if there are no bullets.
  function Bullets({ items }: { items?: string[] }) {
    if (!items?.length) return null;
    return (
      <ul className={styles.list}>
        {items.map((b) => <li key={b}>{b}</li>)}
      </ul>
    );
  }

  const meta = [
    { label: "Role", value: study.role },
    { label: "Timeline", value: study.timeline },
    { label: "Team", value: study.team },
    { label: "Tools", value: study.tools },
  ];

  // Sidebar links. Optional sections only appear if the case study has them.
const toc = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Solution" },
  study.research && { id: "research", label: "Research" },
  study.metrics && { id: "metrics", label: "Metrics" },
  study.flow && { id: "userFlow", label: "User flow" },
  { id: "design", label: "Design Process" },
  { id: "finalDesign", label: "Final design" },
  { id: "reflection", label: "Reflection" },
].filter(Boolean) as { id: string; label: string }[];

  // Suggest the next case study in the list (wraps around to the first).
  const i = caseStudies.findIndex((s) => s.slug === study.slug);
  const next = caseStudies.length > 1 ? caseStudies[(i + 1) % caseStudies.length] : null;

  return (
    <div className={`${styles.page} ${fontClass}`}>
      <ReadingProgress className={styles.progress} doneClassName={styles.star}/>
      <header className={styles.hero}>
        <div className={styles.wrap}>
          <div className={styles.kicker}>{study.tag}</div>
          <h1 className={styles.heroTitle}>{study.heroTitle}</h1>
          <p className={styles.heroSub}>{study.heroSub}</p>
          <dl className={styles.meta}>
            {meta.map((item) => (
              <div key={item.label}>
                <dt className={styles.metaTerm}>{item.label}</dt>
                <dd className={styles.metaValue}>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        
      </header>

    {/* for the navigation side bar */}
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
            <nav aria-label="Case study sections">
            <ul className={styles.tocList}>
                {toc.map((item) => (
                    <li key={item.id}>
                        <a href={`#${item.id}`} className={styles.tocLink}>{item.label}</a>
                    </li>
                ))}
            </ul>
            </nav>
        </aside>
       

      <main>
        
       {/* main content */} 
        <Section id="overview" kicker="Overview">
          {study.overview.map((p, i) => (
            <p key={i} className={`${styles.prose} ${i === 0 ? styles.lead : ""}`}>{p}</p>
          ))}
          <Bullets items={study.overviewBullets} />
          {study.media?.overview}
        </Section>

        <Section id="problem" kicker="The problem" title={study.problem.title}>
          <p className={styles.prose}>{study.problem.body}</p>
          <div className={styles.callout}>{study.problem.hmw}</div>
          <Bullets items={study.problem.bullets} />
          {study.media?.problem}
        </Section>

        <Section id="solution" kicker="The solution" title={study.solution.title}>
          <p className={styles.prose}>{study.solution.body}</p>
          {study.media?.solution}
        </Section>

        {study.research && (
          <Section id="research" kicker="Research" title={study.research.title}>
            <p className={styles.prose}>{study.research.body}</p>
            <div className={styles.personas}>
              {study.research.personas.map((p) => (
                <article key={p.name} className={styles.persona}>
                  <div className={styles.personaRole}>{p.role}</div>
                  <h3 className={styles.personaName}>{p.name}</h3>
                  <p className={styles.personaMeta}>{p.location}, {p.background}</p>
                  <p className={styles.quote}>{p.quote}</p>
                  <ul className={styles.traits}>
                    {p.traits.map((t) => <li key={t} className={styles.trait}>{t}</li>)}
                  </ul>
                </article>
              ))}
            </div>
            {study.media?.research}
          </Section>
        )}

        {study.metrics && (
          <Section id="metrics" kicker="Metrics of success" title="What “done” looked like">
            {study.metrics.map((m) => <div key={m} className={styles.callout}>{m}</div>)}
            {study.media?.metrics}
          </Section>
        )}

        {study.flow && (
          <Section id="userFlow" kicker="User flow" title={study.flow.title}>
            <p className={styles.prose}>{study.flow.body}</p>
            <Steps steps={study.flow.steps} />
            {study.media?.flow}
          </Section>
        )}

        <Section id="design" kicker="Design process" title={study.process.title}>
          <p className={styles.prose}>{study.process.body}</p>
          <ol className={styles.process}>
            {study.process.steps.map((s, i) => (
              <li key={s.title} className={styles.stage}>
                <div className={styles.stageNum}>{String(i + 1).padStart(2, "0")}</div>
                <h3 className={styles.stageTitle}>{s.title}</h3>
                <p className={styles.stageDesc}>{s.description}</p>
              </li>
            ))}
          </ol>
          {study.media?.process}
        </Section>

        <Section id="finalDesign" kicker="Final design" title={study.finalDesign.title}>
          <p className={styles.prose}>{study.finalDesign.body}</p>
          {study.finalDesign.images && (
            <div className={styles.shots}>
              {study.finalDesign.images.map((img) => (
                <figure key={img.src}>
                  <Image src={img.src} alt={img.alt} width={1600} height={1000} className={styles.shot} />
                  {img.caption && <figcaption className={styles.caption}>{img.caption}</figcaption>}
                </figure>
              ))}
            </div>
          )}
          {study.media?.finalDesign}
        </Section>

        <Section id="reflection" kicker="Reflection" title="What this project taught me">
          <div className={styles.twoCol}>
            <div>
              <h3 className={styles.colTitle}>Lessons learned</h3>
              <ul className={styles.list}>{study.reflection.lessons.map((l) => <li key={l}>{l}</li>)}</ul>
            </div>
            <div>
              <h3 className={styles.colTitle}>Next steps</h3>
              <ul className={styles.list}>{study.reflection.nextSteps.map((n) => <li key={n}>{n}</li>)}</ul>
            </div>
          </div>
          {study.media?.reflection}
        </Section>
      </main>

    </div> {/* closes layout  */} 

        {next && (
      <section className={styles.next}>
        <div className={styles.wrap}>
          <div className={styles.kicker}>Want to read more?</div>
          <Link href={`/work/${next.slug}`} className={styles.nextCard}>
            <span className={styles.nextTag}>{next.tag}</span>
            <h2 className={styles.h2}>{next.title}</h2>
            <p className={styles.prose}>{next.oneLiner}</p>
            <span className={styles.cta}>Read case study →</span>
          </Link>
        </div>
      </section>
    )}
    {/* closes .page  */}
     </div> 
  );
}