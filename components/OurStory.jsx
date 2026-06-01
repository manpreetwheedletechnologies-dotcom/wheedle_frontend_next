'use client';
import React from "react";

export default function OurStory({ title, description, image, reverse }) {
  return (
    <section className="w-full pt-8 pb-16 md:pt-10 lg:pt-12">
      <div className="w-full px-5">
        <div className="max-w-6xl mx-auto">
            
          <div
            className={`flex flex-col lg:flex-row items-center gap-10 ${
              reverse ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* LEFT CONTENT */}
            <div className="flex-1 text-white">
              <h2
                className="
                font-[Gotham]
                font-normal
                text-[36px]
                md:text-[48px]
                lg:text-[53px]
                leading-[46px]
                md:leading-[56px]
                lg:leading-[63px]
                mb-6
              "
              >
               {title}
              </h2>

              <p
                className="
                font-[Inter]
                text-[16px]
                leading-[26px]
                text-white
              "
              >
                {description}
              </p>
            </div>

            {/* RIGHT IMAGE */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <img
                src={image}
                alt="team working"
                className="
              w-full
    max-w-[545px]
    aspect-[16/10]
    object-cover
    rounded-[30px]
    border
    border-blue-400
    transition-all
    duration-500
    ease-out
    hover:scale-[1.05]
    hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]
                "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
