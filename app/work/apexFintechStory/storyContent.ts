export type Shot = {
  src: string;
  alt: string;
  width: number;
  height: number;
  label: string;
  caption: string;
  /** Crop very tall images to their top instead of shrinking them to fit. */
  cropTop?: boolean;
};

export type Milestone = { time: string; label: string };

export type CompetitorRow = {
  firm: string;
  cells: [string, string, string, string];
  isApex?: boolean;
};

export const heroShot: Shot = {
  src: "/case-studies/apex/dashboard-mid2.png",
  alt: "Sandbox dashboard with Quick Start, Developer Portal and Credentials cards",
  width: 5440,
  height: 3932,
  label: "Sandbox dashboard",
  caption: "",
};

export const idealMilestones: Milestone[] = [
  { time: "0 min", label: "Navigates to the developer portal" },
  { time: "5 min", label: "Completes sign-up for an account" },
  { time: "15 min", label: "Granted access to a sandbox" },
  { time: "30 min", label: "Makes a test call and sees real data" },
];

export const competitorColumns = [
  "Self-service onboarding",
  "Single API + auth",
  "SDK + public docs",
  "Developer sandbox",
];

export const competitors: CompetitorRow[] = [
  { firm: "Alpaca Finance", cells: ["Partial", "Yes", "Yes", "Yes"] },
  { firm: "Drivewealth", cells: ["No", "Yes", "Yes", "Yes*"] },
  {
    firm: "Apex Fintech Solutions",
    cells: ["No", "No", "No", "No"],
    isApex: true,
  },
];

export const flowMap: Shot = {
  src: "/case-studies/apex/flow-enter-website.png",
  alt: "User flow from entering the Apex website to the sandbox landing page, splitting into evaluators and curious wanderers",
  width: 3509,
  height: 726,
  label: "User flow",
  caption: "Entering the Apex website: evaluators head to the sandbox, curious wanderers drift off.",
};

export const flowIterations: Shot[] = [
  {
    src: "/case-studies/apex/flow-sign-up.png",
    alt: "User flow for signing up for a sandbox account",
    width: 3509,
    height: 1834,
    label: "Flow",
    caption: "Signing up for an account",
  },
  {
    src: "/case-studies/apex/flow-open-sandbox.png",
    alt: "User flow for opening the sandbox on a first and a returning visit",
    width: 3509,
    height: 1909,
    label: "Flow",
    caption: "Opening the sandbox, first vs. returning visit",
  },
];

export const evolution: Shot[] = [
  {
    src: "/case-studies/apex/sketch-notes.png",
    alt: "Handwritten notes listing what the sandbox dashboard needs and what would be nice to have",
    width: 1701,
    height: 2201,
    label: "Requirements",
    caption:
      "What’s needed vs. what would be nice: account management, API keys, a no-code path next to a technical one.",
  },
  {
    src: "/case-studies/apex/sketch-layouts.png",
    alt: "Four hand-drawn desktop layout explorations for the sandbox dashboard",
    width: 1701,
    height: 2201,
    label: "Low-fi sketches",
    caption:
      "Four layout directions: side nav vs. top nav, and where “Getting started” lives.",
  },
  {
    src: "/case-studies/apex/wireframe-landing.png",
    alt: "Grayscale wireframe of the sandbox landing page with featured products and how it works",
    width: 5440,
    height: 11428,
    label: "Wireframe",
    caption:
      "A first pass at the landing page: search, featured products, how it works, resources.",
    cropTop: true,
  },
  {
    src: "/case-studies/apex/dashboard-mid.png",
    alt: "Mid-fidelity dashboard with account stats, new signups and transactions",
    width: 5440,
    height: 3932,
    label: "Mid-fi, v1",
    caption:
      "Dashboard v1: account stats, new signups and transactions up front.",
  },
  {
    src: "/case-studies/apex/dashboard-mid2.png",
    alt: "Mid-fidelity dashboard leading with Quick Start, Developer Portal and Credentials cards",
    width: 5440,
    height: 3932,
    label: "Mid-fi, v2",
    caption:
      "Dashboard v2: Quick Start, Developer Portal and Credentials lead, with stats below.",
  },
];

export type Credential = { label: string; value: string };
export type Stat = { value: string; label: string };

// Sample data shown inside the coded Portal mockup.
export const credentials: Credential[] = [
  { label: "Endpoint", value: "api.sandbox.apex.dev" },
  { label: "Sandbox account", value: "SBX-40921" },
  { label: "API key", value: "•••• a91f" },
  { label: "Client ID", value: "clt_8842xz" },
];

export const stats: Stat[] = [
  { value: "128", label: "Active accounts" },
  { value: "642", label: "Orders this week" },
  { value: "$2.4M", label: "Assets under management" },
  { value: "18.3k", label: "API calls" },
];

// UI kit, taken from the kit board in the original deck.
export type KitSwatch = { hex: string; ink: string };

const kitInk = (hex: string, light: boolean): KitSwatch => ({
  hex,
  ink: light ? "#052391" : "#e6e9f4",
});

// Apex blue stepping down to black, and out to white.
export const kitShades: KitSwatch[] = [
  "#052391", "#052083", "#041c74", "#041966", "#031557", "#031249",
  "#020e3a", "#010a2b", "#01071d", "#00030e", "#000000",
].map((hex) => kitInk(hex, false));

export const kitTints: KitSwatch[] = [
  "#052391", "#1e399c", "#374fa7", "#5065b2", "#697bbd", "#8291c8",
  "#9ba7d3", "#b4bdde", "#cdd3e9", "#e6e9f4", "#ffffff",
].map((hex, i) => kitInk(hex, i >= 6));

export type QuickStartVariant = "filled" | "outline" | "link" | "linkEnd";

export const quickStartVariants: { variant: QuickStartVariant; label: string }[] = [
  { variant: "filled", label: "Primary" },
  { variant: "outline", label: "Secondary" },
  { variant: "link", label: "Text link" },
  { variant: "linkEnd", label: "Text link, trailing" },
];

export type NavIcon = "portal" | "toolkit" | "settings";
export type NavGroup = { title: string; icon: NavIcon; links: string[] };

export const navGroups: NavGroup[] = [
  {
    title: "Portal",
    icon: "portal",
    links: ["Quick Start", "Create Account", "Fund Account", "Place An Order", "View Activities"],
  },
  {
    title: "Dev Toolkit",
    icon: "toolkit",
    links: ["Test Connection", "Try Our APIs", "Portal Tutorials", "API Docs", "Apex Online"],
  },
  {
    title: "Settings",
    icon: "settings",
    links: ["Company Profile", "Personal Profile", "Manage Team"],
  },
];

export const footerColumns: { title: string; links: string[] }[] = [
  {
    title: "Portal",
    links: ["Quick Start", "Create Account", "Fund Account", "Make A Trade", "View Activities", "Try Our APIs"],
  },
  { title: "Resources", links: ["Sandbox Tutorials", "API Reference Docs", "Apex Online"] },
  { title: "Settings", links: ["Company Profile", "Personal Profile", "Manage Team"] },
  { title: "About Apex", links: ["Our Mission", "Our Products", "Contact Us"] },
];
