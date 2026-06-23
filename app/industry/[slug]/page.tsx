// src/app/industry/[slug]/page.tsx

import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { getIndustryBySlug, getAllIndustrySlugs } from "../../../lib/industries";

import Header from "../../../components/Header";
import HeroSection from "../../../components/HeroSection";
import HowWeHelpSection from "../../../components/Howwehelpsection";
import SolutionsSection from "../../../components/Solutionssection";
import WhyChooseSection from "../../../components/Whychoosesection";
import LaunchCTA from "@/landing/components/LaunchCTA";
import Newsletter from "../../../components/Newsletter";
import ServeSection from "../../../components/Whoweserve";
import Footer from "../../../components/Footer";
// import FAQ from "@/landing/components/FAQ";

import {
  industryHeroImages,
  solutionsHeroImages,
  serveImages,
} from "../../../lib/industryHeroImages";

const AnimatedCursor = dynamic(
  () => import("react-animated-cursor"),
  
);

// Tells Next.js every valid industry slug so pages are statically generated
export function generateStaticParams() {
  return getAllIndustrySlugs().map((slug) => ({ slug }));
}

// SEO Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const industry = getIndustryBySlug(slug);

  return {
    title: industry?.heroSection?.title ?? "Industry",
  };
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

  const heroImage = industryHeroImages[slug.toLowerCase()];
  const solutionsImage = solutionsHeroImages[slug.toLowerCase()];
  const serveimage = serveImages[slug.toLowerCase()];

  return (
    <main className="w-full bg-[#0b0c10]">
      <AnimatedCursor
        innerSize={8}
        outerSize={30}
        innerScale={1}
        outerScale={2}
        outerAlpha={0}
        innerStyle={{ backgroundColor: "#FFFFFF" }}
        outerStyle={{ backgroundColor: "#ffffff3b" }}
      />

      <HeroSection
        data={industry.heroSection}
        heroImage={heroImage}
      />

      <HowWeHelpSection
        data={industry.servicesSection}
      />

      {industry.challengesSection && (
        <SolutionsSection
          data={industry.challengesSection}
          solutionsImage={solutionsImage}
        />
      )}

      {industry.whyChooseUsSection && (
        <WhyChooseSection
          data={industry.whyChooseUsSection}
        />
      )}

      {industry.whoWeServeSection && (
        <ServeSection
          data={industry.whoWeServeSection}
          serveimage={serveimage}
        />
      )}

      {/* {industry.ctaSection && (
        <LaunchCTA data={industry.ctaSection} />
      )} */}

      {/* {industry.faqSection && (
        <FAQ data={industry.faqSection} />
      )} */}

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
    </main>
  );
}