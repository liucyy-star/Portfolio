import type { ReactNode } from "react";

// Line icons for the case study card bouquet. They draw with currentColor,
// so each one picks up its card's accent color.
const PATHS: Record<string, ReactNode> = {
  card: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18M7 15h4" />
    </>
  ),
  chart: <path d="M4 20V4M4 20h16M7 15l4-4 3 3 5-6" />,
  coin: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M14.5 9.5c-.5-.8-1.4-1.2-2.5-1.2-1.5 0-2.5.8-2.5 1.8 0 2.4 5 1.3 5 3.8 0 1-1 1.8-2.5 1.8-1.1 0-2-.4-2.5-1.2M12 6.5v1.8M12 15.7v1.8" />
    </>
  ),
  code: <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />,
  api: (
    <>
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M8.3 11l7.4-3.8M8.3 13l7.4 3.8" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3M12 15v2" />
    </>
  ),
  doc: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8 12.5l2.7 2.7L16 9.5" />
    </>
  ),
  building: <path d="M3 21h18M5 21V10M19 21V10M9 21v-7M15 21v-7M3 10l9-6 9 6z" />,
  form: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4V3h6v1M9 10h6M9 14h6M9 18h3" />
    </>
  ),
  heart: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />,
  pencil: <path d="M4 20l1-4L16 5l3 3L8 19zM14 7l3 3" />,
  leaf: <path d="M5 19C5 10 10 5 20 4c-1 10-6 15-15 15zM5 19l8-8" />,
  flower: (
    <>
      <circle cx="12" cy="9" r="1.8" />
      <path d="M12 7.2a2.6 2.6 0 1 1 0-5.2 2.6 2.6 0 1 1 0 5.2M12 10.8a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 1 0 0-5.2M10.2 9a2.6 2.6 0 1 1-5.2 0 2.6 2.6 0 1 1 5.2 0M13.8 9a2.6 2.6 0 1 0 5.2 0 2.6 2.6 0 1 0-5.2 0M12 16v6M12 20c-1.5-2-3-2.5-4.5-2.5" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  sprout: <path d="M12 21v-9M12 12C12 8 9 6 5 6c0 4 3 6 7 6zM12 14c0-3 2.5-5 6-5 0 3-2.5 5-6 5z" />,
  chat: <path d="M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H10l-5 4V6a1 1 0 0 1 1-1zM9 10.5h.01M12 10.5h.01M15 10.5h.01" />,
};

export default function BloomIcon({ name }: { name: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {PATHS[name]}
    </svg>
  );
}
