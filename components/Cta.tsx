"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ContactModal from "../components/ContactModal";

/**
 * Cta
 * ---
 * "Ready to Grow Your <Industry>?" call-to-action section used across
 * every /industry/[slug] page. Left side image, right side title
 * (with a highlighted line), description and button — all driven by
 * JSON so this one component serves every industry.
 */

export type CtaData = {
  image: string;
  imageAlt?: string;
  titleLine1: string; // e.g. "Ready to Grow Your"
  titleHighlight: string; // e.g. "MSME?"
  description: string;
  button: {
    label: string;
    url: string;
  };
};

type CtaProps = {
  data: CtaData;
};

export default function Cta({ data }: CtaProps) {
  const [openContact, setOpenContact] = useState(false);

  return (
    <section className="relative w-full overflow-hidden bg-[#05070d]">
      {/* ambient theme glow, offset to the right like the reference */}
      <div
        className="pointer-events-none absolute right-0 top-1/2 h-[500px] w-[600px] -translate-y-1/2 rounded-full bg-gradient-to-br from-[#1131c8] via-[#4b6bfd] to-[#1131c8] opacity-25 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          {/* Left: robot image, bigger, vertically centered, with 3 animation effects */}
          <motion.div
            className="relative w-full md:w-[44%] flex-shrink-0"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Effect 1: pulsing ambient glow behind the robot */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#4b6bfd] to-[#1131c8] blur-[80px]"
              animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.9, 1.08, 0.9] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Effect 2: continuous floating motion */}
            <motion.img
              src={data.image}
              alt={data.imageAlt || data.titleHighlight}
              className="relative z-10 w-full h-auto object-contain object-bottom max-h-[480px] md:max-h-[540px] mx-auto"
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              // Effect 3: subtle hover scale/tilt for interactivity
              whileHover={{ scale: 1.04, rotate: 1 }}
            />
          </motion.div>

          {/* Right: text + CTA */}
          <motion.div
            className="w-full md:w-[56%] text-center md:text-left py-10 md:py-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: "easeOut" },
                },
              }}
              className="text-2xl md:text-3xl lg:text-[40px] font-bold leading-tight text-white [text-wrap:balance]"
            >
              {data.titleLine1}
              <br />
              <span className="bg-gradient-to-r from-[#9DB6FF] to-[#4b6bfd] bg-clip-text text-transparent">
                {data.titleHighlight}
              </span>
            </motion.h2>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: "easeOut" },
                },
              }}
              className="mt-5 max-w-xl mx-auto md:mx-0 text-sm md:text-[15px] leading-relaxed text-white"
            >
              {data.description}
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: "easeOut" },
                },
              }}
              className="mt-7"
            >
              <Link
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  setOpenContact(true);
                }}
                className="inline-flex items-center justify-center rounded-lg bg-[#1131c8] px-6 py-3.5 text-sm md:text-[15px] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(75,107,253,0.65)] transition-all duration-300 hover:bg-[#0e2aa8] hover:scale-[1.03] hover:shadow-[0_10px_32px_-6px_rgba(75,107,253,0.85)]"
              >
                {data.button.label}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {openContact && (
        <ContactModal
          onClose={() => setOpenContact(false)}
          title={data.button.label}
          description=""
          contactEmail="info@wheedletechnologies.ai"
          contactPhone="+91 9717672561"
          messagePlaceholder="Tell us your message"
        />
      )}
    </section>
  );
}



// "use client";

// import React,{useState} from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import ContactModal from "../components/ContactModal"
// /**
//  * Cta
//  * ---
//  * "Ready to Grow Your <Industry> Business?" call-to-action card used
//  * across every /industry/[slug] page. Title, description and button
//  * (label + url) all come from JSON so this one component serves every
//  * industry.
//  */

// export type CtaData = {
//   title: string;
//   description: string;
//   button: {
//     label: string;
//     url: string;
//   };
// };

// type CtaProps = {
//   data: CtaData;
// };

// export default function Cta({ data }: CtaProps) {
//   const [openContact, setOpenContact] = useState(false);
//   return (
//     <section className="relative w-full overflow-hidden bg-[#05070d] px-6 py-14 md:py-20">
//       {/* ambient theme glow behind the card */}
//       <div
//         className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#1131c8] via-[#4b6bfd] to-[#1131c8] opacity-30 blur-[110px]"
//         aria-hidden="true"
//       />

//       {/* gradient-ring wrapper: 1px of theme gradient showing through as the border */}
//       <motion.div
//         className="relative mx-auto w-full max-w-3xl rounded-[28px] bg-gradient-to-br from-[#1131c8] via-[#4b6bfd] to-[#1131c8] p-[1px]"
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true, amount: 0.3 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//       >
//         <div className="relative flex flex-col items-center overflow-hidden rounded-[27px] bg-white/[0.06] px-8 py-12 text-center shadow-[0_8px_44px_-12px_rgba(19,45,200,0.55)] backdrop-blur-2xl md:px-14 md:py-14">
//           {/* glass sheen along the top edge */}
//           <div
//             className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
//             aria-hidden="true"
//           />
//           {/* soft corner wash reading through the glass */}
//           <div
//             className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br from-[#4b6bfd] via-[#1131c8] to-[#4b6bfd] opacity-25 blur-3xl"
//             aria-hidden="true"
//           />

//           <h2 className="relative text-xl font-bold text-white md:text-2xl lg:text-[26px]">
//             {data.title}
//           </h2>
//           <p className="relative mt-4 max-w-xl text-sm leading-relaxed text-white/60 md:text-[15px]">
//             {data.description}
//           </p>
//           <Link
//           onClick={() => setOpenContact(true)}
//             href=''
//             className="relative mt-7 inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#1131c8] via-[#4b6bfd] to-[#1131c8] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-6px_rgba(75,107,253,0.65)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_10px_32px_-6px_rgba(75,107,253,0.85)]"
//           >
//             {data.button.label}
//           </Link>
//         </div>
//       </motion.div>
//       {openContact && (
//           <ContactModal onClose={() => setOpenContact(false)} title={data.button.label}
//             description="" contactEmail="info@wheedletechnologies.ai"
//             contactPhone="+91 9717672561" messagePlaceholder="Tell us your message" />
//         )}
//     </section>
//   );
// }