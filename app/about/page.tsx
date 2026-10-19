import CursorBlob from "@/components/CursorBlob";
import Reveal from "@/components/Reveal";
import { first_name, last_name, email } from "../globals/constants";
import { RESUME_URL } from "@/app/globals/constants"; 


export default function AboutMe() {
  return (
    <>
      <CursorBlob />

      <nav>
        <div className="logo">
          {first_name} {last_name}<span>.</span>
        </div>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <iframe src={RESUME_URL} />


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
