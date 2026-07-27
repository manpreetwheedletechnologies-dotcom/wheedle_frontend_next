"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "./Button_x";

/**
 * HeroSection
 * -----------
 * Shared hero used across every /industry/[slug] page.
 * Full-bleed banner image on top (breaks out of any parent max-width /
 * padding container so it always spans the full viewport width, shown
 * uncropped via aspect-ratio + object-contain), with the badge/title
 * sitting in a light glass pill overlapping the bottom edge of the
 * banner, followed by tagline, description and CTA buttons on a soft
 * blue glow backdrop. All content is driven by JSON so this component
 * never changes when a new industry is added.
 */

type HeroButton = {
  label: string;
  url: string;
  style?: "primary" | "secondary";
};

export type HeroSectionData = {
  bannerImage: string;    // full-width banner image path
  badge: string;          // e.g. "Next-Gen MSME Growth Solutions"
  titleMain: string;
  titlePrefix?: string;
  titleHighlight: string;
  tagline: string;
  description: string;
  buttons: HeroButton[];
};

type HeroSectionProps = {
  data: HeroSectionData;
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

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export default function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className="relative w-full bg-[#05070d]">
      {/* top spacer so fixed header never overlaps banner */}
      <div className="w-full h-[82px] lg:h-[100px]" />

      {/* --- full-bleed banner: breaks out of any parent max-width /
          padding container via the viewport-centering margin trick, so
          it always spans edge-to-edge regardless of ancestor width.
          aspect-ratio + object-contain keeps the whole image visible. --- */}
   <div className="relative w-screen mx-[calc(50%-50vw)] bg-[#05070d] aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] max-h-[460px]">
  <img
    src={data.bannerImage}
    alt={data.titleHighlight}
    className="absolute inset-0 w-full h-full object-cover object-center"
  />
  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#05070d] to-transparent" />
</div>

    

      {/* --- title pill, overlapping banner bottom edge --- */}
      <div className="relative z-10 -mt-6 sm:-mt-7 md:-mt-8 flex justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center rounded-full border border-white/25 bg-gradient-to-r from-white/20 via-white/10 to-white/20 backdrop-blur-md px-7 sm:px-12 py-3.5 sm:py-4.5 shadow-[0_18px_35px_-10px_rgba(0,0,0,0.55)]"
        >
          <h1 className="text-base sm:text-xl md:text-2xl font-bold text-white tracking-wide text-center uppercase [text-wrap:balance]">
            {data.badge}
          </h1>
        </motion.div>
      </div>

      {/* --- content --- */}
      <motion.div
        className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-6 pb-16 md:pt-8 md:pb-20 flex flex-col items-center text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Subtitle / tagline */}
        <motion.h2
          variants={itemVariants}
          className="text-lg md:text-xl font-bold text-white max-w-2xl [text-wrap:balance]"
        >
          {data.tagline}
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="mt-4 max-w-4xl text-sm md:text-[15px] leading-relaxed text-white"
        >
          {data.description}
        </motion.p>

        {/* Buttons on a soft blue glow backdrop, like the image */}
        <motion.div variants={itemVariants} className="relative mt-9 w-full flex justify-center">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[220px] rounded-full opacity-70"
            style={{
              background:
                "radial-gradient(circle, rgba(75,107,253,0.35) 0%, rgba(17,49,200,0.15) 40%, rgba(5,7,13,0) 75%)",
            }}
          />
          <div className="relative flex flex-col sm:flex-row items-center gap-5 sm:gap-7">
            {data.buttons?.map((btn, i) =>
              btn.style === "secondary" ? (
                <Link key={i} href={btn.url}>
                  <Button padding="25px 20px">{btn.label}</Button>
                </Link>
              ) : (
                <Link key={i} href={btn.url} className="group relative">
                  <span
                    aria-hidden
                    className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#1131c8] via-[#4b6bfd] to-[#1131c8] opacity-40 blur-lg transition-opacity duration-300 group-hover:opacity-80"
                  />
                  <button className="relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-6 sm:px-9 md:px-10 lg:px-11 h-[54px] sm:h-[56px] lg:h-[60px] bg-gradient-to-l from-[#1131c8] via-[#4b6bfd] to-[#1131c8] text-white text-[15px] sm:text-[16px] lg:text-[17px] font-medium rounded-full transition-all duration-300 shadow-md shadow-neutral-600 max-w-[400px] sm:max-w-none group-hover:scale-[1.03] group-hover:from-[#1131c8] group-hover:via-[#212ba9] group-hover:to-[#212ba9] border-2 border-blue-300">
                    <img src="/GetFree.png" alt={`${btn.label}`} />
                    {btn.label}
                  </button>
                </Link>
              )
            )}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}



