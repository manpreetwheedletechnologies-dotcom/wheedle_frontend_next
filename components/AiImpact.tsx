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
      className="relative py-24 overflow-hidden"
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

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Heading */}
        <h2
          className="
            text-center
            font-semibold
            mb-4
            bg-gradient-to-r
            from-white
            via-[#e8eaff]
            to-[#8b93ff]
            bg-clip-text
            text-transparent
          "
          style={{
            fontSize: "52px",
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
          className="text-center mx-auto mb-14"
          style={{
            color: "rgba(255,255,255,0.55)",
            fontSize: "16px",
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
        <div className="flex flex-col gap-3 ">
          {data.list?.map((item, index) => {
            const isOpen = openIndex === index;
            const delay = 0.3 + index * 0.15;

            return (
              <div
                key={index}
                className="overflow-hidden"
                style={{
                  borderRadius: "45px",
                  border: "1px solid rgba(6,182,212,0.2)",
                  background: "rgba(0,0,0,0.55)",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : 'translateX(-40px)',
                  transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
                 
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-stretch"
                >
                  {/* Left content */}
                  <div className="flex-1 flex items-start gap-10 px-8 py-6 text-left">
                    {/* Number */}
                    <span
                      className="font-light"
                      style={{
                        color: "rgba(255,255,255,0.85)",
                        fontSize: "18px",
                        minWidth: "36px",
                        paddingTop: "2px",
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Title + Description */}
                    <div className="flex-1">
                      <h3
                        className="text-white font-light"
                        style={{ fontSize: "20px", lineHeight: "1.4" }}
                      >
                        {item.title}
                      </h3>

                      {/* Animated description */}
                      <div
                        className={`grid transition-all duration-500 ease-in-out ${
                          isOpen
                            ? "grid-rows-[1fr] opacity-100 mt-4"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p
                            style={{
                              color: "rgba(255,255,255,0.55)",
                              fontSize: "15px",
                              lineHeight: "1.85",
                            }}
                          >
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Toggle button */}
                  <div
                    className="flex items-center justify-center transition-all duration-300"
                    style={{
                      width: "80px",
                      flexShrink: 0,
                      background: isOpen
                        ? "linear-gradient(to bottom, #021753, #2266ee,#021753)"
                        : "#1a2530",
                    }}
                  >
                    {isOpen ? (
                      <Minus size={28} className="text-white" />
                    ) : (
                      <Plus size={28} className="text-white" />
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