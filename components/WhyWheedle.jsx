'use client';
import { motion } from "framer-motion";

function WhyWheedle() {
  const points = [
    "Increase qualified lead generation and revenue growth",
    "Enhance customer engagement and lifecycle value",
    "Reduce manual dependencies and operational overheads",
    "Accelerate sales cycles and response efficiency",
    "Deliver consistent, premium customer experiences",
    "Scale operations through AI-led automation",
  ];

  return (
    <section className="w-full py-16 px-6 md:px-16 lg:px-24 text-white">
      {/* Heading */}
      <h2 className="text-center text-3xl lg:text-5xl font-Gautam text-white mb-6">
        Why Wheedle Technologies
      </h2>

      {/* Paragraph */}
      <p className="max-w-4xl mx-auto text-center text-sm md:text-base leading-relaxed mb-8">
        We deliver measurable business outcomes—not just technology tools.
      </p>

      <p className="max-w-5xl mx-auto text-center text-sm md:text-base leading-relaxed mb-10">
        Wheedle serves as a long-term outsourced digital, AI, and IT
        transformation partner, aligning technology strategy with business
        performance objectives. Our intelligent systems are engineered to create
        competitive advantage through automation, data intelligence, and
        seamless digital experiences.
      </p>

      {/* Sub Heading */}
      <h3 className="text-xl md:text-2xl font-semibold mb-8 text-left max-w-6xl mx-auto">
        Our solutions enable businesses to:
      </h3>

      {/* Points */}
      {/* Points */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        {/* Left Column */}
        <ul className="space-y-4">
          {points.slice(0, 3).map((point, index) => (
            <motion.li
              key={index}
              className="flex items-start gap-4 cursor-pointer"
              whileHover={{ x: 8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="flex items-center justify-center w-6 h-6 lg:w-7 lg:h-7 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full shadow-lg shrink-0 mt-[2px]">
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    fill="white"
                  />
                </svg>
              </span>

              <span className="text-sm md:text-base text-white/95 font-medium">
                {point}
              </span>
            </motion.li>
          ))}
        </ul>

        {/* Right Column */}
        <ul className="space-y-4">
          {points.slice(3, 6).map((point, index) => (
            <motion.li
              key={index}
              className="flex items-start gap-4 cursor-pointer"
              whileHover={{ x: 8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="flex items-center justify-center w-6 h-6 lg:w-7 lg:h-7 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full shadow-lg shrink-0 mt-[2px]">
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    fill="white"
                  />
                </svg>
              </span>

              <span className="text-sm md:text-base text-white/95 font-medium">
                {point}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Final Paragraph */}
      <p className="max-w-5xl mx-auto text-center text-sm md:text-base leading-relaxed mt-12">
        From AI-driven contact centres and smart CRM ecosystems to autonomous
        design systems and intelligent digital platforms, Wheedle redefines how
        modern businesses operate, compete, and scale.
      </p>
    </section>
  );
}

export default WhyWheedle;
