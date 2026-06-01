'use client';
import { motion } from "framer-motion";

function WhatWeDo() {
  const leftPoints = [
    "Custom Software Development & Intelligent Business Platforms",
    "AI Web Engineering & High-Performance Website Development",
    "AI-Powered Mobile and Web Application Development",
    "Digital Marketing, Performance Campaigns & Lead Generation",
    "CRM Systems & End-to-End Business Process Automation",
    "AI-Powered Solutions & Intelligent Workflow Systems",
  ];

  const rightPoints = [
    "Autonomous Digital Marketing Engines",
    "Autonomous UI/UX Engineering",
    "Autonomous Graphic Design Systems",
    "Autonomous IT Operations & Infrastructure Automation",
    "Automated AI-Driven Contact Centres",
    "Advanced Customer Support Technology",
  ];

  const communicationPoints = [
    "CRM-integrated sales and communication systems",
  ];

  return (
    <section className="w-full py-16 px-6 md:px-16 lg:px-24 text-white">
      {/* Main Heading */}
      <h2 className="text-center text-3xl lg:text-5xl font-Gautam text-white mb-6">
        What We Do
      </h2>

      {/* Paragraph */}
      <p className="max-w-4xl mx-auto text-center text-sm md:text-base leading-relaxed mb-10">
        Wheedle Technologies delivers an end-to-end digital ecosystem designed
        for organizations seeking sustainable growth, operational efficiency,
        and superior customer engagement—without the need for an internal IT
        department.
      </p>

      {/* Sub Heading */}
      <h3 className="text-xl md:text-2xl font-semibold mb-8 text-left max-w-6xl mx-auto">
        Our core solutions include:
      </h3>

      {/* First Points */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Left */}
        <ul className="space-y-4">
          {leftPoints.map((point, index) => (
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

        {/* Right */}
        <ul className="space-y-4">
          {rightPoints.map((point, index) => (
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

      {/* Paragraph */}
      <p className="max-w-4xl mx-auto text-center text-sm md:text-base leading-relaxed mt-8">
        All solutions are seamlessly interconnected, enabling marketing, sales,
        operations, and customer service to function within one intelligent,
        scalable system.
      </p>

      {/* Second Line */}

      <h3 className="text-xl md:text-2xl font-semibold mt-12 lg:mt-16 mb-8 text-left max-w-6xl mx-auto">
        We also architect and manage advanced customer communication
        infrastructures for modern enterprises:
      </h3>

      {/* Communication Points */}
      <ul className="space-y-4 max-w-4xl mt-8">
        {communicationPoints.map((point, index) => (
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

      {/* Final Paragraph */}
      <p className="max-w-5xl mx-auto text-center text-sm md:text-base leading-relaxed mt-10">
        Our platforms empower businesses to deliver enterprise-grade customer
        experiences without heavy infrastructure investment or large technical
        teams.
      </p>
    </section>
  );
}

export default WhatWeDo;
