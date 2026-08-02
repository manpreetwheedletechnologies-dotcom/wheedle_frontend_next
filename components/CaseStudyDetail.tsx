"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Quote } from "lucide-react";
import type { CaseStudyData } from "../lib/caseStudies";

/**
 * CaseStudyDetail
 * ---------------
 * Full detail page for /view-case-studies/[slug]. Mirrors the visual
 * language of the /industry/[slug] page (dark background, blue glow
 * accents, glass badge pill) but is laid out for a single case study:
 * hero -> quick facts -> challenge -> approach -> results -> testimonial.
 * Everything is driven by lib/caseStudies.json so this component never
 * changes when a new case study is added.
 */

type CaseStudyDetailProps = {
  data: CaseStudyData;
  industrySlug: string;
};

const fadeUp: any = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function CaseStudyDetail({ data, industrySlug }: CaseStudyDetailProps) {
  const { hero, overview, challenge, solution, results, testimonial } = data;

  return (
    <section className="relative w-full bg-[#05070d]">
      {/* --- hero banner --- */}
      <div className="relative w-screen mx-[calc(50%-50vw)] bg-[#05070d] aspect-[3/4] sm:aspect-[16/9] md:aspect-[24/9] max-h-[480px] sm:max-h-[520px] overflow-hidden">
        <motion.img
          src={hero.bannerImage}
          alt={hero.titleMain}
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.02]"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1.02 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-x-0 top-0 h-28 sm:h-36 md:h-44 bg-gradient-to-b from-[#05070d] via-[#05070d]/70 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-24 sm:w-32 md:w-40 bg-gradient-to-r from-[#05070d] via-[#05070d]/90 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-32 md:w-40 bg-gradient-to-l from-[#05070d] via-[#05070d]/90 to-transparent" />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(5,7,13,0) 45%, rgba(5,7,13,0.55) 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#05070d] to-transparent" />
      </div>

      {/* --- badge pill --- */}
      <div className="relative z-10 -mt-10 sm:-mt-14 md:-mt-16 flex justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="group relative inline-flex items-center gap-2 rounded-full border border-white/25 bg-gradient-to-r from-white/20 via-white/10 to-white/20 backdrop-blur-md px-6 sm:px-10 py-3 sm:py-3.5 shadow-[0_18px_35px_-10px_rgba(0,0,0,0.55)]"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-1 rounded-full bg-gradient-to-r from-[#1131c8]/0 via-[#4b6bfd]/40 to-[#1131c8]/0 opacity-60 blur-md"
          />
          <span className="relative text-xs sm:text-sm font-bold text-white tracking-wide text-center uppercase">
            {hero.badge}
          </span>
          <span className="relative hidden sm:inline text-xs font-medium text-white/60">
            · {hero.clientTag}
          </span>
        </motion.div>
      </div>

      {/* --- title + description --- */}
      <motion.div
        className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-6 pb-4 flex flex-col items-center text-center"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <Link
          href={`/industry/${industrySlug}/case-study`}
          className="mb-5 inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Case Studies
        </Link>

        <h1 className="text-2xl md:text-4xl font-bold text-white max-w-3xl [text-wrap:balance]">
          {hero.titleMain}
        </h1>
        <h2 className="mt-3 text-base md:text-lg font-semibold text-[#8fa2ff]">
          {hero.tagline}
        </h2>
        <p className="mt-4 max-w-3xl text-sm md:text-[15px] leading-relaxed text-white/75">
          {hero.description}
        </p>
      </motion.div>

      {/* --- quick facts / overview --- */}
      <motion.div
        className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-16 sm:pb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {overview.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm px-4 py-5 text-center"
            >
              <p className="text-[11px] uppercase tracking-[0.12em] text-white/45 font-semibold">
                {item.label}
              </p>
              <p className="mt-1.5 text-sm sm:text-[15px] font-semibold text-white">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* --- challenge + solution --- */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-16 sm:pb-20 grid md:grid-cols-2 gap-6 md:gap-8">
        {[challenge, solution].map((block, idx) => (
          <motion.div
            key={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 sm:p-8"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              {block.title}
            </h3>
            <p className="text-sm text-white/70 leading-relaxed mb-5">
              {block.description}
            </p>
            <ul className="space-y-3">
              {block.points.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-[#4b6bfd]" />
                  <span className="text-sm text-white/75 leading-relaxed">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* --- results --- */}
      <motion.div
        className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-16 sm:pb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            {results.title}
          </h3>
          <p className="mt-2 text-sm sm:text-[15px] text-white/70 max-w-2xl mx-auto">
            {results.description}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {results.stats.map((stat, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#101736] to-[#05070d] px-4 py-6 text-center"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-[#4b6bfd]/20 blur-2xl"
              />
              <p className="relative text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-[#4b6bfd] to-[#8fa2ff] bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="relative mt-1.5 text-xs sm:text-sm text-white/70 font-medium leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* --- testimonial --- */}
      <motion.div
        className="relative z-10 w-full max-w-3xl mx-auto px-6 pb-20 sm:pb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] px-6 sm:px-10 py-8 sm:py-10 text-center">
          <Quote className="w-8 h-8 mx-auto mb-4 text-[#4b6bfd]" />
          <p className="text-base sm:text-lg text-white/90 italic leading-relaxed [text-wrap:balance]">
            "{testimonial.quote}"
          </p>
          <p className="mt-5 text-sm font-semibold text-white">
            {testimonial.author}
          </p>
          <p className="text-xs text-white/50">{testimonial.role}</p>
        </div>
      </motion.div>
    </section>
  );
}
