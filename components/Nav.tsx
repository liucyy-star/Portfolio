import Link from "next/link";
import { first_name, last_name } from "@/lib/site";

export default function Nav() {
  return (
    <nav className="site-nav">
      <Link href="/" className="logo">
        {first_name} {last_name}<span>.</span>
      </Link>
      <div className="nav-links">
        <Link href="/#work">Work</Link>
        <Link href="/about">About</Link>
        <Link href="/#contact">Contact</Link>
      </div>
    </nav>
  );
}