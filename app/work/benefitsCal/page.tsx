import CaseStudyTemplate from "@/components/CaseStudyTemplate";
import { benefitsCal } from "@/lib/caseStudies/benefitsCal";
import styles from "./page.module.css";
import { nunito, sourceSans } from "./fonts";

export const metadata = { title: benefitsCal.title, description: benefitsCal.oneLiner };

export default function Page() {
  return (
    <CaseStudyTemplate
      study={benefitsCal}
      styles={styles}
      fontClass={`${nunito.variable} ${sourceSans.variable}`}
    />
  );
}