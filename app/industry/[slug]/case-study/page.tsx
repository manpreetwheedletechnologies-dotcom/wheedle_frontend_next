// src/app/industry/[slug]/case-study/page.tsx

import { redirect } from "next/navigation";
import {
  getCaseStudiesForIndustry,
  getIndustryLabelBySlug,
  getAllCaseStudyIndustrySlugs,
} from "../../../../lib/caseStudies";
import { getIndustryBySlug } from "../../../../lib/industries";

import PageWrapper from "../../../../components/PageWrapper";
import CaseStudyList from "../../../../components/CaseStudyList";

export function generateStaticParams() {
  return getAllCaseStudyIndustrySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industryLabel = getIndustryLabelBySlug(slug);

  return {
    title: industryLabel
      ? `Case Studies for the ${industryLabel} Industry | Wheedle Technologies`
      : "Case Studies | Wheedle Technologies",
  };
}

export default async function IndustryCaseStudyListPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // The industry itself must exist, even if it has no case studies yet.
  if (!getIndustryBySlug(slug)) {
    redirect("/industry/msme");
  }

  const industryLabel = getIndustryLabelBySlug(slug) ?? slug;
  const caseStudies = getCaseStudiesForIndustry(slug);

  return (
    <PageWrapper>
      <CaseStudyList
        industrySlug={slug.toLowerCase()}
        industryLabel={industryLabel}
        caseStudies={caseStudies}
      />
    </PageWrapper>
  );
}
