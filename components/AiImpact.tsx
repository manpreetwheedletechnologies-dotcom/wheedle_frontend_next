"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

/**
 * AiImpact
 * --------
 * "AI is Transforming <Industry> Growth" accordion used across every
 * /industry/[slug] page. Title, description and every numbered row
 * (title + description) come from JSON so this one component serves
 * every industry. Row numbers (01, 02, ...) are derived from array
 * order, not stored in JSON.
 */

type AiImpactItem = {
  title: string;
  description: string;
};

export type AiImpactData = {
  title: string;
  description: string;
  list: AiImpactItem[];
};

type AiImpactProps = {
  data: AiImpactData;
};

export default function AiImpact({ data }: AiImpactProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative w-full overflow-hidden bg-[#05070d]">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] h-[500px]"
          style={{
            background:
              "radial-gradient(circle, rgba(11,44,195,0.3) 0%, rgba(6,101,255,0.1) 40%, rgba(5,7,13,0) 70%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 py-16 md:py-20 lg:py-24">
        {/* Heading */}
        <motion.div
          className="text-center mb-10 md:mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            {data.title}
          </h2>
          <p className="mt-4 text-sm md:text-base leading-relaxed text-white">
            {data.description}
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="flex flex-col gap-4">
          {data.list?.map((item, i) => {
            const isOpen = openIndex === i;
            const number = String(i + 1).padStart(2, "0");

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.04 }}
                whileHover={{ scale: 1.015, y: -2 }}
                className={`rounded-2xl border transition-colors duration-300 cursor-pointer ${
                  isOpen
                    ? "border-blue-400/30 bg-white/[0.05]"
                    : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.15]"
                }`}
                style={{
                  boxShadow: isOpen
                    ? "0 15px 45px -20px rgba(75,107,253,0.55)"
                    : "0 8px 24px -16px rgba(0,0,0,0.4)",
                }}
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                {/* Row header */}
                <div className="flex items-center gap-4 px-5 md:px-6 py-4 md:py-5">
                  <span className="text-lg md:text-xl font-bold text-white/90 w-7 flex-shrink-0">
                    {number}
                  </span>
                  <h3 className="flex-1 text-sm md:text-base font-bold text-white">
                    {item.title}
                  </h3>
                  <motion.button
                    type="button"
                    aria-label={isOpen ? "Collapse" : "Expand"}
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenIndex(isOpen ? null : i);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.92 }}
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-md flex-shrink-0 transition-colors duration-300 ${
                      isOpen
                        ? "bg-[#1131c8] text-white"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {isOpen ? (
                      <Minus size={15} strokeWidth={2.5} />
                    ) : (
                      <Plus size={15} strokeWidth={2.5} />
                    )}
                  </motion.button>
                </div>

                {/* Expandable body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 md:px-6 pb-5 md:pb-6 pl-16 md:pl-[68px] text-sm md:text-[15px] leading-relaxed text-white">
                        {item.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}




// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import {
//   MousePointerClick,
//   FileText,
//   Target,
//   User,
//   Zap,
//   ShieldCheck,
//   Bot,
//   BarChart3,
//   MessageSquare,
//   Search,
//   Sparkles,
//   type LucideIcon,
// } from "lucide-react";

// /**
//  * AiImpact
//  * --------
//  * "AI is Transforming <Industry> Services" section used across every
//  * /industry/[slug] page. Title, subtitle and every item (icon, accent
//  * color, title, description) come from JSON so this one component serves
//  * every industry.
//  */

// const ICONS: Record<string, LucideIcon> = {
//   MousePointerClick,
//   FileText,
//   Target,
//   User,
//   Zap,
//   ShieldCheck,
//   Bot,
//   BarChart3,
//   MessageSquare,
//   Search,
// };

// // Accent color keys stored in JSON -> tailwind classes for the icon chip.
// const ACCENTS: Record<string, string> = {
//   blue: "border-sky-400/25 bg-sky-500/10 text-sky-300",
//   purple: "border-violet-400/25 bg-violet-500/10 text-violet-300",
//   orange: "border-orange-400/25 bg-orange-500/10 text-orange-300",
// };

// type AiImpactItem = {
//   icon: string; // key into ICONS
//   color: "blue" | "purple" | "orange";
//   title: string;
//   description: string;
// };

// export type AiImpactData = {
//   title: string;
//   description: string;
//   list: AiImpactItem[];
// };

// type AiImpactProps = {
//   data: AiImpactData;
// };

// const containerVariants: any = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.08, delayChildren: 0.1 },
//   },
// };

// const itemVariants: any = {
//   hidden: { opacity: 0, y: 16 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.5, ease: "easeOut" },
//   },
// };

// export default function AiImpact({ data }: AiImpactProps) {
//   return (
//     <section className="relative w-full overflow-hidden bg-[#060a16]">
//       {/* deep blue ambient glow, matches the reference exactly */}
//       <div className="pointer-events-none absolute inset-0">
//         <div
//           className="absolute left-1/2 top-0 -translate-x-1/2 w-[1100px] h-[550px]"
//           style={{
//             background:
//               "radial-gradient(ellipse, rgba(13,35,120,0.55) 0%, rgba(9,22,80,0.25) 45%, rgba(6,10,22,0) 75%)",
//           }}
//         />
//       </div>

//       <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16 md:py-20 lg:py-24">
//         {/* Heading */}
//         <motion.div
//           className="text-center mb-12 md:mb-14"
//           initial={{ opacity: 0, y: 16 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.4 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//         >
//           <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
//             {data.title}
//           </h2>
//           <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base leading-relaxed text-gray-300">
//             {data.description}
//           </p>
//         </motion.div>

//         {/* Grid */}
//         <motion.div
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-9"
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.1 }}
//         >
//           {data.list?.map((item, i) => {
//             const Icon = ICONS[item.icon] || Sparkles;
//             const accent = ACCENTS[item.color] || ACCENTS.blue;
//             return (
//               <motion.div key={i} variants={itemVariants} className="flex flex-col items-start">
//                 <div
//                   className={`inline-flex items-center justify-center w-10 h-10 rounded-lg border ${accent}`}
//                 >
//                   <Icon size={18} strokeWidth={1.75} />
//                 </div>
//                 <h3 className="mt-4 text-base md:text-[17px] font-semibold text-white">
//                   {item.title}
//                 </h3>
//                 <p className="mt-1.5 text-sm leading-relaxed text-gray-400 max-w-xs">
//                   {item.description}
//                 </p>
//               </motion.div>
//             );
//           })}
//         </motion.div>
//       </div>
//     </section>
//   );
// }