"use client";

import React, { useRef, useState } from "react";
import { motion, Variants } from "framer-motion";

/**
 * WhyChoose
 * ---------
 * "Why Choose <Brand>?" section used across every /industry/[slug] page.
 * Centered heading, followed by a wrapped row of navy-gradient cards
 * (3 on the first row, remaining ones centered on the next row — matches
 * the reference image for any list length). Title + every card's
 * title/description come from JSON so this one component serves every
 * industry. Cards tilt in 3D toward the cursor on hover and auto-bounce
 * smoothly with a pop-up effect.
 */

type WhyChooseItem = {
  title: string;
  description: string;
};

export type WhyChooseData = {
  title: string;
  list: WhyChooseItem[];
};

type WhyChooseProps = {
  data: WhyChooseData;
};

// --- 3D tilt card with auto-bouncing and pop-up effect ---
function TiltCard({ title, description, index }: WhyChooseItem & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      rx: (0.5 - py) * 14,
      ry: (px - 0.5) * 14,
    });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
    setIsHovering(false);
  };

  // Smooth pop-up animation when entering viewport
  const popUpVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: index * 0.1,
      },
    },
  };

  // Smooth auto-bounce animation - gentle and elegant
  const bounceVariants: Variants = {
    initial: { y: 0 },
    bounce: {
      y: [0, -10, 0, -6, 0, -3, 0],
      transition: {
        duration: 2.5,
        ease: "easeInOut",
        times: [0, 0.2, 0.4, 0.55, 0.7, 0.85, 1],
        repeat: Infinity,
        repeatDelay: 0.8,
        delay: index * 0.15,
      },
    },
  };

  // Gentle scale variant for smooth depth
  const scaleVariants: Variants = {
    initial: { scale: 1 },
    bounce: {
      scale: [1, 1.02, 1, 1.015, 1, 1.008, 1],
      transition: {
        duration: 2.5,
        ease: "easeInOut",
        times: [0, 0.2, 0.4, 0.55, 0.7, 0.85, 1],
        repeat: Infinity,
        repeatDelay: 0.8,
        delay: index * 0.15,
      },
    },
  };

  return (
    <motion.div
      variants={popUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      style={{ perspective: 800 }}
      className="w-full sm:w-[300px]"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        variants={bounceVariants}
        initial="initial"
        animate={isHovering ? "initial" : "bounce"}
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.2s ease-out",
          background: "linear-gradient(160deg, #14205f 0%, #0c1548 55%, #070c30 100%)",
        }}
        className="relative h-full rounded-2xl border border-blue-400/25 px-6 py-7 text-center shadow-[0_15px_40px_-18px_rgba(6,20,90,0.8)] hover:border-blue-300/50 hover:shadow-[0_20px_55px_-15px_rgba(75,107,253,0.55)] transition-shadow duration-300 cursor-pointer"
      >
        {/* Blue glow effect centered behind the card */}
        <div className="absolute inset-0 -z-10 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500">
          <div 
            className="absolute inset-0 rounded-2xl blur-2xl"
            style={{
              background: "radial-gradient(circle at center, rgba(59,130,246,0.3) 0%, rgba(59,130,246,0.1) 40%, transparent 70%)",
              transform: "scale(1.2)",
            }}
          />
        </div>

        <motion.div
          variants={scaleVariants}
          initial="initial"
          animate={isHovering ? "initial" : "bounce"}
          style={{ transformStyle: "preserve-3d" }}
        >
          <h3
            style={{ transform: "translateZ(30px)" }}
            className="text-base md:text-lg font-bold text-white leading-snug"
          >
            {title}
          </h3>
          <p
            style={{ transform: "translateZ(20px)" }}
            className="mt-2.5 text-sm leading-relaxed text-white"
          >
            {description}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function WhyChoose({ data }: WhyChooseProps) {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(190deg, #000000 0%, #060a1f 45%, #000000 100%)",
      }}
    >
      {/* Background glow - centered and more subtle */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px]"
          style={{
            background:
              "radial-gradient(circle, rgba(11,44,195,0.2) 0%, rgba(6,101,255,0.08) 40%, rgba(5,7,13,0) 70%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-16 md:py-20 lg:py-24">
        {/* Heading with smooth pop-up */}
        <motion.div
          className="text-center mb-12 md:mb-14"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 25,
          }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            {data.title}
          </h2>
        </motion.div>

        {/* Cards with staggered pop-up */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-7">
          {data.list?.map((item, i) => (
            <TiltCard 
              key={i} 
              index={i}
              title={item.title} 
              description={item.description} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}