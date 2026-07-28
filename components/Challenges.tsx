"use client";

import React, { useRef, useState } from "react";
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
 * JSON so this one component serves every industry. Visual language matches
 * the shared HeroSection: #05070d background, #1131c8 -> #4b6bfd accent.
 */

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
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// --- 3D tilt card: navy card with a gradient icon badge, tilts toward cursor,
// and gets a soft blue glow ring on hover — same accent language as the hero.
function TiltCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const Icon = ICONS[icon] || Sparkles;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ rx: (0.5 - py) * 14, ry: (px - 0.5) * 14 });
  };

  const handleMouseLeave = () => setTilt({ rx: 0, ry: 0 });

  const isActive = tilt.rx !== 0 || tilt.ry !== 0;

  return (
    <motion.div
      variants={cardVariants}
      style={{ perspective: 800 }}
      className="group relative h-full"
    >
      {/* glow ring that blooms behind the card on hover, matching the
          hero's button glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[#02082c] via-[#4b6bfd] to-[#02082c] opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-60"
      />

      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${
            isActive ? 1.03 : 1
          })`,
          transformStyle: "preserve-3d",
          transition: "transform 0.25s ease-out",
        }}
        className="relative h-full rounded-2xl border border-[#1c2f6e] bg-gradient-to-b from-[#0d1a4a] to-[#0a1538] px-6 py-8 text-center shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] transition-colors duration-300 group-hover:border-[#4b6bfd]/60"
      >
        {/* icon badge */}
        <div
          style={{ transform: "translateZ(30px)" }}
          className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-[#1131c8] to-[#1131c8] shadow-[0_10px_25px_-8px_rgba(75,107,253,0.65)] transition-transform duration-300 group-hover:scale-110"
        >
          <Icon className="h-6 w-6 text-white" strokeWidth={1.75} />
        </div>

        <h3
          style={{ transform: "translateZ(25px)" }}
          className="mt-5 text-base md:text-lg font-bold text-white leading-snug"
        >
          {title}
        </h3>
        <p
          style={{ transform: "translateZ(18px)" }}
          className="mt-3 text-sm leading-relaxed text-white/75"
        >
          {description}
        </p>

        {/* thin accent underline that grows in on hover */}
        <div
          aria-hidden
          className="mx-auto mt-5 h-[2px] w-8 rounded-full bg-gradient-to-r from-[#1131c8] to-[#4b6bfd] transition-all duration-300 group-hover:w-14"
        />
      </div>
    </motion.div>
  );
}

export default function Challenges({ data }: ChallengesProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#05070d]">
      {/* ambient background glows, same accent family as the hero */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[700px] h-[500px] rounded-full opacity-60"
          style={{
            background:
              "radial-gradient(circle, rgba(75,107,253,0.16) 0%, rgba(17,49,200,0.06) 45%, rgba(5,7,13,0) 75%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(circle, rgba(75,107,253,0.12) 0%, rgba(75,107,253,0) 70%)",
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
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-blue-100/70 uppercase backdrop-blur-md">
            Know the hurdles
          </span>
          <h2 className="mt-4 text-2xl md:text-3xl lg:text-4xl font-bold text-white [text-wrap:balance]">
            {data.title}
          </h2>
          <div className="mx-auto mt-4 h-[2px] w-16 rounded-full bg-gradient-to-r from-transparent via-[#4b6bfd] to-transparent" />
          <p className="mt-5 max-w-5xl mx-auto text-sm md:text-base leading-relaxed text-white/75">
            {data.description}
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {data.list?.map((item, i) => (
            <TiltCard
              key={i}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}