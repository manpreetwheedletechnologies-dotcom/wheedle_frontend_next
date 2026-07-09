"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

/**
 * Business
 * --------
 * "AI-Powered Solutions for <Industry> Businesses" section used across
 * every /industry/[slug] page. Heading + every row (title, description,
 * image, and either a checklist or a set of tag pills) comes from JSON so
 * this one component serves every industry.
 */

type BusinessItem = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  listType?: "checklist" | "tags" | "none";
  list?: string[];
};

export type BusinessData = {
  title: string;
  description: string;
  items: BusinessItem[];
};

type BusinessProps = {
  data: BusinessData;
};

const rowVariants: any = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Business({ data }: BusinessProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#05070d]">
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16 md:py-20 lg:py-24">
        {/* Heading */}
        <motion.div
          className="text-center mb-14 md:mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white max-w-2xl mx-auto leading-snug">
            {data.title}
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-sm md:text-base leading-relaxed text-gray-400">
            {data.description}
          </p>
        </motion.div>

        {/* Rows */}
        <div className="flex flex-col gap-16 md:gap-20">
          {data.items?.map((item, i) => {
            const reversed = i % 2 === 1;
            return (
              <motion.div
                key={i}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
                  reversed ? "md:flex-row-reverse" : ""
                }`}
                variants={rowVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {/* Text */}
                <div className="w-full md:w-1/2">
                  <h3 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-[#9DB6FF] to-[#6FA8FF] bg-clip-text text-transparent">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm md:text-[15px] leading-relaxed text-gray-400 max-w-md">
                    {item.description}
                  </p>

                  {item.listType === "checklist" && item.list?.length ? (
                    <ul className="mt-5 flex flex-col gap-2.5">
                      {item.list.map((entry, j) => (
                        <li
                          key={j}
                          className="flex items-center gap-2.5 text-sm text-gray-200"
                        >
                          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-cyan-300/60 text-cyan-300 flex-shrink-0">
                            <Check size={11} strokeWidth={3} />
                          </span>
                          {entry}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {item.listType === "tags" && item.list?.length ? (
                    <div className="mt-5 flex flex-wrap gap-2.5">
                      {item.list.map((entry, j) => (
                        <span
                          key={j}
                          className="rounded-lg border border-blue-400/25 bg-blue-500/10 px-3.5 py-1.5 text-xs md:text-[13px] font-medium text-blue-100"
                        >
                          {entry}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>

                {/* Image */}
                <div className="w-full md:w-1/2">
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_60px_-20px_rgba(6,101,255,0.35)]">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}