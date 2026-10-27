import Reveal from "@/components/Reveal";
import { first_name, last_name, email, RESUME_URL } from "@/lib/site";

export default function Footer() {
  return (
    <Reveal>
      <footer id="contact">
        <h2>
          Got a messy flow?
          <br />
          Let&apos;s fix it.
        </h2>
        <div className="footer-links">
          <a href={"mailto:" + email}>{email}</a>
          <a
            href="https://www.linkedin.com/in/christinayliu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
            Resume ↓
          </a>
        </div>
        <div className="footer-bottom">
          <span>{first_name} {last_name} — UX Designer</span>
          <span className="mono">Based in Sacramento, CA</span>
        </div>
      </footer>
    </Reveal>
  );
}