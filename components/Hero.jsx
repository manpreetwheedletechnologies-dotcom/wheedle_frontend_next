'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Button from './Button_x';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import API_BASE_URL from '../lib/api';
import Badge from './Badge';
import LogosData from '../lib/LogosData';

const ContactModal = dynamic(() => import('./ContactModal'), { ssr: true });

export default function Hero({ openBot }) {
  const [openContact, setOpenContact] = useState(false);
  const [heroData, setHeroData] = useState({
    badge: 'Autonomous Marketing & Digital Solutions',
    heading: 'Tailoring Customized Intelligent AI Agents\nfor Marketing, Growth & Automation',
    description: 'From Intelligent Automation Engines to AI Marketing Ecosystems, Wheedle Technologies deliver a full spectrum of Digital Services.',
  });

  useEffect(() => {
    axios.get(`${API_BASE_URL}/hero/`)
      .then((res) => { if (res.data) setHeroData(res.data); })
      .catch(() => {});
  }, []);

  return (
    <section
      className="relative w-full pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20 lg:pt-40 lg:pb-24 xl:pt-44 xl:pb-28 h-full border-0 mt-6"
      style={{ background: `radial-gradient(circle at center, rgba(90,108,255,0.35), transparent 60%), linear-gradient(180deg, #000000 5%, #000000 10%, #0f1c5c 25%, #3f5efb 40%, #1a237e 60%, #020617 100%)` }}
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <img src="/BG.png" alt="Background" className="w-full h-full object-cover opacity-20" />
      </div>
      <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto flex flex-col items-center text-center">
        <Badge text={heroData.badge} />
        <motion.h1 animate={{ y: [0, -15, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-[30px] sm:text-[30px] md:text-[40px] lg:text-[45px] xl:text-[55px] font-semibold leading-[1.1] sm:leading-[1.15] text-white mb-4 sm:mb-5 md:mb-6 lg:mb-7 px-2">
          {heroData.heading.split('\n').map((line, i, arr) => (
            <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
          ))}
        </motion.h1>
        <p className="text-[12px] sm:text-[10px] md:text-[14px] lg:text-[15px] xl:text-[16px] text-white leading-[1.7] lg:leading-[1.8] mb-8 sm:mb-9 md:mb-10 lg:mb-12 max-w-[90%] sm:max-w-[540px] md:max-w-[650px] lg:max-w-[750px] px-2 font-normal">
          {heroData.description}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 lg:gap-6 mb-10 sm:mb-12 md:mb-14 lg:mb-16 w-full sm:w-auto">
          <button
            className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-6 sm:px-9 md:px-10 lg:px-11 h-[54px] sm:h-[56px] lg:h-[60px] bg-gradient-to-l from-[#1131c8] via-[#4b6bfd] to-[#1131c8] text-white text-[15px] sm:text-[16px] lg:text-[17px] font-medium rounded-full hover:bg-[#2563eb] transition-all shadow-md shadow-neutral-600 max-w-[400px] sm:max-w-none hover:bg-gradient-to-r hover:from-[#1131c8] hover:via-[#212ba9] hover:to-[#212ba9] border-2 border-blue-300"
            onClick={() => setOpenContact(true)}
          >
            <img src="/GetFree.png" alt="Get Free Consultation" />
            Unlock Your Free Consultation
          </button>
          <div className="w-full sm:w-auto max-w-[400px] sm:max-w-none">
            <Button padding="28px" onClick={openBot}>Chat with Our AI Assistant</Button>
          </div>
        </div>
        {openContact && (
          <ContactModal onClose={() => setOpenContact(false)} title="Unlock Your Free Consultation"
            description="" contactEmail="info@wheedletechnologies.ai"
            contactPhone="+91 9717672561" messagePlaceholder="Tell us your message" />
        )}
        <div className="relative w-full max-w-[1100px] px-0 mt-[-1%] mb-0 sm:mt-0 overflow-hidden">
          <img
            src={LogosData.dashboard}
            alt="Digital Solutions"
            className="w-full h-auto object-cover rounded-xl sm:rounded-2xl lg:rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
}
