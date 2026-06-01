'use client';
import React from "react";
import LogosData from '../lib/LogosData';

function ServicesBento() {
  return (
    <section className="w-full pt-0 mt-0 pb-20">
      <div className="w-full px-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {/* LEFT COLUMN – SINGLE IMAGE */}
          <div
            className="group mx-auto w-full max-w-[400px] h-[534px] rounded-[30px] p-[1px] bg-gradient-to-br from-[#7B92FF] to-[#0B2CC3]
          transition-all duration-300 ease-out hover:-translate-y-3 hover:scale-[1.03] hover:shadow-[0_0_45px_rgba(59,76,255,0.75)]
          "
          >
            <div className="w-full h-full rounded-[29px] overflow-hidden bg-black">
              <img
                // src="/Image1.png"
                src={LogosData.image1}
                alt="Team collaboration"
                className="
                w-full h-full object-cover
                scale-[1.2]   /* increase size little */
                transition-transform duration-300
                
                "
              />
            </div>
          </div>

          
          {/* CENTER COLUMN */}
          <div className="flex flex-col gap-[10px] items-center">
            {/* CARD 1 */}
            <div
              className="
      w-full
      max-w-[400px]
      h-[257px]
      p-[1px]
      rounded-[25px]
      bg-gradient-to-br from-[#7B92FF] to-[#0B2CC3]
    "
            >
              <div
                className="w-full h-full p-[25px] rounded-[24px] bg-[#040010] transition-all duration-300 hover:bg-gradient-to-br
        hover:from-[#2934E4] hover:to-[#171D7E] flex flex-col gap-[10px]"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>

                <h3
                  className="font-inter
          font-normal
          text-[30px]
          leading-[40px]
          tracking-[0]
          text-white
          align-middle"
                >
                  Based on Trust & Transparency
                </h3>

                <p className="text-sm text-white leading-relaxed">
                  Wheedle Technologies functions on the pillars of trust and
                  transparency. Our experts & AI Agents work to ensure clarity,
                  confidence, and satisfaction at every stage of development.
                </p>
              </div>
            </div>

            {/* CARD 2 – SAME SIZE & STYLE */}
            <div
              className="
      w-full
      max-w-[400px]
      h-[273px]
      p-[1px]
      rounded-[25px]
      bg-gradient-to-br from-[#7B92FF] to-[#0B2CC3]
    "
            >
              <div
                className="w-full h-full p-[25px] rounded-[24px] bg-[#040010] transition-all duration-300 hover:bg-gradient-to-br
         hover:from-[#2934E4] hover:to-[#171D7E] flex flex-col gap-[10px] justify-center"
              >
                <p className="text-sm text-white leading-relaxed">
                  We work as an extension of our client’s team, fostering mutual
                  growth and commitment, creating partnerships that last beyond
                  project delivery.
                </p>
                <br />

                <h3
                  className="font-inter
          font-normal
          text-[30px]
          leading-[40px]
          tracking-[0]
          text-white
          align-middle
          whitespace-nowrap"
                >
                  Long-term Client
                  <br />
                  Partnership
                </h3>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div
            className="group mx-auto w-full max-w-[400px] h-[534px] rounded-[30px] p-[1px] bg-gradient-to-br from-[#7B92FF] to-[#0B2CC3]
             transition-all duration-300 ease-out hover:-translate-y-3 hover:scale-[1.03] hover:shadow-[0_0_45px_rgba(59,76,255,0.75)]"
          >
            <div className="w-full h-full rounded-[29px] overflow-hidden bg-black">
              <img
                // src="/Image3.png"
                src={LogosData.image2}
                alt="Happy client"
                className=" w-full h-full object-cover
                scale-[1.2]   /* increase size little */
                transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesBento;
