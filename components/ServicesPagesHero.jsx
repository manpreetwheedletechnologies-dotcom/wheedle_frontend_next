'use client';
import React from "react";
import Badge from "./Badge";
function ServicesPagesHero({
  badgeText,
  title,
  description
}) {
  return (
    <section
      className="w-full flex justify-center"
      style={{ backgroundColor: "#010509" }}
    >
      <div
        className="
          relative w-full max-w-[1440px]
          min-h-[70vh] lg:min-h-[85vh]
          overflow-hidden
          flex items-center
        "
      >
        {/* Frame Image */}
        <img
          src="/frame-image.png"
          alt="Frame"
          className="
            absolute inset-0 w-full h-full
            object-cover lg:object-contain
          "
        />

        {/* Content */}
        <div
          className="
            relative z-10 w-full
            flex flex-col items-center text-center
            px-5 sm:px-8
            text-white gap-6
          "
        >
          {badgeText && (
            <Badge text={badgeText} margin = ""/>
          )}

          {title && (
            <h1 className="font-gotham font-medium text-[28px] sm:text-[32px] lg:text-[40px] leading-tight lg:leading-[52px] max-w-[900px]">
              {title}
            </h1>
          )}

          {description && (
            <p className="font-inter font-medium text-sm sm:text-[15px] lg:text-base leading-relaxed max-w-[850px]">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default ServicesPagesHero;
