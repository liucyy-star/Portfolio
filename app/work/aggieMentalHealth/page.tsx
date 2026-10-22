import CaseStudyTemplate from "@/components/CaseStudyTemplate";
import { aggieMentalHealth } from "@/lib/caseStudies/aggieMentalHealth";
import styles from "./page.module.css";
import { dmSans, plexSans, plexMono } from "./fonts";

export const metadata = { title: aggieMentalHealth.title, description: aggieMentalHealth.oneLiner };

export default function Page() {
  return (
    <CaseStudyTemplate
      study={aggieMentalHealth}
      styles={styles}
      fontClass={`${dmSans.variable} ${plexSans.variable} ${plexMono.variable}`}
    />
  );
}