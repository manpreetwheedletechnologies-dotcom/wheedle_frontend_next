"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  Sparkles, 
  Zap, 
  Cpu, 
  Bot, 
  Brain, 
  CircuitBoard,
  ArrowRight,
  ShieldCheck,
  Layers,
  Star,
  Rocket,
  Globe,
  Target,
  Compass
} from "lucide-react";

type AgentItem = {
  label: string;
  title: string;
  points: string[];
  icon?: React.ReactNode;
  color?: string;
};

export type AiAgentsData = {
  title: string;
  description: string;
  robotImageAlt?: string;
  list: AgentItem[];
};

type AiAgentsProps = {
  data: AiAgentsData;
};

// --- Animation variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.06 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const pointsVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const pointVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

// --- Color palette for circular buttons ---
const agentColors = [
  { from: "#f472b6", to: "#ec4899", glow: "rgba(236,72,153,0.4)" },
  { from: "#60a5fa", to: "#3b82f6", glow: "rgba(59,130,246,0.4)" },
  { from: "#34d399", to: "#10b981", glow: "rgba(16,185,129,0.4)" },
  { from: "#fbbf24", to: "#f59e0b", glow: "rgba(245,158,11,0.4)" },
  { from: "#a78bfa", to: "#8b5cf6", glow: "rgba(139,92,246,0.4)" },
  { from: "#fb923c", to: "#f97316", glow: "rgba(249,115,22,0.4)" },
  { from: "#22d3ee", to: "#06b6d4", glow: "rgba(6,182,212,0.4)" },
  { from: "#f87171", to: "#ef4444", glow: "rgba(239,68,68,0.4)" },
  { from: "#4ade80", to: "#22c55e", glow: "rgba(34,197,94,0.4)" },
  { from: "#c084fc", to: "#a855f7", glow: "rgba(168,85,247,0.4)" },
];

const getAgentColor = (index: number) => {
  return agentColors[index % agentColors.length];
};

// --- Helper: Get icon for agents ---
const getAgentIcon = (index: number) => {
  const icons = [
    <Sparkles size={20} strokeWidth={1.5} />,
    <Zap size={20} strokeWidth={1.5} />,
    <Cpu size={20} strokeWidth={1.5} />,
    <Brain size={20} strokeWidth={1.5} />,
    <CircuitBoard size={20} strokeWidth={1.5} />,
    <ShieldCheck size={20} strokeWidth={1.5} />,
    <Layers size={20} strokeWidth={1.5} />,
    <Star size={20} strokeWidth={1.5} />,
    <Rocket size={20} strokeWidth={1.5} />,
    <Globe size={20} strokeWidth={1.5} />,
  ];
  return icons[index % icons.length];
};

