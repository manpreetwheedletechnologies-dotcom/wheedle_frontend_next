'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../components/Button_x";
import LogosData from "../lib/LogosData";
import API_BASE_URL from "../lib/api";

const CurrentOpenings = ({ onStartNowClick }) => {
  const [jobs, setJobs] = useState([]);
  const [expandedJobs, setExpandedJobs] = useState({});

  useEffect(() => {
    fetch(`${API_BASE_URL}/jobs/`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const toggleDescription = (index) => {
    setExpandedJobs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      <section className="w-full px-6 sm:px-10 lg:px-[100px] py-20 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="font-gotham font-normal text-white text-[36px] sm:text-[44px] lg:text-[53px] leading-[48px] lg:leading-[63px] animate-bounce">
            Current Openings
          </h2>

          <p className="font-inter font-medium text-white text-[16px] leading-[26px] mt-3">
            We're currently hiring for the following roles:
          </p>

          <div className="mt-14">
            {jobs && jobs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                {jobs.map((job, index) => (
                  <div
                    key={index}
                    className="bg-[#0E1228] rounded-[30px] flex flex-col overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-3 hover:scale-[1.03] hover:shadow-[0_20px_60px_rgba(41,52,228,0.35)]"
                  >
                    {/* Image */}
                    <div className="relative w-full h-[220px] flex-shrink-0">
                      {job.image ? (
                        <Image
                          src={`${API_BASE_URL}/uploads/${job.image}`}
                          alt={job.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#0E1228] flex items-center justify-center">
                          <span className="text-white/40">No image</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-6 gap-3 bg-[#0B0F1A]">
                      <span className="font-inter text-[12px] text-[#2934E4]">
                        {job.jobType}
                      </span>

                      <h3 className="font-gotham text-white text-[22px] lg:text-[26px] leading-[32px] lg:leading-[38px]">
                        {job.title}
                      </h3>

                      {/* Description with toggle */}
                      <div className="relative">
                        <p
                          className={`font-inter text-[14px] leading-[24px] text-white/80 ${
                            expandedJobs[index] ? "" : "line-clamp-2"
                          }`}
                        >
                          {job.description}
                        </p>

                        {!expandedJobs[index] && job.description?.length > 100 && (
                          <span className="absolute bottom-0 right-0 bg-[#0B0F1A] pl-2">
                            <button
                              onClick={() => toggleDescription(index)}
                              className="text-[#4F6BFF] text-sm hover:underline"
                            >
                              more
                            </button>
                          </span>
                        )}

                        {expandedJobs[index] && (
                          <button
                            onClick={() => toggleDescription(index)}
                            className="text-[#4F6BFF] text-sm mt-1 hover:underline"
                          >
                            Show Less
                          </button>
                        )}
                      </div>

                      <div className="mt-auto pt-2">
                        <Button
                          size="md"
                          showArrow={true}
                          onClick={onStartNowClick}
                          className="w-fit bg-white text-black text-[14px] font-medium rounded-full px-[19px] py-[9px]"
                          padding="12px 32px"
                        >
                          Start Now
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative flex justify-center mt-14">
                <div className="flex flex-col items-center justify-center py-10 px-12 rounded-[30px] bg-[#0B0F1A] border-2 border-[#2934E4]/60 shadow-[0_0_30px_4px_rgba(41,52,228,0.4)]">
                  <div className="w-16 h-16 rounded-full bg-[#0E1228] border border-[#2934E4] flex items-center justify-center mb-4">
                    <svg
                      className="w-7 h-7"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#2934E4"
                      strokeWidth="1.5"
                    >
                      <rect x="2" y="7" width="20" height="14" rx="2" />
                      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                    </svg>
                  </div>
                  <h3 className="text-white text-[20px] mb-2">
                    No current openings
                  </h3>
                  <p className="text-white/40 text-[14px] text-center">
                    No roles available right now. Check back soon!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* QUALITIES SECTION */}
      <section className="w-full px-6 sm:px-10 lg:px-[100px] py-24">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-14">
          <div className="w-full lg:w-[545px]">
            <div className="relative w-full h-[400px] rounded-[30px] overflow-hidden">
              <Image
                src={LogosData.careerimage}
                alt="Team"
                fill
                className="object-cover rounded-[30px]"
              />
            </div>
          </div>

          <div className="w-full lg:w-[645px]">
            <h2 className="text-white text-[36px] lg:text-[53px] mb-3">
              Qualities We <span className="text-white/70">Value</span>
            </h2>

            <ul className="space-y-2">
              {[
                "Honesty, fairness, and respect in all interactions.",
                "Readiness to take responsibilities and deliver on commitments.",
                "Cooperating with the team and valuing diverse perspectives.",
                "Showing curiosity and adaptability.",
                "Understanding client needs and delivering value.",
              ].map((text, index) => (
                <li key={index} className="text-white flex gap-2">
                  <span>•</span> {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default CurrentOpenings;