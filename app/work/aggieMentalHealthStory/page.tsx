import type { Metadata } from "next";
import { figtree, plexMono } from "./fonts";
import { aggieMentalHealth } from "@/lib/caseStudies/aggieMentalHealth";
import AggieStory from "./AggieStory";

export const metadata: Metadata = {
  title: `${aggieMentalHealth.title} (Scroll Story)`,
  description: aggieMentalHealth.oneLiner,
};

export default function AggieMentalHealthStoryPage() {
  return (
    <div className={`${figtree.variable} ${plexMono.variable}`}>
      <AggieStory />
    </div>
  );
}
