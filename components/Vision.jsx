'use client';
import { motion } from "framer-motion";
import LogosData from '../lib/LogosData';

function Vision() {
  const features = [
    "AI Marketing & Automation Platform",
    "AI Digital Marketing Service",
    "Strategic IT Consulting & Guidance",
    "Enterprise-Grade Software and Web Solutions",
  ];

  return (
    <section className="w-full py-16 lg:py-32 relative overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-4 lg:px-32 flex flex-col xl:flex-row items-center gap-8 lg:gap-14 relative z-10">

        {/* LEFT IMAGE */}<div className="w-full xl:w-[545px] shrink-0 group xl:-ml-12">

          <div className="relative rounded-[30px] p-[1px]">
            <div className="overflow-hidden rounded-[29px]">
              <motion.img
                // src="/Rectangle 2.png"
                src= {LogosData.vision}
                alt="Your Vision"
                className="w-full h-[320px] sm:h-[420px] lg:h-[517px] object-cover"
                animate={{
                  scale: [1, 1.06, 1],
                  rotate: [0, 0.4, 0],
                }}
                transition={{
                  duration: 2.5,
                  ease: "linear",
                  repeat: Infinity,
                }}
              />
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 w-full max-w-[645px]  flex flex-col gap-6 sm:gap-8 lg:gap-[50px]">
          <div>
            <h2 className="text-4xl lg:text-5xl font-Gotham text-white">
              Your Vision.
              <br />
              <span>Powered by Our</span>
              <br />
              <span className="text-white/50 sm:whitespace-nowrap">
                Autonomous AI Platforms
              </span>
            </h2>
          </div>

          <p className="text-[14px] lg:text-[18px] text-white/80 leading-[1.7] lg:leading-[1.8] font-light lg:-mt-4">
            Dominate the industry with Wheedle’s client-centric IT & AI Agent Platforms, customized to fit your business needs.
          </p>

          {/* FEATURES */}
          <ul className="space-y-4 sm:space-y-3 lg:space-y-3 sm:-mt-2 lg:-mt-4">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-center gap-4 transition-all duration-300 hover:translate-x-2"
              >
                <span className="flex items-center justify-center w-6 h-6 lg:w-7 lg:h-7 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full shadow-lg">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      fill="white"
                    />
                  </svg>
                </span>
                <span className="text-[14px] lg:text-[17px] text-white/95 font-medium">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Vision;