// --- BotAvatar ---
function BotAvatar({ alt = "AI Agent" }: { alt?: string }) {
  return (
    <div role="img" aria-label={alt} className="w-full flex items-center justify-center">
      <style>{`
        @keyframes eyeBlink {
          0%, 88%, 100% { transform: scaleY(1); }
          93% { transform: scaleY(0.07); }
        }
        .bot-eye-left {
          transform-origin: 136px 221px;
          animation: eyeBlink 3.5s ease-in-out infinite;
        }
        .bot-eye-right {
          transform-origin: 243px 221px;
          animation: eyeBlink 3.5s ease-in-out infinite 0.12s;
        }
        .bot-float {
          animation: botFloat 3s ease-in-out infinite;
        }
        @keyframes botFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(1.5deg); }
        }
        .bot-glow {
          animation: pulseGlow 3s ease-in-out infinite;
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
      `}</style>

      <div className="relative">
        <div className="absolute inset-0 -m-12 rounded-full bg-blue-500/20 blur-3xl bot-glow" />
        
        <svg
          className="bot-float relative"
          viewBox="0 0 380 415"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            display: "block",
            width: "100%",
            maxWidth: 200,
            height: "auto",
          }}
        >
          <ellipse cx="190" cy="231" rx="190" ry="184" fill="url(#p0)" />
          <rect
            x="34" y="122" width="312" height="217" rx="97"
            fill="url(#p1)" stroke="url(#p2)" strokeWidth="10"
          />
          <rect x="55" y="138" width="270" height="185" rx="92.5" fill="#080811" />
          <rect className="bot-eye-left" x="113" y="190" width="46" height="63" rx="23" fill="url(#p3)" />
          <rect className="bot-eye-right" x="220" y="190" width="46" height="63" rx="23" fill="url(#p4)" />

          <defs>
            <linearGradient id="p0" x1="87.2554" y1="79.5" x2="311.464" y2="372.998" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FCFDFD" />
              <stop offset="1" stopColor="#AEBEE4" />
            </linearGradient>
            <linearGradient id="p1" x1="62.5" y1="163" x2="307" y2="313" gradientUnits="userSpaceOnUse">
              <stop stopColor="#01E7FF" />
              <stop offset="0.5" stopColor="#0275FF" />
              <stop offset="1" stopColor="#612DF7" />
            </linearGradient>
            <linearGradient id="p2" x1="190" y1="127" x2="190" y2="334" gradientUnits="userSpaceOnUse">
              <stop stopColor="#B1D6F9" />
              <stop offset="1" stopColor="#D3E1FB" />
            </linearGradient>
            <linearGradient id="p3" x1="136" y1="190" x2="136" y2="253" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9FF85F" />
              <stop offset="0.5" stopColor="#6EDEBE" />
              <stop offset="0.75" stopColor="#54AAFA" />
              <stop offset="1" stopColor="#694CF5" />
            </linearGradient>
            <linearGradient id="p4" x1="243" y1="190" x2="243" y2="253" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9FF85F" />
              <stop offset="0.5" stopColor="#6EDEBE" />
              <stop offset="0.75" stopColor="#54AAFA" />
              <stop offset="1" stopColor="#694CF5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

