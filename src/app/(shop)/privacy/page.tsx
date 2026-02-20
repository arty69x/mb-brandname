"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function PrivacyPage() {
  const { locale } = useLanguage();

  return (
    <div className="pt-40 pb-32 min-h-screen bg-white font-thai">
      <div className="luxury-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto space-y-16"
        >
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-6xl luxury-serif">
              {locale === "th" ? "นโยบายความเป็นส่วนตัว" : "Privacy Policy"}
            </h1>
            <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-400 font-black">
              Protocol Version 2025.01
            </p>
          </div>

          <div className="space-y-12 text-zinc-600 leading-loose text-sm font-light">
            <section className="space-y-6">
              <h2 className="text-black font-black tracking-widest uppercase text-xs border-b border-zinc-100 pb-4">
                01. Collective Intelligence
              </h2>
              <p>
                {locale === "th"
                  ? "เราให้ความสำคัญกับความเป็นส่วนตัวของคุณ ข้อมูลส่วนบุคคลที่เราจัดเก็บจะถูกใช้เพื่อยกระดับประสบการณ์การซื้อสินค้าของคุณ และเพื่อความปลอดภัยสูงสุดในการทำธุรกรรมผ่านระบบ Vault ของเรา"
                  : "We honor your discretion. Any personal intelligence collected is strictly utilized to refine your bespoke acquisition experience and ensure the structural integrity of transactions within our Vault system."}
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-black font-black tracking-widest uppercase text-xs border-b border-zinc-100 pb-4">
                02. Data Preservation
              </h2>
              <p>
                {locale === "th"
                  ? "ข้อมูลของคุณจะถูกเข้ารหัสระดับเดียวกับธนาคาร และจัดเก็บไว้บนเครือข่ายที่มีความปลอดภัยสูง เราไม่เคยเปิดเผยข้อมูลให้กับบุคคลภายนอกโดยไม่ได้รับอนุญาต"
                  : "Your data is encrypted using military-grade protocols and preserved within our high-security edge network. We never disclose your identity to third-party entities without explicit authorization."}
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-black font-black tracking-widest uppercase text-xs border-b border-zinc-100 pb-4">
                03. Digital Footprints
              </h2>
              <p>
                {locale === "th"
                  ? "เราใช้เทคโนโลยีคุกกี้เพื่อจดจำความพึงพอใจของคุณและมอบข้อเสนอที่เฉพาะเจาะจงกับสไตล์ของคุณมากที่สุด"
                  : "We utilize cookie technology to synchronize with your preferences and provide a seamless, high-fidelity experience across all digital boutique nodes."}
              </p>
            </section>

            <div className="pt-20 border-t border-zinc-100 text-center">
              <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-300 font-bold">
                Contact: privacy@mb-brandname.com
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
