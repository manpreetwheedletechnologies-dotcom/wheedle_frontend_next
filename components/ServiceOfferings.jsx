'use client';
import React from "react";
import Button from "./Button_x";
function ServiceOfferings() {
  const services = [
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Strategic Planning & Design",
      description: "Our experts start by forming a framework that is updated to meet your vision and needs.",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Performance Optimization & Tuning",
      description: "We offer optimized applications & customized AI Agents with enhanced scalability and reliability.",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: "Quality Assurance & Testing",
      description: "We deliver Our Services & AI Platforms after a manual and automated testing procedure",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Security Updates & Patch Management",
      description: "Wheedle ensures that you stay up-to-date with version updates and continuous performance tracking.",
    },
  ];

  return (
    <section className="w-full py-20">
      <div className="w-full px-5">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left Content */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            {/* Title */}
            <h2 className="text-4xl lg:text-5xl font-Gotham text-white leading-tight mb-6">
              Explore The Services
              <br />
              & AI Agents Behind
              <br/>

              <span className="Gotham text-white/70">Your Solutions</span>
            </h2>

            {/* Description */}
            <p className="text-sm text-Gotham leading-relaxed mb-8 max-w-md">
              Discover our complete service suite crafted to blend technology, creativity, and strategy into your IT Solutions, Customised AI agents, and Agentic Platforms. We offer a wide range of Agentic Platforms and Digital Services that align with your business goals.
            </p>

            {/* Button */}
            {/* <div className="w-full sm:w-auto max-w-[400px] sm:max-w-none">
              <Button padding="28px">Get Started</Button>
            </div> */}
          </div>

          {/* Right Content - Service Cards Grid */}
          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
            {services.map((service, index) => (
              <div
                key={index}
                className={`
    w-full
    max-w-[287.5px]
    h-[235px]
    rounded-[25px]
    border border-[#2E3FD8]
    p-[25px]

    bg-[#040010]
    flex flex-col gap-[10px]

    transition-all duration-300 ease-out
    hover:bg-gradient-to-br
    hover:from-[#2934E4]
    hover:to-[#171D7E]
    hover:shadow-[0_0_25px_rgba(46,63,216,0.45)]
    + hover:-translate-y-2

    ${index % 3 === 0 ? "float-wave" : index % 3 === 1 ? "float-wave-slow" : "float-wave-fast"}
    hover:[animation-play-state:paused]
  `}
              >

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-[#171D7E] flex items-center justify-center">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-[16px] font-semibold text-white leading-tight">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-[13px] text-white leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>



        </div>
      </div>
    </section>
  );
}

export default ServiceOfferings;