// --- Circular Agent Button ---
function AgentButton({
  item,
  isActive,
  onClick,
  index,
}: {
  item: AgentItem;
  isActive: boolean;
  onClick: () => void;
  index: number;
}) {
  const color = getAgentColor(index);
  const icon = item.icon || getAgentIcon(index);

  return (
    <motion.button
      variants={itemVariants}
      onClick={onClick}
      className={`
        group relative w-full flex items-center gap-4 rounded-full px-3 py-2.5
        text-sm font-medium transition-all duration-500
        ${isActive
          ? "bg-gradient-to-r from-[#0a1230] to-[#0f1a4a] text-white shadow-2xl"
          : "bg-transparent text-gray-400 hover:text-white"
        }
      `}
    >
      {/* Background glow when active */}
      {isActive && (
        <motion.div
          layoutId="active-glow"
          className="absolute inset-0 rounded-full opacity-100"
          style={{
            background: `radial-gradient(circle at 30% 50%, ${color.glow}, transparent 70%)`,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      )}

      {/* Circular icon container */}
      <motion.div
        className={`
          relative flex-shrink-0 flex items-center justify-center
          w-12 h-12 md:w-14 md:h-14 rounded-full
          transition-all duration-500
        `}
        animate={{
          scale: isActive ? 1.1 : 1,
          boxShadow: isActive 
            ? `0 0 40px ${color.glow}, 0 0 80px ${color.glow}`
            : "0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        {/* Animated gradient ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            strokeWidth="2"
            className="transition-all duration-500"
            style={{
              stroke: isActive 
                ? `url(#grad-${index})`
                : "rgba(255,255,255,0.06)",
              strokeDasharray: isActive ? "283" : "0",
              strokeDashoffset: "0",
            }}
          />
          <defs>
            <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color.from} />
              <stop offset="100%" stopColor={color.to} />
            </linearGradient>
          </defs>
        </svg>

        {/* Inner circle with gradient */}
        <motion.div
          className="absolute inset-[3px] rounded-full transition-all duration-500"
          animate={{
            background: isActive
              ? `linear-gradient(135deg, ${color.from}, ${color.to})`
              : "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
            boxShadow: isActive
              ? `inset 0 1px 0 rgba(255,255,255,0.2), 0 8px 32px ${color.glow}`
              : "inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        />

        {/* Icon with color change */}
        <motion.span
          className="relative z-10"
          animate={{
            color: isActive ? "#ffffff" : "#64748b",
            scale: isActive ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.span>

        {/* Pulsing ring when active */}
        {isActive && (
          <motion.span
            className="absolute inset-0 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              border: `2px solid ${color.from}`,
            }}
          />
        )}
      </motion.div>

      {/* Label with number badge */}
      <motion.div
        className="relative flex-1 text-left flex items-center gap-2 min-w-0"
        animate={{
          opacity: isActive ? 1 : 0.7,
          x: isActive ? 4 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-[10px] font-mono text-white/20 group-hover:text-white/40 transition-colors">
          {(index + 1).toString().padStart(2, "0")}
        </span>
        <span className="truncate tracking-wide group-hover:tracking-wider transition-all duration-300">
          {item.label}
        </span>
      </motion.div>
    </motion.button>
  );
}

// --- Agent Detail Panel (Mobile expanded view) ---
function AgentDetailPanel({
  agent,
  index,
  onClose,
}: {
  agent: AgentItem;
  index: number;
  onClose: () => void;
}) {
  const color = getAgentColor(index);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <div className="mt-4 p-4 rounded-2xl bg-gradient-to-b from-[#0a1230]/80 to-[#070a16]/80 backdrop-blur-md border border-white/[0.05] shadow-[0_20px_60px_-20px_rgba(6,20,90,0.6)]">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <motion.div
              className="p-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_40px_rgba(56,120,255,0.3)]"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="w-12 h-12 rounded-full bg-[#0a1230] flex items-center justify-center">
                <span className="text-cyan-400">
                  {agent.icon || getAgentIcon(index)}
                </span>
              </div>
            </motion.div>
            <div>
              <h3 className="text-lg font-bold text-white bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                {agent.title}
              </h3>
              <span className="text-xs text-gray-400">{agent.label}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <motion.ul
          className="flex flex-col gap-2.5"
          variants={pointsVariants}
          initial="hidden"
          animate="visible"
        >
          {agent.points?.map((point, j) => (
            <motion.li
              key={j}
              variants={pointVariants}
              className="flex items-start gap-3 text-sm text-gray-200/90"
            >
              <span className="flex-shrink-0 mt-0.5">
                <Sparkles size={12} className="text-cyan-400" fill="#22d3ee" />
              </span>
              <span>{point}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
}

// --- Main Component ---
export default function AiAgents({ data }: AiAgentsProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const list = data.list || [];
  const half = Math.ceil(list.length / 2);
  const leftItems = list.slice(0, half);
  const rightItems = list.slice(half);
  const active = activeIndex !== null ? list[activeIndex] : null;

  const handleAgentClick = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Close if already open
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#05070d]">
      {/* Background gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[1200px] h-[800px] opacity-60"
          style={{
            background: "radial-gradient(circle, rgba(11,44,195,0.2) 0%, rgba(6,101,255,0.06) 40%, rgba(5,7,13,0) 70%)",
          }}
        />
        <div className="absolute right-0 bottom-0 w-[600px] h-[600px] opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(1,231,255,0.08) 0%, transparent 70%)",
          }}
        />
        <div className="absolute left-0 top-1/2 w-[400px] h-[400px] opacity-10"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 lg:py-16">
        <motion.div
          className="relative rounded-3xl bg-white/[0.02] px-4 sm:px-6 py-8 md:px-10 md:py-10 backdrop-blur-sm shadow-[0_30px_80px_-40px_rgba(6,20,90,0.8)] border border-white/[0.04]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* --- Header --- */}
          <div className="text-center mb-6 md:mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] mb-4">
              <Bot size={14} className="text-cyan-400" />
              <span className="text-xs font-medium text-cyan-300/80 tracking-wider uppercase">
                AI Agents
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              {data.title}
            </h2>
            <p className="mt-2 max-w-2xl mx-auto text-sm md:text-base text-gray-300/70">
              {data.description}
            </p>
          </div>

          {/* --- Desktop Layout: Three columns --- */}
          <div className="hidden lg:flex flex-row gap-6 lg:gap-8 items-center lg:items-stretch">
            {/* Left column */}
            <motion.div
              className="w-[27%] flex flex-col gap-1.5 max-h-[480px] overflow-y-auto pr-1"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {leftItems.map((item, i) => (
                <AgentButton
                  key={i}
                  item={item}
                  index={i}
                  isActive={activeIndex === i}
                  onClick={() => handleAgentClick(i)}
                />
              ))}
            </motion.div>

            {/* Center panel */}
            <div className="w-[46%] min-h-[360px] flex items-center justify-center">
              <div className="w-full rounded-2xl bg-gradient-to-b from-[#0a1230]/50 to-[#070a16]/50 backdrop-blur-md px-6 py-8 md:px-8 md:py-10 flex items-center justify-center text-center border border-white/[0.05] shadow-[0_20px_60px_-20px_rgba(6,20,90,0.6)]">
                <AnimatePresence mode="wait">
                  {active ? (
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="w-full flex flex-col items-center"
                    >
                      <motion.div
                        className="mb-4 p-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_40px_rgba(56,120,255,0.3)]"
                        animate={{
                          scale: [1, 1.02, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#0a1230] flex items-center justify-center">
                          <span className="text-cyan-400">
                            {active.icon || getAgentIcon(activeIndex || 0)}
                          </span>
                        </div>
                      </motion.div>
                      
                      <h3 className="text-xl md:text-2xl font-bold text-white bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                        {active.title}
                      </h3>
                      
                      <motion.ul
                        className="mt-4 flex flex-col items-start gap-2.5 max-h-[220px] md:max-h-[260px] overflow-y-auto pr-1 w-full"
                        variants={pointsVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {active.points?.map((point, j) => (
                          <motion.li
                            key={j}
                            variants={pointVariants}
                            className="flex items-start gap-3 text-sm text-gray-200/90 w-full"
                          >
                            <span className="flex-shrink-0 mt-0.5">
                              <Sparkles size={12} className="text-cyan-400" fill="#22d3ee" />
                            </span>
                            <span>{point}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="robot"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="w-full flex flex-col items-center gap-3"
                    >
                      <BotAvatar alt={data.robotImageAlt} />
                      <p className="text-sm text-gray-400/60">
                        Select an agent to explore
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right column */}
            <motion.div
              className="w-[27%] flex flex-col gap-1.5 max-h-[480px] overflow-y-auto pr-1"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {rightItems.map((item, i) => {
                const globalIndex = half + i;
                return (
                  <AgentButton
                    key={globalIndex}
                    item={item}
                    index={globalIndex}
                    isActive={activeIndex === globalIndex}
                    onClick={() => handleAgentClick(globalIndex)}
                  />
                );
              })}
            </motion.div>
          </div>

          {/* --- Mobile Layout: Single column with expandable details --- */}
          <div className="lg:hidden">
            <motion.div
              className="flex flex-col gap-1.5"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {/* Show all agents in a single list */}
              {list.map((item, i) => (
                <div key={i}>
                  <AgentButton
                    item={item}
                    index={i}
                    isActive={activeIndex === i}
                    onClick={() => handleAgentClick(i)}
                  />
                  {/* Expandable detail panel below the clicked agent */}
                  {activeIndex === i && (
                    <AgentDetailPanel
                      agent={item}
                      index={i}
                      onClose={() => setActiveIndex(null)}
                    />
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}