// src/lib/caseStudies.ts
import caseStudiesRaw from "./caseStudies.json";

export interface CaseStudyOverviewItem {
  label: string;
  value: string;
}

export interface CaseStudySection {
  title: string;
  description: string;
  points: string[];
}

export interface CaseStudyResultStat {
  value: string;
  label: string;
}

export interface CaseStudyResults {
  title: string;
  description: string;
  stats: CaseStudyResultStat[];
}

export interface CaseStudyTestimonial {
  quote: string;
  author: string;
  role: string;
}

export interface CaseStudyHero {
  bannerImage: string;
  badge: string;
  clientTag: string;
  titleMain: string;
  tagline: string;
  description: string;
}

export interface CaseStudyCta {
  image: string;
  imageAlt?: string;
  titleLine1: string;
  titleHighlight: string;
  description: string;
  button: {
    label: string;
    url: string;
  };
}

export interface CaseStudyData {
  /** Organization this case study is about, e.g. "Savorka Solar". */
  org: string;
  /** URL-safe slug for the organization, e.g. "savorka-solar". */
  orgSlug: string;
  hero: CaseStudyHero;
  overview: CaseStudyOverviewItem[];
  challenge: CaseStudySection;
  solution: CaseStudySection;
  results: CaseStudyResults;
  testimonial: CaseStudyTestimonial;
  cta: CaseStudyCta;
}

// Each industry now maps to a LIST of case studies (one per organization),
// so multiple client stories can live under the same industry over time.
// Cast once here — JSON has no literal types, so this is where we
// tell TS "trust me, this matches the real shape."
const caseStudiesData = caseStudiesRaw as unknown as Record<string, CaseStudyData[]>;

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

/** Finds the industry key (e.g. "MSME") whose slug matches, case-insensitively. */
function findIndustryEntry(industrySlug: string): [string, CaseStudyData[]] | undefined {
  const normalized = industrySlug.toLowerCase();
  return Object.entries(caseStudiesData).find(
    ([name]) => slugify(name) === normalized
  );
}

/** All case studies (organizations) published for a given industry slug. */
export function getCaseStudiesForIndustry(industrySlug: string): CaseStudyData[] {
  const entry = findIndustryEntry(industrySlug);
  return entry ? entry[1] : [];
}

/** The human-readable industry name for a given slug, e.g. "MSME". */
export function getIndustryLabelBySlug(industrySlug: string): string | null {
  const entry = findIndustryEntry(industrySlug);
  return entry ? entry[0] : null;
}

/** A single organization's case study within an industry. */
export function getCaseStudyByOrgSlug(
  industrySlug: string,
  orgSlug: string
): CaseStudyData | null {
  const list = getCaseStudiesForIndustry(industrySlug);
  const normalizedOrgSlug = orgSlug.toLowerCase();
  return list.find((cs) => cs.orgSlug.toLowerCase() === normalizedOrgSlug) ?? null;
}

/** Every industry slug that has at least one published case study. */
export function getAllCaseStudyIndustrySlugs(): string[] {
  return Object.keys(caseStudiesData).map(slugify);
}

/** Every {slug, org} pair, for generateStaticParams on the org detail page. */
export function getAllCaseStudyOrgParams(): { slug: string; org: string }[] {
  return Object.entries(caseStudiesData).flatMap(([industryName, list]) =>
    list.map((cs) => ({ slug: slugify(industryName), org: cs.orgSlug }))
  );
}
