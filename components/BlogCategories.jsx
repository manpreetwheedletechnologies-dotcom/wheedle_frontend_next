'use client';
import React from "react";
import Button from './Button_x'
function BlogCategories() {
  const categories = [
    {
      image: "/blogcard1.png",
      title: "Technology & Innovation",
      description: "Discover the latest trends in software development, cloud computing, and digital transformation. Learn how modern technologies are reshaping businesses and creating smarter solutions.",
    },
    {
      image: "/blogcard2.png",
      title: "Business & Growth",
      description: "Gain insights into scalable IT strategies, digital optimization, and tools that help businesses improve performance, efficiency, and long-term growth.",
    },
    {
      image: "/blogcard3.png",
      title: "Artificial Intelligence",
      description: "Explore the world of AI, machine learning, and automation. Learn how intelligent systems are transforming operations, enhancing decision-making, and driving innovation.",
    },
  ];

  return (
    <section className="w-full pb-20">
      <div className="w-full px-5">
        
        <div className="max-w-6xl mx-auto">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-12">
            {/* Left - Title and Description */}
            <div className="lg:max-w-2xl">
              <h2 className="font-Gotham font-normal text-[53px] leading-[63px] tracking-normal align-middle text-white mb-4">
              Blog <span className="text-white/60">Categories</span>
                </h2>

              <p className="text-sm text-white leading-relaxed">
                Explore our curated collection of blogs covering technology, innovation, and digital growth.
                From emerging tech trends to practical IT insights, our articles are designed to help businesses stay
                informed, competitive, and future-ready.
              </p>
            </div>

            {/* Right - Button */}
            {/* <div className="w-full sm:w-auto max-w-[400px] sm:max-w-none">
              <Button padding="28px"> View All Categories</Button>
            </div> */}
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
             <div
              key={index}
               className="group relative w-full max-w-[400px] h-[534px] rounded-[30px] border border-[#0B2CC3] bg-[#050B24]
                overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(11,44,195,0.55)]"
>
          {/* 1️⃣ IMAGE (full card background) */}
            <img
             src={category.image}
             alt={category.title}
             className="absolute inset-0 w-full h-full object-cover transition-transform duration-500
               group-hover:scale-105"/>

         {/* 2️⃣ GRADIENT OVERLAY (ADD THIS HERE) */}
          {/* <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" /> */}

         {/* 3️⃣ ARROW ICON */}
       <div
  className="
    absolute top-4 right-4 z-20
    w-11 h-11
    rounded-full
    bg-[#FFFFFF]
    border-2 border-black
    flex items-center justify-center
    transition-all
  "
>
  <svg
    className="w-4 h-4 text-black"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 17L17 7M17 7H7M17 7v10"
    />
  </svg>
</div>


  {/* 4️⃣ TEXT CONTENT */}
  <div className="relative z-10 h-full p-6 flex flex-col justify-end gap-[10px]">
    <h3 className="text-xl font-semibold text-white">
      {category.title}
    </h3>

    <p className="text-sm text-white/80 leading-relaxed">
      {category.description}
    </p>
  </div>
</div>

            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogCategories;
