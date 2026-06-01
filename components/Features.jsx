'use client';
import Link from 'next/link';
import Button from "./Button_x";

function Features() {
  const leftFeatures = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 9h6v6H9z" />
        </svg>
      ),
      title: "Custom Intelligence Platforms",
      description:
        "We design and deploy tailored AI platforms and intelligent systems aligned with your business workflows, data, and growth goals.",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      ),
      title: "Agentic Marketing Solutions",
      description:
        "Autonomous marketing systems that plan, execute, optimize, and adapt campaigns across channels—driving performance with minimal manual effort.",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M4 6h16M4 12h16M4 18h16" />
          <circle cx="8" cy="6" r="2" />
          <circle cx="16" cy="12" r="2" />
          <circle cx="8" cy="18" r="2" />
        </svg>
      ),
      title: "AI Agents & Automation",
      description:
        "Self-operating AI agents that handle decision-making, workflows, customer interactions, and operational tasks at scale.",
    },
  ];

  const rightFeatures = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      ),
      title: "Reliability & Security",
      description:
        "Enterprise-grade security, data protection, and robust architectures built into every AI platform and digital solution we deliver.",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      title: "Agile & Transparent Process",
      description:
        "Fast, iterative development with clear communication—so you always know how your AI systems and platforms are evolving.",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
      title: "Support & Maintenance",
      description:
        "We offer technical support and troubleshooting with performance optimization after the product is delivered.",
    },
  ];

  const FeatureCard = ({ icon, title, description }) => (
    <div
      className="
        group relative overflow-hidden
        w-full max-w-[325px] min-h-[190px]
        p-[25px]
        rounded-[25px]
        border border-blue-600/60
        bg-[#0a0a1a]/40 backdrop-blur-sm
        transition-all duration-300
        hover:border-blue-500/30
        flex flex-col gap-[10px]

      "
    >
      {/* Glow */}
      <div
        className="
          absolute top-0 left-1/2 -translate-x-1/2
          w-[160%] h-32
          bg-[radial-gradient(ellipse_at_top,rgba(0,55,255,0.65)_0%,rgba(0,55,255,0.35)_25%,rgba(0,55,255,0.15)_45%,transparent_60%)]
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          pointer-events-none
        "
      />

      {/* Content */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="w-9 h-9 lg:w-11 lg:h-11 rounded-lg lg:rounded-xl bg-[#1e3a8a] flex items-center justify-center">
          {icon}
        </div>

        <h3 className="text-[14px] lg:text-[16px] font-semibold text-white">
          {title}
        </h3>
      </div>



      <p className="relative z-10 text-[12px] lg:text-[13px] text-white/60 leading-[1.6]">
        {description}
      </p>
    </div>
  );

  return (
    <section className="w-full py-12 lg:py-24">
      <div className="w-full px-4 sm:px-6 lg:px-24 xl:px-28">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10 lg:gap-16">

          {/* Left */}
          <div className="hidden lg:flex flex-col gap-[25px] w-full max-w-[325px] items-center lg:items-start">

            {leftFeatures.map((feature, i) => (
              <FeatureCard key={i} {...feature} />
            ))}
          </div>

          {/* Center */}
          <div className="h-full flex-1 text-center flex flex-col items-center px-2 sm:px-6 lg:px-8 gap-4 ">
            <span
              className="
              inline-flex items-center justify-center gap-2
              w-[156px] h-[43px]
              px-[20px] py-[12px]
              rounded-[35px]
              bg-[#0B2CC3]/30
              text-[10px] lg:text-[11px]
              tracking-widest text-white uppercase
              mb-6
            ">
              Key Features
            </span>


            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-Gotham text-white leading-tight">
              Everything Your
              <br />
              Business Needs for
              <br />
              <span className="text-white sm:whitespace-nowrap">An AI-Driven</span>
              <br/>
              World
            </h2>
            <div className="h-6 lg:h-10" />
            <Link href="/our-services">
              <Button padding="25px 20px">
                Explore Our Services
              </Button>
            </Link>
          </div>


          {/* Right */}
          <div className="hidden lg:flex flex-col gap-[25px] w-full max-w-[325px]">
            {rightFeatures.map((feature, i) => (
              <FeatureCard key={i} {...feature} />
            ))}
          </div>

          {/* Mobile */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 w-full mt-10 justify-items-center">
            {[...leftFeatures, ...rightFeatures].map((feature, i) => (
              <FeatureCard key={i} {...feature} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default Features;
