import CursorBlob from "@/components/CursorBlob";
import RotatingWord from "@/components/RotatingWord";
import CaseStudyCard from "@/components/CaseStudyCard";
import IntroLoader from "@/components/IntroLoader";
import Reveal from "@/components/Reveal";
import { caseStudies } from "@/lib/caseStudies";
import { first_name, last_name, email } from "@/lib/site";


export default function Home() {
  return (
    <>
      <IntroLoader />
      <CursorBlob />


      <section className="hero">
        {/* overlapping translucent shapes, echoing the wordmark */}
        <div className="hero-shapes" aria-hidden="true">
          <span className="shape s-blue" />
          <span className="shape s-yellow" />
          <span className="shape s-orange" />
          <span className="shape s-pink" />
          <span className="shape s-green" />
          <span className="shape s-teal" />
        </div>
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

    </>
  );
}
