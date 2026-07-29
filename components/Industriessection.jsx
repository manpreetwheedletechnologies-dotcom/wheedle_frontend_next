import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Factory,
  BadgeCheck,
  HeartHandshake,
  Car,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";
import Button from "./Button_x";
import IndustriesCards from '../components/Industrycards';
/**
 * Industries Section
 * -------------------
 * Drop this component anywhere on the homepage, e.g.:
 *   import IndustriesSection from "@/components/IndustriesSection";
 *   ...
 *   <IndustriesSection />
 *
 * Pulls its copy from industries.json (same shape as the file you shared).
 * If you already load that JSON elsewhere, just replace `industriesData`
 * below with an import instead of the inline object.
 */

const industriesData = [
  {
    key: "Financial",
    name: "Financial",
    icon: ShieldCheck,
    tagline: "Build Trust. Generate Quality Leads. Accelerate Financial Growth.",
    blurb:
      "SEO, paid media and AI chat that turn loan, insurance and investment searches into qualified enquiries.",
    stat: { label: "Trusted Experts" },
  },
  {
    key: "Manufacturing",
    name: "Manufacturing",
    icon: Factory,
    tagline: "Generate Qualified B2B Leads. Increase RFQs. Accelerate Growth.",
    blurb:
      "Reach procurement teams and OEM buyers with SEO, LinkedIn and automated RFQ handling.",
    stat: { label: "Industrial Experts" },
  },
  {
    key: "MSME",
    name: "MSME",
    icon: BadgeCheck,
    tagline: "Empowering Small Businesses with Smarter Digital Growth.",
    blurb:
      "Affordable, high-impact digital marketing built for lean teams and local reach.",
    stat: { label: "Trusted Experts" },
  },
  {
    key: "Healthcare",
    name: "Healthcare",
    icon: HeartHandshake,
    tagline: "Attract Patients, Streamline Operations, Deliver Exceptional Care.",
    blurb:
      "HIPAA-aware AI booking and SEO that fill appointment calendars for clinics and hospitals.",
    stat: { label: "Healthcare Experts" },
  },
  {
    key: "Automotive",
    name: "Automotive",
    icon: Car,
    tagline: "More Enquiries. More Test Drives. Long-Term Customer Relationships.",
    blurb:
      "AI agents that book test drives instantly and keep dealership funnels moving.",
    stat: { label: "Automotive Experts" },
  },
  {
    key: "Education",
    name: "Education",
    icon: GraduationCap,
    tagline: "Turn Student Interest into Admissions with AI-Powered Growth.",
    blurb:
      "Admission funnels and 24/7 AI counselors that convert enquiries into enrollments.",
    stat: { label: "Education Experts" },
  },
];

function useRevealOnScroll(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function IndustryCard({ industry, index }) {
  const [ref, visible] = useRevealOnScroll(0.15);
  const Icon = industry.icon;

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: visible ? `${index * 90}ms` : "0ms",
      }}
      className={`
        group relative overflow-hidden rounded-2xl border border-white/10
        bg-white/[0.04] backdrop-blur-sm p-7
        transition-all duration-700 ease-out
        hover:border-[#2832DA]/50 hover:bg-white/[0.07]
        hover:-translate-y-1.5
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
    >
      {/* animated sweep border glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(220px circle at var(--x,50%) var(--y,50%), rgba(40,50,218,0.25), transparent 60%)",
        }}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
          e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
        }}
      />

      {/* icon badge */}
      <div className="relative z-10 mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#2832DA]/25 to-[#2832DA]/5 border border-white/10 group-hover:from-[#2832DA]/40 group-hover:to-[#2832DA]/10 transition-colors duration-500">
        <Icon className="h-6 w-6 text-[#2832DA] group-hover:text-[#8891f2] transition-colors" strokeWidth={1.75} />
      </div>

      <div className="relative z-10 mb-1 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#2832DA]/80">
        {industry.stat.label}
      </div>

      <h3 className="relative z-10 text-xl font-semibold text-white mb-2">
        {industry.name}
      </h3>

      <p className="relative z-10 text-sm text-slate-300/90 leading-relaxed mb-2">
        {industry.tagline}
      </p>

      <p className="relative z-10 text-sm text-slate-400 leading-relaxed mb-6">
        {industry.blurb}
      </p>

      <a
        href={`industry/${industry.key}`}
        className="relative z-10 inline-flex items-center gap-1.5 text-sm font-medium text-[#2832DA] group-hover:text-white transition-colors"
      >
        Explore Industry
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </div>
  );
}

export default function IndustriesSection({limit}) {
  const [headerRef, headerVisible] = useRevealOnScroll(0.3);

  return (
    <section className="relative overflow-hidden bg-black py-28 px-6">
      {/* ambient background glow, matches hero */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[#2832DA]/30 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-[#2832DA]/20 blur-[120px]" />

      <div className="relative z-10 mx-auto">
        <div
          ref={headerRef}
          className={`mx-auto max-w-2xl text-center mb-16 transition-all duration-700 ease-out ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-6 py-2 text-xs uppercase tracking-[0.2em] text-slate-300 mb-6">
            Industries We Empower
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            AI-Powered Growth,{"     "}
            <span className="bg-gradient-to-r from-[#2832DA] to-[#6871ea] bg-clip-text text-transparent">
              Built for Your Sector
            </span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg">
            Nine industries, one intelligent growth engine. Every playbook is
            tailored to how your buyers actually search, compare and decide.
          </p>
        </div>

              <IndustriesCards limit={limit} />

        <div className="mt-14 flex justify-center">
          <Link
            href="/industries"
            scroll={false}
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <Button padding="25px 20px">Explore All Industries</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}