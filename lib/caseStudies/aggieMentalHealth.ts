import type { CaseStudy } from "./types";

export const aggieMentalHealth: CaseStudy = {
  slug: "aggieMentalHealthStory", // must match the folder name in app/work
  accent: "3",         // card color: "1", "2" or "3"
  tag: "Brand Campaign",
  title: "Aggie Mental Health",
  oneLiner: "Built the visual identity for UC Davis's rebranded student mental health campaign, starting from nothing but the copy.",
  role: "Student Graphic Designer",
  timeline: "Jun – Nov 2022",
  tools: "Adobe Illustrator, Adobe Fresco",
  team: "UC Davis SAMC creative team",

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
    title: "A new name with no look",
    body: "I was approached by my manager early June, as the Spring Quarter had just ended, ushering in summer vacation and its heat. UC Davis's student mental health initiative, Each Aggie Matters, was being renamed Aggie Mental Health: student feedback showed the old name didn't say it was about mental health. The client knew what the campaign should say, but it had no visual identity: no logo, no iconography, no marketing materials, not even merch like sweatshirts or pens. Everything had to be built from scratch while staying inside the broader UC Davis brand.",
    hmw: "How might we engage the student population to participant in their mental well-being?",
    bullets: [
      "Stay within UC Davis's existing color palette and visual identity",
      "Work only from SAMC's existing library of marketing photos",
      "Feel gentle and approachable for a sensitive topic",
    ],
  },
  solution: {
    title: "Trial and Error",
    body: "Not every direction landed. The hardest feedback I got was that a direction wasn't where the client wanted to go, even when I felt it connected with students. The bigger challenge was the limited palette and photo library. Working within those limits pushed me to balance clarity, consistency, and empathy, and to build a visual system that could carry the message on its own.",
  },
  process: {
    title: "Words first, then a visual system",
    body: "Because the campaign's message came before any visuals, I started with the copy and built the identity outward from there.",
    steps: [
      { title: "Copy", description: "Helped shape the campaign wording and assembled the list of messages the visuals needed to carry." },
      { title: "Imagery", description: "Chose photos from SAMC's existing marketing library to pair with each message." },
      { title: "Color", description: "Picked a palette from within the UC Davis brand that would stay visible and readable across every piece of marketing material." },
      { title: "Visual assets", description: "Designed the logo plus a library of hand-drawn elements (flowers, leaves, halos, hands, squiggles), drawn in Adobe Fresco and vectorized in Illustrator, so every poster, handout, and piece of merch felt like part of one campaign." },
    ],
  },
  finalDesign: {
    title: "Everywhere on campus",
    body: "The campaign showed up all over campus: posters on elevator doors, on the sides of school buses, and at outreach tables in the Quad and other high-traffic spots a few times a quarter. The goal was to catch the eye and leave a gentle message behind.",
    images: [],
  },
  reflection: {
    lessons: [
      "Criticism is about the work, not me. Early on it was easy to take feedback personally",
      "Tight brand constraints can sharpen a visual system instead of limiting it",
      "On a sensitive topic, tone matters as much as visibility",
    ],
    nextSteps: [
      "Add logo sketches, final files, and photos of the posters in the wild",
    ],
  },

  // Optional sections — delete any you don't need:
  // research: { title, body, personas: [...] },
  // metrics: ["..."],
  // flow: { title, body, steps: [...] },
};
