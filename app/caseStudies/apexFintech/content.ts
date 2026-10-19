export type MetaItem = { label: string; value: string };

export type Persona = {
  name: string;
  role: string;
  location: string;
  background: string;
  quote: string;
  traits: string[];
};

export type FlowStep = {
  title: string;
  description: string;
  key?: boolean;
};

export type Stage = {
  title: string;
  description: string;
};

export type Credential = { label: string; value: string };
export type Stat = { value: string; label: string };

export const meta: MetaItem[] = [
  { label: "Role", value: "UX Design Intern" },
  { label: "Timeline", value: "Jun 20 to Aug 25, 2023" },
  { label: "Team", value: "PM, Product Devs, Chief Engineer" },
];

export const personas: Persona[] = [
  {
    name: "Michael Case",
    role: "Head of Engineering",
    location: "Belfast, UK",
    background: "MS Computer Science, age 36",
    quote: "“My company needs an easy-to-integrate platform for new features.”",
    traits: ["Strategic", "Technical", "Reliable", "Concise"],
  },
  {
    name: "Barbara Starla",
    role: "Sr. Product Manager",
    location: "Chicago, IL",
    background: "MBA, age 38",
    quote: "“I need to understand Apex’s APIs for competitive research.”",
    traits: ["Thorough", "Non-tech", "Inquisitive", "Broker expert"],
  },
  {
    name: "Alfredo Sanchez",
    role: "CEO / CTO",
    location: "New York City, NY",
    background: "BS Computer Science, age 27",
    quote: "“I need a platform that will take my startup to the next level.”",
    traits: ["Ambitious", "Impatient", "Energetic", "Adventurous"],
  },
];

export const flowSteps: FlowStep[] = [
  {
    title: "Enter the marketing website",
    description:
      "First touchpoint for a prospective client. No account required yet.",
  },
  {
    title: "Permission set-up",
    description:
      "Create an account, verify through HubSpot, confirm identity with 2FA via Okta.",
  },
  {
    title: "Open the sandbox",
    description:
      "An isolated environment is provisioned automatically, with no manual setup.",
  },
  {
    title: "Quick start",
    description:
      "The single screen that had to work for all three personas at once. This is where a curious visitor either becomes an engaged evaluator or leaves.",
    key: true,
  },
  {
    title: "Explore",
    description:
      "Resources, tutorials, and developer documentation for self-directed evaluation.",
  },
  {
    title: "Test APIs",
    description:
      "Live calls against an isolated, automatically provisioned environment. Real functionality, zero production risk.",
  },
];

export const stages: Stage[] = [
  {
    title: "Low-fi sketches",
    description:
      "Working through account setup, dashboard structure, and information hierarchy on paper: what needs to be visible immediately versus tucked into secondary navigation.",
  },
  {
    title: "UI kit",
    description:
      "A component system built from scratch: color, type, and structure that reads as technical without alienating non-engineers.",
  },
  {
    title: "Final designs",
    description:
      "A working prototype of the full Portal experience, from credential access through the first API call.",
  },
];

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

export const lessons: string[] = [
  "Communicating research and design rationale to stakeholders and engineers who weren’t designers",
  "Running competitive analysis in practice, not just theory",
  "Designing to satisfy business objectives: the sandbox’s success was measured in trial-to-paid conversion, not usability scores alone",
  "Prioritizing ruthlessly to ship a functional MVP inside a hard ten-week timeline",
];

export const nextSteps: string[] = [
  "Validate the flow with real prospective clients. The personas were research-driven, but the flow itself hadn’t been tested live",
  "Expand the prototype with additional pages and refine screens based on that testing",
  "Extend the flow to more deliberately serve Barbara and Alfredo, since the MVP timeline favored Michael’s technical path first",
];