'use client';
import React from "react";
import Link from 'next/link';
import servicesData from '../lib/ServicesData';

const GEAR = "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z";

const Icon = ({ paths }) => (
  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {paths.map((d, i) => (
      <path key={i} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
    ))}
  </svg>
);

const categories = [
  {
    id: "engineering",
    label: "Build & Engineering",
    tagline: "Websites, apps and software engineered by AI agents.",
    services: [
      {
        icon: ["M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"],
        title: "AI Web Engineering Agents",
        description: "We offer secure, highly functional web engineering agents for applications and websites designed to meet industry standards and increase your web traffic.",
        path: `/our-service/${servicesData.web.slug}`,
      },
      {
        icon: ["M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"],
        title: "Autonomous Mobile Application Agents",
        description: "We deploy Autonomous Mobile Application Agents that design, develop, test, and optimize mobile apps across iOS and Android.",
        path: `/our-service/${servicesData.app.slug}`,
      },
      {
        icon: ["M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"],
        title: "AI Software Engineering Platforms",
        description: "Get a customized AI Agent end-to-end software development services that focus on your productivity enhancement and operational goals.",
        path: `/our-service/${servicesData.software.slug}`,
      },
    ],
  },
  {
    id: "design-marketing",
    label: "Design & Marketing",
    tagline: "Experiences, brands and campaigns that capture your audience.",
    services: [
      {
        icon: ["M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"],
        title: "AI Digital Marketing Agent",
        description: "Wheedle Technologies delivers customized AI Agents and Agentic Marketing Platforms for SEO, performance marketing, social media, email marketing, and advanced analytics solutions to improve visibility and engage the right audiences.",
        path: `/our-service/${servicesData.digitalmarketing.slug}`,
      },
      {
        icon: ["M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"],
        title: "AI-Assisted Brand & Visual Design Systems",
        description: "Our AI Visual Design Systems have an eye for the aesthetics needed to capture your audience's attention, crafting graphic designs that support your branding.",
        path: `/our-service/${servicesData.graphicdesigning.slug}`,
      },
      {
        icon: ["M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"],
        title: "Autonomous UI/UX Intelligence Platforms",
        description: "We create AI UI/UX Agents that create user-centered designs to deliver seamless and meaningful digital experiences aligned with your business needs.",
        path: `/our-service/${servicesData.UI.slug}`,
      },
    ],
  },
  {
    id: "ai-strategy",
    label: "AI & Strategy",
    tagline: "Automation and advisory to transform how you operate.",
    services: [
      {
        icon: [GEAR, "M15 12a3 3 0 11-6 0 3 3 0 016 0z"],
        title: "AI Solutions & Intelligent Automation",
        description: "We design AI-driven systems with the purpose to automate your workflows and enabling data-driven decision-making, so you can focus on creative decisions.",
        path: `/our-service/${servicesData.AIsolutions.slug}`,
      },
      {
        icon: [GEAR, "M15 12a3 3 0 11-6 0 3 3 0 016 0z"],
        title: "Intelligent IT Strategy & Advisory Agents",
        description: "Get strategic IT Consulting on digital transformation and technology strategy by AI Advisory agents that create business strategies specifically for your business needs.",
        path: `/our-service/${servicesData.IT.slug}`,
      },
    ],
  },
  {
    id: "infrastructure",
    label: "Infrastructure & Cloud",
    tagline: "Reliable hosting from our own Kolkata data center.",
    services: [
      {
        icon: ["M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"],
        title: "Data Center & Cloud Hosting",
        description: "Secure, low-latency hosting, VPS, dedicated and GPU servers, private cloud and colocation from our New Town, Kolkata data center.",
        path: `/our-service/${servicesData.datacenter.slug}`,
      },
    ],
  },
];

function ServiceCard({ service, index }) {
  return (
    <Link href={service.path} className="group block h-full">
      <div
        className={`h-full p-[1px] rounded-2xl bg-gradient-to-br from-[#7B92FF] to-[#0B2CC3] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_10px_40px_-10px_rgba(41,52,228,0.8)] ${
          index % 3 === 0 ? "wave-float" : index % 3 === 1 ? "wave-float-slow" : "wave-float-fast"
        } group-hover:[animation-play-state:paused]`}
      >
        <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-[#040010] p-6 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-[#2934E4] group-hover:to-[#171D7E]">
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#2934E4]/20 blur-2xl transition-opacity group-hover:opacity-0" />

          <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#171D7E]">
            <Icon paths={service.icon} />
          </div>

          <h3 className="relative mb-2 text-lg font-semibold text-white">{service.title}</h3>

          <p className="relative flex-1 text-sm leading-relaxed text-white/80">
            {service.description}
          </p>

          <span className="relative mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#7B92FF] transition-colors group-hover:text-white">
            Explore
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

function ServicesMission({ title1, title2, description }) {
  let cardIndex = 0;

  return (
    <section className="w-full py-20">
      <div className="w-full px-5">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-4xl lg:text-5xl font-Gautam text-white leading-tight mb-2">
              {title1}
            </h2>
            <h2 className="text-4xl lg:text-5xl font-gautam text-white/70 leading-tight mb-6">
              {title2}
            </h2>
            <p className="text-sm text-white leading-relaxed max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          {/* Category quick-jump */}
          <div className="mb-14 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="rounded-full border border-[#7B92FF]/40 bg-[#171D7E]/20 px-5 py-2 text-sm text-white/90 transition-all hover:border-[#7B92FF] hover:bg-[#2934E4]"
              >
                {cat.label}
              </a>
            ))}
          </div>

          {/* Categories */}
          <div className="space-y-16">
            {categories.map((cat, ci) => (
              <div key={cat.id} id={cat.id} className="scroll-mt-28">
                <div className="mb-6 flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#2934E4] to-[#171D7E] text-sm font-semibold text-white">
                    {String(ci + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-2xl font-Gautam text-white">{cat.label}</h3>
                    <p className="text-sm text-white/60">{cat.tagline}</p>
                  </div>
                  <div className="ml-2 hidden h-px flex-1 bg-gradient-to-r from-[#7B92FF]/50 to-transparent sm:block" />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {cat.services.map((service) => (
                    <ServiceCard key={service.title} service={service} index={cardIndex++} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesMission;