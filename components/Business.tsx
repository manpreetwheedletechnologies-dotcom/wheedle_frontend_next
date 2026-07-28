"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Diamond,
  Award,
  MapPin,
  Briefcase,
  TrendingUp,
  Sparkles,
  Maximize2,
  type LucideIcon,
} from "lucide-react";

/**
 * Business
 * --------
 * "AI-Powered Solutions for <Industry> Businesses" section used across
 * every /industry/[slug] page. Heading + every row comes from JSON so
 * this one component serves every industry.
 */

const TAG_ICONS: Record<string, LucideIcon> = {
  Award,
  MapPin,
  Briefcase,
  TrendingUp,
};

type TagPill = {
  icon?: string;
  image?: string;
  label: string;
};

type BusinessItem = {
  variant?: "card" | "plain";
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  listType?: "checklist" | "tags" | "none";
  list?: string[];
  tagListTitle?: string;
  tagList?: TagPill[];
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

// --- Featured card row: clean, borderless, image-focused ---
function CardRow({ item }: { item: BusinessItem }) {
  return (
    <motion.div
      className="group relative"
      variants={rowVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="flex flex-col md:flex-row items-stretch gap-10 md:gap-14">
        {/* Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center space-y-5">
          <div className="inline-block">
            <span className="text-xs font-semibold tracking-widest uppercase text-blue-400">
              • Featured Solution
            </span>
          </div>

          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {item.title}
          </h3>

          <p className="text-base md:text-lg leading-relaxed text-gray-300 max-w-lg">
            {item.description}
          </p>

          {item.listType === "checklist" && item.list?.length ? (
            <ul className="space-y-3 pt-2">
              {item.list.map((entry, j) => (
                <li
                  key={j}
                  className="flex items-start gap-3 text-base text-gray-100"
                >
                  <Diamond
                    size={14}
                    strokeWidth={0}
                    className="fill-blue-400 text-blue-400 flex-shrink-0 mt-1"
                  />
                  <span className="font-medium">{entry}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {/* Image - Vertically centered and auto-height based on content */}
        {item.image ? (
          <div className="w-full md:w-1/2 flex items-center">
            <div className="relative w-full rounded-2xl overflow-hidden transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:shadow-blue-500/40 group-hover:shadow-purple-500/20">
              {/* Image container with auto height */}
              <div className="overflow-hidden rounded-2xl w-full">
                <img
                  src={item.image}
                  alt={item.imageAlt || item.title}
                  className="w-full h-auto object-cover transition-all duration-700 ease-out group-hover:scale-125 group-hover:rotate-1"
                />
              </div>

              {/* Subtle gradient overlay */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

            </div>

            {/* Outer glow shadow effect below the image */}
            <div
              aria-hidden
              className="absolute -bottom-8 left-0 right-0 h-16 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl"
              style={{
                background: "radial-gradient(ellipse at center, rgba(59,130,246,0.25) 0%, transparent 70%)",
              }}
            />
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}

// --- Plain row: elegant centered content with subtle accent ---
function PlainRow({ item }: { item: BusinessItem }) {
  return (
    <motion.div
      className="flex flex-col items-center text-center max-w-4xl mx-auto pt-10 md:pt-12 lg:pt-16 gap-6 md:gap-8"
      variants={rowVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-blue-700 rounded-full mb-6" />

      <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
        {item.title}
      </h3>

      <p className="mt-4 text-lg md:text-xl leading-relaxed text-gray-300 max-w-2xl">
        {item.description}
      </p>
    </motion.div>
  );
}

// --- Keyword Pills: modern gradient band with icon badges ---
function KeywordPillsBand({
  title,
  tags,
}: {
  title?: string;
  tags: TagPill[];
}) {
  return (
    <motion.div
      className="relative w-screen mx-[calc(50%-50vw)] py-16 md:py-20"
      style={{
        background: "linear-gradient(135deg, #02082c 0%, #011a95 50%, #02082c 100%)",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Subtle glow effect */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse at center, rgba(59,130,246,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
{title ? (
  <h4 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-12 uppercase tracking-wider">
    {title}
  </h4>
) : null}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 md:gap-8">
          {tags.map((tag, j) => {
            const Icon = TAG_ICONS[tag.icon || ""] || Sparkles;
            return (
              <div
                key={j}
                className="group flex flex-col items-center text-center transition-all duration-300 hover:transform hover:-translate-y-1"
              >

                <div className="relative">
                  {/* Glowing background ring */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-150" />

                  {/* Pulsing ring effect */}
                  <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-blue-400/20 transition-all duration-500 group-hover:scale-110" />

                  {/* Main icon container with glass effect */}
                  <div className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 group-hover:bg-white/10 group-hover:border-blue-400/30 group-hover:shadow-2xl group-hover:shadow-blue-500/20">
                    {/* Inner glow */}
                    <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {tag.image ? (
                      <img
                        src={tag.image}
                        alt={tag.label}
                        className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                      />
                    ) : (
                      <Icon
                        size={40}
                        strokeWidth={1.5}
                        className="text-white/80 group-hover:text-blue-300 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                      />
                    )}
                  </div>

                  {/* Animated dot indicator */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150 group-hover:shadow-lg group-hover:shadow-blue-400/50" />
                </div>
                <p className="mt-4 text-sm md:text-base font-medium text-white/80 group-hover:text-white transition-colors duration-300">
                  {tag.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default function Business({ data }: BusinessProps) {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20 md:py-24 lg:py-2">
        {/* Heading - Clean and minimal */}
        {data.title || data.description ? (
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {data.title ? (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-3xl mx-auto leading-tight">
                {data.title}
              </h2>
            ) : null}

            {data.description ? (
              <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg leading-relaxed text-gray-400">
                {data.description}
              </p>
            ) : null}

            {/* Decorative line */}
            <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mt-6" />
          </motion.div>
        ) : null}

        {/* Rows */}
        <div className="flex flex-col gap-20 md:gap-24">
          {data.items?.map((item, i) => {
            const variant = item.variant ?? (i === 0 ? "card" : "plain");
            return (
              <React.Fragment key={i}>
                {variant === "card" ? (
                  <CardRow item={item} />
                ) : (
                  <PlainRow item={item} />
                )}
                {item.listType === "tags" && item.tagList?.length ? (
                  <KeywordPillsBand
                    title={item.tagListTitle}
                    tags={item.tagList}
                  />
                ) : null}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}