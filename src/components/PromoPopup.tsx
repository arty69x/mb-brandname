"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { PROMO_MOCK } from "@/lib/mock-content";

export default function PromoPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("mb-promo-popup-seen");
    const timer = setTimeout(() => {
      if (!seen) setOpen(true);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setOpen(false);
    sessionStorage.setItem("mb-promo-popup-seen", "true");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[75] bg-black/45 grid place-items-center p-4" onClick={close}>
      <div className="w-full max-w-4xl bg-white" onClick={(e) => e.stopPropagation()}>
        <div className="relative h-56 md:h-80">
          <button className="absolute right-4 top-4 z-10" onClick={close} aria-label="Close popup">
            <X size={44} strokeWidth={1.4} />
          </button>
          <Image
            src={PROMO_MOCK.image}
            alt="special offer"
            fill
            className="object-cover"
          />
        </div>

        <div className="p-7 md:p-10">
          <h3 className="text-6xl md:text-7xl mb-3">{PROMO_MOCK.title}</h3>
          <p className="text-2xl md:text-4xl mb-8">{PROMO_MOCK.subtitle}</p>
          <div className="flex flex-wrap gap-4">
            <button className="border border-zinc-600 px-8 py-3 text-2xl">Claim offer</button>
            <button className="border border-zinc-600 px-8 py-3 text-2xl" onClick={close}>No thanks</button>
          </div>
        </div>
      </div>
    </div>
  );
}
