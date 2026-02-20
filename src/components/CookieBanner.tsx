"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const { locale } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem("mb-cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("mb-cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("mb-cookie-consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="fixed bottom-8 left-8 right-8 z-[1000] flex justify-center pointer-events-none"
        >
          <div className="bg-white/90 backdrop-blur-xl border border-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-6 md:p-8 max-w-4xl w-full flex flex-col md:flex-row items-center justify-between gap-8 pointer-events-auto relative overflow-hidden group">
            {/* Design Element */}
            <div className="absolute top-0 left-0 w-1 h-full bg-zinc-900" />

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-zinc-50 border border-zinc-100 flex items-center justify-center shrink-0 group-hover:bg-black group-hover:text-white transition-all duration-700">
                <Cookie size={20} strokeWidth={1} />
              </div>
              <div className="space-y-2">
                <h4 className="text-[11px] tracking-ultra font-black uppercase text-zinc-900">
                  {locale === "th" ? "การตั้งค่าคุกกี้" : "Cookie Protocol"}
                </h4>
                <p className="text-[10px] leading-loose text-zinc-500 font-medium uppercase tracking-widest max-w-xl">
                  {locale === "th"
                    ? "เราใช้เทคโนโลยีเพื่อทำความเข้าใจพฤติกรรมการค้นหาและปรับปรุงประสบการณ์การเข้าชมนิทรรศการออนไลน์ของคุณให้ดียิ่งขึ้น"
                    : "We employ digital markers to understand discovery patterns and curate a more evocative experience across our archival network."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 shrink-0">
              <button
                onClick={handleDecline}
                className="text-[10px] tracking-ultra font-black uppercase text-zinc-300 hover:text-zinc-600 transition-colors"
              >
                {locale === "th" ? "ปฏิเสธ" : "Decline"}
              </button>
              <button
                onClick={handleAccept}
                className="bg-black text-white px-10 py-4 text-[10px] tracking-ultra font-black uppercase hover:bg-zinc-800 transition-all shadow-lg"
              >
                {locale === "th" ? "ยอมรับทั้งหมด" : "Authorize All"}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
