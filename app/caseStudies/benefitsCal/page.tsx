import CaseStudyTemplate from "@/components/CaseStudyTemplate";
import { benefitsCal } from "@/lib/caseStudies/benefitsCal";
import styles from "./page.module.css";
import { dmSans, plexSans, plexMono } from "./fonts";

export const metadata = { title: benefitsCal.title, description: benefitsCal.oneLiner };

export default function Page() {
  return (
    <CaseStudyTemplate
      study={benefitsCal}
      styles={styles}
      fontClass={`${dmSans.variable} ${plexSans.variable} ${plexMono.variable}`}
    />
  );
}