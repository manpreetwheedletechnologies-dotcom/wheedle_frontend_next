'use client';

import React from "react";
import LogosData from "../lib/LogosData";

/* Add more partners here */
const partners = [
  {
    name: "HostGraber",
    logo: "/hostgraber-logo.png",
    url: "https://hostgraber.com/",
    domain: "hostgraber.com",
    work: "Web Hosting & Domain Solutions",
    description:
      "Reliable hosting, domains and infrastructure solutions that support modern digital businesses.",
    services: ["Hosting", "Domains", "Cloud"],
  },
  {
    name: "Wheedle Technologies",
    logo: "/fevicon.png",
    /* Logo is only the "W" icon, so show the name beside it (like the strip design) */
    label: ["WHEEDLE", "TECHNOLOGIES"],
    url: "https://wheedletechnologies.tech/",
    domain: "wheedletechnologies.tech",
    work: "AI, Web & Digital Solutions",
    description:
      "AI-powered solutions, web development and digital transformation services for growing businesses.",
    services: ["AI", "Web Dev", "Digital"],
  },
];

const PartnerItem = ({ partner }) => (
  <div
    className="pp-item"
    tabIndex={0}
    role="group"
    aria-label={`${partner.name} - ${partner.work}`}
  >
    {/* Logo (muted by default, lights up on hover) */}
    <div className="pp-logo-wrap">
      <img
        src={partner.logo}
        alt={`${partner.name} logo`}
        loading="lazy"
        className="pp-logo"
      />

      {partner.label && (
        <span className="pp-label">
          <span className="pp-label-top">{partner.label[0]}</span>
          <span className="pp-label-bottom">{partner.label[1]}</span>
        </span>
      )}
    </div>

    {/* Mobile hint */}
    <span className="pp-hint">Tap to know more</span>

    {/* Floating info card */}
    <div className="pp-pop" role="tooltip">
      <div className="pp-card">
        <span className="pp-badge">
          <span className="pp-dot" />
          Partner
        </span>

        <p className="pp-work">{partner.work}</p>

        <p className="pp-desc">{partner.description}</p>

        <div className="pp-chips">
          {partner.services?.map((s) => (
            <span key={s} className="pp-chip">
              {s}
            </span>
          ))}
        </div>

        <a
          href={partner.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${partner.name} website`}
          className="pp-cta"
        >
          {partner.domain}
          <svg
            className="pp-cta-arrow"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 12h14m-6-6l6 6-6 6"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
);

const OurPartner = () => {
  return (
    <section className="pp-section relative z-20 w-full px-5 sm:pb-24">
      <style>{`
        /* ============================
           Section
        ============================ */
        .pp-section {
          overflow: visible;
        }

        /* ============================
           Item
        ============================ */
        .pp-item {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 300px;
          padding: 4px 8px;
          outline: none;
          cursor: pointer;
        }

        .pp-logo-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 6px;
          opacity: 0.62;
          filter: grayscale(1) brightness(1.5);
          transition:
            opacity 0.45s ease,
            filter 0.45s ease,
            transform 0.45s ease;
        }

        .pp-logo {
          max-height: 46px;
          width: auto;
          max-width: 170px;
          object-fit: contain;
        }

        .pp-label {
          display: flex;
          flex-direction: column;
          line-height: 1.15;
          text-align: left;
        }

        .pp-label-top {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #fff;
        }

        .pp-label-bottom {
          font-size: 10px;
          letter-spacing: 0.16em;
          color: rgba(255, 255, 255, 0.65);
        }

        .pp-item:hover .pp-logo-wrap,
        .pp-item:focus-within .pp-logo-wrap {
          opacity: 1;
          filter: none;
          transform: translateY(-2px) scale(1.05);
        }

        .pp-item:hover .pp-logo,
        .pp-item:focus-within .pp-logo {
          filter: drop-shadow(0 0 14px rgba(123, 146, 255, 0.55));
        }

        .pp-hint {
          display: none;
          margin-top: 2px;
          font-size: 10px;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.35);
        }

        /* ============================
           Info card
        ============================ */
        .pp-card {
          position: relative;
          overflow: hidden;
          padding: 18px 18px 16px;
          text-align: center;
          border-radius: 18px;
          border: 1px solid rgba(123, 146, 255, 0.28);
          background: linear-gradient(160deg, #111a72 0%, #080c3a 60%, #05011a 100%);
          box-shadow:
            0 24px 60px rgba(41, 52, 228, 0.28),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        /* top accent line */
        .pp-card::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #7b92ff, #c9a24b, transparent);
        }

        .pp-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 2px 9px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.05);
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.65);
        }

        .pp-dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: #34d399;
          animation: ppPulse 2s ease-in-out infinite;
        }

        .pp-work {
          margin-top: 10px;
          font-size: 14px;
          font-weight: 600;
          color: #fff;
        }

        .pp-desc {
          margin: 6px auto 0;
          max-width: 236px;
          font-size: 11px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.62);
        }

        .pp-chips {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 6px;
          margin-top: 12px;
        }

        .pp-chip {
          padding: 2px 10px;
          border-radius: 999px;
          border: 1px solid rgba(123, 146, 255, 0.3);
          background: rgba(41, 52, 228, 0.16);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: #c5d0ff;
        }

        .pp-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 14px;
          padding: 6px 14px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.14);
          font-size: 11px;
          letter-spacing: 0.04em;
          color: #fff;
          text-decoration: none;
          transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }

        .pp-cta:hover {
          background: #fff;
          border-color: #fff;
          color: #2934e4;
        }

        .pp-cta-arrow {
          width: 12px;
          height: 12px;
          transition: transform 0.3s ease;
        }

        .pp-cta:hover .pp-cta-arrow {
          transform: translateX(3px);
        }

        /* ============================
           Mobile / small: card opens in flow
        ============================ */
        .pp-pop {
          width: 100%;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.5s ease, opacity 0.4s ease;
        }

        .pp-item:focus-within .pp-pop,
        .pp-item:hover .pp-pop {
          max-height: 340px;
          opacity: 1;
          margin-top: 10px;
        }

        .pp-hint {
          display: block;
        }

        /* ============================
           Desktop: floating card under the logo
        ============================ */
        @media (min-width: 640px) {
          .pp-hint {
            display: none;
          }

          .pp-pop {
            position: absolute;
            top: calc(100% + 12px);
            left: 50%;
            z-index: 40;
            width: 272px;
            max-height: none;
            overflow: visible;
            visibility: hidden;
            pointer-events: none;
            transform: translate(-50%, 10px) scale(0.97);
            transition:
              opacity 0.35s ease,
              transform 0.35s ease,
              visibility 0.35s;
          }

          /* hover bridge so the card doesn't close while moving the mouse */
          .pp-pop::before {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            top: -16px;
            height: 16px;
          }

          /* arrow notch */
          .pp-pop::after {
            content: "";
            position: absolute;
            top: -6px;
            left: 50%;
            width: 12px;
            height: 12px;
            background: #111a72;
            border-left: 1px solid rgba(123, 146, 255, 0.28);
            border-top: 1px solid rgba(123, 146, 255, 0.28);
            transform: translateX(-50%) rotate(45deg);
          }

          .pp-item:focus-within .pp-pop,
          .pp-item:hover .pp-pop {
            margin-top: 0;
            visibility: visible;
            pointer-events: auto;
            transform: translate(-50%, 0) scale(1);
          }
        }

        /* ============================
           Strip dividers
        ============================ */
        .pp-divider {
          width: 64px;
          height: 1px;
          background: rgba(255, 255, 255, 0.14);
        }

        @media (min-width: 640px) {
          .pp-divider {
            width: 1px;
            height: 44px;
            background: rgba(255, 255, 255, 0.2);
          }
        }

        @keyframes ppPulse {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.6);
          }
          50% {
            opacity: 0.6;
            box-shadow: 0 0 0 5px rgba(52, 211, 153, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .pp-dot {
            animation: none;
          }

          .pp-item *,
          .pp-pop {
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Ambient Background Glow (clipped separately so the hover card can overflow) */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="
            absolute left-1/2 top-1/2
            h-40 w-[70%] -translate-x-1/2 -translate-y-1/2
            rounded-full bg-[#2934E4]/15 blur-[100px]
          "
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-8 flex items-center justify-center gap-4 sm:mb-10">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#7B92FF] sm:w-40" />

                   <div className="text-center">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#7B92FF]">
              Strategic Alliances
            </p>

            <h2 className="text-2xl font-Gautam text-white lg:text-4xl">
              Our{" "}
              <span className="font-normal text-white/60">Partners</span>
            </h2>
          </div>

          <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#7B92FF] sm:w-40" />
        </div>

        {/* Logo strip */}
        <div className="flex flex-col items-center justify-center gap-5 sm:flex-row sm:items-center sm:gap-0">
          {partners.map((partner, i) => (
            <React.Fragment key={partner.name}>
              {i > 0 && <span className="pp-divider" aria-hidden="true" />}
              <div className="sm:px-8 md:px-12">
                <PartnerItem partner={partner} />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPartner;