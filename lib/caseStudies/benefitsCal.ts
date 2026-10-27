import type { CaseStudy } from "./types";

export const benefitsCal: CaseStudy = {
  slug: "benefitsCal", // must match the folder name in app/work
  accent: "2",         // card color: "1", "2" or "3"
  bouquet: ["doc", "check", "building", "form", "heart", "pencil"],
  tag: "Civic tech: Eligibility",
  title: "BenefitsCal — Medi-Cal renewal under new policy",
  oneLiner: "Turned a brand-new, fast-changing federal policy into a Medi-Cal renewal flow Californians could actually get through online.",
  role: "UX Designer",
  timeline: "Sept 2024 - Present",
  tools: "Figma",
  team: "State of California, Project Managers, Engineers",

  heroTitle: "Translating brand-new policy into a Medi-Cal renewal people can finish",
  heroSub: "New federal work rules, a tight deadline, and requirements that changed every other day. My job was to turn them into clear steps on BenefitsCal.",
  overview: [
    "BenefitsCal - California Eligibility Portal", "BenefitsCal is a portal where Californians can get and manage benefits online. This includes food assistance (CalFresh) formerly food stamps, cash aid (CalWORKs, General Assistance, Cash Assistance Program for Immigrants), and affordable health insurance (Medi-Cal). This includes program status, benefit amount, and other case details.",
    "As a UX designer, I've spent most of my time on BenefitsCal enhancing the site: policy-driven updates, navigation, content clarity, and accessibility. I've led several enhancements end to end, including the Medi-Cal renewal, the CalFresh renewal, and the login experience. This case study focuses on the Medi-Cal renewal.",
  ],
     overviewBullets: [
    "Easier to log into their BenefitsCal account",
    "More comprehensible to apply for benefits",
    "Manage their account",
     ],
  problem: {
    title: "A policy no one had implemented before, on a deadline",
    body: "The HR1 policy introduced new work and community engagement rules for Medi-Cal, along with a way to claim an exemption from them. It had never been done before and was high priority: falling behind would be costly for the state and, worse, could leave Californians who depend on Medi-Cal without coverage. BenefitsCal doesn't determine eligibility. It's the pathway people use to apply and renew, so everything we showed had to follow a policy that was still being written.",
    hmw: "How might we turn new, still-changing policy requirements into a renewal experience people can complete online, without having to go to a county office?",
    bullets: [
      "Requirements and form language changed often, sometimes every other day",
      "Content had to stay at a sixth-grade reading level",
      "The old form made people repeat the same information over and over",
    ],
  },
  solution: {
    title: "Clear steps, familiar patterns, no repeated answers",
    body: "I designed both the exemption questions and the process for reporting work or community engagement, updating existing screens and building new ones. Wherever possible I reused patterns people already knew, and I cut out questions that made them retype information we already had.",
  },
  process: {
    title: "Designing while the policy was still being written",
    body: "Most of the challenge wasn't any single screen. It was keeping the design in step with constant changes while making sure the online path stayed easier than going in person.",
    steps: [
      { title: "Field research at county offices", description: "Visited county offices to see why people renew in person when they could do it online, and where the online experience left gaps we could close." },
      { title: "Reuse what works", description: "Adapted the CalFresh work-rules screens (ABAWD) for the Medi-Cal exemption questions. Same structure for a cohesive experience, with options and wording rewritten for Medi-Cal's rules. With the time crunch, there was no reason to rebuild something that already worked." },
      { title: "Never answer twice", description: "The old form asked people early on to confirm their information hadn't changed, then made them re-enter it anyway. We replaced that with a background check so it happens automatically instead of being another yes/no question." },
      { title: "Keep 50+ stakeholders aligned", description: "Presented designs to groups of 50+ people, including my team, the client, and external stakeholders. Worked through gaps between the old and new form language as requirements shifted." },
    ],
  },
  finalDesign: {
    title: "The Medi-Cal renewal flow",
    body: "Updated and new screens covering the HR1 exemption questions and work and community engagement reporting, built on familiar BenefitsCal patterns and written in plain language.",
    images: [],
  },
  reflection: {
    lessons: [
      "Clear documentation and tidy files are a quiet superpower. Labeled, organized designs mean anyone can pick up where I left off",
      "Translating shifting policy language into user-facing steps is as much design work as the screens themselves",
      "Under a tight deadline, reusing a proven pattern can be the best design decision",
    ],
    nextSteps: [
      "Stay closer to development after handoff so design intent carries through to the build",
    ],
  },

  // Optional sections — delete any you don't need:
  // research: { title, body, personas: [...] },
  // metrics: ["..."],
  // flow: { title, body, steps: [...] },
};
