'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import industriesData from '../lib/industries.json';

// ---- types ---------------------------------------------------------------

interface ChallengeItem {
    icon: string;
    title: string;
    description: string;
}

interface HighlightItem {
    icon: string;
    label: string;
}

interface WhyChooseItem {
    icon: string;
    title: string;
    description: string;
}

interface ServiceItem {
    icon: string;
    title: string;
}

interface HeroSection {
    badge: string;
    titleMain: string;
    titlePrefix: string;
    titleHighlight: string;
    tagline: string;
    description: string;
}

interface WhyChooseSection {
    title: string;
    highlight?: HighlightItem;
    list: WhyChooseItem[];
}

interface ServicesGridSection {
    title: string;
    description: string;
    list: ServiceItem[];
}

interface ChallengesSection {
    title: string;
    description: string;
    list: ChallengeItem[];
}

interface IndustryEntry {
    heroSection: HeroSection;
    challengesSection: ChallengesSection;
    whyChooseSection: WhyChooseSection;
    servicesGridSection: ServicesGridSection;
}

type IndustriesData = Record<string, IndustryEntry>;

const data = industriesData as unknown as IndustriesData;

// ---- helpers ---------------------------------------------------------------

/** Resolves a Lucide icon by string name, with a safe fallback. */
function getIcon(name: string): LucideIcon {
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[name] ?? LucideIcons.Sparkles;
}

function slugify(key: string): string {
    return key.toLowerCase().replace(/\s+/g, '-');
}

// ---- animation variants ----------------------------------------------------

const gridVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.09, delayChildren: 0.05 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
};

// ---- single card -------------------------------------------------------

function IndustryCard({ name, entry }: { name: string; entry: IndustryEntry }) {
    const { heroSection, whyChooseSection, servicesGridSection } = entry;
    const HighlightIcon = getIcon(
    whyChooseSection?.highlight?.icon ?? whyChooseSection?.list?.[0]?.icon ?? 'Sparkles'
);
    const previewServices = servicesGridSection.list.slice(0, 4);
    const href = `/industry/${slugify(name)}`;

    return (
        <motion.div variants={cardVariants} className="group relative h-full">
            {/* gradient glow ring on hover */}
            <div
                className="pointer-events-none absolute -inset-px rounded-[28px] opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-70 bg-gradient-to-br from-[#1131c8] via-[#4b6bfd] to-[#1131c8]"
                aria-hidden="true"
            />

            <Link
                href={href}
                className="relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#070b1d]/90 p-7 backdrop-blur-sm transition-transform duration-500 ease-out group-hover:-translate-y-1.5"
            >
                {/* subtle top-corner gradient wash */}
                <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gradient-to-br from-[#1131c8] via-[#4b6bfd] to-[#1131c8] opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40" />

                {/* eyebrow badge — fixed-height row so title never starts at a different
                    offset just because one badge's copy is longer than another's */}
                <div className="relative flex h-6 items-center">
                    <span className="line-clamp-1 w-fit rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[#a9b7ff]">
                        {heroSection.badge}
                    </span>
                </div>

                {/* icon + title — min-height reserves room for a two-line title so
                    short and long industry names still align to the same baseline below */}
                <div className="relative mt-6 flex min-h-[56px] items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1131c8] via-[#4b6bfd] to-[#1131c8] shadow-[0_8px_24px_-6px_rgba(75,107,253,0.65)]">
                        <HighlightIcon className="h-6 w-6 text-white" strokeWidth={2} />
                    </div>
                    <div>
                        <h3 className="line-clamp-2 text-xl font-semibold leading-tight text-white">
                            {heroSection.titlePrefix}
                            <span className="bg-gradient-to-r from-[#8ea1ff] to-[#c3ccff] bg-clip-text text-transparent">
                                {heroSection.titleHighlight}
                            </span>
                        </h3>
                        <p className="mt-1 line-clamp-1 text-sm font-medium text-[#8ea1ff]">
    {whyChooseSection?.highlight?.label ?? whyChooseSection?.list?.[0]?.title ?? ''}
</p>
                    </div>
                </div>

                {/* tagline — clamped to 2 lines with a matching min-height, so a short
                    one-line tagline and a long two-line one occupy identical space */}
                <p className="relative mt-4 line-clamp-2 min-h-[48px] text-[15px] font-medium leading-snug text-white/90">
                    {heroSection.tagline}
                </p>

                {/* description, clamped to 3 lines with matching min-height */}
                <p className="relative mt-3 line-clamp-3 min-h-[63px] text-sm leading-relaxed text-white/55">
                    {heroSection.description}
                </p>

                {/* service chips */}
                <div className="relative mt-6 flex flex-wrap gap-2">
                    {previewServices.map((service) => {
                        const ServiceIcon = getIcon(service.icon);
                        return (
                            <span
                                key={service.title}
                                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/70"
                            >
                                <ServiceIcon className="h-3.5 w-3.5 text-[#7c93ff]" strokeWidth={2} />
                                {service.title}
                            </span>
                        );
                    })}
                </div>

                {/* footer CTA row — pinned to the bottom via mt-auto so every card's
                    button sits flush with the card edge regardless of content above */}
                <div className="relative mt-auto flex items-center justify-between pt-7">
                    <span className="text-sm font-semibold text-white transition-colors group-hover:text-[#a9b7ff]">
                        Explore {name}
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#1131c8] via-[#4b6bfd] to-[#1131c8] transition-transform duration-500 group-hover:translate-x-1 group-hover:rotate-[-40deg]">
                        <LucideIcons.ArrowUpRight className="h-4 w-4 text-white" strokeWidth={2.25} />
                    </span>
                </div>
            </Link>
        </motion.div>
    );
}

// ---- grid ----------------------------------------------------------------

interface IndustryCardsProps {
    limit?: number;
}

export default function IndustryCards({ limit }: IndustryCardsProps) {
    const allIndustries = Object.entries(data);

    const industries =
        typeof limit === 'number'
            ? allIndustries.slice(0, limit)
            : allIndustries;

    return (
        <section className="relative w-full sm:px-8 lg:px-16">
            <div className="mx-auto max-w-6xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={gridVariants}
                    className="grid grid-cols-1 auto-rows-fr items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {industries.map(([name, entry]) => (
                        <IndustryCard key={name} name={name} entry={entry} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}