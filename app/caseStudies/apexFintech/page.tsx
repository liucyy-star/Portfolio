import type { Metadata } from "next";
import type { ReactNode } from "react";
import styles from "../../globals.css";
import { spaceGrotesk, plexSans, plexMono } from "./fonts";
import {
  meta,
  personas,
  flowSteps,
  stages,
  credentials,
  stats,
  lessons,
  nextSteps,
} from "./content";

export const metadata: Metadata = {
  title: "Apex Fintech Solutions: Sandbox Case Study",
  description:
    "How I designed the first self-serve sandbox environment for Apex Fintech Solutions, from user research through final UI.",
};

type SectionProps = {
  kicker: string;
  title?: string;
  children: ReactNode;
};

function Section({ kicker, title, children }: SectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.kicker}>{kicker}</div>
        {title && <h2 className={styles.h2}>{title}</h2>}
        {children}
      </div>
    </section>
  );
}

export default function ApexFintechCaseStudy() {
  const fontVars = `${spaceGrotesk.variable} ${plexSans.variable} ${plexMono.variable}`;

  return (
    <div className={`${styles.page} ${fontVars}`}>
      <header className={styles.hero}>
        <div className={styles.wrap}>
          <div className={styles.mark} aria-hidden="true">
            X
          </div>
          <h1 className={styles.heroTitle}>
            Designing the first sandbox environment for Apex Fintech
          </h1>
          <p className={styles.heroSub}>
            A self-serve trial environment that let prospective clients evaluate
            Apex’s investment APIs before ever signing a contract, built from
            research through final UI in ten weeks.
          </p>
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

      <main>
        <Section kicker="Overview">
          <p className={`${styles.prose} ${styles.lead}`}>
            Apex is a B2B fintech service that powers a “frictionless investing
            experience” through its APIs. Companies integrate Apex’s tools to
            run investment features inside their own products, but there was no
            way for a prospective customer to actually try it first.
          </p>
          <p className={styles.prose}>
            I was brought on as the sole design intern to close that gap: a
            fully functional sandbox environment, designed around three
            distinct evaluator personas, and shipped as a working MVP within a
            ten-week timeline. This was a completely new product category for
            Apex, with no internal precedent, pattern library, or prior user
            data to build from.
          </p>
        </Section>

        <Section
          kicker="The problem"
          title="Apex had a conversion gap, not an awareness problem"
        >
          <p className={styles.prose}>
            Every trial required a sales conversation, which slowed the funnel
            and filtered out curious, self-directed evaluators before they ever
            saw the product.
          </p>
          <div className={styles.callout}>
            How might we migrate prospective customers into paying clients, and
            get them excited enough to test our APIs themselves?
          </div>
          <p className={styles.prose}>
            That question split into two design problems: how to make Apex’s
            capabilities feel tangible before a sale, and how to let people test
            real APIs without exposing production systems.
          </p>
        </Section>

        <Section kicker="The solution" title="The Sandbox">
          <p className={styles.prose}>
            An exclusive, secure environment where prospective clients could
            explore Apex’s tools on their own terms, for any curious visitor who
            needed a low-risk way to evaluate whether Apex fit their company.
            Since nothing like this existed at Apex yet, defining the shape of
            the product was as much a part of the work as designing its
            screens.
          </p>
        </Section>

        <Section
          kicker="Research"
          title="Three evaluators, three very different needs"
        >
          <p className={styles.prose}>
            Through stakeholder interviews and competitive research, I built
            three personas representing the realistic range of people who’d
            evaluate Apex. They pulled the design in genuinely different
            directions. Designing for “the engineer” by default would have lost
            two-thirds of the audience.
          </p>
          <div className={styles.personas}>
            {personas.map((p) => (
              <article key={p.name} className={styles.persona}>
                <div className={styles.personaRole}>{p.role}</div>
                <h3 className={styles.personaName}>{p.name}</h3>
                <p className={styles.personaMeta}>
                  {p.location}, {p.background}
                </p>
                <p className={styles.quote}>{p.quote}</p>
                <ul className={styles.traits}>
                  {p.traits.map((t) => (
                    <li key={t} className={styles.trait}>
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section
          kicker="User flow"
          title="Mapping the path from marketing site to a live API call"
        >
          <p className={styles.prose}>
            I mapped the end-to-end journey before touching any UI, iterating as
            requirements like identity verification surfaced from engineering.
            One step stood out as the moment the whole flow depended on.
          </p>
          <ol className={styles.flow}>
            {flowSteps.map((step, i) => (
              <li
                key={step.title}
                className={`${styles.step} ${step.key ? styles.stepKey : ""}`}
              >
                <span className={styles.dot}>{i + 1}</span>
                <h3 className={styles.stepTitle}>
                  {step.title}
                  {step.key && (
                    <span className={styles.flag}>activation moment</span>
                  )}
                </h3>
                <p className={styles.stepDesc}>{step.description}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section
          kicker="Design process"
          title="From sketches to a system that didn’t exist yet"
        >
          <p className={styles.prose}>
            Because there was no design system for this product, building one
            was part of the deliverable: a dark, technical visual language that
            signaled “developer-grade tool” while staying legible to
            non-technical evaluators like Barbara.
          </p>
          <ol className={styles.process}>
            {stages.map((stage, i) => (
              <li key={stage.title} className={styles.stage}>
                <div className={styles.stageNum}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className={styles.stageTitle}>{stage.title}</h3>
                <p className={styles.stageDesc}>{stage.description}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section kicker="Final design" title="The Portal">
          <p className={styles.prose}>
            The first screen a client sees after account setup and 2FA. It
            answers three questions immediately, for any persona: what do I have
            access to, how do I start, and what’s happening with my account?
          </p>

          <div className={styles.portal}>
            <div className={styles.portalBar}>
              <h3 className={styles.portalTitle}>Hello, Company Inc.</h3>
              <span className={styles.portalHost}>sandbox.apexfintech.com</span>
            </div>

            <div className={styles.portalGrid}>
              <div className={styles.pcard}>
                <div className={styles.pLabel}>Credentials</div>
                {credentials.map((c) => (
                  <div key={c.label} className={styles.credRow}>
                    <span>{c.label}</span>
                    <span className={styles.credValue}>{c.value}</span>
                  </div>
                ))}
              </div>

              <div className={`${styles.pcard} ${styles.qsCard}`}>
                <div className={styles.pLabel}>Quick start</div>
                <p className={styles.qsText}>
                  Make your first API call in under five minutes.
                </p>
                <span className={styles.cta}>Start now</span>
              </div>

              <div className={`${styles.pcard} ${styles.statsCard}`}>
                {stats.map((s) => (
                  <div key={s.label}>
                    <span className={styles.statValue}>{s.value}</span>
                    <span className={styles.statLabel}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className={styles.caption}>
            Representative view of the final Portal design.
          </p>
        </Section>

        <Section kicker="Reflection" title="What this project taught me">
          <div className={styles.twoCol}>
            <div>
              <h3 className={styles.colTitle}>Lessons learned</h3>
              <ul className={styles.list}>
                {lessons.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={styles.colTitle}>Next steps</h3>
              <ul className={styles.list}>
                {nextSteps.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      </main>

      <footer className={styles.footer}>
        Apex Fintech Solutions, Sandbox Environment Case Study
      </footer>
    </div>
  );
}