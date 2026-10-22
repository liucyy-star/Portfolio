import CaseStudyTemplate from "@/components/CaseStudyTemplate";
import { apexFintech } from "@/lib/caseStudies/apexFintech";
import styles from "./page.module.css";
import { dmSans, plexSans, plexMono } from "./fonts";

export const metadata = { title: apexFintech.title, description: apexFintech.oneLiner };

export default function Page() {
  return (
    <CaseStudyTemplate
      study={apexFintech}
      styles={styles}
      fontClass={`${dmSans.variable} ${plexSans.variable} ${plexMono.variable}`}
    />
  );
}