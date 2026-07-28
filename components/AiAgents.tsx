"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Diamond } from "lucide-react";

/**
 * AiAgents
 * --------
 * "Key Features of AI Agents for <Industry>" section used across every
 * /industry/[slug] page. Title, description, the left list of agents,
 * and each agent's title/points all come from JSON so this one
 * component serves every industry with different content.
 *
 * Behavior:
 *  - On load, no agent is selected — the right side shows the robot
 *    image (data.robotImage).
 *  - Clicking an item in the left list highlights it and swaps the
 *    right side to that agent's title + bullet points, which animate
 *    in one line at a time.
 *  - Clicking the same item again (or nothing) keeps the panel open;
 *    there's always exactly one active agent once the user has clicked.
 */

type AgentItem = {
  label: string; // left list button text, e.g. "Review Generation Agent"
  title: string; // right panel heading, usually same as label
  points: string[]; // bullet points shown on the right
};

export type AiAgentsData = {
  title: string;
  description: string;
  robotImage: string;
  robotImageAlt?: string;
  list: AgentItem[];
};

type AiAgentsProps = {
  data: AiAgentsData;
};

const listContainerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const listItemVariants: any = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const pointsContainerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const pointItemVariants: any = {
  hidden: { opacity: 0, x: 18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function AiAgents({ data }: AiAgentsProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? data.list?.[activeIndex] : null;

  return (
    <section className="relative w-full overflow-hidden bg-[#05070d]">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] h-[600px]"
          style={{
            background:
              "radial-gradient(circle, rgba(11,44,195,0.3) 0%, rgba(6,101,255,0.1) 40%, rgba(5,7,13,0) 70%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 md:py-8 lg:py-10">
        <motion.div
          className="relative rounded-3xl border border-blue-400/20 bg-white/[0.02] px-6 py-6 md:px-10 md:py-9 shadow-[0_25px_70px_-30px_rgba(6,20,90,0.7)]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Heading */}
          <div className="text-center mb-5 md:mb-6">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
              {data.title}
            </h2>
            <p className="mt-2 text-xs md:text-sm italic font-medium text-gray-300">
              {data.description}
            </p>
          </div>

          {/* Content: left list + right panel */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-16 items-start">
            {/* Left: clickable agent list */}
            <motion.div
              className="no-scrollbar w-full md:w-[52%] flex flex-col gap-2 max-h-[380px] md:max-h-[420px] overflow-y-auto pr-1"
              variants={listContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {data.list?.map((item, i) => {
                const isActive = activeIndex === i;
                return (
                  <motion.button
                    key={i}
                    type="button"
                    variants={listItemVariants}
                    onClick={() => setActiveIndex(i)}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`text-left rounded-lg border px-3 py-2 text-xs md:text-sm font-semibold transition-colors duration-300 ${
                      isActive
                        ? "border-blue-300/60 bg-gradient-to-r from-[#1131c8] to-[#2544e0] text-white shadow-[0_8px_24px_-6px_rgba(75,107,253,0.6)]"
                        : "border-blue-400/40 bg-[#0a1230]/60 text-white hover:border-blue-300/60 hover:bg-[#101c4a]/70"
                    }`}
                  >
                    {item.label}
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Right: robot image (default) or animated agent content */}
            <div className="w-full md:w-[48%] min-h-[260px] md:min-h-[300px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {active ? (
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="w-full"
                  >
                    <h3 className="text-lg md:text-xl font-bold text-white">
                      {active.title}
                    </h3>
                    <motion.ul
                      className="no-scrollbar mt-3 flex flex-col gap-2 max-h-[260px] md:max-h-[300px] overflow-y-auto pr-1"
                      variants={pointsContainerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {active.points?.map((point, j) => (
                        <motion.li
                          key={j}
                          variants={pointItemVariants}
                          className="flex items-center gap-3 text-xs md:text-sm text-gray-200"
                        >
                          <Diamond
                            size={9}
                            strokeWidth={0}
                            className="fill-cyan-300 text-cyan-300 flex-shrink-0"
                          />
                          {point}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>
                ) : (
                  <motion.img
                    key="robot"
                    src={data.robotImage}
                    alt={data.robotImageAlt || "AI Agent"}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      opacity: { duration: 0.4, ease: "easeOut" },
                      scale: { duration: 0.4, ease: "easeOut" },
                      y: {
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    className="w-full max-w-[280px] md:max-w-[370px] h-auto object-contain mx-auto"
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}