'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from '../lib/api';

function Partners() {
  const [partners, setPartners] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/partner/`);
      if (!res.data || res.data.length === 0) {
        setApiError(true);
      } else {
        setPartners(res.data);
      }
    } catch (error) {
      console.log(error);
      setApiError(true);
    }
  };

  return (
    <section className="w-full py-8 lg:py-16">
      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-left {
          animation: scrollLeft 18s linear infinite;
          width: max-content;
        }
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="w-full px-4 lg:px-25 flex flex-col items-center gap-6 lg:gap-10">
        {/* Text */}
        <p className="text-[13px] lg:text-[16px] text-white text-center">
          Trusted by Industry's Leading Organizations: Reliable. Equipped. Ahead
        </p>

        {/* Partner Logos */}
        <div className="w-full overflow-hidden">
          {apiError ? (
            // Fallback static image — duplicated for seamless loop
            <div className="animate-scroll-left flex items-center gap-10">
              <img
                src="/Parnter.png"
                alt="Our Partners"
                className="object-contain h-auto scale-90 lg:scale-100 flex-shrink-0"
              />
              <img
                src="/Parnter.png"
                alt="Our Partners"
                className="object-contain h-auto scale-90 lg:scale-100 flex-shrink-0"
              />
            </div>
          ) : (
            // Dynamic logos from API
            <div className="animate-scroll-left flex items-center gap-10">
              {[...partners, ...partners].map((item, index) => (
                <div
                  key={index}
                  className="w-[80px] h-[34px] sm:w-[95px] sm:h-[40px] md:w-[110px] md:h-[46px] lg:w-[125px] lg:h-[53px] flex items-center justify-center flex-shrink-0"
                >
                  <img
                    src={`${API_BASE_URL}/uploads/${item.logo}`}
                    alt={item.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Partners;