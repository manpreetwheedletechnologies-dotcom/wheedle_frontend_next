"use client";

import React from "react";
import { motion } from 'framer-motion';

interface Service {
    title: string;
    highlight?: string;
    description: string;
    icon?: string;
    list?: string[]; // optional — not every service has this
}

const services: Service[] = [
    {
        title: "Lead Generation",
        highlight: "Campaigns",
        description:
            "Generate high-quality inquiries for dealerships, service centers, auto accessories, and automotive brands through targeted advertising and performance marketing.",
        icon: "🚀"
    },
    {
        title: "Website Design &",
        highlight: "Development",
        description:
            "Build fast, responsive, and conversion-focused websites that showcase inventory, services, offers, and customer testimonials.",
        icon: "💻"
    },
    {
        title: "Search Engine",
        highlight: "Optimization (SEO)",
        description:
            "Improve visibility on Google and local search results to ensure customers find your business when searching for vehicles, repairs, servicing, or automotive solutions.",
        icon: "🔍"
    },
    {
        title: "Online Reputation",
        highlight: "Management",
        description:
            "Strengthen customer trust by managing reviews, improving ratings, and enhancing your brand reputation across digital platforms.",
        icon: "⭐"
    },
    {
        title: "Social Media",
        highlight: "Marketing",
        description:
            "Engage potential buyers with compelling content, promotional campaigns, vehicle launches, customer success stories, and brand-building initiatives.",
        icon: "📱"
    },
    {
        title: "Performance",
        highlight: "Marketing",
        description:
            "Drive measurable results through Google Ads, Meta Ads, remarketing campaigns, and targeted lead-generation strategies.",
        icon: "📊"
    },
];

const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const cardVariants: any = {
    hidden: {
        opacity: 0,
        y: 40,
        scale: 0.92
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.34, 1.56, 0.64, 1]
        }
    }
};

