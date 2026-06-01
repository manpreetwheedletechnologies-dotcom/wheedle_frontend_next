'use client';
import React from "react";
import Link from 'next/link';
import servicesData from '../lib/ServicesData';


function ServicesMission({ title1, title2, description }) {
  const services = [
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "AI Web Engineering Agents",
      description: "We offer secure, highly functional web engineering agents for applications and websites designed to meet industry standards and increase your web traffic.",
      path: `/our-service/${servicesData.web.slug}`,
      highlight: true,
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Autonomous Mobile Application Agents",
      description: "We deploy Autonomous Mobile Application Agents that design, develop, test, and optimize mobile apps across iOS and Android.",
      path: `/our-service/${servicesData.app.slug}`,
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: "AI Software Engineering Platforms",
      description: "Get a customized AI Agent end-to-end software development services that focus on your productivity enhancement and operational goals.",
      path: `/our-service/${servicesData.software.slug}`,
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Intelligent IT Strategy & Advisory Agents",
      description: "Get strategic IT Consulting on digital transformation and technology strategy by AI Advisory agents that create business strategies specifically for your business needs.",
      path: `/our-service/${servicesData.IT.slug}`,
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: "AI Digital Marketing Agent",
      description: "Wheedle Technologies delivers customized AI Agents and Agentic Marketing Platforms for SEO, performance marketing, social media, email marketing, and advanced analytics solutions to improve visibility and engage the right audiences.",
      path: `/our-service/${servicesData.digitalmarketing.slug}`,
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: "AI-Assisted Brand & Visual Design Systems",
      description: "Our AI Visual Design Systems have an eye for the aesthetics needed to capture your audience's attention, crafting graphic designs that support your branding.",
      path: `/our-service/${servicesData.graphicdesigning.slug}`,
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: "Autonomous UI/UX Intelligence Platforms",
      description: "We create AI UI/UX Agents that create user-centered designs to deliver seamless and meaningful digital experiences aligned with your business needs.",
      path: `/our-service/${servicesData.UI.slug}`,
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "AI Solutions & Intelligent Automation",
      description: "We design AI-driven systems with the purpose to automate your workflows and enabling data-driven decision-making, so you can focus on creative decisions.",
      path: `/our-service/${servicesData.AIsolutions.slug}`,
    },
  ];

  return (
    <section className="w-full py-20">
      <div className="w-full px-5">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
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

          {/* Services Grid - 4x2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <Link 
                key={index} 
                href={service.path}  // ✅ Changed from 'to' to 'href'
                className="contents"
              >
                <div
                  className={`
                    p-[1px]
                    rounded-2xl
                    bg-gradient-to-br from-[#7B92FF] to-[#0B2CC3]
                    hover:-translate-y-1
                    transition-all duration-300
                    ${index % 3 === 0 ? "wave-float" : index % 3 === 1 ? "wave-float-slow" : "wave-float-fast"}
                    hover:[animation-play-state:paused]
                  `}
                >
                  <div
                    className="
                      h-full
                      p-6
                      rounded-2xl
                      bg-[#040010]
                      transition-all
                      duration-300
                      hover:bg-gradient-to-br hover:from-[#2934E4] hover:to-[#171D7E]
                    "
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 mb-4 rounded-xl bg-[#171D7E] border border-white/10 flex items-center justify-center">
                      {service.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-semibold text-white mb-2">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-white leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesMission;