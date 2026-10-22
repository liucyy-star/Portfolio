"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { first_name, last_name } from "@/lib/site";

const LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/graphic-design", label: "Graphic Design" },
  { href: "/photography", label: "Photography" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the menu whenever the page changes.
  useEffect(() => setOpen(false), [pathname]);

  // While open: lock page scroll and let Escape close it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <nav className="site-nav">
        <Link href="/" className="logo">
          {first_name} {last_name}<span>.</span>
        </Link>
        <div className="nav-links">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
        <button
          type="button"
          className={`menu-toggle${open ? " open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="menu-overlay"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Sibling of <nav>, not a child: the nav's backdrop-filter would
          otherwise trap this fixed overlay inside the nav bar. */}
      <div
        id="menu-overlay"
        className={`menu-overlay${open ? " open" : ""}`}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      >
        <ul onClick={(e) => e.stopPropagation()}>
          {LINKS.map((l, i) => (
            <li key={l.href} style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}>
              <Link href={l.href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
                <span className="mono">0{i + 1}</span>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
