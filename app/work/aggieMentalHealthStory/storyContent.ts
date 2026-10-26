export type Shot = {
  src: string;
  alt: string;
  width: number;
  height: number;
  label: string;
  caption: string;
};

export type Swatch = { name: string; hex: string; ink: string };
export type Element = { name: string; src: string };

const dir = "/case-studies/aggie";

// From the client brief: what the new identity had to feel like.
export const briefWords = ["approachable", "accessible", "honest", "supportive"];

// Headline shortlist from the AMH Graphic Standard.
export const headlines = [
  "Your productivity does not determine your worth",
  "Have you taken a break today?",
  "Self-care is not selfish",
  "Be kind to yourself",
  "It’s OK to feel stuck",
  "There’s no deadline for success",
  "Strive for progress, not perfection",
  "You are worth it",
  "Watch yourself grow",
];

// Hand-drawn in Adobe Fresco, vectorized in Illustrator (transparent PNGs, used as masks).
// The "hands" set in the Graphic Standard is Lauren's original design, so it's left out.
export const elements: Element[] = [
  { name: "Flowers", src: `${dir}/element-flowers.png` },
  { name: "Leaves", src: `${dir}/element-leaves.png` },
  { name: "Halo + dots", src: `${dir}/element-halo-dots.png` },
  { name: "Squiggles", src: `${dir}/element-squiggles.png` },
  { name: "Organic shapes", src: `${dir}/element-organic-shapes.png` },
  { name: "Stems", src: `${dir}/element-stems.png` },
];

// Brand palette, named in the AMH Graphic Standard. All UC Davis brand colors.
export const palette: Swatch[] = [
  { name: "Sage", hex: "#6FC395", ink: "#10291b" },
  { name: "Farmer’s Market", hex: "#AADA91", ink: "#1d3311" },
  { name: "Sunflower", hex: "#FFCD00", ink: "#3a2f00" },
  { name: "Gunrock", hex: "#0046B9", ink: "#ffffff" },
  { name: "Poppy", hex: "#F08900", ink: "#2e1a00" },
  { name: "Rose", hex: "#FF8188", ink: "#3b1214" },
];

export const exploration: Shot[] = [
  {
    src: `${dir}/explore-type-iteration.png`,
    alt: "“watch yourself grow” set in outlined and filled green type, several ways",
    width: 1400,
    height: 1812,
    label: "Type, iteration 1",
    caption: "Outlined vs. filled Proxima Nova. Filled, all-lowercase text won.",
  },
  {
    src: `${dir}/explore-prog-brand-1.png`,
    alt: "The stacked “aggie mental health” name decorated with leaves, flowers and colored blobs",
    width: 1400,
    height: 1812,
    label: "Programmatic branding",
    caption: "Hand-drawn leaves and blobs tucked around the name.",
  },
  {
    src: `${dir}/explore-prog-brand-2.png`,
    alt: "Round badges with the name over colorful overlapping organic shapes",
    width: 1400,
    height: 1812,
    label: "Badges, full color",
    caption: "Every color at once: lively, but the words started to get lost.",
  },
  {
    src: `${dir}/explore-prog-brand-3.png`,
    alt: "Round badges with the name in greens only",
    width: 1400,
    height: 1812,
    label: "Badges, all green",
    caption: "Feedback: “Too much green; looks flat & not engaging.”",
  },
];

export const finalWordmark: Shot = {
  src: `${dir}/wordmark-stacked.png`,
  alt: "Final wordmark: “aggie mental health” stacked in sage green, with “mental” in extra bold",
  width: 526,
  height: 431,
  label: "Final",
  caption: "Just the words. The name does the work; the doodles do the warmth.",
};

export const posters: Shot[] = [
  {
    src: `${dir}/poster-resting.jpg`,
    alt: "Poster: “resting IS productive” over a student lying in the grass",
    width: 1200,
    height: 1553,
    label: "Flyer",
    caption: "resting IS productive",
  },
  {
    src: `${dir}/poster-deadline.jpg`,
    alt: "Poster: “there’s no deadline for success” over a student in a design studio",
    width: 1200,
    height: 1553,
    label: "Flyer",
    caption: "there’s no deadline for success",
  },
  {
    src: `${dir}/poster-stuck.jpg`,
    alt: "Poster: “it’s OK to feel stuck” over a student’s reflection in a puddle",
    width: 1200,
    height: 1553,
    label: "Flyer",
    caption: "it’s OK to feel stuck",
  },
  {
    src: `${dir}/poster-selfcare.jpg`,
    alt: "Poster: “self-care is not selfish” over a student in a record store",
    width: 1200,
    height: 1553,
    label: "Flyer",
    caption: "self-care is not selfish",
  },
];

// The wider system, panned sideways.
export const applications: Shot[] = [
  {
    src: `${dir}/lcd-be-kind.jpg`,
    alt: "Campus screen: “be kind to yourself” over a student in a hammock",
    width: 1920,
    height: 1280,
    label: "Campus LCD",
    caption: "be kind to yourself",
  },
  {
    src: `${dir}/social-3.jpg`,
    alt: "Social post: “be kind to yourself” around a hand-drawn heart of hands",
    width: 1001,
    height: 1001,
    label: "Social",
    caption: "Instagram square",
  },
  {
    src: `${dir}/lcd-check-in.jpg`,
    alt: "Campus screen: “have you checked in on your friends today?” over two students with bikes",
    width: 1921,
    height: 1280,
    label: "Campus LCD",
    caption: "have you checked in on your friends today?",
  },
  {
    src: `${dir}/sticker-1.png`,
    alt: "Round sticker: “resting is productive” with doodles",
    width: 700,
    height: 700,
    label: "Sticker",
    caption: "Ambassador swag",
  },
  {
    src: `${dir}/lcd-ok-not-ok.jpg`,
    alt: "Campus screen: “it’s okay to not be okay” over a silhouette",
    width: 1921,
    height: 1282,
    label: "Campus LCD",
    caption: "it’s okay to not be okay",
  },
  {
    src: `${dir}/coffee-sleeve.png`,
    alt: "Coffee sleeve: “be kind to yourself” and “you matter, and your mental health matters”",
    width: 1600,
    height: 559,
    label: "Print",
    caption: "Coffee sleeve",
  },
  {
    src: `${dir}/lcd-productivity.jpg`,
    alt: "Campus screen: “your productivity does not determine your worth” over a student drawing",
    width: 1920,
    height: 1080,
    label: "Campus LCD",
    caption: "your productivity does not determine your worth",
  },
  {
    src: `${dir}/sticker-4.png`,
    alt: "Round sticker: “strive for progress, not perfection” with doodles",
    width: 700,
    height: 700,
    label: "Sticker",
    caption: "Ambassador swag",
  },
  {
    src: `${dir}/lcd-talk-to-someone.jpg`,
    alt: "Campus screen: “don’t keep it all in. talk to someone.” over a student on a bench",
    width: 1920,
    height: 1080,
    label: "Campus LCD",
    caption: "don’t keep it all in",
  },
];
