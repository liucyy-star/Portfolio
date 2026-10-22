export type GalleryItem = { src: string; alt: string; caption?: string };

export type Gallery = {
  kicker: string; // small label above the title
  title: string;
  intro: string;
  items: GalleryItem[];
};

export const graphicDesign: Gallery = {
  kicker: "beyond ux",
  title: "Graphic design",
  intro: "Posters, branding, and visual pieces where I get to play with color and type.",
  items: [
    { src: "/graphic-design/piece-1.jpg", alt: "Describe the image", caption: "Project name, year" },
    { src: "/graphic-design/piece-2.jpg", alt: "Describe the image" },
  ],
};

export const photography: Gallery = {
  kicker: "beyond ux",
  title: "Photography",
  intro: "A collection of places and people seen through my lens. Each series shows my eye for composition growing over time.",
  items: [
    { src: "/photography/photo-1.jpg", alt: "Describe the photo", caption: "Location, year" },
  ],
};