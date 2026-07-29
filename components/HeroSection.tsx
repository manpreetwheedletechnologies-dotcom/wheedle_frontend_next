"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "./Button_x";
import dynamic from 'next/dynamic';
const ContactModal = dynamic(() => import('./ContactModal'), { ssr: false });
/**
 * HeroSection
 * -----------
 * Shared hero used across every /industry/[slug] page.
 * Full-bleed banner image sits at the very top of the page — behind the
 * fixed header (no spacer pushing it down anymore) — with a soft top
 * vignette so header text/logo stays legible over it. Badge/title sit in
 * a glass pill overlapping the bottom edge of the banner, followed by
 * tagline, description and CTA buttons on a soft blue glow backdrop.
 * All content is driven by JSON so this component never changes when a
 * new industry is added.
 */

type HeroButton = {
  label: string;
  url: string;
  style?: "primary" | "secondary";
};

export type HeroSectionData = {
  bannerImage: string; // full-width banner image path
  badge: string; // e.g. "Next-Gen MSME Growth Solutions"
  titleMain: string;
  titlePrefix?: string;
  titleHighlight: string;
  tagline: string;
  description: string;
  buttons: HeroButton[];
};

type HeroSectionProps = {
  data: HeroSectionData;
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.25 },
  },
};

export default function HeroSection({ data }: HeroSectionProps) {
  const [openContact, setOpenContact] = useState(false);
  return (
    <section className="relative w-full bg-[#05070d]">
      {/* --- full-bleed banner ---
          No top spacer anymore: the image starts at y=0 and runs UNDER
          the fixed header (make sure the header itself uses a
          transparent/blurred background over the hero, e.g.
          `bg-transparent lg:bg-[#05070d]/0 backdrop-blur-0` at the top of
          the page, switching to solid once the user scrolls past this
          section). A soft top-to-transparent vignette keeps header
          logo/nav legible regardless of what's underneath. */}
      <div className="relative w-screen mx-[calc(50%-50vw)] bg-[#05070d] aspect-[3/4] sm:aspect-[16/9] md:aspect-[24/9] max-h-[480px] sm:max-h-[520px] overflow-hidden">
        <motion.img
          src={data.bannerImage}
          alt={data.titleHighlight}
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.02]"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1.02 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* top vignette so header nav/logo reads over any image, and so
            the banner doesn't feel flush against the very top edge */}
        <div className="absolute inset-x-0 top-0 h-28 sm:h-36 md:h-44 bg-gradient-to-b from-[#05070d] via-[#05070d]/70 to-transparent" />

        {/* side vignettes - stronger black gradients for full-page image effect */}
        <div className="absolute inset-y-0 left-0 w-24 sm:w-32 md:w-40 bg-gradient-to-r from-[#05070d] via-[#05070d]/90 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-32 md:w-40 bg-gradient-to-l from-[#05070d] via-[#05070d]/90 to-transparent" />

        {/* center vignette - subtle radial darkening at the corners so
            the black base feels balanced/centered behind the badge and
            text instead of only living at the top/bottom/sides */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(5,7,13,0) 45%, rgba(5,7,13,0.55) 100%)",
          }}
        />

        {/* bottom fade into the content area below */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#05070d] to-transparent" />
      </div>

      {/* --- title pill, pulled up so it overlaps further into the banner --- */}
      <div className="relative z-10 -mt-10 sm:-mt-14 md:-mt-16 flex justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="group relative inline-flex items-center rounded-full border border-white/25 bg-gradient-to-r from-white/20 via-white/10 to-white/20 backdrop-blur-md px-7 sm:px-12 py-3.5 sm:py-4.5 shadow-[0_18px_35px_-10px_rgba(0,0,0,0.55)]"
        >
          {/* subtle animated glow ring behind the pill */}
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-1 rounded-full bg-gradient-to-r from-[#1131c8]/0 via-[#4b6bfd]/40 to-[#1131c8]/0 opacity-60 blur-md"
          />
          <h1 className="relative text-base sm:text-xl md:text-2xl font-bold text-white tracking-wide text-center uppercase [text-wrap:balance]">
            {data.badge}
          </h1>
        </motion.div>
      </div>

      {/* --- content --- */}
      <motion.div
        className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-6 pb-14 md:pt-8 md:pb-16 flex flex-col items-center text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Subtitle / tagline */}
        <motion.h2
          variants={itemVariants}
          className="text-lg md:text-xl font-bold text-white max-w-2xl [text-wrap:balance]"
        >
          {data.tagline}
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="mt-3 max-w-4xl text-sm md:text-[15px] leading-relaxed text-white/85"
        >
          {data.description}
        </motion.p>

        {/* Buttons on a soft blue glow backdrop */}
        <motion.div
          variants={itemVariants}
          className="relative mt-6 w-full flex justify-center"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[220px] rounded-full opacity-70 animate-pulse"
            style={{
              background:
                "radial-gradient(circle, rgba(75,107,253,0.35) 0%, rgba(17,49,200,0.15) 40%, rgba(5,7,13,0) 75%)",
              animationDuration: "4s",
            }}
          />
          <div className="relative flex flex-col sm:flex-row items-center gap-5 sm:gap-7">
            {data.buttons?.map((btn, i) =>
              btn.style === "secondary" ? (
                <Link key={i} href={btn.url}>
                  <Button onClick={() => setOpenContact(true)} padding="25px 20px">{btn.label}</Button>
                </Link>
              ) : (
                <Link key={i} href={btn.url} className="group relative">
                  <span
                    aria-hidden
                    className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#1131c8] via-[#4b6bfd] to-[#1131c8] opacity-40 blur-lg transition-opacity duration-300 group-hover:opacity-90"
                  />
                  <button className="relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-6 sm:px-9 md:px-10 lg:px-11 h-[50px] sm:h-[52px] lg:h-[56px] bg-gradient-to-l from-[#1131c8] via-[#4b6bfd] to-[#1131c8] text-white text-[15px] sm:text-[16px] lg:text-[17px] font-medium rounded-full transition-all duration-300 shadow-md shadow-neutral-600 max-w-[400px] sm:max-w-none group-hover:scale-[1.04] group-hover:shadow-[0_10px_40px_-8px_rgba(75,107,253,0.7)] group-hover:from-[#1131c8] group-hover:via-[#212ba9] group-hover:to-[#212ba9] border-2 border-blue-300">
                    <img src="/GetFree.png" alt={`${btn.label}`} />
                    {btn.label}
                  </button>
                </Link>
              )
            )}
          </div>
        </motion.div>

        {/* scroll cue — subtle nudge that there's more below */}
        <motion.div
          variants={itemVariants}
          className="mt-6 flex flex-col items-center gap-1.5 text-white/40"
        >
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="block w-[1px] h-6 bg-gradient-to-b from-white/60 to-transparent"
          />
        </motion.div>
      </motion.div>
      {openContact && (
        <ContactModal
          onClose={() => setOpenContact(false)}
          title="Get the Complete Case Study"
          description="Enter your details to receive the full case study and learn how we delivered measurable results."
          contactEmail="info@wheedletechnologies.ai"
          contactPhone="+91 9717672561"
          messagePlaceholder="Your message (optional)"
        />
      )}
    </section>
  );
}