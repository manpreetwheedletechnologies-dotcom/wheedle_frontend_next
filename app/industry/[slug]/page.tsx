// src/app/industry/[slug]/page.tsx

import { redirect } from "next/navigation";
import { getIndustryBySlug, getAllIndustrySlugs } from "../../../lib/industries";

import HeroSection from "../../../components/HeroSection";
import WhyChoose from "../../../components/WhyChoose";
import About from "../../../components/About";
import Newsletter from "../../../components/Newsletter";
import Cta from "../../../components/Cta";
import Business from "../../../components/Business";
import Services from "../../../components/Services";
import AiImpact from "../../../components/AiImpact";
import Challenges from "../../../components/Challenges";
import PageWrapper from "../../../components/PageWrapper";

export function generateStaticParams() {
  return getAllIndustrySlugs().map((slug) => ({ slug }));
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const industry = getIndustryBySlug(slug);

  if (!industry) {
    redirect("/industry/automotive-industry");
  }

  return (
    <PageWrapper>
      <HeroSection data={industry.heroSection } />

      {industry.challengesSection && (
        <Challenges data={industry.challengesSection} />
      )}

      <Business data={industry.businessSection} />

      {industry.servicesGridSection && (
        <Services data={industry.servicesGridSection} />
      )}

      {industry.whyChooseSection && (
        <WhyChoose data={industry.whyChooseSection} />
      )}

      {industry.aiImpactSection && (
        <AiImpact data={industry.aiImpactSection} />
      )}

      {industry.aboutSection && (
        <About data={industry.aboutSection} />
      )}

      {industry.ctaCardSection && (
        <Cta data={industry.ctaCardSection} />
      )}

      <Newsletter
        content={{
          titleLine1: "Subscribe to Our",
          titleLine2Primary: slug,
          titleLine2Secondary: " Newsletter",
          description:
            "Stay updated with the latest insights, trends, and expert opinions in technology, design, and digital transformation.",
          inputType: "email",
          inputPlaceholder: "Enter your email",
          buttonText: "Subscribe",
          successMessage: "Thanks for subscribing 🎉",
        }}
      />
    </PageWrapper>
  );
}