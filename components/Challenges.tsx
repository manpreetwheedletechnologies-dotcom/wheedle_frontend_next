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
 * JSON so this one component serves every industry.
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// --- 3D tilt card: solid clean navy-blue card, tilts toward the cursor ---
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

  return (
    <motion.div
      variants={cardVariants}
      style={{ perspective: 800 }}
      className="group"
    >
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${
            tilt.rx || tilt.ry ? 1.03 : 1
          })`,
          transformStyle: "preserve-3d",
          transition: "transform 0.25s ease-out",
        }}
        className="relative h-full rounded-2xl border border-[#1c2f6e] bg-[#0d1a4a] px-6 py-8 text-center transition-colors duration-300 hover:border-[#2a4090]"
      >
        <h3
          style={{ transform: "translateZ(25px)" }}
          className="text-base md:text-lg font-bold text-white leading-snug"
        >
          {title}
        </h3>
        <p
          style={{ transform: "translateZ(18px)" }}
          className="mt-3 text-sm leading-relaxed text-white"
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Challenges({ data }: ChallengesProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#05070d]">
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
          <p className="mt-4 max-w-5xl mx-auto text-sm md:text-base leading-relaxed text-white">
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