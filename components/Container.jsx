'use client';
import React from "react";

function Container({ children, className = "" }) {
  return (
    <div className={`section-content ${className}`}>
      {children}
    </div>
  );
}

export default Container;
