'use client';
import React from "react";

function AboutCEO() {
  return (
    <section className="w-full py-20">
      <div className="w-full px-5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left Content */}
            <div className="lg:w-1/2">
              {/* Title */}
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-1">
                Meet Our
              </h2>
              <h2 className="text-4xl lg:text-5xl font-bold text-white/50 mb-6">
                CEO
              </h2>

              {/* Tagline */}
              <p className="text-sm text-white/80 mb-6">
                Leading with vision, innovation, and integrity.
              </p>

              {/* Description Paragraph 1 */}
              <p className="text-sm text-white/60 leading-relaxed mb-4">
                Our CEO brings years of experience in technology, strategy, and business
                transformation. With a strong focus on innovation and customer success, they lead
                our team in delivering high-performance IT solutions that help businesses grow and
                stay competitive in the digital era.
              </p>

              {/* Description Paragraph 2 */}
              <p className="text-sm text-white/60 leading-relaxed">
                Driven by a passion for excellence, our leadership ensures every project is built with
                precision, security, and scalability in mind turning ideas into powerful digital solutions
                that create real business impact.
              </p>
            </div>

            {/* Right Content - CEO Image */}
            <div className="lg:w-1/2">
              <div className="relative">
                {/* Blue Glow Effect */}
                <div className="absolute -inset-4 bg-blue-500/20 rounded-3xl blur-2xl"></div>

                {/* Image Container */}
                <div className="relative rounded-3xl overflow-hidden border border-blue-500/30">
                  <img
                    src="/Image3.png"
                    alt="Our CEO"
                    className="w-full h-80 lg:h-[500px] object-cover"
                  />
                  {/* Blue Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-blue-600/20"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutCEO;
