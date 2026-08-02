"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowLeft, Building2 } from "lucide-react";
import type { CaseStudyData } from "../lib/caseStudies";

/**
 * CaseStudyList
 * -------------
 * "Case Studies for <Industry> Industry" hub page, shown at
 * /industry/[slug]/case-study. Lists every organization that has a
 * published case study for this industry as a card; each card links
 * through to /industry/[slug]/case-study/[org] for the full story.
 * Adding a new organization is just adding another entry to that
 * industry's array in lib/caseStudies.json — this component never
 * changes.
 */

type CaseStudyListProps = {
  industrySlug: string;
  industryLabel: string;
  caseStudies: CaseStudyData[];
};

const gridVariants: any = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const cardVariants: any = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function OrgCard({
  industrySlug,
  caseStudy,
}: {
  industrySlug: string;
  caseStudy: CaseStudyData;
}) {
  const href = `/industry/${industrySlug}/case-study/${caseStudy.orgSlug}`;
  const headlineStat = caseStudy.results?.stats?.[0];

  return (
    <motion.div variants={cardVariants} className="group relative h-full">
      <div
        className="pointer-events-none absolute -inset-px rounded-[28px] opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-70 bg-gradient-to-br from-[#1131c8] via-[#4b6bfd] to-[#1131c8]"
        aria-hidden="true"
      />
      <Link
        href={href}
        className="relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#070b1d]/90 backdrop-blur-sm transition-transform duration-500 ease-out group-hover:-translate-y-1.5"
      >
        <div className="relative h-40 w-full overflow-hidden">
          <img
            src={caseStudy.hero.bannerImage}
            alt={caseStudy.org}
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b1d] via-[#070b1d]/40 to-transparent" />
        </div>

        <div className="relative flex flex-1 flex-col p-6">
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[#a9b7ff]">
            <Building2 className="h-3.5 w-3.5" />
            {caseStudy.org}
          </div>

          <h3 className="mt-3 line-clamp-2 text-lg font-semibold leading-snug text-white">
            {caseStudy.hero.titleMain}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/55">
            {caseStudy.hero.tagline}
          </p>

          {headlineStat && (
            <div className="mt-4 inline-flex w-fit items-baseline gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
              <span className="text-base font-extrabold bg-gradient-to-r from-[#4b6bfd] to-[#8fa2ff] bg-clip-text text-transparent">
                {headlineStat.value}
              </span>
              <span className="text-xs text-white/60">{headlineStat.label}</span>
            </div>
          )}

          <div className="relative mt-auto flex items-center justify-between pt-6">
            <span className="text-sm font-semibold text-white transition-colors group-hover:text-[#a9b7ff]">
              Read Case Study
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#1131c8] via-[#4b6bfd] to-[#1131c8] transition-transform duration-500 group-hover:translate-x-1 group-hover:rotate-[-40deg]">
              <ArrowUpRight className="h-4 w-4 text-white" strokeWidth={2.25} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function CaseStudyList({
  industrySlug,
  industryLabel,
  caseStudies,
}: CaseStudyListProps) {
  return (
    <section className="relative w-full bg-[#05070d] px-6 sm:px-8 lg:px-16 pt-32 sm:pt-40 pb-20">
      <div className="mx-auto max-w-6xl">
        <Link
          href={`/industry/${industrySlug}`}
          className="mb-6 inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {industryLabel}
        </Link>

        <div className="mb-10 sm:mb-14 max-w-2xl">
          <span className="inline-flex items-center rounded-full border border-blue-400/20 bg-blue-600/20 backdrop-blur-sm px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/90">
            Case Studies
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-white [text-wrap:balance]">
            Case Studies for the {industryLabel} Industry
          </h1>
          <p className="mt-3 text-sm sm:text-[15px] text-white/65 leading-relaxed">
            Real organizations we've helped grow with AI-powered marketing and automation.
            {caseStudies.length > 0 &&
              ` Showing ${caseStudies.length} ${caseStudies.length === 1 ? "case study" : "case studies"} so far — more are added as new projects wrap up.`}
          </p>
        </div>

        {caseStudies.length > 0 ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={gridVariants}
            className="grid grid-cols-1 auto-rows-fr items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {caseStudies.map((cs) => (
              <OrgCard key={cs.orgSlug} industrySlug={industrySlug} caseStudy={cs} />
            ))}
          </motion.div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-8 py-16 text-center">
            <p className="text-white/70">
              We're working on our first {industryLabel} case study — check back soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
