'use client';

// ClientProviders.jsx — wraps client-only logic (preloader, bot, animated cursor)
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const Preloader = dynamic(() => import('./Preloader'), { ssr: true });
const WhebotPage = dynamic(() => import('./WhebotPage'), { ssr: true });
const AnimatedCursor = dynamic(() => import('react-animated-cursor'), { ssr: true });

export default function ClientProviders({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [botMinimized, setBotMinimized] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const isAdminRoute = pathname.startsWith('/admin');

  const openBot = () => setBotMinimized(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    const handleLoad = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(6600 - elapsed, 0);
      setTimeout(() => setLoading(false), remaining);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 },
  };
  const pageTransition = { type: 'tween', ease: 'easeInOut', duration: 0.5 };

  return (
    <>
      {!isMobile && !isAdminRoute && (
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

      <AnimatePresence mode="wait">
        {loading && !isAdminRoute ? (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Preloader />
          </motion.div>
        ) : (
          <motion.div
            key={pathname}
            className="min-h-screen w-full"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            {/* Pass openBot to children via context or prop drilling */}
            {React.Children.map(children, child =>
              React.isValidElement(child)
                ? React.cloneElement(child, { openBot })
                : child
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && !isAdminRoute && (
        <WhebotPage isMinimized={botMinimized} setIsMinimized={setBotMinimized} />
      )}
    </>
  );
}
