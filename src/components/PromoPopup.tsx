"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const { locale } = useLanguage();

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeen = sessionStorage.getItem("mb-promo-popup-seen");
    if (!hasSeen) {
      // Show popup after a short delay (3.5 seconds)
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("mb-promo-popup-seen", "true");
  };

  const handleClaim = () => {
    setIsOpen(false);
    sessionStorage.setItem("mb-promo-popup-seen", "true");
    // Redirect logic would go here
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-2000"
            onClick={handleClose}
          />

          {/* Modal Architecture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 40 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="fixed inset-0 z-2001 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-zinc-950 max-w-4xl w-full flex flex-col md:flex-row overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] pointer-events-auto relative border border-white/5 group">
              {/* Close Button - Minimalist */}
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 z-20 text-white/40 hover:text-white transition-colors duration-500"
                aria-label="Close"
              >
                <X size={24} strokeWidth={1} />
              </button>

              {/* Left: Visual Anchor */}
              <div className="relative w-full md:w-1/2 min-h-[300px] md:min-h-[500px] overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop"
                  alt="Archive Access"
                  fill
                  className="object-cover scale-110 group-hover:scale-100 transition-transform duration-2000"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-8 left-8 text-white z-10">
                  <p className="text-[9px] tracking-[0.4em] uppercase font-black mb-2 opacity-70">
                    Tokyo Archive // 2026
                  </p>
                </div>
              </div>

              {/* Right: Narrative Content */}
              <div className="flex flex-col justify-center px-10 py-12 md:px-16 w-full md:w-1/2 relative">
                {/* Background Texture */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="space-y-8 relative z-10">
                  <div className="space-y-4">
                    <span className="inline-block py-1 px-3 border border-white/10 text-[8px] tracking-[0.3em] font-black uppercase text-white/60">
                      Invitation Only
                    </span>
                    <h2 className="text-4xl md:text-5xl font-luxury-serif text-white tracking-tight leading-[0.9] italic">
                      {locale === "th"
                        ? "เอกสิทธิ์ระดับสูง"
                        : "Private Archive Access"}
                    </h2>
                    <p className="text-xs text-zinc-400 leading-loose tracking-wide font-light max-w-sm">
                      {locale === "th"
                        ? "ลงทะเบียนเพื่อรับสิทธิ์เข้าถึงคอลเลกชันหายากก่อนใคร และรับส่วนลดพิเศษสำหรับการสั่งซื้อครั้งแรก"
                        : "Secure priority access to our rarest Tokyo acquisitions. Members receive 10% privilege on their inaugural archival investment."}
                    </p>
                  </div>

                  {/* Input Simulation */}
                  <div className="space-y-4 pt-4">
                    <div className="relative group/input">
                      <input
                        type="email"
                        placeholder={
                          locale === "th" ? "อีเมลของคุณ" : "ENTER ACCESS EMAIL"
                        }
                        className="w-full bg-zinc-900/50 border-b border-white/20 px-0 py-4 text-white placeholder:text-zinc-600 text-xs tracking-widest uppercase focus:outline-none focus:border-white transition-colors"
                      />
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover/input:opacity-100 transition-opacity">
                        <ArrowRight size={14} className="text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-4 pt-4">
                    <button
                      onClick={handleClaim}
                      className="bg-white text-black w-full py-4 text-[10px] tracking-[0.3em] font-black uppercase hover:bg-zinc-200 transition-colors flex items-center justify-center gap-4"
                    >
                      {locale === "th" ? "ยืนยันสิทธิ์" : "Authenticate Entry"}
                    </button>
                    <button
                      onClick={handleClose}
                      className="text-[9px] text-zinc-600 tracking-[0.2em] font-bold uppercase hover:text-zinc-400 transition-colors text-center"
                    >
                      {locale === "th" ? "ข้ามไปก่อน" : "Decline Privilege"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
