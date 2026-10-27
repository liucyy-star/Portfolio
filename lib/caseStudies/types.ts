import type { ReactNode } from "react";

export type SectionName =
  | "overview" | "problem" | "solution" | "research" | "metrics"
  | "flow" | "process" | "finalDesign" | "reflection";

// A doodle cropped out of an element sheet (pixel coords in the source image).
export type BloomImage = { src: string; x: number; y: number; size: number; w: number; h: number };

export type Accent = "1" | "2" | "3";

export type Persona = {
  name: string;
  role: string;
  location: string;
  background: string;
  quote: string;
  traits: string[];
};

export type Step = { title: string; description: string; highlight?: boolean };
export type Shot = { src: string; alt: string; caption?: string };

// Every case study must fill in these categories.
// A "?" means the section is optional and is hidden if left out.
export interface CaseStudy {
  // homepage card
  slug: string; // becomes the URL: /work/<slug>
  accent: Accent;
  tag: string;
  title: string;
  oneLiner: string;
  role: string;
  timeline: string;
  tools: string;
  team: string;
  bouquet?: (string | BloomImage)[]; // icon names (or cropped doodles) from components/BloomIcons.tsx that bloom around the card on hover

  // case study page
  heroTitle: string;
  heroSub: string;
  overview: string[]; // one string per paragraph
  overviewBullets?: string[];
  problem: { title: string; body: string; hmw: string; bullets?: string[] };
  solution: { title: string; body: string; bullets?: string[]};
  research?: { title: string; body: string; personas: Persona[], images?: Shot[] };
  metrics?: string[];
  flow?: { title: string; body: string; steps: Step[] };
  process: { title: string; body: string; steps: Step[] };
    finalDesign: {
        title: string;
        body: string;
        images: Shot[];
        prototypeUrl?: string; // Figma prototype share link
        video?: string;        // "/case-studies/apex/walkthrough.mp4" or a YouTube/Loom embed URL
    };
  reflection: { lessons: string[]; nextSteps: string[] };
    // Optional photos/videos/anything, placed at the end of a section
  media?: Partial<Record<SectionName, ReactNode>>;
}