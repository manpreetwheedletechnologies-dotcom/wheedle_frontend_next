"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Services
 * --------
 * "Our <Industry> Growth Services" grid used across every /industry/[slug]
 * page. Title, subtitle and every card (image + title) come from JSON so
 * this one component serves every industry.
 */

type ServiceItem = {
  image: string;
  imageAlt?: string;
  title: string;
};

export type ServicesData = {
  title: string;
  description: string;
  list: ServiceItem[];
};

type ServicesProps = {
  data: ServicesData;
};

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const cardVariants: any = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Services({ data }: ServicesProps) {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[1000px] h-[600px] opacity-60"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgba(11,44,195,0.35) 0%, rgba(6,101,255,0.12) 45%, rgba(5,7,13,0) 70%)",
          }}
        />
        <div
          className="absolute right-0 bottom-1/4 w-[600px] h-[400px] opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(5,7,13,0) 70%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28 lg:py-32">
        {/* Heading with enhanced styling */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Decorative line above title */}
          <motion.div
            className="w-16 h-1 bg-gradient-to-r from-blue-400 to-blue-700 mx-auto rounded-full mb-5"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {data.title}
          </h2>

          <motion.div
            className="mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-base md:text-lg font-light text-gray-300 leading-relaxed">
              {data.description}
            </p>
          </motion.div>

          {/* Decorative dots */}
          <div className="flex justify-center gap-2 mt-6">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-blue-500/40"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {data.list?.map((item, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="group relative rounded-2xl overflow-hidden bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/[0.06] shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_60px_-20px_rgba(59,130,246,0.4)] hover:border-blue-500/30"
            >
              {/* Card number badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="text-xs font-mono font-bold text-blue-400/60 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Image container with overlay gradient */}
              <div className="relative w-full h-[220px] md:h-[250px] overflow-hidden bg-[#0a0f1e]">
                <img
                  src={item.image}
                  alt={item.imageAlt || item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* Gradient overlay - appears on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500" />
                {/* Color overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Title - slides up from bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#05070d] via-[#05070d]/80 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-[15px] md:text-base font-semibold text-white leading-snug group-hover:text-blue-400 transition-colors duration-300">
                  {item.title}
                </h3>
                {/* Subtle underline animation */}
                <div className="w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-700 mt-2 group-hover:w-1/3 transition-all duration-500 rounded-full" />
              </div>

              {/* Glow ring on hover */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-blue-500/0 group-hover:ring-blue-500/30 transition-all duration-500" />

              {/* Background glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent rounded-2xl" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}