function ServiceCard({ title, highlight, description, icon, list }: Service) {
    const hasList = Array.isArray(list) && list.length > 0;

    return (
        <motion.div
            className="relative rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-md border border-white/5 p-7 overflow-hidden group transition-all duration-500"
            variants={cardVariants}
            whileHover={{
                y: -10,
                scale: 1.03,
                transition: { duration: 0.4, ease: "easeOut" }
            }}
            whileTap={{ scale: 0.96 }}
        >
            {/* ===== PREMIUM BACKGROUND EFFECTS ===== */}

            {/* Animated gradient background */}
            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                    background: 'radial-gradient(circle at 30% 50%, rgba(6,101,255,0.12), rgba(34,211,238,0.06), transparent 70%)',
                }}
            />

            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        width: Math.random() * 4 + 2,
                        height: Math.random() * 4 + 2,
                        background: i % 2 === 0 ? '#0665ff' : '#22d3ee',
                        opacity: 0.1,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -20 - Math.random() * 30, 0],
                        x: [0, Math.random() * 20 - 10, 0],
                        opacity: [0.05, 0.15, 0.05],
                    }}
                    transition={{
                        duration: 4 + Math.random() * 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 3,
                    }}
                />
            ))}

            {/* ===== PREMIUM TOP CROWN ===== */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-48 h-12">
                {/* Glow aura */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(ellipse at center, rgba(6,101,255,0.3), rgba(34,211,238,0.1), transparent 70%)',
                        filter: 'blur(10px)',
                    }}
                    animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Main top bar */}
                <motion.div
                    className="absolute top-0 left-0 right-0 h-[3px] rounded-full"
                    style={{
                        background: 'linear-gradient(90deg, transparent, #0665ff 30%, #22d3ee 50%, #0665ff 70%, transparent)',
                        boxShadow: '0 0 30px rgba(6,101,255,0.3), 0 0 60px rgba(34,211,238,0.15)',
                    }}
                    animate={{
                        scaleX: [0.6, 1, 0.6],
                        opacity: [0.6, 1, 0.6],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Secondary shimmer line */}
                <motion.div
                    className="absolute top-1.5 left-0 right-0 h-[1px] rounded-full"
                    style={{
                        background: 'linear-gradient(90deg, transparent, #22d3ee 40%, #0665ff 60%, transparent)',
                        opacity: 0.3,
                    }}
                    animate={{
                        scaleX: [0.3, 0.8, 0.3],
                        opacity: [0.1, 0.4, 0.1],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />

                {/* Premium crown jewels */}
                {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                    const isEven = i % 2 === 0;
                    const isCenter = i === 3;
                    return (
                        <motion.div
                            key={i}
                            className="absolute top-0 rounded-full"
                            style={{
                                width: isCenter ? '3px' : isEven ? '2.5px' : '2px',
                                height: isCenter ? '3px' : isEven ? '2.5px' : '2px',
                                background: isEven ? '#22d3ee' : '#0665ff',
                                left: `${10 + i * 13.3}%`,
                                boxShadow: isCenter
                                    ? '0 0 30px rgba(34,211,238,0.8), 0 0 60px rgba(6,101,255,0.4)'
                                    : isEven
                                        ? '0 0 20px rgba(34,211,238,0.5)'
                                        : '0 0 20px rgba(6,101,255,0.5)',
                            }}
                            animate={{
                                y: [0, isCenter ? -10 : -7, 0],
                                opacity: [0.3, isCenter ? 1 : 0.8, 0.3],
                                scale: [1, isCenter ? 1.8 : 1.4, 1],
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.15,
                            }}
                        />
                    );
                })}
            </div>

            {/* ===== PREMIUM BOTTOM CORNERS ===== */}

            {/* Bottom Right - Premium corner */}
            <div className="absolute bottom-0 right-0 w-20 h-20">
                <motion.div
                    className="absolute bottom-0 right-0 w-full h-[2.5px]"
                    style={{
                        background: 'linear-gradient(90deg, transparent, #22d3ee, #0665ff)',
                        boxShadow: '0 0 20px rgba(34,211,238,0.3)',
                    }}
                    animate={{
                        scaleX: [0, 1, 0],
                        opacity: [0, 0.9, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
                <motion.div
                    className="absolute bottom-0 right-0 w-[2.5px] h-full"
                    style={{
                        background: 'linear-gradient(0deg, transparent, #0665ff, #22d3ee)',
                        boxShadow: '0 0 20px rgba(6,101,255,0.3)',
                    }}
                    animate={{
                        scaleY: [0, 1, 0],
                        opacity: [0, 0.9, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
                <motion.div
                    className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-gradient-to-br from-[#22d3ee] to-[#0665ff]"
                    style={{
                        boxShadow: '0 0 30px rgba(34,211,238,0.5), 0 0 60px rgba(6,101,255,0.3)',
                    }}
                    animate={{
                        scale: [1, 2.2, 1],
                        opacity: [0.3, 1, 0.3]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
                {/* Corner glow */}
                <motion.div
                    className="absolute bottom-0 right-0 w-16 h-16"
                    style={{
                        background: 'radial-gradient(circle at bottom right, rgba(34,211,238,0.15), transparent 70%)',
                        filter: 'blur(10px)',
                    }}
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
            </div>

            {/* Bottom Left - Premium corner */}
            <div className="absolute bottom-0 left-0 w-20 h-20">
                <motion.div
                    className="absolute bottom-0 left-0 w-full h-[2.5px]"
                    style={{
                        background: 'linear-gradient(270deg, transparent, #0665ff, #22d3ee)',
                        boxShadow: '0 0 20px rgba(6,101,255,0.3)',
                    }}
                    animate={{
                        scaleX: [0, 1, 0],
                        opacity: [0, 0.9, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                />
                <motion.div
                    className="absolute bottom-0 left-0 w-[2.5px] h-full"
                    style={{
                        background: 'linear-gradient(0deg, transparent, #22d3ee, #0665ff)',
                        boxShadow: '0 0 20px rgba(34,211,238,0.3)',
                    }}
                    animate={{
                        scaleY: [0, 1, 0],
                        opacity: [0, 0.9, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
                <motion.div
                    className="absolute bottom-0 left-0 w-3 h-3 rounded-full bg-gradient-to-br from-[#0665ff] to-[#22d3ee]"
                    style={{
                        boxShadow: '0 0 30px rgba(6,101,255,0.5), 0 0 60px rgba(34,211,238,0.3)',
                    }}
                    animate={{
                        scale: [1, 2.2, 1],
                        opacity: [0.3, 1, 0.3]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                />
                {/* Corner glow */}
                <motion.div
                    className="absolute bottom-0 left-0 w-16 h-16"
                    style={{
                        background: 'radial-gradient(circle at bottom left, rgba(6,101,255,0.15), transparent 70%)',
                        filter: 'blur(10px)',
                    }}
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                />
            </div>

            {/* ===== CONTENT - CENTERED ===== */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center flex-1 w-full pt-8">
                {/* Premium Icon with glow ring */}
                <motion.div
                    className="relative mb-5"
                    whileHover={{
                        scale: 1.1,
                        rotate: 5,
                        transition: { duration: 0.3 }
                    }}
                >

                </motion.div>

                {/* Title with gradient highlight */}
                <h3 className="text-white text-xl md:text-2xl font-bold leading-tight">
                    {title}
                    <br />
                    <motion.span
                        className="text-transparent bg-clip-text bg-gradient-to-r from-[#0665ff] to-[#22d3ee] inline-block"
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.3 }
                        }}
                    >
                        {highlight}
                    </motion.span>
                </h3>

                {/* Description with improved readability */}
                <p className="mt-3 text-gray-300/80 text-sm leading-relaxed max-w-xs">
                    {description}
                </p>

                {/* Optional bullet list — only renders when the service data includes one */}
                {hasList && (
                    <ul className="mt-4 space-y-2 text-left w-full max-w-xs">
                        {list!.map((item, idx) => (
                            <li
                                key={idx}
                                className="flex items-start gap-2.5 text-gray-300/70 text-sm leading-relaxed"
                            >
                                <span
                                    className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0 bg-gradient-to-br from-[#0665ff] to-[#22d3ee]"
                                    style={{ boxShadow: '0 0 8px rgba(34,211,238,0.5)' }}
                                />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                )}

            </div>

            {/* ===== HOVER EFFECTS ===== */}

            {/* Premium scan line */}
            <motion.div
                className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.6 }}
            >
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(180deg, transparent 0%, rgba(34,211,238,0.05) 50%, transparent 100%)',
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

            {/* Border glow on hover */}
            <motion.div
                className="absolute inset-0 rounded-2xl border border-transparent pointer-events-none"
                whileHover={{
                    borderColor: 'rgba(34,211,238,0.15)',
                    boxShadow: 'inset 0 0 40px rgba(6,101,255,0.05)',
                    transition: { duration: 0.5 }
                }}
            />

            {/* Corner highlight on hover */}
            <motion.div
                className="absolute top-0 right-0 w-20 h-20 pointer-events-none"
                whileHover={{
                    opacity: 1,
                }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#22d3ee]/20 rounded-tr-2xl" />
            </motion.div>
            <motion.div
                className="absolute bottom-0 left-0 w-20 h-20 pointer-events-none"
                whileHover={{
                    opacity: 1,
                }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#0665ff]/20 rounded-bl-2xl" />
            </motion.div>
        </motion.div>
    );
}

export default function HowWeHelpSection( { data }: { data: { title: string; titleHighlight?: string; services: Service[] } }) {
    const sectionVariants: any = {
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

    return (
        <motion.section
            className="w-full bg-[#0b0c10] px-6 py-20 lg:py-24 relative overflow-hidden"
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
                className="absolute -top-48 -right-48 w-96 h-96 rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(6,101,255,0.08), rgba(34,211,238,0.04), transparent 70%)',
                    filter: 'blur(80px)',
                }}
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute -bottom-48 -left-48 w-96 h-96 rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(34,211,238,0.08), rgba(6,101,255,0.04), transparent 70%)',
                    filter: 'blur(80px)',
                }}
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 10,
                    delay: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section header with premium design */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    {/* Premium badge */}
                    <motion.div
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/5 bg-white/[0.03] mb-5 backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
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
                            Premium Solutions
                        </span>
                    </motion.div>

                    <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        {data.title}
                            {data.titleHighlight && (
                                <>
                                    <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0665ff] to-[#22d3ee]">
                                        {data.titleHighlight}
                                    </span>
                                </>
                            )}
                    </h2>

                    {/* Premium animated underline */}
                    <div className="relative inline-block">
                        <motion.div
                            className="h-[2.5px] rounded-full overflow-hidden"
                            style={{
                                width: '120px',
                                background: 'linear-gradient(90deg, #0665ff, #22d3ee, #0665ff)',
                                boxShadow: '0 0 30px rgba(6,101,255,0.3)',
                            }}
                            initial={{ width: 0 }}
                            whileInView={{ width: '120px' }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <motion.div
                                className="absolute inset-0"
                                style={{
                                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                                }}
                                animate={{
                                    x: ['-100%', '100%'],
                                }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {data.services.map((service) => (
                        <ServiceCard key={service.title} {...service} />
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
}