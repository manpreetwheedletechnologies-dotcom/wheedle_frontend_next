'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from '../lib/api';

function Steps() {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const [steps, setSteps] = useState([]);
  useEffect(() => {
    fetchSteps();
  }, []);

  const staticSteps = [
    {
      number: 1,
      title: "Aligning Your Vision with Your Need",
      description:
        "Share your vision, and our team will translate it into a business solution that drives results.",
      image: "/Business.jpeg",
    },
    {
      number: 2,
      title: "Strategic Ideation & Brainstorming with Client Involvement",
      description:
        "We partner with you to transform your ideas into strategically aligned, high-impact solutions.",
      image: "/icon_1.jpeg",
    },
    {
      number: 3,
      title: "Reliable Tested Solution with Quality Assurance",
      description:
        "We validate every solution before delivery, through strategic testing to meet the industry standard.",
      image: "/icon_2.jpeg",
    },
  ];

  const fetchSteps = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/steps/`);
      
        const formatted = res.data.map((step, index) => ({
        number: index + 1,
        title: step.title,
        description: step.description,
        image: step.image ? `${API_BASE_URL}/uploads/${step.image}/` : `/placeholder-step-${index + 1}.jpeg`,
      }));

      if (formatted.length === 0) {
        setSteps(staticSteps);
      } else {
        setSteps(formatted);
      }
    } catch (error) {
      setSteps(staticSteps);
    }
  };

  // 🔁 Auto step change (10 seconds)
  useEffect(() => {
    if (steps.length <= 1) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
    }, 10000);

    return () => clearInterval(interval);
  }, [steps]);
 
  // 🔵 Progress bar sync (10 seconds)
  useEffect(() => {
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 100);

    return () => clearInterval(progressInterval);
  }, [activeStep]);

  return (
    <section className="relative w-full py-16 lg:py-28">
      {/* Soft glow */}

      <div className="relative w-full max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl lg:text-5xl font-Gotham text-white">
            Smart AI Solutions & Platforms
          </h2>
          <h2 className="text-4xl lg:text-5xl font-Gotham text-white/50">
            That Scale With You
          </h2>
          <p className="mt-4 text-[14px] md:text-[15px] text-white/60">
            {/* <span className="text-white/80 font-medium">
              3 Simple Steps
            </span>{" "} */}
            Hook your Business with Adaptive AI Tailored for your Growth
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left - Steps */}
          <div className="w-full lg:w-[320px]">
            {steps.map((step, index) => (
              <div
                key={index}
                onClick={() => setActiveStep(index)}
                className="cursor-pointer mb-8"
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`w-7 h-7 min-w-7 min-h-7 rounded-full flex items-center justify-center text-sm font-medium border flex-shrink-0 ${activeStep === index
                      ? "border-blue-400 text-blue-400"
                      : "border-white/30 text-white/50"
                      }`}
                  >
                    {step.number}
                  </span>

                  <span
                    className={`text-[16px] leading-snug transition-all duration-300 
                      ${activeStep === index
                        ? "text-blue-400 font-semibold"
                        : "text-white/60"
                      }
                    `}
                  >
                    {step.title}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mt-3 ml-[44px] h-[2px] w-[calc(100%-44px)] bg-white/20 rounded">
                  {activeStep === index && (
                    <div
                      className="h-full bg-blue-400 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Center - Image */}
          <div className="flex-1 flex justify-center">
            <div className="rounded-2xl overflow-hidden">
              {steps[activeStep] && (
                <img
                  src={steps[activeStep].image}
                  alt={steps[activeStep].title}
                  className="object-cover w-[500px] h-[500px] transition-transform duration-500 ease-in-out hover:scale-110"
                />
              )}
            </div>
          </div>

          {/* Right - Description */}
          <div className="w-full lg:w-[320px]">
            <div className="mb-4 flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-400/20">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#60A5FA"
                strokeWidth="2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>

            <h3 className="text-[30px] font-semibold text-blue-400 mb-3">
              {steps[activeStep]?.title}
            </h3>

            <p className="text-[14px] leading-7 text-white/60">
              {steps[activeStep]?.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Steps;