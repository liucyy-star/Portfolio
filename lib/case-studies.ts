export type Accent = "1" | "2" | "3";

export interface CaseStudy {
  accent: Accent;
  tag: string;
  title: string;
  oneLiner: string;
  role: string;
  timeline: string;
  tools: string;
  problem: string;
  process: string;
  solution: string;
  constraints: string;
  impactHeadline: string;
  impactDetail: string;
}

export const caseStudies: CaseStudy[] = [
  {
    accent: "1",
    tag: "Fintech",
    title: "Radix — onboarding redesign",
    oneLiner:
      "Cut a 14-screen sign-up down to six and stopped new users from bailing before their first login.",
    role: "Lead Product Designer",
    timeline: "10 weeks",
    tools: "Figma, Maze, Dovetail",
    problem:
      "New users were dropping off before finishing sign-up. The flow spanned 14 screens with an average completion time of 11 minutes.",
    process:
      "Mapped the full funnel and ran 12 usability sessions. Found redundant identity checks and progress cues that gave users no sense of how close they were to done.",
    solution:
      "Consolidated 14 screens into six, added a progress ring, and moved document verification to run in the background instead of blocking the flow.",
    constraints:
      "Compliance required every identity field to stay, so the win came from sequencing and pacing, not cutting requirements.",
    impactHeadline: "4 min",
    impactDetail:
      "average completion time, down from 11 — and sign-up completion rate up 38% quarter over quarter.",
  },
  {
    accent: "2",
    tag: "Wellness",
    title: "Bloom — daily check-in redesign",
    oneLiner:
      "Replaced a clinical mood scale with something people actually wanted to open every day.",
    role: "Product Designer",
    timeline: "6 weeks",
    tools: "Figma, Lookback",
    problem:
      "Seven-day retention on the daily check-in sat at 9%. Interviews found the mood scale felt like a form, not a moment for the user.",
    process:
      "Shadowed two therapists and tested tone and rhythm of prompts with 20 participants over three weeks, rewriting copy after every round.",
    solution:
      "Swapped the 1–5 scale for a tactile \"weather\" metaphor — sunny, cloudy, stormy — paired with warmer, more varied prompt language.",
    constraints:
      "Clinical advisors needed the data to stay analyzable, so each weather state still mapped to a standard mood score behind the scenes.",
    impactHeadline: "41%",
    impactDetail:
      "seven-day retention, up from 9% — and average session length nearly doubled.",
  },
  {
    accent: "3",
    tag: "Civic tech",
    title: "Ballot Buddy — first-time voter mode",
    oneLiner:
      "Helped first-time voters finish their whole ballot instead of giving up at the local races.",
    role: "Design Researcher",
    timeline: "8 weeks",
    tools: "Figma, Airtable",
    problem:
      "First-time voters abandoned the site once they reached local and down-ballot races they didn't recognize.",
    process:
      "Interviewed 15 first-time voters and partnered with two local newsrooms to source plain-language, nonpartisan candidate summaries.",
    solution:
      "Built a \"know enough to vote\" mode: short summaries per race, a save-and-return ballot, and a printable cheat sheet for the polling booth.",
    constraints:
      "Every summary had to clear a nonpartisan review before shipping, which shaped how fast content could go live before election day.",
    impactHeadline: "72%",
    impactDetail:
      "of test users completed their full ballot, up from 31% on the county's default site.",
  },
];
