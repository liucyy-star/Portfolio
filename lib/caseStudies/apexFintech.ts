import type { CaseStudy } from "./types";

export const apexFintech: CaseStudy = {
  slug: "apexFintechStory",
  accent: "1",
  bouquet: ["card", "chart", "coin", "code", "api", "lock"],
  thumbnail: { src: "/case-studies/apex/dashboard-mid2.png", alt: "Apex sandbox dashboard with Quick Start, Developer Portal and Credentials cards", position: "top left" },
  tag: "Fintech",
  title: "Apex Fintech — Sandbox MVP",
  oneLiner:
    "Designed Apex's first self-serve sandbox so prospective clients could try its APIs before talking to sales.",
  role: "UX Design Intern",
  timeline: "Jun–Aug 2023 (10 weeks)",
  tools: "Figma",
  team: "PM, Product Devs, Chief Engineer",

  heroTitle: "Designing the first sandbox environment for Apex Fintech",
  heroSub:
    "A self-serve trial environment that let prospective clients evaluate Apex’s investment APIs before ever signing a contract, built from research through final UI in ten weeks.",

  overview: [
    "Apex is a B2B fintech service that powers a “frictionless investing experience” through its APIs. Companies integrate Apex’s tools to run investment features inside their own products, but there was no way for a prospective customer to actually try it first.",
    "I was brought on as the sole design intern to close that gap: a fully functional sandbox environment, designed around three distinct evaluator personas, and shipped as a working MVP within a ten-week timeline.",
  ],

  problem: {
    title: "Apex had a conversion gap, not an awareness problem",
    body: "Every trial required a sales conversation, which slowed the funnel and filtered out curious, self-directed evaluators before they ever saw the product.",
    hmw: "How might we migrate prospective customers into paying clients, and get them excited enough to test our APIs themselves?",
  },

  solution: {
    title: "The Sandbox",
    body: "An exclusive, secure environment where prospective clients could explore Apex’s tools on their own terms. Since nothing like this existed at Apex yet, defining the shape of the product was as much a part of the work as designing its screens.",
  },

  research: {
    title: "Three evaluators, three very different needs",
    body: "Through stakeholder interviews and competitive research, I built three personas representing the realistic range of people who’d evaluate Apex.",
    personas: [
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
    ],
  },

  metrics: [
    "A non-technical person can open an account within 5 minutes, by themselves.",
  ],

  flow: {
    title: "Mapping the path from marketing site to a live API call",
    body: "I mapped the end-to-end journey before touching any UI, iterating as requirements like identity verification surfaced from engineering.",
    steps: [
      { title: "Enter the marketing website", description: "First touchpoint for a prospective client. No account required yet." },
      { title: "Permission set-up", description: "Create an account, verify through HubSpot, confirm identity with 2FA via Okta." },
      { title: "Open the sandbox", description: "An isolated environment is provisioned automatically, with no manual setup." },
      { title: "Quick start", description: "The single screen that had to work for all three personas at once.", highlight: true },
      { title: "Explore", description: "Resources, tutorials, and developer documentation for self-directed evaluation." },
      { title: "Test APIs", description: "Live calls against an isolated environment. Real functionality, zero production risk." },
    ],
  },

  process: {
    title: "From sketches to a system that didn’t exist yet",
    body: "Because there was no design system for this product, building one was part of the deliverable.",
    steps: [
      { title: "Low-fi sketches", description: "Account setup, dashboard structure, and information hierarchy on paper." },
      { title: "UI kit", description: "A component system built from scratch that reads as technical without alienating non-engineers." },
      { title: "Final designs", description: "A working prototype of the full Portal experience, from credentials to the first API call." },
    ],
  },

  finalDesign: {
    title: "The Portal",
    body: "The first screen a client sees after account setup and 2FA. It answers three questions immediately: what do I have access to, how do I start, and what’s happening with my account?",
    images: [
      { src: "/case-studies/apex/portal.png", alt: "Apex sandbox Portal dashboard", caption: "Final Portal design." },
    ],
  },

  reflection: {
    lessons: [
      "Communicating research and design rationale to stakeholders and engineers",
      "Running competitive analysis in practice, not just theory",
      "Designing to satisfy business objectives, not usability scores alone",
      "Prioritizing ruthlessly to ship an MVP inside a ten-week timeline",
    ],
    nextSteps: [
      "Validate the flow with real prospective clients",
      "Expand the prototype with additional pages and refine screens",
      "Extend the flow to better serve Barbara and Alfredo",
    ],
  },
};