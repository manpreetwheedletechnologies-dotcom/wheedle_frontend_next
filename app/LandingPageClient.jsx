'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Partners from '../components/Partners';
import Vision from '../components/Vision';
import Steps from '../components/Steps';
import Features from '../components/Features';
import Businesses from '../components/Businesses';
import Newsletter from '../components/Newsletter';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import Preloader from '../components/Preloader';
import WhebotPage from '../components/WhebotPage';
import { AnimatePresence, motion } from 'framer-motion';

const AnimatedCursor = dynamic(() => import('react-animated-cursor'), { ssr: false });

export default function LandingPageClient() {
  const [loading, setLoading] = useState(true);
  const [botMinimized, setBotMinimized] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    const startTime = Date.now();

    const handleLoad = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(6600 - elapsed, 0);
      setTimeout(() => setLoading(false), remaining);
    };

    if (document.readyState === 'complete') handleLoad();
    else window.addEventListener('load', handleLoad);

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  const openBot = () => setBotMinimized(false);

  return (
    <>
      {/* Animated Cursor - same as React version */}
      {!isMobile && (
        <AnimatedCursor
          innerSize={8}
          outerSize={30}
          innerScale={1}
          outerScale={2}
          outerAlpha={0}
          innerStyle={{ backgroundColor: "#FFFFFF" }}
          outerStyle={{ backgroundColor: "#ffffff3b" }}
        />
      )}

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Preloader />
          </motion.div>
        ) : (
          <>
            <Header />
            <Hero openBot={openBot} />
            <div 
              className="w-full min-h-screen bg-cover bg-center bg-no-repeat" 
              style={{ backgroundImage: "url('/Main_BG.jpg')" }}
            >
              <Partners />
              <Vision />
              <Steps />
              <Features />
              <Businesses />
              <Newsletter content={{
                titleLine1: 'Stay Ahead in the AI-Driven World:',
                titleLine2Primary: 'Latest Insights & ',
                titleLine2Secondary: 'Updates',
                description: 'Stay updated with the latest in AI platforms, autonomous systems, agentic marketing, and digital innovation—delivered straight to your inbox.',
                inputType: 'email',
                inputPlaceholder: 'Enter your email',
                buttonText: 'Get The Tech Brief',
                successMessage: 'Your contact is successfully registered for newsletter',
              }} />
              <Testimonials />
              <Footer />
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Bot stays persistent - same as React version */}
      {!loading && (
        <WhebotPage
          isMinimized={botMinimized}
          setIsMinimized={setBotMinimized}
        />
      )}
    </>
  );
}