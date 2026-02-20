"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type FontType = "sf" | "sarabun" | "prompt";

interface FontContextType {
  font: FontType;
  setFont: (font: FontType) => void;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export const FontProvider = ({ children }: { children: React.ReactNode }) => {
  const [font, setFont] = useState<FontType>("sf");

  useEffect(() => {
    // On mount, apply font to body
    // Remove all font classes first
    document.body.classList.remove("font-sf", "font-sarabun", "font-prompt");
    // Add current font class
    document.body.classList.add(`font-${font}`);
  }, [font]);

  return (
    <FontContext.Provider value={{ font, setFont }}>
      {children}
    </FontContext.Provider>
  );
};

export const useFont = () => {
  const context = useContext(FontContext);
  if (context === undefined) {
    throw new Error("useFont must be used within a FontProvider");
  }
  return context;
};