// "use client";

// import React from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import Button from "./Button_x"

// /**
//  * HeroSection
//  * -----------
//  * One shared hero used across every /industry/[slug] page.
//  * Every visible string (badge, headline, highlighted word(s), tagline,
//  * description, button labels/links) is driven entirely by JSON so this
//  * component never needs to change when a new industry is added.
//  *
//  * Same #05070d -> #1131c8/#4b6bfd theme as before, but with more
//  * depth: layered glows, a soft animated aura behind the badge,
//  * floating accent particles, a glow-on-hover primary CTA, and a
//  * subtle gradient underline beneath the highlighted headline word.
//  */

// // --- Types matching the new heroSection JSON shape ---
// type HeroButton = {
//   label: string;
//   url: string;
//   style?: "primary" | "secondary";
// };

// export type HeroSectionData = {
//   badge: string;          // e.g. "Next-Gen Fintech Marketing"
//   titleMain: string;      // e.g. "AI-Powered Digital Marketing Solutions"
//   titlePrefix?: string;   // e.g. "for the " (optional connector before the highlight)
//   titleHighlight: string; // e.g. "Finance Industry"
//   tagline: string;        // e.g. "Build Trust. Generate Quality Leads. Accelerate Financial Growth."
//   description: string;
//   buttons: HeroButton[];
// };

// type HeroSectionProps = {
//   data: HeroSectionData;
// };

// // --- Animation variants ---
// const containerVariants: any = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.12, delayChildren: 0.1 },
//   },
// };

// const itemVariants: any = {
//   hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
//   visible: {
//     opacity: 1,
//     y: 0,
//     filter: "blur(0px)",
//     transition: { duration: 0.6, ease: "easeOut" },
//   },
// };

// // Floating particle positions (purely decorative, subtle)
// const particles = [
//   { top: "18%", left: "12%", size: 5, delay: 0 },
//   { top: "28%", left: "85%", size: 4, delay: 0.6 },
//   { top: "62%", left: "8%", size: 3, delay: 1.1 },
//   { top: "70%", left: "90%", size: 6, delay: 0.3 },
//   { top: "45%", left: "95%", size: 3, delay: 1.6 },
//   { top: "50%", left: "4%", size: 4, delay: 2 },
// ];

// export default function HeroSection({ data }: HeroSectionProps) {
//   return (
//     <section className="relative w-full overflow-hidden bg-[#05070d]">
//       {/* top spacer so fixed header never overlaps content */}
//       <div className="w-full h-[82px] lg:h-[100px]" />

//       {/* --- background atmosphere --- */}
//       <div className="pointer-events-none absolute inset-0">
//         {/* large centered radial glow */}
//         <div
//           className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full animate-[pulse_8s_ease-in-out_infinite]"
//           style={{
//             background:
//               "radial-gradient(circle, rgba(75,107,253,0.7) 0%, rgba(17,49,200,0.35) 35%, rgba(5,7,13,0) 70%)",
//           }}
//         />
//         {/* secondary accent glows for extra depth */}
//         <div
//           className="absolute top-[8%] left-[8%] w-[380px] h-[380px] rounded-full opacity-70"
//           style={{
//             background:
//               "radial-gradient(circle, rgba(34,211,238,0.18) 0%, rgba(34,211,238,0) 70%)",
//           }}
//         />
//         <div
//           className="absolute bottom-[6%] right-[6%] w-[420px] h-[420px] rounded-full opacity-70"
//           style={{
//             background:
//               "radial-gradient(circle, rgba(75,107,253,0.22) 0%, rgba(75,107,253,0) 70%)",
//           }}
//         />

//         {/* floating particles */}
//         {particles.map((p, i) => (
//           <motion.span
//             key={i}
//             className="absolute rounded-full bg-[#8ea2ff]"
//             style={{
//               top: p.top,
//               left: p.left,
//               width: p.size,
//               height: p.size,
//               boxShadow: "0 0 8px 2px rgba(142,162,255,0.6)",
//             }}
//             animate={{ y: [0, -14, 0], opacity: [0.3, 0.9, 0.3] }}
//             transition={{
//               duration: 5,
//               repeat: Infinity,
//               delay: p.delay,
//               ease: "easeInOut",
//             }}
//           />
//         ))}

