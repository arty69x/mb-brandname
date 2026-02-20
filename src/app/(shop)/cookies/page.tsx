"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function CookiesPage() {
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
              {locale === "th" ? "นโยบายคุกกี้" : "Cookie Protocol"}
            </h1>
            <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-400 font-black">
              Digital Synchronization 2025.01
            </p>
          </div>

          <div className="space-y-12 text-zinc-600 leading-loose text-sm font-light">
            <section className="space-y-6">
              <h2 className="text-black font-black tracking-widest uppercase text-xs border-b border-zinc-100 pb-4">
                01. Experience Synchronization
              </h2>
              <p>
                {locale === "th"
                  ? "คุกกี้ช่วยให้เราจดจำคุณได้เมื่อคุณกลับมาที่บูติกของเรา ช่วยรักษาสินค้าในถุงช้อปปิ้ง และจำภาษาที่คุณเลือกใช้เพื่อให้การใช้งานราบรื่นที่สุด"
                  : "Cookies facilitate synchronization when you return to our digital boutique. They preserve your shopping bag status and language preferences to ensure a frictionless, high-fidelity experience."}
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-black font-black tracking-widest uppercase text-xs border-b border-zinc-100 pb-4">
                02. Analytical Precision
              </h2>
              <p>
                {locale === "th"
                  ? "เราใช้เทคโนโลยีวิเคราะห์เพื่อทำความเข้าใจพฤติกรรมผู้ใช้และปรับปรุงการนำเสนอสินค้าให้ตรงใจคุณมากยิ่งขึ้น ข้อมูลเหล่านี้จะไม่ระบุตัวตน"
                  : "We utilize analytical instrumentation to decode user behavior with extreme precision. These datasets are anonymous and serve only to optimize our archival curation."}
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-black font-black tracking-widest uppercase text-xs border-b border-zinc-100 pb-4">
                03. Preference Modification
              </h2>
              <p>
                {locale === "th"
                  ? "คุณสามารถปรับเปลี่ยนการตั้งค่าคุกกี้ได้ผ่านเบราว์เซอร์ของคุณ อย่างไรก็ตาม การปิดคุกกี้อาจส่งผลต่อการเข้าถึงบางฟีเจอร์ระดับพรีเมียมของเรา"
                  : "You maintain control over your digital footprint. Cookie preferences can be modified within your browser architecture, though restricting them may compromise access to certain premium boutique features."}
              </p>
            </section>

            <div className="pt-20 border-t border-zinc-100 text-center">
              <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-300 font-bold">
                Session Node: MB-SYNC-ACTIVE
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
