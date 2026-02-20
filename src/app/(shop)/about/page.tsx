"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Award, Globe, ShieldCheck, MapPin, Clock } from "lucide-react";

const MILESTONES = [
  { year: "2015", en: "Founded in Bangkok", th: "ก่อตั้งในกรุงเทพฯ" },
  {
    year: "2017",
    en: "Expanded to Tokyo sourcing",
    th: "ขยายเครือข่ายจัดหาสินค้าจากโตเกียว",
  },
  {
    year: "2019",
    en: "10,000+ items authenticated",
    th: "ตรวจสอบสินค้าครบ 10,000+ ชิ้น",
  },
  {
    year: "2021",
    en: "Launched e-commerce platform",
    th: "เปิดตัวแพลตฟอร์มออนไลน์",
  },
  {
    year: "2023",
    en: "Partnerships with 50+ boutiques",
    th: "ร่วมมือกับบูทีคกว่า 50 แห่ง",
  },
  {
    year: "2025",
    en: "Serving clients worldwide",
    th: "ให้บริการลูกค้าทั่วโลก",
  },
];

const STATS = [
  {
    value: "10K+",
    en: "Items Authenticated",
    th: "ชิ้นที่ผ่านการตรวจแท้",
    icon: ShieldCheck,
  },
  {
    value: "50+",
    en: "Tokyo Partner Boutiques",
    th: "พาร์ทเนอร์บูทีคในโตเกียว",
    icon: MapPin,
  },
  {
    value: "99.8%",
    en: "Authenticity Rate",
    th: "เรทการันตีความแท้",
    icon: Award,
  },
  {
    value: "24/7",
    en: "Concierge Service",
    th: "บริการลูกค้าตลอด 24 ชม.",
    icon: Clock,
  },
];

