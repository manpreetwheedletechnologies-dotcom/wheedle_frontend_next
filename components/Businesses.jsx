'use client';
import React from "react";

function ServicesBusinesses() {
  const cards = [
    {
      image: "/Image2.png",
      tagline: "AI Platforms, Automation, Growth Systems",
      title: "Startups & Growing Businesses",
      description:
        "Build your business on intelligent foundations with AI platforms, autonomous workflows, and agent-driven systems designed to scale fast, optimize operations, and accelerate growth.",
    },
    {
      image: "/Image1.png",
      tagline: "Enterprise AI Systems & Managed Intelligence",
      title: "Enterprises & Agencies",
      description:
        "Increase productivity with custom AI platforms, intelligent automation, and AI agents that streamline operations, optimize marketing performance, and support enterprise-scale growth.",
    },
    {
      image: "/Image3.png",
      tagline: "Agentic Marketing, SaaS & Digital Transformation",
      title: "Entrepreneurs & Founders",
      description:
        "Turn bold ideas into intelligent products using AI-driven marketing systems, autonomous agents, and scalable digital solutions built for long-term success.",
    },
  ];

  return (
    <section className="w-full py-20">
      <div className="w-full px-4 sm:px-6 lg:px-24 xl:px-28">

        {/* Header */}
        <div className="mb-14">
          <h2 className="text-4xl lg:text-5xl font-Gotham text-white">
            Solutions for Startups, SMEs,
          </h2>
          <h2 className="text-3xl lg:text-5xl font-Gotham text-white/40 mt-2">
            and Large Enterprises
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {cards.map((card, index) => (
            <div
              key={index}
              className="
                group
                rounded-[28px]
                border border-white/10
                bg-white/5
                backdrop-blur-xl
                overflow-hidden
                transition-all
                duration-500
                hover:-translate-y-2
                hover:border-blue-500/40
                hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]
                flex flex-col
              "
            >
              {/* Image */}
              <div className="relative h-72 lg:h-80 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-110
                  "
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A]/90 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-7 flex-1 flex flex-col">
                {/* Tagline */}
                <p className="text-xs uppercase tracking-wide text-blue-400 mb-3">
                  {card.tagline}
                </p>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-white/80 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default ServicesBusinesses;
