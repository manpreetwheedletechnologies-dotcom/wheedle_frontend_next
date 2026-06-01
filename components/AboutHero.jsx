'use client';
import React from "react";
import Badge from "./Badge";

function AboutHero() {
  return (
    <section className="w-full h-full flex justify-center mt-[-2%]">
     <div className="relative w-full max-w-[1440px] min-h-[75vh] sm:min-h-[80vh] md:min-h-[82vh] lg:min-h-[85vh]">
        {/* Frame Image */}
        <img
          src="/frame-image.png"
          alt="Frame"
          className="absolute inset-0 w-full h-full object-cover lg:object-contain lg:translate-y-6"
        />

        {/* Content */}
        <div
          className="
            relative z-10 w-full h-full
            flex flex-col items-center justify-center
            px-5 sm:px-8
            text-white text-center
            gap-6

            /* KEEP POSITION SAME AS IMAGE */
           -translate-y-6 sm:-translate-y-10 md:-translate-y-12 lg:-translate-y-14 lg:mt-8

           pt-32 sm:pt-36 md:pt-32 lg:pt-20
pb-32 sm:pb-36 md:pb-28 lg:pb-0
          "
        >
          {/* Badge */}
          <Badge text="ABOUT" margin="" />

          {/* Title */}
          <h1 className="font-gotham font-medium text-[28px] sm:text-[32px] lg:text-[40px] leading-tight lg:leading-[52px] max-w-[900px]">
            About Wheedle Technologies
          </h1>

          {/* TEXT SCROLL AREA */}
          <div
            className="
                    max-w-[900px]
                    h-[2.8em] sm:h-[3.2em] lg:h-[3.5em]
                    overflow-y-auto
                    px-2
                    scrollbar-hide desktop-scrollbar
                    "
          >
            <p className="font-inter font-medium text-sm sm:text-[15px] lg:text-base leading-relaxed">
              Wheedle Technologies is a full-spectrum digital transformation and
              AI automation company enabling non-IT businesses to become
              technology-driven enterprises. In a rapidly evolving digital
              economy, organizations need powerful, scalable, and intelligent
              technology ecosystems- but building and managing in-house IT
              capabilities is often complex and resource-intensive. Wheedle
              bridges this gap as a strategic outsourced technology and growth
              partner.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutHero;
