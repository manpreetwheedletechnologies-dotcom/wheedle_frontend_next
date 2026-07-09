"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * About
 * -----
 * "About Us" band used across every /industry/[slug] page. Label and
 * paragraph both come from JSON so this one component serves every
 * industry.
 */

export type AboutData = {
  label: string;
  description: string;
};

type AboutProps = {
  data: AboutData;
};

export default function About({ data }: AboutProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#05070d] px-6 py-10 md:py-14">
      {/* ambient theme glow sitting behind the glass card */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#1131c8] via-[#4b6bfd] to-[#1131c8] opacity-25 blur-[110px]"
        aria-hidden="true"
      />

      <motion.div
        className="relative mx-auto flex w-full max-w-6xl flex-col items-start gap-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] px-8 py-12 shadow-[0_8px_40px_-12px_rgba(19,45,200,0.45)] backdrop-blur-2xl md:flex-row md:items-center md:gap-10 md:px-12 md:py-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* glass sheen along the top edge */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
          aria-hidden="true"
        />
        {/* soft gradient wash in the corner, on top of the blur so it reads through the glass */}
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br from-[#1131c8] via-[#4b6bfd] to-[#1131c8] opacity-30 blur-3xl"
          aria-hidden="true"
        />

        <h2 className="relative flex-shrink-0 bg-gradient-to-br from-white/60 via-[#8ea1ff]/50 to-white/20 bg-clip-text text-3xl font-extrabold uppercase tracking-tight text-transparent md:text-4xl lg:text-5xl">
          {data.label}
        </h2>
        <p className="relative max-w-2xl text-[15px] font-semibold leading-relaxed text-white/90 md:text-base">
          {data.description}
        </p>
      </motion.div>
    </section>
  );
}