// lib/PreloaderContext.jsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const PreloaderContext = createContext({ done: false });

export function PreloaderProvider({ children }) {
  // "done" is stored in module scope too so it survives re-renders
  const [done, setDone] = useState(false);

  useEffect(() => {
    // If already finished in a previous mount, skip immediately
    if (window.__preloaderDone) { setDone(true); return; }

    const startTime = Date.now();
    const finish = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(6600 - elapsed, 0);
      setTimeout(() => {
        window.__preloaderDone = true;
        setDone(true);
      }, remaining);
    };

    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish, { once: true });
  }, []);

  return (
    <PreloaderContext.Provider value={{ done }}>
      {children}
    </PreloaderContext.Provider>
  );
}

export const usePreloader = () => useContext(PreloaderContext);