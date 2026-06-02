'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const AnimatedCursor = dynamic(() => import('react-animated-cursor'), { ssr: true });
const WhebotPage = dynamic(() => import('./WhebotPage'), { ssr: true });

export default function PageWrapper({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const [botMinimized, setBotMinimized] = useState(true);

  useEffect(() => { setIsMobile(window.innerWidth <= 768); }, []);

  return (
    <>
      {!isMobile && (
        <AnimatedCursor innerSize={8} outerSize={30} innerScale={1} outerScale={2} outerAlpha={0}
          innerStyle={{ backgroundColor: '#FFFFFF' }} outerStyle={{ backgroundColor: '#ffffff3b' }} />
      )}
      {children}
      <WhebotPage isMinimized={botMinimized} setIsMinimized={setBotMinimized} />
    </>
  );
}
