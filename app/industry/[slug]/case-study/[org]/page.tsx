// src/app/industry/[slug]/case-study/[org]/page.tsx

import { redirect } from "next/navigation";
import {
  getCaseStudyByOrgSlug,
  getAllCaseStudyOrgParams,
} from "../../../../../lib/caseStudies";

import PageWrapper from "../../../../../components/PageWrapper";
import CaseStudyDetail from "../../../../../components/CaseStudyDetail";
import Cta from "../../../../../components/Cta";

export function generateStaticParams() {
  return getAllCaseStudyOrgParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; org: string }>;
}) {
  const { slug, org } = await params;
  const caseStudy = getCaseStudyByOrgSlug(slug, org);

  if (!caseStudy) {
    return { title: "Case Study | Wheedle Technologies" };
  }

  return {
    title: `${caseStudy.org} — ${caseStudy.hero.titleMain} | Wheedle Technologies`,
    description: caseStudy.hero.description,
  };
}

export default async function OrgCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string; org: string }>;
}) {
  const { slug, org } = await params;

  const caseStudy = getCaseStudyByOrgSlug(slug, org);

  if (!caseStudy) {
    redirect(`/industry/${slug}/case-study`);
  }

  return (
    <PageWrapper>
      <CaseStudyDetail data={caseStudy} industrySlug={slug.toLowerCase()} />

      {caseStudy.cta && <Cta data={caseStudy.cta} />}
    </PageWrapper>
  );
}
