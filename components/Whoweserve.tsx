"use client";

import React from "react";
import { motion } from 'framer-motion';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: {
    opacity: 0,
    x: -20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1]
    }
  }
};

interface SolutionsData {
  title?: string;
  list?: string[];
}

interface ServeSectionProps {
  data?: SolutionsData;
  serveimage: string;
}

export default function ServeSection({ data, serveimage }: ServeSectionProps) {
  // Safe fallbacks so the component never crashes if `data` is
  // undefined, partially populated, or missing fields.
  const title = data?.title ?? "";
  const list = data?.list ?? [];
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const containerWrapperVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1],
        delay: 0.2
      }
    }
  };

  return (
    <motion.section
      className="w-full bg-[#0b0c10] px-6 py-16 lg:py-20 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
    >
      {/* Background effects */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(6,101,255,0.5) 1px, transparent 0)
          `,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6,101,255,0.08), rgba(34,211,238,0.04), transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.08), rgba(6,101,255,0.04), transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          delay: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="relative rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm overflow-hidden"
          variants={containerWrapperVariants}
        >
          {/* ===== CONTENT — IMAGE LEFT, TEXT RIGHT ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 items-center p-6 md:p-8 lg:p-10 relative z-10">

            {/* Left: LARGER Illustration */}
            <motion.div
              className="flex items-center justify-center relative py-4 order-1"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Enhanced glow behind image */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(circle at center, rgba(6,101,255,0.2), rgba(34,211,238,0.1), transparent 70%)',
                  filter: 'blur(50px)',
                }}
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Rotating glow rings */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  border: '1px solid rgba(6,101,255,0.1)',
                  width: '85%',
                  height: '85%',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.5, 0.2],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <motion.div
                className="absolute rounded-full"
                style={{
                  border: '1px solid rgba(34,211,238,0.08)',
                  width: '65%',
                  height: '65%',
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.5, 0.2],
                  rotate: [360, 0],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* BIGGER Car Image */}
              <motion.img
                src={serveimage}
                alt="Illustration"
                className="w-full h-auto max-w-2xl lg:max-w-3xl xl:max-w-4xl object-contain relative z-10"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                whileHover={{
                  rotate: [-2, 2, -2],
                  transition: { duration: 0.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
                }}
              />

              {/* More floating particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full z-10"
                  style={{
                    width: Math.random() * 4 + 2,
                    height: Math.random() * 4 + 2,
                    background: i % 2 === 0 ? '#0665ff' : '#22d3ee',
                    opacity: 0.3,
                    top: `${15 + Math.random() * 70}%`,
                    left: `${5 + Math.random() * 90}%`,
                  }}
                  animate={{
                    y: [0, -25 - Math.random() * 35, 0],
                    x: [0, Math.random() * 25 - 12, 0],
                    opacity: [0.1, 0.5, 0.1],
                    scale: [1, 1.8, 1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 3,
                  }}
                />
              ))}

              {/* Sparkle effects */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`sparkle-${i}`}
                  className="absolute rounded-full z-10"
                  style={{
                    width: '3px',
                    height: '3px',
                    background: '#22d3ee',
                    boxShadow: '0 0 20px #22d3ee, 0 0 40px #0665ff',
                    top: `${15 + i * 14}%`,
                    left: `${i % 2 === 0 ? 3 : 94}%`,
                  }}
                  animate={{
                    scale: [0, 1.8, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2 + i * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.6,
                  }}
                />
              ))}
            </motion.div>

            {/* Right: text + list - Compact */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="pl-0 lg:pl-4 order-2"
            >
              {/* Premium badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/[0.03] mb-4"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-[#22d3ee]"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase">
                  Serve
                </span>
              </motion.div>

              <motion.h2
                className="text-white text-xl md:text-2xl font-bold mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {title}
                <br />
              </motion.h2>

              {list.length > 0 && (
                <motion.ol
                  className="space-y-2"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {list.map((item, idx) => (
                    <motion.li
                      key={item}
                      className="flex items-start gap-2.5 text-gray-200 text-sm group/item"
                      variants={itemVariants}
                      whileHover={{
                        x: 10,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <span className="text-[#22d3ee] font-mono text-xs font-bold min-w-[22px]">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-gray-300 group-hover/item:text-white transition-colors duration-300 text-sm">
                        {item}
                      </span>
                      <motion.div
                        className="w-1 h-1 rounded-full bg-[#22d3ee] mt-1.5 opacity-0 group-hover/item:opacity-100"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.li>
                  ))}
                </motion.ol>
              )}

              {/* Decorative line */}
              <motion.div
                className="mt-5 h-[1.5px] w-16 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #0665ff, #22d3ee)',
                }}
                animate={{
                  scaleX: [0.5, 1, 0.5],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>

          {/* Scan line effect on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl opacity-0 group-hover:opacity-100 z-10"
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, transparent 0%, rgba(34,211,238,0.03) 50%, transparent 100%)',
                height: '200%',
              }}
              animate={{
                y: ['-50%', '0%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}