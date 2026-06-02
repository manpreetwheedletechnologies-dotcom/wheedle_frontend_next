// components/PageTransition.jsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState('fadeIn'); // 'fadeIn' | 'fadeOut'
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // Route actually changed
    if (prevPathname.current !== pathname) {
      // 1. New children are ready — trigger fade-out of old, fade-in of new
      setTransitionStage('fadeOut');
    }
  }, [pathname]);

  const handleAnimationEnd = () => {
    if (transitionStage === 'fadeOut') {
      // Old page finished sliding out → swap content → slide new page in
      setDisplayChildren(children);
      prevPathname.current = pathname;
      setTransitionStage('fadeIn');
    }
  };

  return (
    <motion.div
      key={transitionStage === 'fadeOut' ? prevPathname.current : pathname}
      initial={{ opacity: 0, x: 200 }}
      animate={
        transitionStage === 'fadeOut'
          ? { opacity: 0, x: -200 }
          : { opacity: 1, x: 0 }
      }
      transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
      onAnimationComplete={handleAnimationEnd}
      style={{ minHeight: '100vh', width: '100%' }}
    >
      {displayChildren}
    </motion.div>
  );
}