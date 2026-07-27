"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Maximize2 } from "lucide-react";

/**
 * AiChatbot
 * ---------
 * "AI Chatbot for <Industry> Engagement" section used across every
 * /industry/[slug] page. Left side image, right side title/description/
 * CTA button — all driven by JSON so this one component serves every
 * industry.
 */

type AiChatbotButton = {
  label: string;
  url: string;
};

export type AiChatbotData = {
  image: string;
  imageAlt?: string;
  title: string;
  description: string;
  bullets?: string[];
  button: AiChatbotButton;
};

type AiChatbotProps = {
  data: AiChatbotData;
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function AiChatbot({ data }: AiChatbotProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#05070d]">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-[15%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-60"
          style={{
            background:
              "radial-gradient(circle, rgba(75,107,253,0.25) 0%, rgba(17,49,200,0.1) 45%, rgba(5,7,13,0) 75%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16 md:py-20 lg:py-24">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
          {/* Left: image */}
          <motion.div
            className="group w-full md:w-[50%]"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="relative rounded-2xl overflow-visible cursor-pointer">
              <img
                src={data.image}
                alt={data.imageAlt || data.title}
                 draggable={false}
                className="w-full h-auto object-contain select-none transition-transform duration-700 ease-out group-hover:scale-110 origin-center"
              />
              {/* popup / zoom overlay on hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/30 scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Maximize2 size={18} className="text-white" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: text + CTA */}
          <motion.div
            className="w-full md:w-[50%] text-center md:text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-3xl lg:text-4xl font-bold text-white leading-tight [text-wrap:balance]"
            >
              {data.title}
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="mt-5 text-sm md:text-base leading-relaxed text-white max-w-xl mx-auto md:mx-0"
            >
              {data.description}
            </motion.p>

            {data.bullets && data.bullets.length > 0 && (
  <motion.ul
    variants={itemVariants}
    className="mt-5 space-y-3 text-left text-white max-w-xl mx-auto md:mx-0"
  >
    {data.bullets.map((item, index) => (
      <li key={index} className="flex items-start gap-3">
        <span className="mt-2 h-2 w-2 rounded-full bg-blue-500 shrink-0"></span>
        <span>{item}</span>
      </li>
    ))}
  </motion.ul>
)}

            <motion.div variants={itemVariants} className="mt-8">
              <Link
                href={data.button.url}
                className="inline-flex items-center gap-2 rounded-xl border border-blue-400/40 bg-gradient-to-r from-[#0a1a6b] to-[#1131c8] px-6 py-3.5 text-sm md:text-[15px] font-semibold text-white shadow-[0_8px_24px_-8px_rgba(17,49,200,0.6)] transition-all duration-300 hover:border-blue-300/70 hover:from-[#0d2180] hover:to-[#1a3fe0] hover:shadow-[0_10px_32px_-6px_rgba(17,49,200,0.8)] hover:gap-3"
              >
                {data.button.label}
                <ArrowRight size={16} strokeWidth={2.25} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}