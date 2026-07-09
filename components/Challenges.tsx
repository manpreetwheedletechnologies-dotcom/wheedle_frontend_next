"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  UserCog,
  ShieldCheck,
  Eye,
  Wallet,
  TrendingUp,
  Search,
  Target,
  Clock,
  MessageSquare,
  BarChart3,
  Globe,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

/**
 * Challenges
 * ----------
 * "Challenges in the <Industry>" section used across every /industry/[slug]
 * page. Title, subtitle and every card (icon/title/description) come from
 * JSON so this one component serves every industry.
 */

// Map of icon-name strings (as stored in JSON) -> lucide-react component.
// Add new entries here as new industries need new icons; unknown names
// fall back to Sparkles so a typo in JSON never breaks the page.
const ICONS: Record<string, LucideIcon> = {
  Users,
  UserCog,
  ShieldCheck,
  Eye,
  Wallet,
  TrendingUp,
  Search,
  Target,
  Clock,
  MessageSquare,
  BarChart3,
  Globe,
};

type ChallengeItem = {
  icon: string; // key into ICONS
  title: string;
  description: string;
};

export type ChallengesData = {
  title: string;
  description: string;
  list: ChallengeItem[];
};

type ChallengesProps = {
  data: ChallengesData;
};

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Challenges({ data }: ChallengesProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#05070d]">
      {/* ambient glow, continues the hero's atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] h-[600px]"
          style={{
            background:
              "radial-gradient(circle, rgba(11,44,195,0.35) 0%, rgba(6,101,255,0.12) 40%, rgba(5,7,13,0) 70%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16 md:py-20 lg:py-24">
        {/* Heading */}
        <motion.div
          className="text-center mb-12 md:mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            {data.title}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base leading-relaxed text-gray-400">
            {data.description}
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {data.list?.map((item, i) => {
            const Icon = ICONS[item.icon] || Sparkles;
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-white/[0.14] hover:bg-white/[0.05]"
              >
                <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 bg-white/5 text-cyan-300">
                  <Icon size={18} strokeWidth={1.75} />
                </div>
                <h3 className="mt-4 text-base md:text-[17px] font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}