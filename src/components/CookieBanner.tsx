"use client";

import Link from "next/link";
import { useState } from "react";

export default function CookieBanner() {
  const [dismissed, setDismissed] = useState(false);

  const hasConsent =
    typeof window !== "undefined" && !!window.localStorage.getItem("mb-cookie-consent");

  if (dismissed || hasConsent) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[80] bg-[#f5f5f5] border-t border-zinc-300 p-4 md:p-6">
      <div className="max-w-[1280px] mx-auto grid md:grid-cols-[1fr_auto] gap-4 items-end">
        <div>
          <p className="uppercase text-sm md:text-2xl leading-relaxed tracking-wide">
            We use cookies to enhance your experience while navigating our site,
            analyze site usage, and assist in our marketing efforts.
          </p>
          <div className="mt-3 flex justify-between text-xs uppercase">
            <Link href="/privacy" className="underline text-zinc-500">Privacy Policy &gt;</Link>
            <button
              onClick={() => {
                localStorage.setItem("mb-cookie-consent", "customized");
                setDismissed(true);
              }}
            >
              Personalize my choices &gt;
            </button>
          </div>
        </div>

        <button
          onClick={() => {
            localStorage.setItem("mb-cookie-consent", "accepted");
            setDismissed(true);
          }}
          className="bg-black text-white px-10 py-4 uppercase font-semibold"
        >
          Accept all
        </button>
      </div>
    </div>
  );
}
