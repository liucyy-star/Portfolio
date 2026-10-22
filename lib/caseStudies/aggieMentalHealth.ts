import type { CaseStudy } from "./types";

export const aggieMentalHealth: CaseStudy = {
  slug: "aggieMentalHealth", // must match the folder name in app/work
  accent: "3",         // card color: "1", "2" or "3"
  tag: "Brand Campaign",
  title: "Aggie Mental Health",
  oneLiner: "One sentence for the homepage card.",
  role: "UX Designer",
  timeline: "Summer of 2022",
  tools: "Figma",
  team: "University of California, Davis",

  heroTitle: "Aggie Mental Health",
  heroSub: "Promoting student's mental well-being, one poster at a time",
  overview: [
    "What is SAMC? UC Davis’ Student Affairs Marketing and Communications (SAMC) department is an internal marketing organization directed towards students to foster community and providing the best UC Davis experience possible. Through creative means, they promote and educate UCD students about various campus resources and events with the intention to support their life goals.", 
    "I was recently hired by SAMC as a student designer around May 2022. I was one of two student graphic designers a part of the team. I worked with my manager, Jennifer Vaughn, who is the Creative Director at SAMC. "
  ],
     overviewBullets: [
    "Must be relevant to the undergraduate student body populations",
    "Cannot be triggering content",
    "Focus on a holistic mental well-being rather than a targeted symptom",
     ],
  problem: { 
    title: "...", 
    body: "I was approached by my manager early June, as the Spring Quarter had just ended, ushering in summer vacation and its heat. There has been previously a campaign called Aggie Mental Health, but I’ve never ", 
    hmw: "How might we engage the student population to participant in their mental well-being?" },
  solution: { title: "Trial and Error", body: "..." },
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