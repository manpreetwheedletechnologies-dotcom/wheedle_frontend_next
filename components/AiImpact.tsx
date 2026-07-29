"use client";

import React, { useState, useEffect, useRef } from "react";
import { Plus, Minus } from "lucide-react";

/**
 * AiImpact
 * --------
 * "AI is Transforming <Industry> Growth" accordion used across every
 * /industry/[slug] page. Title, description and every numbered row
 * (title + description) come from JSON so this one component serves
 * every industry. Row numbers (01, 02, ...) are derived from array
 * order, not stored in JSON.
 * Styled like the FAQ component with premium UI.
 */

type AiImpactItem = {
  title: string;
  description: string;
};

export type AiImpactData = {
  title: string;
  description: string;
  list: AiImpactItem[];
};

type AiImpactProps = {
  data: AiImpactData;
};

export default function AiImpact({ data }: AiImpactProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for scroll effect
  useEffect(() => {
    const currentRef = sectionRef.current;
    
    const checkVisibility = () => {
      if (currentRef) {
        const rect = currentRef.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const isInView = rect.top < windowHeight && rect.bottom > 0;
        if (isInView) {
          setIsVisible(true);
        }
      }
    };

    checkVisibility();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px',
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    window.addEventListener('scroll', checkVisibility);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      window.removeEventListener('scroll', checkVisibility);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-12 md:py-16 lg:py-24 overflow-hidden"
      style={{
        backgroundColor: "#050a12",
        minHeight: "100vh",
      }}
    >
      {/* Bottom-right radial blue glow */}
      <div
        className="absolute pointer-events-none transition-all duration-1000 ease-out"
        style={{
          bottom: "-80px",
          right: "-80px",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(29,78,216,0.38) 0%, transparent 70%)",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.8)',
          transition: 'opacity 1.2s ease-out 0.3s, transform 1.2s ease-out 0.3s',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <h2
          className="
            text-center
            font-semibold
            mb-3 md:mb-4
            bg-gradient-to-r
            from-white
            via-[#e8eaff]
            to-[#8b93ff]
            bg-clip-text
            text-transparent
          "
          style={{
            fontSize: "clamp(32px, 8vw, 52px)",
            letterSpacing: "-0.5px",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(-30px)',
            transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
          }}
        >
          {data.title}
        </h2>

        {/* Description */}
        <p
          className="text-center mx-auto mb-8 md:mb-10 lg:mb-14 px-2"
          style={{
            color: "rgba(255,255,255,0.55)",
            fontSize: "clamp(14px, 2vw, 16px)",
            lineHeight: "1.85",
            maxWidth: "600px",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
            transition: `opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s`,
          }}
        >
          {data.description}
        </p>

        {/* Accordion List */}
        <div className="flex flex-col gap-3 md:gap-4">
          {data.list?.map((item, index) => {
            const isOpen = openIndex === index;
            const delay = 0.3 + index * 0.15;

            return (
              <div
                key={index}
                className="overflow-hidden"
                style={{
                  borderRadius: "clamp(20px, 4vw, 45px)",
                  border: "1px solid rgba(6,182,212,0.2)",
                  background: "rgba(0,0,0,0.55)",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : 'translateX(-40px)',
                  transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex flex-col sm:flex-row items-stretch"
                >
                  {/* Left content */}
                  <div className="flex-1 flex items-start gap-3 sm:gap-6 md:gap-10 px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 text-left">
                    {/* Number */}
                    <span
                      className="font-light flex-shrink-0"
                      style={{
                        color: "rgba(255,255,255,0.85)",
                        fontSize: "clamp(14px, 2vw, 18px)",
                        minWidth: "clamp(28px, 4vw, 36px)",
                        paddingTop: "2px",
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Title + Description */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-white font-light"
                        style={{
                          fontSize: "clamp(16px, 2.5vw, 20px)",
                          lineHeight: "1.4",
                          wordBreak: "break-word",
                        }}
                      >
                        {item.title}
                      </h3>

                      {/* Animated description */}
                      <div
                        className={`grid transition-all duration-500 ease-in-out ${
                          isOpen
                            ? "grid-rows-[1fr] opacity-100 mt-2 sm:mt-3 md:mt-4"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p
                            style={{
                              color: "rgba(255,255,255,0.55)",
                              fontSize: "clamp(13px, 1.8vw, 15px)",
                              lineHeight: "1.85",
                            }}
                          >
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Toggle button - Full width on mobile */}
                  <div
                    className="flex items-center justify-center transition-all duration-300 w-full sm:w-[80px] sm:flex-shrink-0"
                    style={{
                      minHeight: "clamp(48px, 8vw, 80px)",
                      background: isOpen
                        ? "linear-gradient(to bottom, #021753, #2266ee,#021753)"
                        : "#1a2530",
                      borderRadius: "clamp(0px, 0vw, 0px)",
                      ...(isOpen && {
                        borderRadius: "0 0 clamp(20px, 4vw, 45px) clamp(20px, 4vw, 45px)",
                      }),
                    }}
                  >
                    {isOpen ? (
                      <Minus size={clamp(24, 4, 28)} className="text-white" />
                    ) : (
                      <Plus size={clamp(24, 4, 28)} className="text-white" />
                    )}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Helper function for responsive icon sizing
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}