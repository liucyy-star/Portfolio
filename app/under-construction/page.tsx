import type { Metadata } from "next";
import CursorBlob from "@/components/CursorBlob";
import { first_name, last_name, email } from "@/lib/site";

export const metadata: Metadata = {
  title: `Under construction — ${first_name} ${last_name}`,
};

// Uses a CSS fade instead of <Reveal>, which waits on the home page's intro
// loader and would leave this page blank.
export default function UnderConstruction() {
  return (
    <>
      <CursorBlob />

      <section className="hero construction">
        <div className="fade-up" style={{ animationDelay: "0ms" }}>
          <div className="eyebrow">
            <span className="dot-live dot-wip" />
            <span className="mono">case study in progress</span>
          </div>
        </div>
        <div className="fade-up" style={{ animationDelay: "100ms" }}>
          <h1>
            Still sketching
            <br />
            this <span className="rotator">one</span>.
          </h1>
        </div>
        <div className="fade-up" style={{ animationDelay: "200ms" }}>
          <p>
            This case study is under construction — the research is done, the
            write-up isn&apos;t. Check back soon, or ask me about it directly.
          </p>
        </div>
        <div className="fade-up" style={{ animationDelay: "300ms" }}>
          <div className="hero-cta">
            <a className="btn" href="/#work">
              ← Back to the work
            </a>
            <a className="btn ghost" href={"mailto:" + email}>
              Ask me about it
            </a>
          </div>
        </div>
      </section>

      <div className="caution-tape" aria-hidden="true">
        <span className="mono">{"UNDER CONSTRUCTION · ".repeat(12)}</span>
      </div>
    </>
  );
}
