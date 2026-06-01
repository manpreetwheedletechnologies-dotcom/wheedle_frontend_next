'use client';

import React, { useRef } from "react";
import CurrentOpenings from "../../components/CurrentOpenings";
import Form from "../../components/Form";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Button from "../../components/Button_x";
import Badge from "../../components/Badge";
import Image from "next/image";
import PageWrapper from "../../components/PageWrapper";

const Career = () => {
  const joinUsRef = useRef(null);

  const scrollToForm = () => {
    joinUsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <PageWrapper>

      {/* ================= HEADER / HERO SECTION ================= */}
      <div
        className="w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/career.png')",
        }}
      >
        <Header />

        <section className="w-full flex justify-center bg-[#010509] mt-16 lg:mt-22">
          <div className="relative w-full max-w-[1440px] min-h-[60vh] sm:min-h-[65vh] lg:min-h-[70vh]">
            {/* Frame Image */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src="/frame-image.png"
                alt="Frame"
                fill
                className="object-cover lg:object-contain"
                priority
              />
            </div>

            {/* Content */}
            <div
              className="
              relative z-10 w-full h-full
              flex flex-col items-center justify-center
              px-5 sm:px-8
              text-white gap-8 text-center
              -translate-y-6 sm:-translate-y-10 lg:-translate-y-14
              pt-24 sm:pt-28 lg:pt-0
              pb-32 sm:pb-28 lg:pb-0
              lg:-translate-y-14
              "
            >
              <Badge text="GROW WITH US" margin="" />
              <div className="max-w-[900px] flex flex-col items-center gap-5">
                <h1 className="font-gotham font-medium text-[28px] sm:text-[32px] lg:text-[40px] leading-tight lg:leading-[52px]">
                  Careers at Wheedle: Where Growth
                  <br />
                  Happens With a Purpose
                </h1>

                <p className="font-inter font-medium text-sm sm:text-[15px] lg:text-base leading-relaxed">
                  Join Wheedles', a workplace where we foster your growth and
                  learning process with real-life projects that create impact
                  for our clients.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= WHY WORK WITH US ================= */}

        <section className="w-full flex justify-center bg-[#010509]">
          <div className="w-full max-w-[1440px] px-5 sm:px-8 lg:px-25 pt-0 pb-25">
            <div className="flex flex-col lg:flex-row items-start gap-12">
              {/* LEFT FRAME */}
              <div className="w-full lg:max-w-[595px] flex flex-col gap-12 mt-6 lg:mt-8">
                <h2 className="font-gotham font-normal text-[36px] sm:text-[44px] lg:text-[53px] leading-[48px] lg:leading-[63px] sm:whitespace-nowrap">
                  <span className="text-white">What Sets </span>
                  <span className="text-white/70">Us Apart?</span>
                </h2>

                <p className="font-inter font-normal text-base leading-[26px] text-white">
                  At Wheedle's, we provide meaningful opportunities to grow,
                  learn, and advance your career. Be a part of a workplace
                  that's just as committed to you as it is to the clients.
                </p>

                <div className="w-full h-[58px]" onClick={scrollToForm}>
                  <Button padding="28px">Join Us Now</Button>
                </div>
              </div>

              {/* RIGHT SIDE - FEATURE CARDS */}
              <div className="w-full lg:max-w-[595px] grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  {
                    img: "/Group1.png",
                    title: "Innovative Freedom",
                    desc: "We are always on the lookout for innovative ideas that can be tomorrow's success blueprint.",
                    gradient: "from-[#2934E4] to-[#171D7E]"
                  },
                  {
                    img: "/Group2.png",
                    title: "Career Growth & Learning",
                    desc: "We structure and align opportunities to provide learning and growth scope to our employees.",
                    gradient: "from-[#4D6DFF] to-[#2934E4]"
                  },
                  {
                    img: "/Group3.png",
                    title: "Collaborative Work Culture",
                    desc: "We foster teamwork, open communication, and shared ownership across and within teams.",
                    gradient: "from-[#2934E4] to-[#0B2CC3]"
                  },
                  {
                    img: "/Group4.png",
                    title: "Meaningful Client Impact",
                    desc: "Get a chance to work on real-world projects that create measurable value for clients.",
                    gradient: "from-[#4D6DFF] to-[#171D7E]"
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="group rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300
                      border border-[#2F3EFF]/30 bg-gradient-to-br from-[#0c122b] to-[#06081a]
                      hover:bg-gradient-to-br hover:from-[#2934E4] hover:to-[#171D7E]
                      hover:scale-[1.02] hover:-translate-y-1
                      hover:shadow-[0_0_30px_rgba(41,52,228,0.4)]
                    "
                  >
                    <div
                      className="w-[52px] h-[52px] rounded-full 
                        bg-gradient-to-br from-[#2F3EFF] to-[#1B2BC7]
                        flex items-center justify-center
                        shadow-[0_0_20px_rgba(47,62,255,0.5)]
                        group-hover:shadow-[0_0_30px_rgba(47,62,255,0.8)]
                        transition-all duration-300
                      "
                    >
                      <div className="relative w-[25px] h-[25px]">
                        <Image
                          src={item.img}
                          alt={item.title}
                          fill
                          className="object-contain brightness-0 invert"
                        />
                      </div>
                    </div>

                    <h4 className="font-inter font-semibold text-[18px] lg:text-[20px] leading-[28px] text-white">
                      {item.title}
                    </h4>

                    <p className="font-inter font-normal text-[13px] lg:text-[14px] leading-[22px] text-white/70 group-hover:text-white/90 transition-colors">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================= OUR VALUES SECTION ================= */}

<section className="w-full flex justify-center bg-gradient-to-b from-[#010509] to-[#050914] py-20 lg:py-28">
  <div className="w-full max-w-[1440px] px-5 sm:px-8 lg:px-16 xl:px-24">
    
    {/* Heading Content */}
    <div className="flex flex-col items-center gap-12 lg:gap-18 text-center mb-16 lg:mb-20">
      
      <h2 className="font-gotham font-normal text-[36px] sm:text-[44px] lg:text-[52px] xl:text-[58px] leading-[48px] lg:leading-[70px]">
        <span className="text-white">What We Stand For: </span>
        <span className="bg-gradient-to-r from-[#4D6DFF] to-[#2934E4] bg-clip-text text-transparent">
          Our Core Values
        </span>
      </h2>

      <p className="font-inter font-medium text-base leading-[26px] text-center max-w-[900px]">
        Our core values represent the principles that guide our decisions,
        shape our culture, and influence how we collaborate, innovate, and
        deliver value to our clients.
      </p>

      {/* First Row */}
      <div className="w-full flex flex-col lg:flex-row justify-center gap-4">
        {[
          {
            title: "Integrity & Transparency",
            desc: "We believe in transparency, be it with the client or our employees. We handle our projects with integrity and openness.",
          },
          {
            title: "Client-Centric Approach",
            desc: "We place our clients at the center of everything we do by understanding their business goals, challenges, and expectations.",
          },
          {
            title: "Ownership & Accountability",
            desc: "We believe in taking ownership of our work and responsibilities, ensuring commitments are met with integrity, transparency, and consistent delivery.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="w-full lg:w-[400px] min-h-[105px] rounded-[25px] border border-[#2F3EFF]/70 px-6 pt-4 pb-5 flex flex-col items-start justify-start gap-2 text-left
            bg-black/40 shadow-[0_0_25px_rgba(47,62,255,0.25)]
            hover:shadow-[0_0_40px_rgba(47,62,255,0.6)]
            animate-floating-fast
            hover:bg-gradient-to-br hover:from-[#2934E4] hover:to-[#171D7E]"
          >
            <h4 className="font-inter font-medium text-[18px] leading-[28px] text-white">
              {item.title}
            </h4>

            <p className="font-inter text-[12px] leading-[22px] text-white/80">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Second Row */}
      <div className="w-full flex flex-col lg:flex-row justify-center gap-4">
        {[
          {
            title: "Mutual Respect & Inclusion",
            desc: "No one in Wheedle believes in power misuse. Every idea and voice is respected and guided towards mutual favour and benefit.",
          },
          {
            title: "Ethical Credibility",
            desc: "Wheedle Technologies believes in ethical practices, and recognizing contributions fairly, giving everyone a chance to grow and learn.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="w-full lg:w-[610px] min-h-[105px] rounded-[25px] border border-[#2F3EFF]/70 p-6 flex flex-col items-start gap-2 text-left
            bg-black/40 shadow-[0_0_25px_rgba(47,62,255,0.25)]
            hover:bg-[linear-gradient(135deg,_#2F3EFF,_#1B2BC7)]
            hover:shadow-[0_0_40px_rgba(47,62,255,0.6)]
            animate-floating-fast"
          >
            <h4 className="font-inter font-medium text-[18px] leading-[28px] text-white">
              {item.title}
            </h4>

            <p className="font-inter text-[12px] leading-[22px] text-white/80">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

        {/* ================= CURRENT OPENINGS + FORM ================= */}
        <CurrentOpenings onStartNowClick={scrollToForm} />
        <div ref={joinUsRef}>
          <Form />
        </div>
        <Footer />
      </div>
    </PageWrapper>
  );
};

export default Career;