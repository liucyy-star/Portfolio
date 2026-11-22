import CaseStudyTemplate from "@/components/CaseStudyTemplate";
import { benefitsPortal } from "@/lib/caseStudies/benefitsPortal";
import styles from "./page.module.css";
import { nunito, sourceSans } from "./fonts";

export const metadata = { title: benefitsPortal.title, description: benefitsPortal.oneLiner };

export default function Page() {
  return (
    <CaseStudyTemplate
      study={benefitsPortal}
      styles={styles}
      fontClass={`${nunito.variable} ${sourceSans.variable}`}
    />
  );
}