export default function AboutPage() {
  const { locale, t } = useLanguage();
  const isTH = locale === "th";

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="grow font-thai">
        {/* Hero Banner */}
        <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/5710082/pexels-photo-5710082.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="About Banner"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative text-center z-10 space-y-8 max-w-4xl px-6"
          >
            <span className="text-[10px] tracking-[0.5em] font-bold text-white/50 uppercase">
              {isTH ? "ตำนานของเรา" : "Our Heritage"}
            </span>
            <h1 className="text-6xl md:text-9xl luxury-serif text-white tracking-widest leading-[0.8]">
              MB Archive
            </h1>
            <div className="w-24 h-px bg-white/40 mx-auto" />
            <p className="text-[11px] md:text-xs tracking-[0.3em] font-light uppercase text-white/90 leading-relaxed max-w-xl mx-auto">
              {isTH
                ? "ความหรูหราที่คัดสรรจากหัวใจของญี่ปุ่นสู่คอลเลกชันส่วนตัวของคุณ"
                : "Curated luxury from the heart of Japan, delivered to your private collection."}
            </p>
          </motion.div>
        </div>

        {/* Stats Strip */}
        <section className="bg-zinc-950 text-white py-0">
          <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 divide-x divide-zinc-800">
            {STATS.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="py-10 md:py-16 px-6 text-center group"
              >
                <stat.icon
                  size={20}
                  className="mx-auto mb-4 text-zinc-500 group-hover:text-white transition-colors"
                  strokeWidth={1.5}
                />
                <span className="text-3xl md:text-4xl font-light tracking-tight block mb-1">
                  {stat.value}
                </span>
                <span className="text-[8px] md:text-[9px] tracking-[0.3em] uppercase font-bold text-zinc-500">
                  {isTH ? stat.th : stat.en}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Story Section — Split Layout */}
        <section className="container mx-auto px-4 py-32 grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <span className="text-[10px] tracking-[0.4em] font-bold text-zinc-400 uppercase">
                {t("about.legacy")}
              </span>
              <h2 className="text-4xl md:text-6xl luxury-serif leading-tight text-black">
                The Heritage
              </h2>
              <div className="w-20 h-0.5 bg-black" />
            </div>

            <div className="space-y-8 text-zinc-600 leading-loose text-sm font-light tracking-wide text-justify">
              <p>{t("about.story1")}</p>
              <p>{t("about.story2")}</p>
            </div>

            <div className="pt-4 flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center text-sm font-light uppercase text-zinc-600 overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/2187605/pexels-photo-2187605.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
                  alt="Founder"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-xs font-medium tracking-wider block">
                  {isTH ? "ผู้ก่อตั้ง" : "Founder"}
                </span>
                <span className="text-[9px] tracking-widest text-zinc-400 uppercase">
                  MB Brandname
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative aspect-4/5 overflow-hidden shadow-2xl"
          >
            <Image
              src="https://images.pexels.com/photos/2187605/pexels-photo-2187605.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1500&fit=crop"
              alt="Tokyo Boutique"
              fill
              className="object-cover hover:scale-105 transition-transform duration-[2s]"
            />
            <div className="absolute inset-0 border-24 md:border-30 border-white/90 pointer-events-none" />
          </motion.div>
        </section>

        {/* Values / Philosophy — Dark Section */}
        <section className="bg-black text-white py-32 md:py-40">
          <div className="container mx-auto px-4">
            <div className="text-center mb-24 space-y-6">
              <span className="text-[10px] tracking-[0.4em] font-bold text-zinc-500 uppercase">
                {isTH ? "ปรัชญาของเรา" : "Our Philosophy"}
              </span>
              <h3 className="text-4xl font-light tracking-[0.2em] uppercase">
                The Gold Standard
              </h3>
              <div className="w-12 h-px bg-white/30 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-zinc-800">
              {[
                {
                  num: "01",
                  title: t("about.authTitle"),
                  desc: t("about.authDesc"),
                  icon: <ShieldCheck size={20} strokeWidth={1.5} />,
                },
                {
                  num: "02",
                  title: t("about.susTitle"),
                  desc: t("about.susDesc"),
                  icon: <Globe size={20} strokeWidth={1.5} />,
                },
                {
                  num: "03",
                  title: t("about.japanTitle"),
                  desc: t("about.japanDesc"),
                  icon: <Award size={20} strokeWidth={1.5} />,
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.7 }}
                  className="border-b border-zinc-800 md:border-r md:last:border-r-0 p-10 md:p-14 group hover:bg-zinc-900/50 transition-colors space-y-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 border border-zinc-700 rounded-full flex items-center justify-center text-zinc-500 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-500">
                      {item.icon}
                    </div>
                    <span className="text-[10px] tracking-widest text-zinc-600 font-mono">
                      {item.num}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold tracking-[0.25em] uppercase">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-loose tracking-wider font-light">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline / Milestones */}
        <section className="py-32 px-6 bg-zinc-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20 space-y-4">
              <span className="text-[10px] tracking-[0.4em] font-bold text-zinc-400 uppercase">
                {isTH ? "เส้นทางของเรา" : "Our Journey"}
              </span>
              <h3 className="text-3xl md:text-4xl font-light tracking-[0.15em] uppercase">
                {isTH ? "เหตุการณ์สำคัญ" : "Milestones"}
              </h3>
              <div className="w-12 h-px bg-black mx-auto" />
            </div>

            <div className="relative">
              {/* Center line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-200 -translate-x-1/2 hidden md:block" />

              <div className="space-y-12 md:space-y-0">
                {MILESTONES.map((m, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    className={`relative flex items-center md:py-8 ${
                      idx % 2 === 0 ? "md:justify-start" : "md:justify-end"
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full hidden md:block z-10" />

                    <div
                      className={`md:w-5/12 border border-zinc-200 bg-white p-6 hover:shadow-lg transition-shadow ${
                        idx % 2 === 0
                          ? "md:mr-auto md:text-right"
                          : "md:ml-auto"
                      }`}
                    >
                      <span className="text-[9px] tracking-[0.3em] uppercase font-bold text-zinc-400 block mb-1">
                        {m.year}
                      </span>
                      <span className="text-sm font-light tracking-wide text-zinc-800">
                        {isTH ? m.th : m.en}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-0">
          <div className="grid grid-cols-1 md:grid-cols-3 h-[60vh]">
            {[
              "https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1600&fit=crop",
              "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
              "https://images.pexels.com/photos/1204464/pexels-photo-1204464.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
            ].map((src, idx) => (
              <div key={idx} className="relative h-full overflow-hidden group">
                <Image
                  src={src}
                  alt={`Gallery ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
