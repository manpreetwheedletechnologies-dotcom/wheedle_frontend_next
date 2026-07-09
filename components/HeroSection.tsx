"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

/**
 * HeroSection
 * -----------
 * One shared hero used across every /industry/[slug] page.
 * Every visible string (badge, headline, highlighted word(s), tagline,
 * description, button labels/links) is driven entirely by JSON so this
 * component never needs to change when a new industry is added.
 */

// --- Types matching the new heroSection JSON shape ---
type HeroButton = {
  label: string;
  url: string;
  style?: "primary" | "secondary";
};

export type HeroSectionData = {
  badge: string;          // e.g. "Next-Gen Fintech Marketing"
  titleMain: string;      // e.g. "AI-Powered Digital Marketing Solutions"
  titlePrefix?: string;   // e.g. "for the " (optional connector before the highlight)
  titleHighlight: string; // e.g. "Finance Industry"
  tagline: string;        // e.g. "Build Trust. Generate Quality Leads. Accelerate Financial Growth."
  description: string;
  buttons: HeroButton[];
};

type HeroSectionProps = {
  data: HeroSectionData;
};

// --- Animation variants ---
const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#05070d]">
      {/* top spacer so fixed header never overlaps content */}
      <div className="w-full h-[82px] lg:h-[100px]" />

      {/* --- background atmosphere --- */}
      <div className="pointer-events-none absolute inset-0">
        {/* radial glow */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(11,44,195,0.45) 0%, rgba(6,101,255,0.18) 35%, rgba(5,7,13,0) 70%)",
          }}
        />
        {/* dot grid texture */}
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage:
              "radial-gradient(circle at 50% 45%, black 0%, transparent 65%)",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 45%, black 0%, transparent 65%)",
          }}
        />
        {/* fade to page background at the edges */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#05070d] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#05070d] to-transparent" />
      </div>

      {/* --- content --- */}
      <motion.div
        className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-20 md:pb-24 lg:pt-24 lg:pb-28 flex flex-col items-center text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Badge */}
        <motion.span
          variants={itemVariants}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-[11px] md:text-xs font-semibold tracking-[0.18em] text-blue-100/80 uppercase backdrop-blur-sm"
        >
          <span aria-hidden className="text-cyan-300">✦</span>
          {data.badge}
        </motion.span>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="mt-6 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white"
        >
          {data.titleMain}
          <br />
          {data.titlePrefix}
          <span className="bg-gradient-to-r from-[#9DB6FF] to-[#6FA8FF] bg-clip-text text-transparent">
            {data.titleHighlight}
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="mt-5 text-base md:text-lg font-semibold text-gray-200"
        >
          {data.tagline}
        </motion.p>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="mt-4 max-w-2xl text-sm md:text-[15px] leading-relaxed text-gray-400"
        >
          {data.description}
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-col sm:flex-row items-center gap-3"
        >
          {data.buttons?.map((btn, i) =>
            btn.style === "secondary" ? (
              <Link
                key={i}
                href={btn.url}
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/10"
              >
                {btn.label}
              </Link>
            ) : (
              <Link
                key={i}
                href={btn.url}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#C6D3FF] to-[#9FB6FF] px-6 py-2.5 text-sm font-semibold text-[#061436] shadow-[0_8px_24px_-8px_rgba(111,168,255,0.6)] transition-transform duration-300 hover:scale-[1.03]"
              >
                {btn.label}
              </Link>
            )
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}



// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { motion } from "framer-motion";

// // --- Animation variants (unchanged) ---
// const containerVariants: any = {
//   hidden: { opacity: 0, y: 60 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.15, delayChildren: 0.2 }
//   }
// };

// const textBoxVariants: any = {
//   hidden: { opacity: 0, scale: 0.92, y: 30 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     y: 0,
//     transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1], delay: 0.3 }
//   }
// };

// const textVariants: any = {
//   hidden: { opacity: 0, y: 15, filter: "blur(5px)" },
//   visible: {
//     opacity: 1,
//     y: 0,
//     filter: "blur(0px)",
//     transition: { duration: 0.6, ease: "easeOut", delay: 0.5 }
//   }
// };

// const floatingAnimation: any = {
//   y: [0, -8, 0],
//   transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
// };

// // --- Inline scroll animation hook (unchanged) ---
// function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(threshold: number = 0.08) {
//   const ref = useRef<T | null>(null);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           observer.unobserve(el);
//         }
//       },
//       { threshold }
//     );

//     observer.observe(el);
//     return () => observer.disconnect();
//   }, [threshold]);

//   return { ref, isVisible };
// }

// // --- Types matching your JSON's heroSection shape ---
// type HeroSectionData = {
//   title: string;
//   description: string;
//   heroImageAlt: string;
// };

// type HeroSectionProps = {
//   data: HeroSectionData;
//   heroImage: string; // resolved from industryHeroImages[slug] by the parent page
// };

// export default function HeroSection({ data, heroImage }: HeroSectionProps) {
//   const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLElement>();
//   const { ref: textRef, isVisible: textVisible } = useScrollAnimation<HTMLDivElement>();

//   const zoomStyle: React.CSSProperties = {
//     opacity: heroVisible ? 1 : 0,
//     transform: heroVisible ? "scale(1)" : "scale(0.85)",
//     transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
//     willChange: "opacity, transform",
//   };

//   const fadeUpStyle: React.CSSProperties = {
//     opacity: textVisible ? 1 : 0,
//     transform: textVisible ? "translateY(0)" : "translateY(40px)",
//     transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
//     willChange: "opacity, transform",
//   };

//   return (
//     <section
//       ref={heroRef}
//       style={zoomStyle}
//       className="relative w-full min-h-[480px] lg:min-h-[600px] flex flex-col bg-[#0b0c10]"
//     >
//       <div className="w-full h-[70px] lg:h-[80px] bg-black flex-shrink-0" />

//       <div className="relative w-full flex-1 min-h-[400px] lg:min-h-[500px]">
//         <div className="absolute inset-0 w-full h-full z-0">
//           <img
//             src={heroImage}
//             alt={data.heroImageAlt}
//             className="w-full h-full object-cover object-center"
//           />
          
//         </div>

//         <div className="absolute top-0 left-0 right-0 z-10">
//           <div className="w-full h-[20px] lg:h-[30px] bg-gradient-to-b from-[#0b0c10] via-[#0b0c10]/85 to-transparent" />
//         </div>

//         <div className="absolute bottom-0 left-0 right-0 z-10">
//           <div className="w-full h-[20px] lg:h-[30px] bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/85 to-transparent" />
//         </div>

//         <motion.div
//           className="absolute bottom-[40px] lg:bottom-[-50px] left-0 right-0 z-20 px-6 pb-6 md:pb-8 lg:pb-10"
//           initial="hidden"
//           animate="visible"
//           variants={containerVariants}
//         >
//           <motion.div className="w-full max-w-5xl mx-auto" animate={floatingAnimation}>
//             <div className="relative w-full">
//               <motion.div
//                 className="relative backdrop-blur-md rounded-2xl p-5 md:p-7 shadow-2xl"
//                 style={{ border: "1px solid transparent", backgroundClip: "padding-box", position: "relative" }}
//                 variants={textBoxVariants}
//                 whileHover={{ scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <div
//                   style={{
//                     position: "absolute", top: "-1px", right: "-1px", width: "60px", height: "60px",
//                     borderTop: "3px solid transparent", borderRight: "3px solid transparent",
//                     borderImage: "linear-gradient(135deg, #0665ff, #22d3ee)", borderImageSlice: 1,
//                     borderRadius: "0 16px 0 0",
//                   }}
//                 />
//                 <div
//                   style={{
//                     position: "absolute", bottom: "-1px", left: "-1px", width: "60px", height: "60px",
//                     borderBottom: "3px solid transparent", borderLeft: "3px solid transparent",
//                     borderImage: "linear-gradient(135deg, #22d3ee, #0665ff)", borderImageSlice: 1,
//                     borderRadius: "0 0 0 16px",
//                   }}
//                 />
//                 <div
//                   style={{
//                     position: "absolute", top: "-1px", right: "-1px", width: "80px", height: "80px",
//                     background: "linear-gradient(135deg, transparent 50%, #0665ff 50%, #22d3ee 100%)",
//                     borderRadius: "0 16px 0 0", opacity: 0.3, pointerEvents: "none",
//                   }}
//                 />
//                 <div
//                   style={{
//                     position: "absolute", bottom: "-1px", left: "-1px", width: "80px", height: "80px",
//                     background: "linear-gradient(135deg, #22d3ee 0%, #0665ff 50%, transparent 50%)",
//                     borderRadius: "0 0 0 16px", opacity: 0.3, pointerEvents: "none",
//                   }}
//                 />

//                 <motion.h1
//                   className="text-white text-xl md:text-2xl lg:text-3xl font-bold text-center leading-tight tracking-wide relative z-10"
//                   variants={textVariants}
//                 >
//                   {data.title}
//                 </motion.h1>
//               </motion.div>
//             </div>
//           </motion.div>
//         </motion.div>
//       </div>

//       <div ref={textRef} style={fadeUpStyle} className="w-full bg-[#0b0c10] py-8 md:py-10 lg:py-12">
//         <div className="w-full max-w-7xl mx-auto px-6 text-center">
//           <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light tracking-wide max-w-4xl mx-auto">
//             {data.description}
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }