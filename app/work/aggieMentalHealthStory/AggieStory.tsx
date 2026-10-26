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
import { aggieMentalHealth as study } from "@/lib/caseStudies/aggieMentalHealth";
import {
  briefWords,
  headlines,
  elements,
  palette,
  exploration,
  finalWordmark,
  posters,
  applications,
} from "./storyContent";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const MOTION_KEY = "aggie-story-reduce-motion";
const DESKTOP = "(min-width: 900px)";
const MOBILE = "(max-width: 899px)";

// Text comes from the same data file as the classic Aggie page.
const meta = [
  { label: "Role", value: study.role },
  { label: "Timeline", value: study.timeline },
  { label: "Team", value: study.team },
  { label: "Tools", value: study.tools },
];
const [overviewLead, ...overviewRest] = study.overview;
const evolution = [...exploration, finalWordmark];

// Doodles floating around the cover: element, position, size, color, parallax speed.
const floaters = [
  { src: elements[0].src, top: "8%", left: "-6%", size: 260, color: palette[2].hex, speed: 1.4 },
  { src: elements[2].src, top: "4%", left: "74%", size: 230, color: palette[4].hex, speed: 0.8 },
  { src: elements[3].src, top: "58%", left: "82%", size: 280, color: palette[3].hex, speed: 1.8 },
  { src: elements[5].src, top: "66%", left: "-4%", size: 240, color: palette[5].hex, speed: 1.1 },
];

const tint = (hex: string) => ({ "--tint": hex }) as CSSProperties;
const mask = (src: string) => ({ "--mask": `url("${src}")` }) as CSSProperties;

