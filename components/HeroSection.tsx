"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// --- Animation variants (unchanged) ---
const containerVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const textBoxVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1], delay: 0.3 }
  }
};

const textVariants = {
  hidden: { opacity: 0, y: 15, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut", delay: 0.5 }
  }
};

const floatingAnimation = {
  y: [0, -8, 0],
  transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
};

// --- Inline scroll animation hook (unchanged) ---
function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(threshold: number = 0.08) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// --- Types matching your JSON's heroSection shape ---
type HeroSectionData = {
  title: string;
  description: string;
  heroImageAlt: string;
};

type HeroSectionProps = {
  data: HeroSectionData;
  heroImage: string; // resolved from industryHeroImages[slug] by the parent page
};

export default function HeroSection({ data, heroImage }: HeroSectionProps) {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLElement>();
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation<HTMLDivElement>();

  const zoomStyle: React.CSSProperties = {
    opacity: heroVisible ? 1 : 0,
    transform: heroVisible ? "scale(1)" : "scale(0.85)",
    transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
    willChange: "opacity, transform",
  };

  const fadeUpStyle: React.CSSProperties = {
    opacity: textVisible ? 1 : 0,
    transform: textVisible ? "translateY(0)" : "translateY(40px)",
    transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
    willChange: "opacity, transform",
  };

  return (
    <section
      ref={heroRef}
      style={zoomStyle}
      className="relative w-full min-h-[480px] lg:min-h-[600px] flex flex-col bg-[#0b0c10]"
    >
      <div className="w-full h-[70px] lg:h-[80px] bg-black flex-shrink-0" />

      <div className="relative w-full flex-1 min-h-[400px] lg:min-h-[500px]">
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src={heroImage}
            alt={data.heroImageAlt}
            className="w-full h-full object-cover object-center"
          />
          
        </div>

        <div className="absolute top-0 left-0 right-0 z-10">
          <div className="w-full h-[20px] lg:h-[30px] bg-gradient-to-b from-[#0b0c10] via-[#0b0c10]/85 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="w-full h-[20px] lg:h-[30px] bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/85 to-transparent" />
        </div>

        <motion.div
          className="absolute bottom-[40px] lg:bottom-[-50px] left-0 right-0 z-20 px-6 pb-6 md:pb-8 lg:pb-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="w-full max-w-5xl mx-auto" animate={floatingAnimation}>
            <div className="relative w-full">
              <motion.div
                className="relative backdrop-blur-md rounded-2xl p-5 md:p-7 shadow-2xl"
                style={{ border: "1px solid transparent", backgroundClip: "padding-box", position: "relative" }}
                variants={textBoxVariants}
                whileHover={{ scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  style={{
                    position: "absolute", top: "-1px", right: "-1px", width: "60px", height: "60px",
                    borderTop: "3px solid transparent", borderRight: "3px solid transparent",
                    borderImage: "linear-gradient(135deg, #0665ff, #22d3ee)", borderImageSlice: 1,
                    borderRadius: "0 16px 0 0",
                  }}
                />
                <div
                  style={{
                    position: "absolute", bottom: "-1px", left: "-1px", width: "60px", height: "60px",
                    borderBottom: "3px solid transparent", borderLeft: "3px solid transparent",
                    borderImage: "linear-gradient(135deg, #22d3ee, #0665ff)", borderImageSlice: 1,
                    borderRadius: "0 0 0 16px",
                  }}
                />
                <div
                  style={{
                    position: "absolute", top: "-1px", right: "-1px", width: "80px", height: "80px",
                    background: "linear-gradient(135deg, transparent 50%, #0665ff 50%, #22d3ee 100%)",
                    borderRadius: "0 16px 0 0", opacity: 0.3, pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute", bottom: "-1px", left: "-1px", width: "80px", height: "80px",
                    background: "linear-gradient(135deg, #22d3ee 0%, #0665ff 50%, transparent 50%)",
                    borderRadius: "0 0 0 16px", opacity: 0.3, pointerEvents: "none",
                  }}
                />

                <motion.h1
                  className="text-white text-xl md:text-2xl lg:text-3xl font-bold text-center leading-tight tracking-wide relative z-10"
                  variants={textVariants}
                >
                  {data.title}
                </motion.h1>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div ref={textRef} style={fadeUpStyle} className="w-full bg-[#0b0c10] py-8 md:py-10 lg:py-12">
        <div className="w-full max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light tracking-wide max-w-4xl mx-auto">
            {data.description}
          </p>
        </div>
      </div>
    </section>
  );
}