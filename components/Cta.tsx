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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative w-full overflow-hidden bg-[#05070d] px-6 md:px-10">
      {/* ambient theme glow, offset to the right like the reference */}
      <motion.div
        className="pointer-events-none absolute right-0 top-1/2 h-[500px] w-[600px] -translate-y-1/2 rounded-full bg-gradient-to-br from-[#1131c8] via-[#4b6bfd] to-[#1131c8] opacity-25 blur-[120px]"
        aria-hidden="true"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.25, 0.35, 0.25],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary glow layer */}
      <motion.div
        className="pointer-events-none absolute left-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-[#4b6bfd] to-[#1131c8] opacity-10 blur-[100px]"
        aria-hidden="true"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          {/* Left: robot image with enhanced shadow effects */}
          <motion.div
            className="relative w-full md:w-[44%] flex-shrink-0 flex justify-center"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* AI Bot Glow Ring - Cyan/Blue gradient */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0665ff]/20 to-[#22d3ee]/20 blur-3xl" />
            
            {/* Effect 1: pulsing ambient glow behind the robot */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#4b6bfd] to-[#1131c8] blur-[80px]"
              animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.9, 1.08, 0.9] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Effect 1b: secondary glow ring */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#4b6bfd]/20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.1, 0.3],
                rotate: [0, 360, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Effect 2: continuous floating motion with shadow */}
            <motion.div
              className="relative group"
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Dynamic shadow beneath the floating image */}
              <motion.div
                className="absolute -bottom-4 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-full bg-[#4b6bfd]/20 blur-xl"
                animate={{
                  scale: [1, 0.7, 1],
                  opacity: [0.4, 0.2, 0.4],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              <motion.img
                src={data.image}
                alt={data.imageAlt || data.titleHighlight}
                className="relative w-full h-auto object-contain object-bottom max-h-[480px] md:max-h-[540px] mx-auto drop-shadow-[0_0_35px_rgba(6,101,255,0.4)] transition duration-700 group-hover:scale-105 group-hover:drop-shadow-[0_0_55px_rgba(34,211,238,0.5)]"
                whileHover={{ 
                  scale: 1.04,
                  transition: { duration: 0.3 }
                }}
              />
            </motion.div>
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
              <motion.span
                className="bg-gradient-to-r from-[#9DB6FF] to-[#4b6bfd] bg-clip-text text-transparent inline-block"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ backgroundSize: "200% 200%" }}
              >
                {data.titleHighlight}
              </motion.span>
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
              <motion.div
                className="relative inline-block"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
              >
                {/* Animated gradient glow ring behind button */}
                <motion.div
                  className="absolute -inset-2 rounded-xl bg-gradient-to-r from-[#0665ff] via-[#4b6bfd] to-[#22d3ee] opacity-0 blur-2xl"
                  animate={{
                    opacity: isHovered ? 0.9 : 0,
                    scale: isHovered ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />

                {/* Light burst effect */}
                <motion.div
                  className="absolute inset-0 rounded-lg overflow-hidden"
                  animate={{
                    opacity: isHovered ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: isHovered ? ["-100%", "100%"] : "-100%",
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>

                <motion.div
                  animate={{
                    scale: isHovered ? 1.05 : 1,
                    y: isHovered ? -2 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Link
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenContact(true);
                    }}
                    className="relative inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#0665ff] via-[#4b6bfd] to-[#0066ff] px-8 py-4 text-sm md:text-[16px] font-semibold text-white shadow-[0_8px_32px_-6px_rgba(6,101,255,0.7)] transition-all duration-300 hover:shadow-[0_12px_48px_-8px_rgba(6,101,255,0.9)] hover:shadow-[0_0_60px_rgba(6,101,255,0.4)]"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {data.button.label}
                      <motion.span
                        animate={{
                          x: isHovered ? [0, 4, 0] : 0,
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: isHovered ? Infinity : 0,
                          ease: "easeInOut",
                        }}
                      >
                        →
                      </motion.span>
                    </span>
                  </Link>
                </motion.div>

                {/* Additional glow dots with cyan/blue theme */}
                <motion.div
                  className="absolute -top-3 -right-3 h-2 w-2 rounded-full bg-[#0665ff]"
                  animate={{
                    scale: isHovered ? [1, 1.5, 1] : 1,
                    opacity: isHovered ? [1, 0.3, 1] : 0.5,
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: isHovered ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -bottom-3 -left-3 h-2 w-2 rounded-full bg-[#22d3ee]"
                  animate={{
                    scale: isHovered ? [1, 1.5, 1] : 1,
                    opacity: isHovered ? [1, 0.3, 1] : 0.5,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2,
                    repeat: isHovered ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
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