//         {/* dot grid texture */}
//         <div
//           className="absolute inset-0 opacity-[0.25]"
//           style={{
//             backgroundImage:
//               "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
//             backgroundSize: "26px 26px",
//             maskImage:
//               "radial-gradient(circle at 50% 45%, black 0%, transparent 65%)",
//             WebkitMaskImage:
//               "radial-gradient(circle at 50% 45%, black 0%, transparent 65%)",
//           }}
//         />
//         {/* fade to page background at the edges */}
//         <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#05070d] to-transparent" />
//         <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#05070d] to-transparent" />
//       </div>

//       {/* --- content --- */}
//       <motion.div
//         className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-20 md:pb-24 lg:pt-24 lg:pb-28 flex flex-col items-center text-center"
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//       >
//         {/* Badge */}
//         <motion.span
//           variants={itemVariants}
//           className="relative inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-1.5 text-[11px] md:text-xs font-semibold tracking-[0.18em] text-blue-100/80 uppercase backdrop-blur-md shadow-[0_0_20px_-4px_rgba(75,107,253,0.5)]"
//         >
//           <span className="relative flex h-2 w-2">
//             <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-75" />
//             <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
//           </span>
//           {data.badge}
//         </motion.span>

//         {/* Headline */}
//         <motion.h1
//           variants={itemVariants}
//           className="mt-6 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white [text-wrap:balance]"
//         >
//           {data.titleMain}
//           <br />
//           {data.titlePrefix}
//           <span className="relative inline-block">
//             <span className="bg-gradient-to-r from-[#1131c8] via-[#4b6bfd] to-[#1131c8] bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradientShift_6s_ease_infinite]">
//               {data.titleHighlight}
//             </span>
//             <span
//               aria-hidden
//               className="absolute left-0 -bottom-1.5 h-[3px] w-full rounded-full bg-gradient-to-r from-transparent via-[#4b6bfd] to-transparent opacity-80"
//             />
//           </span>
//         </motion.h1>

//         {/* Tagline */}
//         <motion.p
//           variants={itemVariants}
//           className="mt-5 text-base md:text-lg font-semibold text-gray-200"
//         >
//           {data.tagline}
//         </motion.p>

//         {/* Description */}
//         <motion.p
//           variants={itemVariants}
//           className="mt-4 max-w-2xl text-sm md:text-[15px] leading-relaxed text-gray-400"
//         >
//           {data.description}
//         </motion.p>

//         {/* Buttons */}
//         <motion.div
//           variants={itemVariants}
//           className="mt-8 flex flex-col sm:flex-row items-center gap-3"
//         >
//           {data.buttons?.map((btn, i) =>
//             btn.style === "secondary" ? (

//               <Link
//                 key={i}
//                 href={btn.url}
//               >
//                 <Button padding="25px 20px">{btn.label}</Button>
//               </Link>
//             ) : (
//               <Link
//                 key={i}
//                 href={btn.url}
//                 className="group relative"
//               >
//                 {/* glow that blooms behind the button on hover */}
//                 <span
//                   aria-hidden
//                   className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#1131c8] via-[#4b6bfd] to-[#1131c8] opacity-40 blur-lg transition-opacity duration-300 group-hover:opacity-80"
//                 />
//                 <button
//                   className="relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-6 sm:px-9 md:px-10 lg:px-11 h-[54px] sm:h-[56px] lg:h-[60px] bg-gradient-to-l from-[#1131c8] via-[#4b6bfd] to-[#1131c8] text-white text-[15px] sm:text-[16px] lg:text-[17px] font-medium rounded-full transition-all duration-300 shadow-md shadow-neutral-600 max-w-[400px] sm:max-w-none group-hover:scale-[1.03] group-hover:from-[#1131c8] group-hover:via-[#212ba9] group-hover:to-[#212ba9] border-2 border-blue-300"
//                 >
//                   <img src="/GetFree.png" alt={`${btn.label}`} />
//                   {btn.label}
//                 </button>
//               </Link>
//             )
//           )}
//         </motion.div>
//       </motion.div>

//       <style jsx>{`
//         @keyframes gradientShift {
//           0% {
//             background-position: 0% 50%;
//           }
//           50% {
//             background-position: 100% 50%;
//           }
//           100% {
//             background-position: 0% 50%;
//           }
//         }
//       `}</style>
//     </section>
//   );
// }