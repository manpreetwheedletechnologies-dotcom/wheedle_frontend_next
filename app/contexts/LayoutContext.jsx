// app/contexts/LayoutContext.jsx
'use client';

import { createContext, useContext, useState } from 'react';

const LayoutContext = createContext();

export function LayoutProvider({ children }) {
  const [hideHeader, setHideHeader] = useState(false);
  return (
    <LayoutContext.Provider value={{ hideHeader, setHideHeader }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  return useContext(LayoutContext);
}