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
  kitAccents,
  credentials,
  stats,
  activityTables,
} from "./storyContent";
import type { KitSwatch, QuickStartVariant } from "./storyContent";

// Small line icons, drawn to match the ones in the kit.
const icons = {
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
  sun: (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
    </svg>
  ),
  moon: (
    <svg viewBox="0 0 24 24">
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
    </svg>
  ),
  key: (
    <svg viewBox="0 0 24 24">
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 6.5v2.3M12 15.2v2.3M6.5 12h2.3M15.2 12h2.3" />
    </svg>
  ),
  bulb: (
    <svg viewBox="0 0 24 24">
      <path d="M9 17h6M10 20h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  ),
  help: (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7M12 17h.01" />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="10" r="3" />
      <path d="M6.5 18.5a6.5 6.5 0 0 1 11 0" />
    </svg>
  ),
  doc: (
    <svg viewBox="0 0 24 24">
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4M9.5 14l2 2 3.5-4" />
    </svg>
  ),
  tools: (
    <svg viewBox="0 0 24 24">
      <path d="M14.5 6.5a3.5 3.5 0 0 0 4.6 4.1L20 11.5l-8.5 8.5-3-3L17 8.5" />
      <path d="M4 6l2-2 4 4-2 2zM8 10l6.5 6.5M15 15l4 4" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M7 13l3-3 2.5 2 4-4.5M9 20h6M12 16v4" />
    </svg>
  ),
} satisfies Record<string, ReactElement>;

export type IconName = keyof typeof icons;

export function Icon({ name }: { name: IconName }) {
  return (
    <span className={styles.kitIcon} aria-hidden="true">
      {icons[name]}
    </span>
  );
}

export function Wordmark({ small = false }: { small?: boolean }) {
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

export function QuickStart({ variant }: { variant: QuickStartVariant }) {
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

export function Footer({ className = "" }: { className?: string }) {
  return (
    <div className={`${styles.kitFooter} ${className}`}>
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

function Accents() {
  return (
    <ul className={styles.kitAccents}>
      {kitAccents.map((a) => (
        <li key={a.hex} className={styles.kitAccent} data-anim="kit-swatch">
          <span className={styles.kitAccentChip} style={{ background: a.hex, color: a.ink }}>
            {a.hex.slice(1)}
          </span>
          <span className={styles.kitAccentName}>{a.name}</span>
        </li>
      ))}
    </ul>
  );
}

// The light/dark switch from the Portal header, driving the two cards beside it.
export function ThemeToggle({ dark, onChange }: { dark: boolean; onChange: (dark: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      className={styles.kitToggle}
      onClick={() => onChange(!dark)}
    >
      <span className={styles.kitToggleKnob}>
        <Icon name={dark ? "moon" : "sun"} />
      </span>
    </button>
  );
}

function ThemeCards() {
  const [dark, setDark] = useState(false);

  return (
    <div className={`${styles.kitVars} ${dark ? styles.kitVarsDark : ""} ${styles.kitTheme}`}>
      <div className={styles.kitThemeBar}>
        <ThemeToggle dark={dark} onChange={setDark} />
        <span className={styles.kitThemeLabel}>{dark ? "Dark mode" : "Light mode"}</span>
      </div>

      <div className={styles.kitThemeGrid}>
        <CredentialsCard />
        <ActivityCard />
      </div>
    </div>
  );
}

// Colors come from the --k-* variables set by .kitVars / .kitVarsDark on an ancestor.
export function CredentialsCard({ className = "" }: { className?: string }) {
  return (
    <div className={`${styles.kitCred} ${className}`}>
      <div className={styles.kitCredHead}>
        <h4 className={styles.kitCredTitle}>
          <Icon name="key" /> Credentials
        </h4>
        <span className={styles.kitPill}>29 days left of trial</span>
      </div>
      {credentials.map((c) => (
        <div key={c.label} className={styles.kitCredRow}>
          <span className={styles.kitCredLabel}>{c.label}:</span>
          <span>{c.value}</span>
        </div>
      ))}
    </div>
  );
}

export function ActivityCard({ className = "" }: { className?: string }) {
  const [tab, setTab] = useState(0);
  const table = activityTables[tab];

  return (
    <div className={`${styles.kitTable} ${className}`}>
      <h4 className={styles.kitTableTitle}>View Accounts &amp; Activities</h4>
      <div className={styles.kitTabs} role="tablist">
        {activityTables.map((t, i) => (
          <button
            key={t.tab}
            type="button"
            role="tab"
            aria-selected={tab === i}
            className={`${styles.kitTab} ${tab === i ? styles.kitTabOn : ""}`}
            onClick={() => setTab(i)}
          >
            {t.tab}
          </button>
        ))}
      </div>
      <table>
        <thead>
          <tr>
            {table.columns.map((c) => (
              <th key={c}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, k) => (
                <td key={k}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Overview({ className = "" }: { className?: string }) {
  return (
    <div className={`${styles.kitStats} ${className}`}>
      {stats.map((s) => (
        <div key={s.label}>
          <span className={styles.kitStatLabel}>{s.label}</span>
          <span className={styles.kitStatValue}>{s.value}</span>
          <span className={styles.kitStatDelta}>+0.00% from last week</span>
        </div>
      ))}
    </div>
  );
}

export function Banner({ className = "" }: { className?: string }) {
  return (
    <div className={`${styles.kitBanner} ${className}`}>
      <span className={styles.kitBannerBadge}>
        <Icon name="bulb" />
      </span>
      <div className={styles.kitBannerText}>
        <h4>Portal Tutorials</h4>
        <p>Super sick internal tutorials to learn about how to use the portal</p>
      </div>
      <span className={styles.kitBannerCta}>View Here</span>
    </div>
  );
}

export default function UiKit() {
  return (
    <div className={styles.kit}>
      <div className={styles.kitPalette} data-anim="kit-palette">
        <Scale name="Shades" swatches={kitShades} />
        <Scale name="Tints" swatches={kitTints} />
        <div className={styles.kitScale}>
          <p className={styles.kitLabel}>Surfaces &amp; accents</p>
          <Accents />
        </div>
      </div>

      <div className={styles.kitBlock} data-anim="kit-piece">
        <p className={styles.kitLabel}>Dashboard cards, light and dark (try the switch)</p>
        <ThemeCards />
      </div>

      <div className={`${styles.kitBlock} ${styles.kitStack}`}>
        <div data-anim="kit-piece">
          <p className={styles.kitLabel}>Overview stats</p>
          <Overview />
        </div>
        <div data-anim="kit-piece">
          <p className={styles.kitLabel}>Tutorial banner</p>
          <Banner />
        </div>
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
        <div data-anim="kit-piece">
          <p className={styles.kitLabel}>Footer</p>
          <Footer />
        </div>
      </div>
    </div>
  );
}
