'use client';
import React from "react";
import Badge from "./Badge";
function ServicesHero() {
  return (
    <section className="w-full flex justify-center bg-[#010509]">
      <div className="relative w-full max-w-[1440px] min-h-[85vh] sm:min-h-[80vh] lg:min-h-[85vh] overflow-hidden">
        {/* Frame Image */}
        <img
          src="/frame-image.png"
          alt="Frame"
          className="
            absolute inset-0 w-full h-full
            object-cover
            lg:object-contain
          "
        />

        {/* Content */}
        <div
          className="
            relative z-10 w-full h-full
            flex flex-col items-center justify-center
            px-5 sm:px-8
            text-white text-center gap-8

            /* TOP GAP FIX */
            pt-24 sm:pt-28
            lg:pt-0

            /* BOTTOM SAFE AREA */
            pb-32 sm:pb-28
            lg:pb-0

           
           mt-[-5%]
           md:mt-0
           lg:mt-8

          md:-translate-y-6
          lg:-translate-y-10

          "
        >
          {/* Tag */}
          <Badge text="OUR SERVICES" margin="" />
          {/* Text */}
          <div className="max-w-[900px] flex flex-col items-center gap-5">
            <h1 className="font-gotham font-medium text-[28px] sm:text-[32px] lg:text-[40px] leading-tight lg:leading-[52px]">
              Intelligent AI Agents, Agentic Marketing & Digital Services
            </h1>

            <p className="text-sm text-white leading-relaxed max-w-[720px]">
              At Wheedle’s, you get one unified ecosystem of intelligent agents,
              marketing automation, and digital services, all aligned with your
              business goals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesHero;
