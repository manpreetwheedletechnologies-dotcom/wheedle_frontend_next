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
 *
 * Row styles, driven by JSON (`variant`):
 *  - "card"  -> bordered box, left text + right image, diamond checklist
 *               (used for the featured item)
 *  - "plain" -> centered heading + centered description, no border,
 *               no inline list (used for every item after it)
 *
 * If an item has `listType: "tags"`, its `tagList` renders as a separate
 * full-width "Keyword Pills" band right below that item — icon badge +
 * label, exactly like the reference UI. Each tag can supply either an
 * `icon` (lucide key) or an `image` (path from JSON) for the badge.
 */

const TAG_ICONS: Record<string, LucideIcon> = {
  Award,
  MapPin,
  Briefcase,
  TrendingUp,
};

type TagPill = {
  icon?: string; // key into TAG_ICONS
  image?: string; // optional image path from JSON, takes priority over icon
  label: string;
};

type BusinessItem = {
  variant?: "card" | "plain";
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  listType?: "checklist" | "tags" | "none";
  list?: string[]; // used when listType === "checklist"
  tagListTitle?: string; // e.g. "Keyword Pills:"
  tagList?: TagPill[]; // used when listType === "tags"
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

// --- Featured card row: bordered box, left text + right image ---
function CardRow({ item }: { item: BusinessItem }) {
  return (
    <motion.div
      className="group relative rounded-3xl border border-white/10 bg-black p-6 md:p-8 transition-all duration-500 hover:border-blue-400/40 hover:shadow-[0_0_60px_-10px_rgba(59,101,255,0.45)]"
      variants={rowVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* soft blue glow that appears on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(59,101,255,0.18), transparent 60%)",
        }}
      />

      <div className="relative flex flex-col md:flex-row items-stretch gap-8 md:gap-10">
        {/* Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white">
            {item.title}
          </h3>
          <p className="mt-4 text-base md:text-lg leading-relaxed text-gray-300 max-w-md">
            {item.description}
          </p>

          {item.listType === "checklist" && item.list?.length ? (
            <ul className="mt-6 flex flex-col gap-3">
              {item.list.map((entry, j) => (
                <li
                  key={j}
                  className="flex items-center gap-2.5 text-base font-medium text-gray-100"
                >
                  <Diamond
                    size={11}
                    strokeWidth={0}
                    className="fill-cyan-300 text-cyan-300 flex-shrink-0"
                  />
                  {entry}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {/* Image */}
        {item.image ? (
          <div className="w-full md:w-1/2">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 h-full min-h-[280px] md:min-h-[360px]">
              <img
                src={item.image}
                alt={item.imageAlt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/0 group-hover:ring-blue-300/40 transition-all duration-500"
              />
              {/* popup / zoom badge on hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/30 scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Maximize2 size={18} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}

// --- Plain row: centered heading + centered description only ---
function PlainRow({ item }: { item: BusinessItem }) {
  return (
    <motion.div
      className="flex flex-col items-center text-center"
      variants={rowVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <h3 className="text-3xl md:text-4xl font-bold text-white max-w-2xl">
        {item.title}
      </h3>
      <p className="mt-4 text-lg md:text-xl leading-relaxed text-gray-300 max-w-2xl">
        {item.description}
      </p>
    </motion.div>
  );
}

// --- Keyword Pills: full-bleed blue band with icon-badge/image + label grid ---
function KeywordPillsBand({
  title,
  tags,
}: {
  title?: string;
  tags: TagPill[];
}) {
  return (
    <motion.div
      className="relative w-screen mx-[calc(50%-50vw)] bg-[#0a1550] py-14 md:py-16"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-5xl mx-auto px-6">
        {title ? (
          <h4 className="text-center text-2xl md:text-3xl font-bold text-white mb-10">
            {title}
          </h4>
        ) : null}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-6">
          {tags.map((tag, j) => {
            const Icon = TAG_ICONS[tag.icon || ""] || Sparkles;
            return (
              <div
                key={j}
                className="group flex flex-col items-center text-center"
              >
                <div className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 transition-transform duration-300 group-hover:scale-110">
                  {tag.image ? (
                    <img
                      src={tag.image}
                      alt={tag.label}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Icon size={56} strokeWidth={1.5} className="text-white" />
                  )}
                </div>
                <p className="mt-3 text-xs md:text-sm font-medium text-white/90 leading-snug max-w-[9rem]">
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
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16 md:py-20 lg:py-24">
        {/* Heading */}
        {data.title || data.description ? (
          <motion.div
            className="text-center mb-14 md:mb-16"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {data.title ? (
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white max-w-2xl mx-auto leading-snug">
                {data.title}
              </h2>
            ) : null}
            {data.description ? (
              <p className="mt-4 max-w-xl mx-auto text-sm md:text-base leading-relaxed text-gray-400">
                {data.description}
              </p>
            ) : null}
          </motion.div>
        ) : null}

        {/* Rows */}
        <div className="flex flex-col gap-14 md:gap-16">
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



// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import { Check } from "lucide-react";

// /**
//  * Business
//  * --------
//  * "AI-Powered Solutions for <Industry> Businesses" section used across
//  * every /industry/[slug] page. Heading + every row (title, description,
//  * image, and either a checklist or a set of tag pills) comes from JSON so
//  * this one component serves every industry.
//  */

// type BusinessItem = {
//   title: string;
//   description: string;
//   image: string;
//   imageAlt: string;
//   listType?: "checklist" | "tags" | "none";
//   list?: string[];
// };

// export type BusinessData = {
//   title: string;
//   description: string;
//   items: BusinessItem[];
// };

// type BusinessProps = {
//   data: BusinessData;
// };

// const rowVariants: any = {
//   hidden: { opacity: 0, y: 24 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.6, ease: "easeOut" },
//   },
// };

// export default function Business({ data }: BusinessProps) {
//   return (
//     <section className="relative w-full overflow-hidden bg-[#05070d]">
//       <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16 md:py-20 lg:py-24">
//         {/* Heading */}
//         <motion.div
//           className="text-center mb-14 md:mb-16"
//           initial={{ opacity: 0, y: 16 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.4 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//         >
//           <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white max-w-2xl mx-auto leading-snug">
//             {data.title}
//           </h2>
//           <p className="mt-4 max-w-xl mx-auto text-sm md:text-base leading-relaxed text-gray-400">
//             {data.description}
//           </p>
//         </motion.div>

//         {/* Rows */}
//         <div className="flex flex-col gap-16 md:gap-20">
//           {data.items?.map((item, i) => {
//             const reversed = i % 2 === 1;
//             return (
//               <motion.div
//                 key={i}
//                 className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
//                   reversed ? "md:flex-row-reverse" : ""
//                 }`}
//                 variants={rowVariants}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true, amount: 0.3 }}
//               >
//                 {/* Text */}
//                 <div className="w-full md:w-1/2">
//                   <h3 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-[#9DB6FF] to-[#6FA8FF] bg-clip-text text-transparent">
//                     {item.title}
//                   </h3>
//                   <p className="mt-3 text-sm md:text-[15px] leading-relaxed text-gray-400 max-w-md">
//                     {item.description}
//                   </p>

//                   {item.listType === "checklist" && item.list?.length ? (
//                     <ul className="mt-5 flex flex-col gap-2.5">
//                       {item.list.map((entry, j) => (
//                         <li
//                           key={j}
//                           className="flex items-center gap-2.5 text-sm text-gray-200"
//                         >
//                           <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-cyan-300/60 text-cyan-300 flex-shrink-0">
//                             <Check size={11} strokeWidth={3} />
//                           </span>
//                           {entry}
//                         </li>
//                       ))}
//                     </ul>
//                   ) : null}

//                   {item.listType === "tags" && item.list?.length ? (
//                     <div className="mt-5 flex flex-wrap gap-2.5">
//                       {item.list.map((entry, j) => (
//                         <span
//                           key={j}
//                           className="rounded-lg border border-blue-400/25 bg-blue-500/10 px-3.5 py-1.5 text-xs md:text-[13px] font-medium text-blue-100"
//                         >
//                           {entry}
//                         </span>
//                       ))}
//                     </div>
//                   ) : null}
//                 </div>

//                 {/* Image */}
//                 <div className="w-full md:w-1/2">
//                   <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_60px_-20px_rgba(6,101,255,0.35)]">
//                     <img
//                       src={item.image}
//                       alt={item.imageAlt}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }