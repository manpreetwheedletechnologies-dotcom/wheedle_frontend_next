"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Target,
  ShieldCheck,
  Zap,
  TrendingUp,
  Search,
  Users,
  MessageSquare,
  BarChart3,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

/**
 * WhyChoose
 * ---------
 * "Why Choose <Brand>?" section used across every /industry/[slug] page.
 * Visuals only were restyled to match the navy-gradient reference design
 * (compact highlight card + borderless icon rows). Data flow is untouched:
 * title, highlight card, and each reason's icon/title/description still
 * all come from the same `data` prop / JSON, exactly as before.
 */

const ICONS: Record<string, LucideIcon> = {
  Target,
  ShieldCheck,
  Zap,
  TrendingUp,
  Search,
  Users,
  MessageSquare,
  BarChart3,
};

type WhyChooseItem = {
  icon: string; // key into ICONS
  title: string;
  description: string;
};

export type WhyChooseData = {
  title: string;
  highlight: {
    icon: string; // key into ICONS
    label: string;
  };
  list: WhyChooseItem[];
};

type WhyChooseProps = {
  data: WhyChooseData;
};

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function WhyChoose({ data }: WhyChooseProps) {
  const HighlightIcon = ICONS[data.highlight?.icon] || Sparkles;

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #05060d 0%, #060a1f 45%, #0a1a4a 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute right-0 top-0 w-[900px] h-[600px]"
          style={{
            background:
              "radial-gradient(circle, rgba(11,44,195,0.35) 0%, rgba(6,101,255,0.12) 40%, rgba(5,7,13,0) 70%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16 md:py-20 lg:py-24">
        {/* Heading */}
        <motion.div
          className="text-center md:text-left mb-10 md:mb-12 md:pl-[340px]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            {data.title}
          </h2>
        </motion.div>

        {/* Content */}
        <motion.div
          className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Highlight card */}
          <motion.div
            variants={itemVariants}
            className="w-full max-w-[300px] md:w-[300px] flex-shrink-0 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-8 py-12 flex flex-col items-center justify-center text-center gap-5"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-white/15 bg-white/5 text-white">
              <HighlightIcon size={26} strokeWidth={1.5} />
            </div>
            <span className="text-2xl md:text-[28px] leading-tight font-bold text-white">
              {data.highlight?.label}
            </span>
          </motion.div>

          {/* Reasons list */}
          <div className="w-full md:flex-1 flex flex-col gap-6 md:gap-7">
            {data.list?.map((item, i) => {
              const Icon = ICONS[item.icon] || Sparkles;
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="flex items-start gap-4"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 text-white flex-shrink-0">
                    <Icon size={18} strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm md:text-[15px] leading-relaxed text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}