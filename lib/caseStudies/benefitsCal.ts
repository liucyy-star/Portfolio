import type { CaseStudy } from "./types";

export const benefitsCal: CaseStudy = {
  slug: "benefitsCal", // must match the folder name in app/caseStudies
  accent: "2",         // card color: "1", "2" or "3"
  tag: "Civic tech: Eligibility",
  title: "BenefitsCal — ...",
  oneLiner: "One sentence for the homepage card.",
  role: "UX Designer",
  timeline: "Sept 2024 - Present",
  tools: "Figma",
  team: "State of California, Project Managers, Engineers",

  heroTitle: "...",
  heroSub: "...",
  overview: ["First paragraph...", "Second paragraph..."],
  problem: { title: "...", body: "...", hmw: "How might we ...?" },
  solution: { title: "...", body: "..." },
  process: {
    title: "...",
    body: "...",
    steps: [
      { title: "...", description: "..." },
    ],
  },
  finalDesign: {
    title: "...",
    body: "...",
    images: [
      { src: "/case-studies/benefitscal/final.png", alt: "...", caption: "..." },
    ],
  },
  reflection: { lessons: ["..."], nextSteps: ["..."] },

  // Optional sections — delete any you don't need:
  // research: { title, body, personas: [...] },
  // metrics: ["..."],
  // flow: { title, body, steps: [...] },
};