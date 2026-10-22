import type { Metadata } from "next";
import { dmSans, plexSans, plexMono } from "../apexFintech/fonts";
import { apexFintech } from "@/lib/caseStudies/apexFintech";
import ApexStory from "./ApexStory";

export const metadata: Metadata = {
  title: `${apexFintech.title} (Scroll Story)`,
  description: apexFintech.oneLiner,
};

export default function ApexFintechStoryPage() {
  const fontVars = `${dmSans.variable} ${plexSans.variable} ${plexMono.variable}`;

  return (
    <div className={fontVars}>
      <ApexStory />
    </div>
  );
}
