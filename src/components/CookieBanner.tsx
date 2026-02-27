"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("mb-cookie-consent");
    if (consent) return;

    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const accept = () => {
    localStorage.setItem("mb-cookie-consent", "accepted");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[1100] bg-[#efefef] border-t border-zinc-300 p-4 md:p-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div className="space-y-2">
          <p className="text-2xl md:text-[42px] md:leading-[1.08] uppercase max-w-5xl">
            We use cookies to enhance your experience while navigate our site, analyze site usage, and assist in our marketing efforts.
          </p>
          <div className="flex gap-8 text-2xl uppercase">
            <a href="/privacy" className="underline text-zinc-500">Privacy Policy &gt;</a>
            <button className="underline">Personalize My Choices &gt;</button>
          </div>
        </div>
        <button onClick={accept} className="bg-black text-white px-8 py-5 text-3xl uppercase w-full md:w-auto">Accept All</button>
      </div>
    </div>
  );
}
