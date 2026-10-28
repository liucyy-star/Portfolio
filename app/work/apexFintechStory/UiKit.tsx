"use client";

import { useState } from "react";
import type { ReactElement } from "react";
import styles from "./story.module.css";
import {
  kitShades,
  kitTints,
  quickStartVariants,
  navGroups,
  footerColumns,
} from "./storyContent";
import type { KitSwatch, NavIcon, QuickStartVariant } from "./storyContent";

// Small line icons, drawn to match the ones in the kit.
const icons: Record<NavIcon | "rocket" | "collapse" | "expand" | "arrow", ReactElement> = {
  portal: (
    <svg viewBox="0 0 24 24">
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
    </svg>
  ),
  toolkit: (
    <svg viewBox="0 0 24 24">
      <path d="M3 5.5h6a3 3 0 0 1 3 3V19a2.5 2.5 0 0 0-2.5-2.5H3z" />
      <path d="M21 5.5h-6a3 3 0 0 0-3 3V19a2.5 2.5 0 0 1 2.5-2.5H21z" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.8v2.6M12 18.6v2.6M2.8 12h2.6M18.6 12h2.6M5.5 5.5l1.8 1.8M16.7 16.7l1.8 1.8M5.5 18.5l1.8-1.8M16.7 7.3l1.8-1.8" />
    </svg>
  ),
  rocket: (
    <svg viewBox="0 0 24 24">
      <path d="M14 4c3-1.5 5.5-1 6-.5.5.5 1 3-.5 6L13 16l-5-5z" />
      <path d="M8 11l-3.5.5L3 14l4 1M13 16l-.5 3.5L10 21l-1-4" />
      <circle cx="15.5" cy="8.5" r="1.5" />
    </svg>
  ),
  collapse: (
    <svg viewBox="0 0 24 24">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 4v16" />
    </svg>
  ),
  expand: (
    <svg viewBox="0 0 24 24">
      <path d="M14 4h6v6M10 20H4v-6M20 4l-6.5 6.5M4 20l6.5-6.5" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  ),
};

function Icon({ name }: { name: keyof typeof icons }) {
  return (
    <span className={styles.kitIcon} aria-hidden="true">
      {icons[name]}
    </span>
  );
}

function Wordmark({ small = false }: { small?: boolean }) {
  return (
    <span className={`${styles.kitWordmark} ${small ? styles.kitWordmarkSmall : ""}`}>
      <span className={styles.kitWordmarkApex}>APEX</span>
      <span className={styles.kitWordmarkSub}>Fintech Solutions</span>
    </span>
  );
}

