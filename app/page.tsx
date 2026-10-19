import CursorBlob from "@/components/CursorBlob";
import RotatingWord from "@/components/RotatingWord";
import CaseStudyCard from "@/components/CaseStudyCard";
import IntroLoader from "@/components/IntroLoader";
import Reveal from "@/components/Reveal";
import { caseStudies } from "@/lib/case-studies";
import { first_name, last_name, email } from "./globals/constants";
import { RESUME_URL } from "@/app/globals/constants"; // adjust the path to match your setup




export default function Home() {
  return (
    <>
      <IntroLoader />
      <CursorBlob />

      <nav>
        <div className="logo">
          {first_name} {last_name}<span>.</span>
        </div>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="/about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero">
        <Reveal delay={0}>
          <div className="eyebrow">
            <span className="dot-live" />
            <span className="mono">available for new projects</span>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h1>
            Hi, I&apos;m {first_name}.
            <br />
            I design <RotatingWord />.
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p>
            Product designer who turns confusing flows into ones people
            finish without swearing at their phone. Three projects below —
            fintech, wellness, and civic tech — each with the messy middle
            included.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="hero-cta">
            <a className="btn" href="#work">
              See the work ↓
            </a>
            <a className="btn ghost" href="#contact">
              Say hello
            </a>
          </div>
        </Reveal>
      </section>

      <Reveal id="work" className="section-head" delay={0}>
        <h2>Selected work</h2>
        <span className="count mono">0{caseStudies.length}</span>
        <div className="rule" />
      </Reveal>

      <div className="work">
        {caseStudies.map((study, i) => (
          <CaseStudyCard key={study.title} study={study} index={i} />
        ))}
      </div>

      <Reveal>
        <footer id="contact">
          <h2>
            Got a messy flow?
            <br />
            Let&apos;s fix it.
          </h2>
          <div className="footer-links">
            <a href={"mailto:" + email}>
              {email}
            </a>
            <a
              href="https://www.linkedin.com/in/christinayliu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a href="#">Resume ↓</a>
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer"> Resume
            </a>
          </div>
          <div className="footer-bottom">
            <span>{first_name} {last_name} — Product Designer</span>
            <span className="mono">Based in Sacramento, CA</span>
          </div>
        </footer>
      </Reveal>
    </>
  );
}
