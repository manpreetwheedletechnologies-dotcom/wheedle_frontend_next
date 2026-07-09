"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

/**
 * Cta
 * ---
 * "Ready to Grow Your <Industry> Business?" call-to-action card used
 * across every /industry/[slug] page. Title, description and button
 * (label + url) all come from JSON so this one component serves every
 * industry.
 */

export type CtaData = {
  title: string;
  description: string;
  button: {
    label: string;
    url: string;
  };
};

type CtaProps = {
  data: CtaData;
};

export default function Cta({ data }: CtaProps) {
  return (
    <section className="w-full bg-[#05070d] px-6 py-14 md:py-20">
      <motion.div
        className="w-full max-w-3xl mx-auto rounded-[28px] bg-gradient-to-br from-white via-[#eef3fc] to-[#dce7fb] px-8 md:px-14 py-12 md:py-14 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-xl md:text-2xl lg:text-[26px] font-bold text-[#0b1220]">
          {data.title}
        </h2>
        <p className="mt-4 max-w-xl text-sm md:text-[15px] leading-relaxed text-[#4b5563]">
          {data.description}
        </p>
        <Link
          href={data.button.url}
          className="mt-7 inline-flex items-center justify-center rounded-full bg-[#0b1220] px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.03]"
        >
          {data.button.label}
        </Link>
      </motion.div>
    </section>
  );
}