function Scale({ name, swatches }: { name: string; swatches: KitSwatch[] }) {
  return (
    <div className={styles.kitScale}>
      <p className={styles.kitLabel}>{name}</p>
      <ol className={styles.kitScaleRow}>
        {swatches.map((s) => (
          <li
            key={s.hex}
            className={styles.kitSwatch}
            data-anim="kit-swatch"
            style={{ background: s.hex, color: s.ink }}
          >
            <span>{s.hex.slice(1)}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function QuickStart({ variant }: { variant: QuickStartVariant }) {
  return (
    <div className={styles.kitQs}>
      <span className={styles.kitQsBadge}>
        <Icon name="rocket" />
      </span>
      <h4 className={styles.kitQsTitle}>Quick Start</h4>
      <p className={styles.kitQsText}>
        Try it yourself to see the beauty of our super awesome APIs and fall in
        love with its functionality!
      </p>
      <span
        className={`${styles.kitQsCta} ${styles[`kitQs_${variant}`]}`}
        aria-hidden="true"
      >
        Start Here {variant !== "filled" && <Icon name="arrow" />}
      </span>
    </div>
  );
}

// The side nav, live: collapse it to the icon rail, then point at an icon for its flyout.
function SideNav() {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className={styles.kitNavStage}>
      <nav
        className={`${styles.kitNav} ${collapsed ? styles.kitNavRail : ""}`}
        aria-label="Sandbox navigation demo"
        onMouseLeave={() => setOpen(null)}
      >
        <div className={styles.kitNavBrand}>
          {collapsed ? <span className={styles.kitNavX}>X</span> : <Wordmark small />}
        </div>

        {navGroups.map((group, i) => (
          <div
            key={group.title}
            className={styles.kitNavGroup}
            onMouseEnter={() => collapsed && setOpen(i)}
          >
            <button
              type="button"
              className={`${styles.kitNavHead} ${i === 0 ? styles.kitNavHeadActive : ""}`}
              aria-expanded={collapsed ? open === i : undefined}
              onClick={() => collapsed && setOpen(open === i ? null : i)}
              onFocus={() => collapsed && setOpen(i)}
            >
              <Icon name={group.icon} />
              <span className={styles.kitNavHeadText}>{group.title}</span>
            </button>

            {!collapsed && (
              <ul className={styles.kitNavLinks}>
                {group.links.map((link) => (
                  <li key={link}>{link}</li>
                ))}
              </ul>
            )}

            {collapsed && open === i && (
              <div className={styles.kitFlyout}>
                <p className={styles.kitFlyoutTitle}>{group.title}</p>
                <ul className={styles.kitNavLinks}>
                  {group.links.map((link, k) => (
                    <li key={link} className={k === 0 ? styles.kitFlyoutActive : undefined}>
                      {link}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {i === 1 && <hr className={styles.kitNavRule} />}
          </div>
        ))}

        <button
          type="button"
          className={styles.kitNavToggle}
          onClick={() => {
            setCollapsed(!collapsed);
            setOpen(null);
          }}
          aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
        >
          <Icon name={collapsed ? "expand" : "collapse"} />
        </button>
      </nav>
      <p className={styles.caption}>
        {collapsed
          ? "Icon rail. Hover or tab to an icon to open its flyout."
          : "Expanded. Use the button at the bottom to collapse it."}
      </p>
    </div>
  );
}

function Footer() {
  return (
    <div className={styles.kitFooter} data-anim="kit-piece">
      <div className={styles.kitFooterTop}>
        <Wordmark />
        <div className={styles.kitFooterActions}>
          <span className={styles.kitContact}>Contact Us</span>
          <span className={styles.kitSocials} aria-hidden="true">
            <span>in</span>
            <span>X</span>
            <span>f</span>
            <span>ig</span>
          </span>
        </div>
      </div>
      <div className={styles.kitFooterCols}>
        {footerColumns.map((col) => (
          <div key={col.title}>
            <p className={styles.kitFooterHead}>{col.title}</p>
            <ul>
              {col.links.map((link) => (
                <li key={link}>{link}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className={styles.kitFooterLegal}>
        Privacy and legal · Disclosures · Site map · © 2023 Apex Fintech Solutions
      </p>
    </div>
  );
}

export default function UiKit() {
  return (
    <div className={styles.kit}>
      <div className={styles.kitPalette} data-anim="kit-palette">
        <Scale name="Shades" swatches={kitShades} />
        <Scale name="Tints" swatches={kitTints} />
      </div>

      <div className={styles.kitBlock}>
        <p className={styles.kitLabel}>Quick Start card, four CTA styles</p>
        <div className={styles.kitQsRow} data-anim="kit-cards">
          {quickStartVariants.map(({ variant, label }) => (
            <figure key={variant} className={styles.kitQsFig} data-anim="kit-card">
              <QuickStart variant={variant} />
              <figcaption className={styles.caption}>{label}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className={`${styles.kitBlock} ${styles.kitNavFooter}`}>
        <div data-anim="kit-piece">
          <p className={styles.kitLabel}>Side navigation (try it)</p>
          <SideNav />
        </div>
        <div>
          <p className={styles.kitLabel}>Footer</p>
          <Footer />
        </div>
      </div>
    </div>
  );
}
