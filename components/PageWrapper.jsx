"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
  ssr: false,
});

const WhebotPage = dynamic(() => import("./WhebotPage"), {
  ssr: false,
});

export default function PageWrapper({ children }) {
  const pathname = usePathname();

  const [isMobile, setIsMobile] = useState(false);
  const [botMinimized, setBotMinimized] = useState(true);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth <= 768);

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => {
      window.removeEventListener("resize", checkScreen);
    };
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
          innerStyle={{ backgroundColor: "#FFFFFF" }}
          outerStyle={{ backgroundColor: "#ffffff3b" }}
        />
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{
            opacity: 0,
            y: 150,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          exit={{
            opacity: 0,
            y: -80,
            filter: "blur(10px)",
          }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <WhebotPage
        isMinimized={botMinimized}
        setIsMinimized={setBotMinimized}
      />
    </>
  );
}