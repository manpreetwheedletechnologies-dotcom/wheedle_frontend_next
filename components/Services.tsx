"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Services
 * --------
 * "Our <Industry> Growth Services" grid used across every /industry/[slug]
 * page. Title, subtitle and every card (image + title) come from JSON so
 * this one component serves every industry.
 */

type ServiceItem = {
  image: string;
  imageAlt?: string;
  title: string;
};

export type ServicesData = {
  title: string;
  description: string;
  list: ServiceItem[];
};

type ServicesProps = {
  data: ServicesData;
};

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariants: any = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function Services({ data }: ServicesProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#05070d]">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] h-[500px]"
          style={{
            background:
              "radial-gradient(circle, rgba(11,44,195,0.3) 0%, rgba(6,101,255,0.1) 40%, rgba(5,7,13,0) 70%)",
          }}
        />
      </div>

      {/* Slightly narrower container -> cards ki width kam */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-20 lg:py-24">
        {/* Heading */}
        <motion.div
          className="text-center mb-12 md:mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            {data.title}
          </h2>
          <p className="mt-3 text-sm md:text-base italic font-medium text-gray-300">
            {data.description}
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {data.list?.map((item, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="group relative rounded-2xl overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_55px_-15px_rgba(75,107,253,0.55)]"
            >
              {/* Image now fills the whole card -> card height increased */}
              <div className="relative w-full h-[210px] md:h-[230px] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.imageAlt || item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* hover glow overlay */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1131c8]/0 to-transparent opacity-0 group-hover:opacity-100 group-hover:from-[#1131c8]/25 transition-opacity duration-500"
                />
              </div>

              {/* Title with white bg - hidden by default, slides in from top only on hover */}
              <div className="absolute top-0 left-0 right-0 flex items-center justify-center text-center px-4 py-4 min-h-[76px] bg-white/95 -translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <h3 className="text-[15px] md:text-base font-bold text-[#0a1330] leading-snug">
                  {item.title}
                </h3>
              </div>

              {/* border glow ring on hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-blue-300/0 group-hover:ring-blue-300/50 transition-all duration-500"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}



// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import {
//   Zap,
//   Search,
//   BarChart3,
//   Globe,
//   MessageSquare,
//   Archive,
//   Reply,
//   FileEdit,
//   ShieldCheck,
//   Target,
//   Users,
//   Mail,
//   Sparkles,
//   type LucideIcon,
// } from "lucide-react";

// /**
//  * Services
//  * --------
//  * "Our <Industry> Marketing Services" numbered grid used across every
//  * /industry/[slug] page. Title, subtitle and every card (icon + title)
//  * come from JSON so this one component serves every industry. Card
//  * numbers (01, 02, ...) are derived from array order, not stored in JSON.
//  */

// // Map of icon-name strings (as stored in JSON) -> lucide-react component.
// // Add new entries here as new industries need new icons; unknown names
// // fall back to Sparkles so a typo in JSON never breaks the page.
// const ICONS: Record<string, LucideIcon> = {
//   Zap,
//   Search,
//   BarChart3,
//   Globe,
//   MessageSquare,
//   Archive,
//   Reply,
//   FileEdit,
//   ShieldCheck,
//   Target,
//   Users,
//   Mail,
// };

// type ServiceItem = {
//   icon: string; // key into ICONS
//   title: string;
// };

// export type ServicesData = {
//   title: string;
//   description: string;
//   list: ServiceItem[];
// };

// type ServicesProps = {
//   data: ServicesData;
// };

// const containerVariants: any = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.06, delayChildren: 0.1 },
//   },
// };

// const cardVariants: any = {
//   hidden: { opacity: 0, y: 18 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.5, ease: "easeOut" },
//   },
// };

// export default function Services({ data }: ServicesProps) {
//   return (
//     <section className="relative w-full overflow-hidden bg-[#05070d]">
//       <div className="pointer-events-none absolute inset-0">
//         <div
//           className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] h-[500px]"
//           style={{
//             background:
//               "radial-gradient(circle, rgba(11,44,195,0.3) 0%, rgba(6,101,255,0.1) 40%, rgba(5,7,13,0) 70%)",
//           }}
//         />
//       </div>

//       <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16 md:py-20 lg:py-24">
//         {/* Heading */}
//         <motion.div
//           className="text-center mb-12 md:mb-14"
//           initial={{ opacity: 0, y: 16 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.4 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//         >
//           <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
//             {data.title}
//           </h2>
//           <p className="mt-4 max-w-xl mx-auto text-sm md:text-base leading-relaxed text-gray-400">
//             {data.description}
//           </p>
//         </motion.div>

//         {/* Grid */}
//         <motion.div
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.1 }}
//         >
//           {data.list?.map((item, i) => {
//             const Icon = ICONS[item.icon] || Sparkles;
//             const number = String(i + 1).padStart(2, "0");
//             return (
//               <motion.div
//                 key={i}
//                 variants={cardVariants}
//                 className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 transition-colors duration-300 hover:border-white/[0.14] hover:bg-white/[0.05]"
//               >
//                 <div className="flex items-start justify-between">
//                   <span className="text-xs font-medium text-gray-500">
//                     {number}
//                   </span>
//                   <span className="text-blue-400">
//                     <Icon size={18} strokeWidth={1.75} />
//                   </span>
//                 </div>
//                 <h3 className="mt-6 text-[15px] md:text-base font-semibold text-white">
//                   {item.title}
//                 </h3>
//               </motion.div>
//             );
//           })}
//         </motion.div>
//       </div>
//     </section>
//   );
// }