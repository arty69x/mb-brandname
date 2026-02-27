"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("mb-promo-popup-seen");
    if (hasSeen) return;

    const timer = setTimeout(() => setIsOpen(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setIsOpen(false);
    sessionStorage.setItem("mb-promo-popup-seen", "true");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1200] bg-black/55 flex items-center justify-center p-4" onClick={close}>
      <div className="bg-white w-full max-w-[780px] relative" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-4 right-4" aria-label="Close popup" onClick={close}>
          <X className="w-7 h-7" strokeWidth={1.5} />
        </button>

        <div className="relative w-full h-[220px] md:h-[300px]">
          <Image
            src="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Offer"
            fill
            className="object-cover"
          />
        </div>

        <div className="p-8 md:p-10">
          <h3 className="text-5xl md:text-6xl mb-4">You deserve it</h3>
          <p className="text-2xl text-zinc-700 mb-8">A special offer just for you and your first order.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={close} className="border border-black px-8 py-4 text-xl">Claim offer</button>
            <button onClick={close} className="border border-black px-8 py-4 text-xl">No thanks</button>
          </div>
        </div>
      </div>
    </div>
  );
}