export default function AggieStory() {
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

      // Headings: lines rise and un-rotate out of a mask.
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

      // Cover doodles pop in, then drift at different speeds as you scroll away.
      const floats = $('[data-anim="float"]');
      gsap.from(floats, {
        scale: 0,
        rotate: -40,
        opacity: 0,
        stagger: 0.12,
        duration: 1.1,
        ease: "back.out(1.6)",
        delay: 0.5,
      });
      floats.forEach((el) => {
        const speed = Number(el.dataset.speed ?? 1);
        gsap.to(el, {
          yPercent: -60 * speed,
          rotate: 25 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: one('[data-anim="hero"]'),
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Headline shortlist: each phrase slides in as it reaches the middle.
      $('[data-anim="headline"]').forEach((el) => {
        gsap.from(el, {
          x: -60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // Palette: swatches grow up from the baseline one after another.
      gsap.from($('[data-anim="swatch"]'), {
        scaleY: 0,
        transformOrigin: "50% 100%",
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: one('[data-anim="palette"]'),
          start: "top 85%",
          end: "bottom 60%",
          scrub: 0.6,
        },
      });

      const mm = gsap.matchMedia();

      // Desktop: pinned, scrubbed chapters.
      mm.add(DESKTOP, () => {
        // Problem: the old name is struck out, the new one lands, then the brief.
        const problem = gsap.timeline({
          scrollTrigger: {
            trigger: one('[data-pin="problem"]'),
            start: () => `top ${navOffset()}px`,
            end: "+=160%",
            pin: true,
            scrub: 0.6,
          },
        });
        problem
          .from(one('[data-anim="strike"]'), { scaleX: 0, duration: 1, ease: "none" })
          .to(one('[data-anim="oldname"]'), { opacity: 0.35, duration: 0.5 }, "<0.5")
          .from(one('[data-anim="newname"]'), { yPercent: 60, opacity: 0, duration: 1 })
          .from($('[data-anim="brief"]'), {
            scale: 0.6,
            opacity: 0,
            stagger: 0.3,
            duration: 0.6,
            ease: "back.out(2)",
          })
          .from(one('[data-anim="hmw"]'), { opacity: 0, y: 30, duration: 0.6 });

        // Element library: doodles land on the board, then cycle through the palette.
        const tiles = $('[data-anim="tile"]');
        const lib = gsap.timeline({
          scrollTrigger: {
            trigger: one('[data-pin="elements"]'),
            start: () => `top ${navOffset()}px`,
            end: "+=220%",
            pin: true,
            scrub: 0.6,
          },
        });
        lib.from(tiles, {
          scale: 0.3,
          rotate: (i) => (i % 2 ? 30 : -30),
          opacity: 0,
          stagger: 0.25,
          duration: 1,
          ease: "back.out(1.4)",
        });
        palette.forEach((swatch, k) => {
          lib.to(tiles, {
            "--tint": swatch.hex,
            stagger: { each: 0.08, from: k % 2 ? "end" : "start" },
            duration: 0.6,
          });
        });

        // Trial and error: each direction slides over the last.
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
            .from(shot, {
              yPercent: 110,
              rotate: i % 2 ? 4 : -4,
              ease: "power2.out",
              duration: 1,
            })
            .to(shots[i - 1], { scale: 0.9, opacity: 0.35, duration: 1 }, "<");
        });

        // Posters: a neat stack fans out across the screen.
        const cards = $('[data-anim="poster"]');
        const mid = (cards.length - 1) / 2;
        gsap
          .timeline({
            scrollTrigger: {
              trigger: one('[data-pin="posters"]'),
              start: () => `top ${navOffset()}px`,
              end: "+=140%",
              pin: true,
              scrub: 0.6,
            },
          })
          .fromTo(
            cards,
            { xPercent: 0, yPercent: 8, rotate: (i) => (i - mid) * 2.5 },
            {
              xPercent: (i) => (i - mid) * 108,
              yPercent: (i) => Math.abs(i - mid) * 6,
              rotate: (i) => (i - mid) * 5,
              ease: "power2.inOut",
            }
          );

        // Applications: the wider system pans sideways while the page is pinned.
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
      });

      // Small screens: same story, no pinning, just reveals.
      mm.add(MOBILE, () => {
        $(
          '[data-anim="brief"], [data-anim="hmw"], [data-anim="tile"], [data-anim="evo"], [data-anim="poster"]'
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
      <header className={styles.hero} data-anim="hero">
        <div className={styles.floaters} aria-hidden="true">
          {floaters.map((f) => (
            <span
              key={f.src}
              className={styles.floater}
              data-anim="float"
              data-speed={f.speed}
              style={{
                ...mask(f.src),
                ...tint(f.color),
                top: f.top,
                left: f.left,
                width: f.size,
              }}
            />
          ))}
        </div>
        <div className={styles.wrap}>
          <p className={styles.kicker} data-fade>
            UC Davis Student Affairs · Brand identity case study
          </p>
          <h1
            className={styles.wordmark}
            data-split="hero"
            aria-label="aggie mental health"
          >
            aggie
            <br />
            <b>mental</b>
            <br />
            health
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
            {study.overviewBullets && (
              <ul className={styles.rules}>
                {study.overviewBullets.map((rule) => (
                  <li key={rule} data-fade>
                    {rule}
                  </li>
                ))}
              </ul>
            )}
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
            </div>

            <div className={styles.problemRight}>
              <p className={styles.nameLabel}>Before</p>
              <p className={styles.oldName} data-anim="oldname">
                Each Aggie Matters
                <span className={styles.strike} data-anim="strike" />
              </p>
              <p className={styles.nameLabel}>After</p>
              <p className={styles.newName} data-anim="newname">
                aggie <b>mental</b> health
              </p>
              <p className={styles.nameLabel}>The brief: it should feel…</p>
              <ul className={styles.briefList}>
                {briefWords.map((word, i) => {
                  const swatch = palette[(i + 2) % palette.length];
                  return (
                  <li
                    key={word}
                    data-anim="brief"
                    style={{ background: swatch.hex, color: swatch.ink }}
                  >
                    {word}
                  </li>
                  );
                })}
              </ul>
              <blockquote className={styles.hmw} data-anim="hmw">
                {study.problem.hmw}
              </blockquote>
            </div>
          </div>
        </section>

        {/* 4. Words first */}
        <section className={styles.section}>
          <div className={styles.wrap}>
            <p className={styles.kicker}>Design process</p>
            <h2 className={styles.h2} data-split>
              {study.process.title}
            </h2>
            <p className={styles.prose} data-fade>
              {study.process.body} These were the headlines on the shortlist:
            </p>
            <ol className={styles.headlines}>
              {headlines.map((line, i) => (
                <li
                  key={line}
                  data-anim="headline"
                  style={tint(palette[i % palette.length].hex)}
                >
                  {line}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 5. Element library (pinned) */}
        <section className={`${styles.section} ${styles.pinned}`} data-pin="elements">
          <div className={`${styles.wrap} ${styles.elementsLayout}`}>
            <div>
              <p className={styles.kicker}>Visual language</p>
              <h2 className={styles.h2} data-split>
                Drawn by hand, built to flex
              </h2>
              <p className={styles.prose}>
                I drew a library of doodles in Adobe Fresco with a monoline
                vector brush, then brought them into Illustrator. Each one is
                grouped so it can take any color in the palette, and every
                poster, screen and sticker pulls from the same set.
              </p>
            </div>
            <ul className={styles.tiles}>
              {elements.map((el, i) => (
                <li
                  key={el.name}
                  className={styles.tile}
                  data-anim="tile"
                  style={tint(palette[i % palette.length].hex)}
                >
                  <span className={styles.tileArt} style={mask(el.src)} />
                  <span className={styles.tileName}>{el.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 6. Palette */}
        <section className={styles.section}>
          <div className={styles.wrap}>
            <p className={styles.kicker}>Color</p>
            <h2 className={styles.h2} data-split>
              Green leads, the rest keep it bright
            </h2>
            <p className={styles.prose} data-fade>
              The brief asked for green, and everything had to come from the
              UC Davis palette. Sage carries the campaign; Sunflower, Gunrock,
              Poppy and Rose are reserved for the doodles, so the headline
              always reads first.
            </p>
            <div className={styles.palette} data-anim="palette">
              {palette.map((swatch) => (
                <div
                  key={swatch.name}
                  className={styles.swatch}
                  data-anim="swatch"
                  style={{ background: swatch.hex, color: swatch.ink }}
                >
                  <span className={styles.swatchName}>{swatch.name}</span>
                  <span className={styles.swatchHex}>{swatch.hex}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Trial and error (pinned stack) */}
        <section className={styles.section}>
          <div className={styles.wrap}>
            <p className={styles.kicker}>Iteration</p>
            <h2 className={`${styles.h2} ${styles.huge}`} data-split>
              {study.solution.title}.
            </h2>
            <p className={styles.prose} data-fade>
              {study.solution.body}
            </p>
          </div>
        </section>

        <section className={styles.evoSection} data-pin="evo">
          <div className={styles.evoStack}>
            {evolution.map((shot, i) => (
              <figure key={shot.src} className={styles.evoCard} data-anim="evo">
                <div className={styles.evoImg}>
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    loading="eager"
                    sizes="(min-width: 1200px) 1100px, 92vw"
                    style={{ objectFit: "contain" }}
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

        {/* 8. Final posters (pinned fan) */}
        <section className={styles.section}>
          <div className={styles.wrap}>
            <p className={styles.kicker}>Final design</p>
            <h2 className={styles.h2} data-split>
              One system, many messages
            </h2>
            <p className={styles.prose} data-fade>
              Every piece follows the same recipe: a photo from the UC Davis
              library with room above the student, a short lowercase headline,
              a doodle or two, and a sage band with the call to action and QR
              code.
            </p>
          </div>
        </section>

        <section className={styles.posterSection} data-pin="posters">
          <div className={styles.posterStage}>
            {posters.map((p) => (
              <figure key={p.src} className={styles.poster} data-anim="poster">
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={p.width}
                  height={p.height}
                  sizes="(min-width: 900px) 24vw, 46vw"
                />
              </figure>
            ))}
          </div>
        </section>

        {/* 9. Applications (horizontal pan) */}
        <section className={styles.section}>
          <div className={styles.wrap}>
            <p className={styles.kicker}>Rollout</p>
            <h2 className={styles.h2} data-split>
              {study.finalDesign.title}
            </h2>
            <p className={styles.prose} data-fade>
              {study.finalDesign.body}
            </p>
          </div>
        </section>

        <section className={styles.panSection} data-pin="pan">
          <div className={styles.panViewport}>
            <ul className={styles.panTrack} data-anim="pan-track">
              {applications.map((shot) => (
                <li key={shot.src} className={styles.panItem}>
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    sizes="1200px"
                    loading="eager"
                    className={styles.panImg}
                  />
                  <span className={styles.caption}>
                    <b>{shot.label}</b> · {shot.caption}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 10. Reflection */}
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
            be kind to yourself.
          </h2>
          <Link href="/#work" className={styles.footerLink}>
            ← Back to all work
          </Link>
        </div>
      </section>
    </div>
  );
}
