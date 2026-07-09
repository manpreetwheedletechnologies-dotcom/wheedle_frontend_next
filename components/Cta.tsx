"use client";

import React,{useState} from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ContactModal from "../components/ContactModal"
/**
 * Cta
 * ---
 * "Ready to Grow Your <Industry> Business?" call-to-action card used
 * across every /industry/[slug] page. Title, description and button
 * (label + url) all come from JSON so this one component serves every
 * industry.
 */

export type CtaData = {
  title: string;
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
    <section className="relative w-full overflow-hidden bg-[#05070d] px-6 py-14 md:py-20">
      {/* ambient theme glow behind the card */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#1131c8] via-[#4b6bfd] to-[#1131c8] opacity-30 blur-[110px]"
        aria-hidden="true"
      />

      {/* gradient-ring wrapper: 1px of theme gradient showing through as the border */}
      <motion.div
        className="relative mx-auto w-full max-w-3xl rounded-[28px] bg-gradient-to-br from-[#1131c8] via-[#4b6bfd] to-[#1131c8] p-[1px]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="relative flex flex-col items-center overflow-hidden rounded-[27px] bg-white/[0.06] px-8 py-12 text-center shadow-[0_8px_44px_-12px_rgba(19,45,200,0.55)] backdrop-blur-2xl md:px-14 md:py-14">
          {/* glass sheen along the top edge */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
            aria-hidden="true"
          />
          {/* soft corner wash reading through the glass */}
          <div
            className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br from-[#4b6bfd] via-[#1131c8] to-[#4b6bfd] opacity-25 blur-3xl"
            aria-hidden="true"
          />

          <h2 className="relative text-xl font-bold text-white md:text-2xl lg:text-[26px]">
            {data.title}
          </h2>
          <p className="relative mt-4 max-w-xl text-sm leading-relaxed text-white/60 md:text-[15px]">
            {data.description}
          </p>
          <Link
          onClick={() => setOpenContact(true)}
            href=''
            className="relative mt-7 inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#1131c8] via-[#4b6bfd] to-[#1131c8] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-6px_rgba(75,107,253,0.65)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_10px_32px_-6px_rgba(75,107,253,0.85)]"
          >
            {data.button.label}
          </Link>
        </div>
      </motion.div>
      {openContact && (
          <ContactModal onClose={() => setOpenContact(false)} title={data.button.label}
            description="" contactEmail="info@wheedletechnologies.ai"
            contactPhone="+91 9717672561" messagePlaceholder="Tell us your message" />
        )}
    </section>
  );
}