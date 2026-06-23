"use client";

import React, { useState, useEffect, useRef } from "react";

interface WhyChooseUsData {
  title: string;
  description: string;
  benefits: string[];
  closingQuote?: string;
}

export default function WhyChooseSection({ data }: { data: WhyChooseUsData }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  // Split benefits evenly across two columns (left gets the extra one if odd count)
  const benefits = data.benefits ?? [];
  const splitAt = Math.ceil(benefits.length / 2);
  const leftFeatures = benefits.slice(0, splitAt);
  const rightFeatures = benefits.slice(splitAt);

  // Intersection Observer for scroll effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="section-shell py-20 transition-all duration-1000 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
      }}
    >
      <div 
        ref={contentRef}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-[#0665ff]/10 to-[#22d3ee]/5 p-[1px] shadow-2xl transition-all duration-1000 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.95)',
          transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
        }}
      >
        <div 
          className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[#0665ff] opacity-20 blur-[100px] transition-all duration-1000 ease-out"
          style={{
            opacity: isVisible ? 0.2 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
            transition: 'opacity 1s ease-out 0.4s, transform 1s ease-out 0.4s',
          }}
        />
        <div 
          className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[#22d3ee] opacity-20 blur-[100px] transition-all duration-1000 ease-out"
          style={{
            opacity: isVisible ? 0.2 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
            transition: 'opacity 1s ease-out 0.5s, transform 1s ease-out 0.5s',
          }}
        />
        
        <div className="relative rounded-3xl bg-darkBlue/80 backdrop-blur-xl p-8 md:p-12 text-center">
          <h2 
            className="text-3xl font-bold text-white sm:text-4xl transition-all duration-700 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'opacity 0.7s ease-out 0.4s, transform 0.7s ease-out 0.4s',
            }}
          >
            <span className="bg-gradient-to-r from-[#0665ff] to-[#22d3ee] bg-clip-text text-transparent">
              {data.title}
            </span>
          </h2>
          
          <p 
            className="mx-auto mt-3 max-w-5xl text-white/60 transition-all duration-700 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease-out 0.6s, transform 0.7s ease-out 0.6s',
            }}
          >
            {data.description}
          </p>

          {/* Benefits Grid - 2 columns on md+, 1 column on mobile, driven by data.benefits */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Left Column */}
            <div className="space-y-3 text-left">
              {leftFeatures.map((feature, index) => (
                <div
                  key={`left-${index}`}
                  className="flex items-start gap-2 text-white/90 text-base transition-all duration-700 ease-out"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `opacity 0.5s ease-out ${0.8 + index * 0.1}s, transform 0.5s ease-out ${0.8 + index * 0.1}s`,
                  }}
                >
                  <span className="text-[#22d3ee]">✔</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-3 text-left">
              {rightFeatures.map((feature, index) => (
                <div
                  key={`right-${index}`}
                  className="flex items-start gap-2 text-white/90 text-base transition-all duration-700 ease-out"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
                    transition: `opacity 0.5s ease-out ${0.9 + index * 0.1}s, transform 0.5s ease-out ${0.9 + index * 0.1}s`,
                  }}
                >
                  <span className="text-[#22d3ee]">✔</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Closing Quote */}
          {data.closingQuote && (
            <p
              className="mt-10 text-lg md:text-xl font-semibold text-white transition-all duration-700 ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.6s ease-out ${0.9 + Math.max(leftFeatures.length, rightFeatures.length) * 0.1}s, transform 0.6s ease-out ${0.9 + Math.max(leftFeatures.length, rightFeatures.length) * 0.1}s`,
              }}
            >
              <span className="bg-gradient-to-r from-[#0665ff] to-[#22d3ee] bg-clip-text text-transparent">
                {data.closingQuote}
              </span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
