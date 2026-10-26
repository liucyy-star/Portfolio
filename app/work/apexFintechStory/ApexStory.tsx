"use client";

import { useRef } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { navOffset, useReducedMotion, useSmoothScroll } from "@/hooks/useStoryMotion";
import styles from "./story.module.css";
import { apexFintech as study } from "@/lib/caseStudies/apexFintech";
import {
  credentials,
  stats,
  heroShot,
  idealMilestones,
  competitorColumns,
  competitors,
  flowMap,
  flowIterations,
  evolution,
} from "./storyContent";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const MOTION_KEY = "apex-story-reduce-motion";
const DESKTOP = "(min-width: 900px)";
const MOBILE = "(max-width: 899px)";

// Text comes from the same data file as the classic Apex page.
const meta = [
  { label: "Role", value: study.role },
  { label: "Timeline", value: study.timeline },
  { label: "Team", value: study.team },
];
const [overviewLead, ...overviewRest] = study.overview;
const personas = study.research?.personas ?? [];
const flowSteps = study.flow?.steps ?? [];

function cellTone(value: string) {
  if (value.startsWith("Yes")) return styles.yes;
  if (value === "Partial") return styles.partial;
  return styles.no;
}

export default function ApexStory() {
  const root = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useReducedMotion(MOTION_KEY);
  const motion = reduced === false;

  useSmoothScroll(motion);

  useGSAP(
    () => {
      if (!motion) return;

      const $ = (selector: string) =>
        gsap.utils.toArray<HTMLElement>(selector, root.current);
      const one = (selector: string) => $(selector)[0];

      // Reading progress bar across the top.
      gsap.fromTo(
        one('[data-anim="progress"]'),
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: true },
        }
      );

      // Headings: lines rise and un-rotate out of a mask (dontboardme's signature reveal).
      $("[data-split]").forEach((el) => {
        const isHero = el.dataset.split === "hero";
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 115,
              rotate: 7,
              transformOrigin: "0% 0%",
              stagger: 0.12,
              duration: 0.9,
              ease: "power4.out",
              delay: isHero ? 0.15 : 0,
              scrollTrigger: isHero
                ? undefined
                : { trigger: el, start: "top 85%" },
            }),
        });
      });

      // Statement copy: words light up in step with the scrollbar.
      $("[data-words]").forEach((el) => {
        const split = SplitText.create(el, { type: "words" });
        gsap.fromTo(
          split.words,
          { opacity: 0.16 },
          {
            opacity: 1,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
              end: "bottom 45%",
              scrub: true,
            },
          }
        );
      });

      // Generic fade-up as blocks enter the viewport.
      $("[data-fade]").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });

      // Hero screenshot tilts back flat as you scroll into it.
      const heroShotEl = one('[data-anim="hero-shot"]');
      gsap.fromTo(
        heroShotEl,
        { rotateX: 24, scale: 0.86, yPercent: 4 },
        {
          rotateX: 0,
          scale: 1,
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: heroShotEl,
            start: "top 95%",
            end: "center 55%",
            scrub: true,
          },
        }
      );

      // User-flow steps slide in one after another.
      gsap.from($('[data-anim="step"]'), {
        x: -30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: one('[data-anim="steps"]'), start: "top 80%" },
      });

      // Final portal assembles itself, then the stats count up.
      const counters = $("[data-count]");
      const portal = gsap.timeline({
        scrollTrigger: { trigger: one('[data-anim="portal"]'), start: "top 75%" },
      });
      portal
        .from(one('[data-anim="portal"]'), {
          y: 80,
          scale: 0.94,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        })
        .from(
          $('[data-anim="pcard"]'),
          { y: 40, opacity: 0, stagger: 0.12, duration: 0.7, ease: "power2.out" },
          "-=0.5"
        );
      counters.forEach((el, i) => {
        const raw = el.dataset.count ?? "";
        const match = raw.match(/^(\D*)([\d.]+)(\D*)$/);
        if (!match) return;
        const [, prefix, num, suffix] = match;
        const decimals = (num.split(".")[1] ?? "").length;
        const value = { v: 0 };
        el.textContent = prefix + (0).toFixed(decimals) + suffix;
        portal.to(
          value,
          {
            v: parseFloat(num),
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = prefix + value.v.toFixed(decimals) + suffix;
            },
          },
          i === 0 ? "-=0.3" : "<"
        );
      });

      const mm = gsap.matchMedia();

      // Desktop: pinned, scrubbed chapters.
      mm.add(DESKTOP, () => {
        // Problem: the "ideal" timeline fills, competitors line up, then the question lands.
        const problem = gsap.timeline({
          scrollTrigger: {
            trigger: one('[data-pin="problem"]'),
            start: () => `top ${navOffset()}px`,
            end: "+=180%",
            pin: true,
            scrub: 0.6,
          },
        });
        problem.from(one('[data-anim="track-fill"]'), {
          scaleX: 0,
          ease: "none",
          duration: 3,
        });
        $('[data-anim="milestone"]').forEach((m, i) => {
          problem.from(m, { opacity: 0.25, duration: 0.2 }, 0.3 + 0.75 * i);
        });
        problem
          .from($('[data-anim="comp-row"]'), {
            opacity: 0,
            y: 24,
            stagger: 0.4,
            duration: 0.5,
          })
          .from(one('[data-anim="hmw"]'), { opacity: 0, y: 30, duration: 0.6 });

        // Personas: cards deal onto a stack.
        const cards = $('[data-anim="persona"]');
        const personaTl = gsap.timeline({
          scrollTrigger: {
            trigger: one('[data-pin="personas"]'),
            start: () => `top ${navOffset()}px`,
            end: `+=${cards.length * 70}%`,
            pin: true,
            scrub: 0.6,
          },
        });
        cards.forEach((card, i) => {
          if (i === 0) return;
          personaTl
            .from(card, {
              yPercent: 120,
              rotate: i % 2 ? 7 : -7,
              ease: "power2.out",
              duration: 1,
            })
            .to(
              cards[i - 1],
              { scale: 0.92, opacity: 0.45, rotate: i % 2 ? -3 : 3, duration: 1 },
              "<"
            );
        });

        // User flow: the wide flowchart pans sideways while the page is pinned.
        const track = one('[data-anim="pan-track"]');
        const panDistance = () =>
          Math.max(0, track.scrollWidth - window.innerWidth);
        gsap.to(track, {
          x: () => -panDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: one('[data-pin="pan"]'),
            start: () => `top ${navOffset()}px`,
            end: () => `+=${panDistance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        // Design evolution: each iteration slides over the last.
        const shots = $('[data-anim="evo"]');
        const evoTl = gsap.timeline({
          scrollTrigger: {
            trigger: one('[data-pin="evo"]'),
            start: () => `top ${navOffset()}px`,
            end: `+=${shots.length * 80}%`,
            pin: true,
            scrub: 0.6,
          },
        });
        shots.forEach((shot, i) => {
          if (i === 0) return;
          evoTl
            .from(shot, { yPercent: 110, ease: "power2.out", duration: 1 })
            .to(shots[i - 1], { scale: 0.9, opacity: 0.35, duration: 1 }, "<");
        });
      });

      // Small screens: same story, no pinning, just reveals.
      mm.add(MOBILE, () => {
        $(
          '[data-anim="comp-row"], [data-anim="hmw"], [data-anim="persona"], [data-anim="evo"]'
        ).forEach((el) => {
          gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });
      });

      return () => {
        counters.forEach((el) => {
          el.textContent = el.dataset.count ?? "";
        });
      };
    },
    { scope: root, dependencies: [motion], revertOnUpdate: true }
  );

  return (
    <div
      ref={root}
      className={styles.root}
      data-motion={motion ? "on" : "off"}
    >
      <div className={styles.progress} data-anim="progress" aria-hidden="true" />

      <button
        type="button"
        className={styles.motionToggle}
        aria-pressed={reduced === true}
        onClick={() => setReduced(!reduced)}
      >
        <span className={styles.switch} aria-hidden="true" />
        Reduce motion
      </button>

      {/* 1. Cover */}
      <header className={styles.hero}>
        <div className={styles.wrap}>
          <p className={styles.kicker} data-fade>
            Apex Fintech Solutions · UX case study
          </p>
          <h1 className={styles.heroTitle} data-split="hero">
            {study.heroTitle}
          </h1>
          <p className={styles.heroSub} data-fade>
            {study.heroSub}
          </p>
          <dl className={styles.meta} data-fade>
            {meta.map((item) => (
              <div key={item.label}>
                <dt className={styles.metaTerm}>{item.label}</dt>
                <dd className={styles.metaValue}>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className={styles.heroShotWrap}>
          <div className={styles.heroShot} data-anim="hero-shot">
            <Image
              src={heroShot.src}
              alt={heroShot.alt}
              width={heroShot.width}
              height={heroShot.height}
              sizes="(min-width: 1200px) 1100px, 92vw"
              priority
            />
          </div>
        </div>
      </header>

      <main>
        {/* 2. Overview */}
        <section className={styles.section}>
          <div className={styles.wrap}>
            <p className={styles.kicker}>Overview</p>
            <p className={styles.statement} data-words>
              {overviewLead}
            </p>
            {overviewRest.map((para) => (
              <p key={para} className={styles.prose} data-fade>
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* 3. The problem (pinned) */}
        <section className={`${styles.section} ${styles.pinned}`} data-pin="problem">
          <div className={`${styles.wrap} ${styles.problemGrid}`}>
            <div>
              <p className={styles.kicker}>The problem</p>
              <h2 className={styles.h2} data-split>
                {study.problem.title}
              </h2>
              <p className={styles.prose}>{study.problem.body}</p>
              <blockquote className={styles.hmw} data-anim="hmw">
                {study.problem.hmw}
              </blockquote>
            </div>

            <div className={styles.problemRight}>
              <p className={styles.ideal}>
                <strong>Ideal:</strong> a non-technical evaluator opens an
                account on the spot.
              </p>
              <div className={styles.timeline}>
                <div className={styles.track}>
                  <div className={styles.trackFill} data-anim="track-fill" />
                </div>
                <ol className={styles.milestones}>
                  {idealMilestones.map((m) => (
                    <li key={m.time} data-anim="milestone">
                      <span className={styles.mDot} />
                      <span className={styles.mTime}>{m.time}</span>
                      <span className={styles.mLabel}>{m.label}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <table className={styles.compTable}>
                <thead>
                  <tr>
                    <th scope="col">Firm</th>
                    {competitorColumns.map((c) => (
                      <th key={c} scope="col">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {competitors.map((row) => (
                    <tr
                      key={row.firm}
                      data-anim="comp-row"
                      className={row.isApex ? styles.apexRow : undefined}
                    >
                      <th scope="row">{row.firm}</th>
                      {row.cells.map((cell, i) => (
                        <td key={i} className={cellTone(cell)}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 4. The solution */}
        <section className={styles.section}>
          <div className={styles.wrap}>
            <p className={styles.kicker}>The solution</p>
            <h2 className={`${styles.h2} ${styles.huge}`} data-split>
              {study.solution.title}.
            </h2>
            <p className={styles.prose} data-fade>
              {study.solution.body}
            </p>
          </div>
        </section>

        {/* 5. Personas (pinned stack) */}
        <section className={`${styles.section} ${styles.pinned}`} data-pin="personas">
          <div className={`${styles.wrap} ${styles.personaLayout}`}>
            <div>
              <p className={styles.kicker}>Research</p>
              <h2 className={styles.h2} data-split>
                {study.research?.title}
              </h2>
              <p className={styles.prose}>{study.research?.body}</p>
            </div>
            <div className={styles.personaStack}>
              {personas.map((p, i) => (
                <article
                  key={p.name}
                  className={styles.persona}
                  data-anim="persona"
                  style={{ "--i": i } as CSSProperties}
                >
                  <div className={styles.personaTop}>
                    <span className={styles.personaRole}>{p.role}</span>
                    <span className={styles.personaIndex}>
                      {String(i + 1).padStart(2, "0")} / 0{personas.length}
                    </span>
                  </div>
                  <h3 className={styles.personaName}>{p.name}</h3>
                  <p className={styles.personaMeta}>
                    {p.location} · {p.background}
                  </p>
                  <p className={styles.quote}>{p.quote}</p>
                  <ul className={styles.traits}>
                    {p.traits.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 6. User flow (horizontal pan) */}
        <section className={styles.section}>
          <div className={styles.wrap}>
            <p className={styles.kicker}>User flow</p>
            <h2 className={styles.h2} data-split>
              {study.flow?.title}
            </h2>
            <p className={styles.prose} data-fade>
              {study.flow?.body}
            </p>
          </div>
        </section>

        <section className={styles.panSection} data-pin="pan">
          <div className={styles.panViewport}>
            <div className={styles.panTrack} data-anim="pan-track">
              <Image
                src={flowMap.src}
                alt={flowMap.alt}
                width={flowMap.width}
                height={flowMap.height}
                sizes="3000px"
                loading="eager"
                className={styles.panImg}
              />
            </div>
          </div>
          <p className={`${styles.wrap} ${styles.caption}`}>{flowMap.caption}</p>
        </section>

        <section className={styles.section}>
          <div className={styles.wrap}>
            <ol className={styles.flow} data-anim="steps">
              {flowSteps.map((step, i) => (
                <li
                  key={step.title}
                  data-anim="step"
                  className={`${styles.step} ${step.highlight ? styles.stepKey : ""}`}
                >
                  <span className={styles.dot}>{i + 1}</span>
                  <div>
                    <h3 className={styles.stepTitle}>
                      {step.title}
                      {step.highlight && (
                        <span className={styles.flag}>activation moment</span>
                      )}
                    </h3>
                    <p className={styles.stepDesc}>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className={styles.flowIterations}>
              {flowIterations.map((shot) => (
                <figure key={shot.src} className={styles.figure} data-fade>
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    sizes="(min-width: 900px) 540px, 92vw"
                  />
                  <figcaption className={styles.caption}>
                    {shot.label}: {shot.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Design evolution (pinned stack) */}
        <section className={styles.section}>
          <div className={styles.wrap}>
            <p className={styles.kicker}>Design process</p>
            <h2 className={styles.h2} data-split>
              {study.process.title}
            </h2>
            <p className={styles.prose} data-fade>
              {study.process.body}
            </p>
            <ol className={styles.stages}>
              {study.process.steps.map((stage, i) => (
                <li key={stage.title} data-fade>
                  <span className={styles.stageNum}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className={styles.stageTitle}>{stage.title}</h3>
                  <p className={styles.stageDesc}>{stage.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.evoSection} data-pin="evo">
          <div className={styles.evoStack}>
            {evolution.map((shot, i) => (
              <figure key={shot.src + i} className={styles.evoCard} data-anim="evo">
                <div className={styles.evoImg}>
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    loading="eager"
                    sizes="(min-width: 1200px) 1100px, 92vw"
                    style={{
                      objectFit: shot.cropTop ? "cover" : "contain",
                      objectPosition: "top",
                    }}
                  />
                </div>
                <figcaption className={styles.evoCaption}>
                  <span className={styles.evoIndex}>
                    {String(i + 1).padStart(2, "0")} / 0{evolution.length}
                  </span>
                  <span className={styles.evoLabel}>{shot.label}</span>
                  <span className={styles.evoText}>{shot.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* 8. Final portal */}
        <section className={styles.section}>
          <div className={styles.wrap}>
            <p className={styles.kicker}>Final design</p>
            <h2 className={`${styles.h2} ${styles.huge}`} data-split>
              {study.finalDesign.title}.
            </h2>
            <p className={styles.prose} data-fade>
              {study.finalDesign.body}
            </p>

            <div className={styles.portal} data-anim="portal">
              <div className={styles.portalBar}>
                <h3 className={styles.portalTitle}>Hello, Company Inc.</h3>
                <span className={styles.portalHost}>sandbox.apexfintech.com</span>
              </div>
              <div className={styles.portalGrid}>
                <div className={styles.pcard} data-anim="pcard">
                  <div className={styles.pLabel}>Credentials</div>
                  {credentials.map((c) => (
                    <div key={c.label} className={styles.credRow}>
                      <span>{c.label}</span>
                      <span className={styles.credValue}>{c.value}</span>
                    </div>
                  ))}
                </div>
                <div className={`${styles.pcard} ${styles.qsCard}`} data-anim="pcard">
                  <div className={styles.pLabel}>Quick start</div>
                  <p className={styles.qsText}>
                    Make your first API call in under five minutes.
                  </p>
                  <span className={styles.cta}>Start now →</span>
                </div>
                <div className={`${styles.pcard} ${styles.statsCard}`} data-anim="pcard">
                  {stats.map((s) => (
                    <div key={s.label}>
                      <span className={styles.statValue} data-count={s.value}>
                        {s.value}
                      </span>
                      <span className={styles.statLabel}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className={styles.caption}>
              Representative view of the final Portal design.
            </p>
          </div>
        </section>

        {/* 9. Reflection */}
        <section className={styles.section}>
          <div className={styles.wrap}>
            <p className={styles.kicker}>Reflection</p>
            <h2 className={styles.h2} data-split>
              What this project taught me
            </h2>
            <div className={styles.twoCol}>
              <div>
                <h3 className={styles.colTitle}>Lessons learned</h3>
                <ul className={styles.list}>
                  {study.reflection.lessons.map((item) => (
                    <li key={item} data-fade>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className={styles.colTitle}>Next steps</h3>
                <ul className={styles.list}>
                  {study.reflection.nextSteps.map((item) => (
                    <li key={item} data-fade>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <section className={styles.closing}>
        <div className={styles.wrap}>
          <h2 className={`${styles.h2} ${styles.huge}`} data-split>
            Thanks for scrolling.
          </h2>
          <Link href="/#work" className={styles.footerLink}>
            ← Back to all work
          </Link>
        </div>
      </section>
    </div>
  );
}
