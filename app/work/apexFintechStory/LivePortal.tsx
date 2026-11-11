"use client";

import { useRef, useState } from "react";
import type { WheelEvent } from "react";
import Image from "next/image";
import kit from "./story.module.css";
import styles from "./livePortal.module.css";
import { navGroups, apiCalls, toolkitCards } from "./storyContent";
import {
  Icon,
  Wordmark,
  ThemeToggle,
  CredentialsCard,
  ActivityCard,
  QuickStart,
  Overview,
  Banner,
  Footer,
} from "./UiKit";

const API_MAX = 40;

// Sidebar links that have a matching block on the page scroll to it.
const linkTargets: Record<string, string> = {
  "Quick Start": "quickstart",
  "View Activities": "activities",
  "Test Connection": "credentials",
  "Try Our APIs": "toolkit",
  "API Docs": "toolkit",
  "Apex Online": "toolkit",
  "Portal Tutorials": "tutorials",
};

/**
 * The final Portal, rebuilt in code: a browser window that scrolls on its own,
 * with the header switch flipping the whole page between light and dark.
 */
export default function LivePortal() {
  const viewport = useRef<HTMLDivElement>(null);
  const [dark, setDark] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("Quick Start");

  // Scroll only the window, never the page around it.
  const jumpTo = (link: string) => {
    setActive(link);
    const box = viewport.current;
    const target = box?.querySelector<HTMLElement>(`[data-target="${linkTargets[link]}"]`);
    if (!box || !target) return;
    const top =
      target.getBoundingClientRect().top - box.getBoundingClientRect().top + box.scrollTop - 24;
    box.scrollTo({ top, behavior: "smooth" });
  };

  // The page's smooth scroll (Lenis) listens on window. While the window still has room
  // to scroll, keep the wheel here; at the top or bottom, let it through so the page moves on.
  const keepWheelWhileScrollable = (e: WheelEvent<HTMLDivElement>) => {
    const box = e.currentTarget;
    const atTop = box.scrollTop <= 0;
    const atBottom = box.scrollTop + box.clientHeight >= box.scrollHeight - 1;
    if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) e.stopPropagation();
  };

  return (
    <div className={styles.window}>
      <div className={styles.chrome} aria-hidden="true">
        <span className={styles.dots}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.url}>developer.apexfintechsolutions.com</span>
      </div>

      <div
        ref={viewport}
        className={styles.viewport}
        onWheel={keepWheelWhileScrollable}
        tabIndex={0}
        aria-label="Apex sandbox Portal, interactive. Scroll inside to explore."
      >
        <div className={`${kit.kitVars} ${dark ? kit.kitVarsDark : ""} ${styles.page}`}>
          <nav
            className={`${kit.kitNav} ${collapsed ? kit.kitNavRail : ""} ${styles.sidebar}`}
            aria-label="Portal navigation"
          >
            <div className={kit.kitNavBrand}>
              {collapsed ? <span className={kit.kitNavX}>X</span> : <Wordmark small />}
            </div>

            {navGroups.map((group, i) => (
              <div key={group.title} className={kit.kitNavGroup}>
                <button
                  type="button"
                  className={`${kit.kitNavHead} ${i === 0 ? kit.kitNavHeadActive : ""}`}
                  title={collapsed ? group.title : undefined}
                  onClick={() => collapsed && setCollapsed(false)}
                >
                  <Icon name={group.icon} />
                  <span className={kit.kitNavHeadText}>{group.title}</span>
                </button>
                {!collapsed && (
                  <ul className={kit.kitNavLinks}>
                    {group.links.map((link) => (
                      <li key={link}>
                        <button
                          type="button"
                          className={`${styles.navLink} ${active === link ? styles.navLinkOn : ""}`}
                          onClick={() => jumpTo(link)}
                        >
                          {link}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                {i === 1 && <hr className={kit.kitNavRule} />}
              </div>
            ))}

            <button
              type="button"
              className={kit.kitNavToggle}
              onClick={() => setCollapsed(!collapsed)}
              aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
            >
              <Icon name={collapsed ? "expand" : "collapse"} />
            </button>
          </nav>

          <main className={styles.main}>
            <div className={styles.topBar}>
              <ThemeToggle dark={dark} onChange={setDark} />
              <span className={styles.roundIcon}>
                <Icon name="help" />
              </span>
              <span className={styles.roundIcon}>
                <Icon name="user" />
              </span>
            </div>

            <h3 className={styles.hello}>Hello, Company Inc</h3>
            <p className={styles.welcome}>Welcome to the Apex Portal!</p>

            <div className={styles.rowWide}>
              <div data-target="credentials">
                <CredentialsCard className={styles.fill} />
              </div>
              <div data-target="quickstart" className={styles.qs}>
                <QuickStart variant="linkEnd" />
              </div>
            </div>

            <h4 className={styles.heading}>Overview</h4>
            <Overview />

            <div className={`${styles.rowWide} ${styles.spaced}`}>
              <div data-target="activities">
                <ActivityCard className={styles.fill} />
              </div>
              <div className={styles.apiCard}>
                <h5 className={styles.apiTitle}>API Calls</h5>
                <div className={styles.apiChart}>
                  <span className={styles.apiAxis} aria-hidden="true">
                    {[40, 30, 20, 10, 0].map((n) => (
                      <span key={n}>{n}</span>
                    ))}
                  </span>
                  <div className={styles.apiBars}>
                    {apiCalls.map((c) => (
                      <div
                        key={c.name}
                        className={styles.apiBar}
                        style={{ height: `${(c.value / API_MAX) * 100}%` }}
                        title={`${c.name}: ${c.value}`}
                      >
                        <span>{c.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <h4 className={styles.heading} data-target="toolkit">
              Developer Toolkit
            </h4>
            <div className={styles.toolkit}>
              {toolkitCards.map((card) => (
                <div key={card.title} className={styles.toolCard}>
                  <span className={styles.toolBadge}>
                    <Icon name={card.icon} />
                  </span>
                  <h5 className={styles.toolTitle}>{card.title}</h5>
                  <p className={styles.toolText}>{card.body}</p>
                  <span className={styles.toolCta}>
                    {card.cta} <Icon name="arrow" />
                  </span>
                </div>
              ))}
            </div>

            <h4 className={styles.heading}>Learn More</h4>
            <p className={styles.sub}>How this Sandbox Works</p>
            <Image
              src="/case-studies/apex/portal-video.webp"
              alt="Video still: a developer working on a laptop beside a model house and wind turbine"
              width={588}
              height={336}
              unoptimized
              className={styles.video}
            />

            <div data-target="tutorials" className={styles.spaced}>
              <Banner />
            </div>
          </main>

          <Footer className={styles.footer} />
        </div>
      </div>
    </div>
  );
}
