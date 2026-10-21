import type { CaseStudy } from "./types";
import { apexFintech } from "./apexFintech";
import { benefitsCal } from "./benefitsCal";
//would need to import the more case studies i add

export type { CaseStudy, Accent } from "./types";

// Add new case studies within the array — order = order on the homepage.
export const caseStudies: CaseStudy[] = [benefitsCal, apexFintech];
