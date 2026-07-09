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
    <section className="w-full bg-[#05070d] px-6 py-10 md:py-14">
      <motion.div
        className="w-full max-w-6xl mx-auto rounded-2xl bg-[#232529] px-8 md:px-12 py-12 md:py-14 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="flex-shrink-0 text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white/25">
          {data.label}
        </h2>
        <p className="text-[15px] md:text-base leading-relaxed font-semibold text-gray-100 max-w-2xl">
          {data.description}
        </p>
      </motion.div>
    </section>
  );
}