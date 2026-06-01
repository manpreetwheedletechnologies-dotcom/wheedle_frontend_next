'use client';
import React from "react";

function AboutMedia() {
  return (
    <section className="w-full py-16">
      <div className="w-full px-5">
        <div className="max-w-6xl mx-auto">

          {/* Media Container */}
          <div className="relative">

            {/* ================= MAIN IMAGE ================= */}
 <div
  className="
    relative
    w-full
    max-w-[860px]
    aspect-[909/602]
    rounded-[30px]
    p-[1px]
    bg-gradient-to-r from-[#0B2CC3] to-[#7B92FF]
    mx-auto
    lg:ml-[-10px]
  "
>
  <div
    className="
      w-full
      h-full
      rounded-[29px]
      overflow-hidden
      bg-black
    "
  >
    <img
      src="/Image1.png"
      alt="Our Team"
      className="
        w-full
        h-full
        object-cover
      "
    />
  </div>
</div>



            {/* ================= VIDEO CARD ================= */}
            <div
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-0 lg:translate-x-[40px] w-48 sm:w-64
          lg:w-[480px] rounded-2xl overflow-hidden border-[8px] border-white shadow-2xl bg-black"
            >
           <div className="relative bg-black flex items-center justify-center">
  <video
    src="/video1.mp4"
    autoPlay
    loop
    muted
    playsInline
    className="
      w-full
      h-auto
      max-h-32 sm:max-h-48 lg:max-h-[300px]
      object-contain
    "
  />
</div>

         </div>


          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMedia;
