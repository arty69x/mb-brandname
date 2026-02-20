"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function TermsPage() {
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
              {locale === "th" ? "ข้อกำหนดและเงื่อนไข" : "Terms of Elegance"}
            </h1>
            <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-400 font-black">
              Operational Protocol 2025.01
            </p>
          </div>

          <div className="space-y-12 text-zinc-600 leading-loose text-sm font-light">
            <section className="space-y-6">
              <h2 className="text-black font-black tracking-widest uppercase text-xs border-b border-zinc-100 pb-4">
                01. Authenticity Mandate
              </h2>
              <p>
                {locale === "th"
                  ? "สินค้าทุกชิ้นในรายการของเราได้รับการรับรองความถูกต้อง 100% โดยผู้เชี่ยวชาญ การซื้อสินค้าจาก MB Brandname ถือเป็นการยอมรับนโยบายการตรวจสอบความแท้ที่เข้มงวดของเรา"
                  : "Every piece within our archives carries a 100% authenticity mandate verified by our Tokyo-based experts. Acquisition through MB Brandname constitutes acceptance of our rigorous authentication protocols."}
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-black font-black tracking-widest uppercase text-xs border-b border-zinc-100 pb-4">
                02. Acquisition Terms
              </h2>
              <p>
                {locale === "th"
                  ? "ราคาที่แสดงคือราคาสุดท้าย รวมถึงภาษีและค่าขนส่งทั่วโลก สินค้าอาจถูกยกเลิกในกรณีที่มีข้อผิดพลาดในรายการหรือสินค้าหมดจากคลังสินค้าหลักในญี่ปุ่น"
                  : "Displayed valuations are definitive, inclusive of premium worldwide transit. Acquisitions may be nullified in cases of inventory desynchronization or core archive errors."}
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-black font-black tracking-widest uppercase text-xs border-b border-zinc-100 pb-4">
                03. Ownership Protocol
              </h2>
              <p>
                {locale === "th"
                  ? "กรรมสิทธิ์ในสินค้าจะถูกโอนไปยังผู้ซื้อเมื่อการชำระเงินเสร็จสมบูรณ์และสินค้าถูกส่งออก เราขอสงวนสิทธิ์ในการตรวจสอบตัวตนก่อนการส่งมอบสินค้ามูลค่าสูง"
                  : "Legal ownership transitions upon verification of payment and shipment dispatch. We maintain the right to verify identity credentials before finalizing high-valuation acquisitions."}
              </p>
            </section>

            <div className="pt-20 border-t border-zinc-100 text-center">
              <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-300 font-bold">
                Legal Node: MB-LEGAL-ASIA-01
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
