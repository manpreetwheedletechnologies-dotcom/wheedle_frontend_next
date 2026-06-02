// app/LandingPageClient.jsx
'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { usePreloader } from '../lib/PreloaderContext';
import { AnimatePresence, motion } from 'framer-motion';

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

const AnimatedCursor = dynamic(() => import('react-animated-cursor'), { ssr: false });

export default function LandingPageClient() {
  const { done } = usePreloader(); // global — never resets on remount
  const [botMinimized, setBotMinimized] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  return (
    <>
      {!isMobile && (
        <AnimatedCursor
          innerSize={8}
          outerSize={30}
          innerScale={1}
          outerScale={2}
          outerAlpha={0}
          innerStyle={{ backgroundColor: '#FFFFFF' }}
          outerStyle={{ backgroundColor: '#ffffff3b' }}
        />
      )}

      {/* Preloader: fixed overlay — sits on top, page content always underneath */}
      <AnimatePresence>
        {!done && (
          <motion.div
            key="preloader"
            style={{ position: 'fixed', inset: 0, zIndex: 9999 }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Preloader />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content — no AnimatePresence here, layout.jsx handles route transitions */}
      <div style={{ visibility: done ? 'visible' : 'hidden' }}>
        <AnimatePresence mode="wait">
          {done && (
            <motion.div
              key="landing-content"
              initial={{
                opacity: 0,
                y: 150,
                filter: 'blur(10px)',
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
              }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* <Header /> */}
              <Hero openBot={() => setBotMinimized(false)} />
              <div
                className="w-full min-h-screen bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/Main_BG.jpg')" }}
              >
                <Partners />
                <Vision />
                <Steps />
                <Features />
                <Businesses />
                <Newsletter
                  content={{
                    titleLine1: 'Stay Ahead in the AI-Driven World:',
                    titleLine2Primary: 'Latest Insights & ',
                    titleLine2Secondary: 'Updates',
                    description:
                      'Stay updated with the latest in AI platforms, autonomous systems, agentic marketing, and digital innovation—delivered straight to your inbox.',
                    inputType: 'email',
                    inputPlaceholder: 'Enter your email',
                    buttonText: 'Get The Tech Brief',
                    successMessage: 'Your contact is successfully registered for newsletter',
                  }}
                />
                <Testimonials />
                {/* <Footer /> */}
              </div>

              {/* Bot persists — lives outside the route transition wrapper in layout */}

            </motion.div>
          )}
        </AnimatePresence>
                      <WhebotPage
                isMinimized={botMinimized}
                setIsMinimized={setBotMinimized}
              />
      </div>
    </>
  );
}