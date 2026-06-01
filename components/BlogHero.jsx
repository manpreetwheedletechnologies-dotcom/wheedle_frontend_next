'use client';
import React from "react";
import Badge from "./Badge";
function BlogHero() {
  return (
    <section className="w-full h-full flex justify-center bg-[#010509]  mt-[3.2%]">
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
              text-white gap-8 text-center
              -translate-y-6 sm:-translate-y-10 lg:-translate-y-14
               /* TOP GAP FIX */
            pt-24 sm:pt-28
            lg:pt-0
               /* BOTTOM SAFE AREA */
            pb-32 sm:pb-28
            lg:pb-0

            lg:-translate-y-14
           
            "
        >
          <Badge text="BLOG" margin = ""/>

          <div className="max-w-[900px] flex flex-col items-center gap-5">
            <h1 className="font-gotham font-medium text-[28px] sm:text-[32px] lg:text-[40px] leading-tight lg:leading-[52px]">
              Explore Innovative Technologies Shaping The Future
            </h1>

            <p className="font-inter font-medium text-sm sm:text-[15px] lg:text-base leading-relaxed">
              Welcome to our blog, where we share insights, trends, and expert perspectives
              <br />
              on technology, digital transformation, and business innovation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogHero;
