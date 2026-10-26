import { Figtree, IBM_Plex_Mono } from "next/font/google";

// Figtree stands in for Proxima Nova, the campaign's typeface (not on Google Fonts).
export const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "800"],
  variable: "--font-display",
  display: "swap",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});
