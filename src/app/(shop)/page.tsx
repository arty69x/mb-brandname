"use client";

import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState, useCallback } from "react";
import { Headphones, ShieldCheck, Truck } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/components/swiper-custom.css";

import { api } from "@/lib/api-client";
import { Product, HeroSlide as HeroSlideType } from "@/types/api";
import { useEffect } from "react";

/* ─── Hero Slide with Video-on-Hover ─── */
function HeroSlide({
  slide,
  locale,
  t,
  heroTextY,
  heroTextOpacity,
}: {
  slide: HeroSlideType;
  locale: string;
  t: (key: string) => string;
  heroTextY: import("framer-motion").MotionValue<string>;
  heroTextOpacity: import("framer-motion").MotionValue<number>;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={slide.image}
        alt="Luxury Banner"
        fill
        className="object-cover"
        priority
      />

      {slide.video && (
        <video
          ref={videoRef}
          src={slide.video}
          muted
          loop
          playsInline
          preload="auto"
          onCanPlayThrough={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            isHovered && videoLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      <div
        className={`absolute inset-0 transition-colors duration-700 ${isHovered ? "bg-black/40" : "bg-black/30"}`}
      />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
        <motion.div
          style={{ y: heroTextY, opacity: heroTextOpacity }}
          className="space-y-6"
        >
          <h1 className="luxury-serif text-[clamp(2.5rem,10vw,6rem)] tracking-[0.05em] leading-[0.9] whitespace-pre-line drop-shadow-2xl">
            {slide.title?.[locale as "en" | "th"] ||
              (slide.titleKey && t(slide.titleKey))}
          </h1>
          <p className="text-[10px] tracking-[0.5em] font-medium uppercase opacity-80 font-thai border-t border-white/20 pt-4 inline-block mx-auto">
            {slide.subtitle?.[locale as "en" | "th"] ||
              (slide.subtitleKey && t(slide.subtitleKey))}
          </p>
          <div className="pt-8">
            <Link
              href="/new-arrivals"
              className="inline-block border border-white/80 bg-white/10 backdrop-blur-sm px-12 py-4 text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-white hover:text-black transition-all duration-300 font-thai"
            >
              {t("hero.discover")}
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Hover play hint */}
      <div
        className={`absolute bottom-24 right-8 z-10 flex items-center gap-2 text-white/50 text-[9px] tracking-[0.3em] uppercase transition-opacity duration-500 pointer-events-none ${
          isHovered ? "opacity-0" : "opacity-60"
        }`}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
          <polygon points="2,0 12,6 2,12" />
        </svg>
        <span className="hidden md:inline">Hover to play</span>
      </div>
    </div>
  );
}

/* ─── Text Reveal on Scroll (clip-mask slide-from-bottom) ─── */
function TextReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function Home() {
  const { locale, t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroSlideType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [productsData, slidesData] = await Promise.all([
          api.getProducts({ featured: true }),
          api.getHeroSlides(),
        ]);
        setProducts(productsData.slice(0, 4));
        setHeroSlides(slidesData);
      } catch (error) {
        console.error("Failed to load home data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Hero scroll-linked parallax for text
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroTextY = useTransform(heroScroll, [0, 1], ["0%", "-30%"]);
  const heroTextOpacity = useTransform(heroScroll, [0, 0.5], [1, 0]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow">
        {/* ═══════════════════════════════════════════
            SECTION 1: HERO CAROUSEL
            ═══════════════════════════════════════════ */}
        <section
          ref={heroRef}
          className="relative h-screen w-full overflow-hidden"
        >
          <Swiper
            modules={[Autoplay, EffectFade, Navigation, Pagination]}
            effect="fade"
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            navigation={true}
            className="h-full w-full"
          >
            {heroSlides.map((slide) => (
              <SwiperSlide key={slide.id} className="relative h-full w-full">
                <HeroSlide
                  slide={slide}
                  locale={locale}
                  t={t}
                  heroTextY={heroTextY}
                  heroTextOpacity={heroTextOpacity}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4 text-white opacity-40 pointer-events-none">
            <span className="text-[8px] tracking-[0.4em] uppercase font-bold font-thai">
              {t("common.scroll")}
            </span>
            <div className="w-px h-12 bg-white/40 relative overflow-hidden">
              <motion.div
                animate={{ y: [0, 48, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-0 left-0 w-full h-4 bg-white"
              />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION: BENTO GRID (2026 Trend)
            ═══════════════════════════════════════════ */}
        <section className="py-24 md:py-32 bg-zinc-50 font-thai relative overflow-hidden">
          {/* Background Decorative Element */}
          <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-zinc-100/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

          <div className="luxury-container relative z-10">
            {/* Bento Grid Architecture */}
            <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[220px] md:auto-rows-[300px] gap-4 md:gap-6">
              {/* Cell 1 — Large Hero Editorial (spans 2x2) */}
              <motion.div
                className="col-span-2 row-span-2 relative overflow-hidden group cursor-pointer shadow-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
              >
                <Image
                  src="https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&fit=crop"
                  alt="Editorial Archive"
                  fill
                  className="object-cover transition-all duration-2000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-1000" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <span className="text-[9px] md:text-[10px] tracking-ultra uppercase font-black text-white/70 block mb-4">
                    {t("home.seasonalArchive")}
                  </span>
                  <h2 className="text-5xl md:text-7xl luxury-serif text-white tracking-tight leading-[0.85]">
                    Eternal
                    <br />
                    <span className="narrative-text text-white/40 text-[0.7em] block pt-2">
                      Styles.
                    </span>
                  </h2>
                </div>
              </motion.div>

              {/* Cell 2 — Brand Manifesto (text box) */}
              <motion.div
                className="col-span-1 row-span-1 bg-white border border-zinc-100 text-black p-8 md:p-10 flex flex-col justify-between group hover:bg-black hover:text-white transition-all duration-700 shadow-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  delay: 0.1,
                  ease: [0.19, 1, 0.22, 1],
                }}
              >
                <span className="text-[8px] tracking-[0.4em] uppercase font-black text-zinc-400 group-hover:text-zinc-500 transition-colors">
                  {t("home.archiveMemo")}
                </span>
                <p className="text-[11px] md:text-xs leading-loose font-light italic font-thai tracking-wide">
                  {t("home.memoText")}
                </p>
                <Link
                  href="/about"
                  className="text-[8px] tracking-[0.4em] uppercase font-black flex items-center gap-3"
                >
                  <span className="w-6 h-px bg-current transition-all duration-500 group-hover:w-12" />
                  {t("hero.discover")}
                </Link>
              </motion.div>

              {/* Cell 3 — Featured Interaction Piece */}
              <motion.div
                className="col-span-1 row-span-1 relative overflow-hidden group shadow-sm bg-zinc-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  delay: 0.2,
                  ease: [0.19, 1, 0.22, 1],
                }}
              >
                <Link
                  href={`/product/${products[0]?.id || "h1"}`}
                  className="block w-full h-full relative"
                >
                  {!loading && (products[0] || true) ? (
                    <Image
                      src={
                        products[0]?.image ||
                        "https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop"
                      }
                      alt="Featured Icon"
                      fill
                      className="object-cover transition-all duration-1500 group-hover:scale-115"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-200 animate-pulse" />
                  )}
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/30 transition-colors duration-700" />
                  <div className="absolute top-4 left-4">
                    <span className="text-[7px] tracking-ultra text-white/60 font-black uppercase">
                      {t("home.featured")}
                    </span>
                  </div>
                </Link>
              </motion.div>

              {/* Cell 4 — Loyalty Metrics */}
              <motion.div
                className="col-span-1 row-span-1 bg-zinc-950 text-white p-8 md:p-10 flex flex-col justify-center items-start group hover:bg-black transition-all duration-500 shadow-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  delay: 0.3,
                  ease: [0.19, 1, 0.22, 1],
                }}
              >
                <span className="text-[3rem] font-light text-white tracking-tighter leading-none mb-4">
                  100
                  <span className="text-zinc-600 font-serif italic text-[0.8em]">
                    %
                  </span>
                </span>
                <span className="text-[9px] tracking-[0.4em] uppercase font-black text-zinc-500">
                  {t("home.authGuaranteed")}
                </span>
                <div className="mt-6 w-full h-px bg-zinc-800 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-white"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 2, delay: 1 }}
                  />
                </div>
              </motion.div>

              {/* Cell 5 — Tall Editorial Display (Desktop Only) */}
              <motion.div
                className="col-span-1 row-span-2 relative overflow-hidden group hidden md:block shadow-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  delay: 0.4,
                  ease: [0.19, 1, 0.22, 1],
                }}
              >
                <Link
                  href={`/product/${products[1]?.id || "c1"}`}
                  className="block w-full h-full relative"
                >
                  {!loading && (products[1] || true) ? (
                    <Image
                      src={
                        products[1]?.image ||
                        "https://images.pexels.com/photos/1154861/pexels-photo-1154861.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&fit=crop"
                      }
                      alt="Tall Editorial"
                      fill
                      className="object-cover transition-all duration-2000 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-200 animate-pulse" />
                  )}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <span className="text-[9px] tracking-ultra text-white/50 font-black uppercase mb-2 block">
                      {t("home.premiumGrade")}
                    </span>
                    <h4 className="text-xl luxury-serif text-white leading-tight whitespace-pre-line">
                      {t("home.meticulousRestoration")}
                    </h4>
                  </div>
                </Link>
              </motion.div>

              {/* Cell 6 — Global Priority Dispatch */}
              <motion.div
                className="col-span-1 row-span-1 bg-zinc-100 p-8 md:p-10 flex flex-col justify-between group cursor-default shadow-sm border border-zinc-200/50"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  delay: 0.5,
                  ease: [0.19, 1, 0.22, 1],
                }}
              >
                <Truck
                  className="w-5 h-5 text-zinc-400 group-hover:text-black transition-colors duration-500"
                  strokeWidth={1}
                />
                <div className="space-y-2">
                  <span className="text-2xl font-black tracking-tight block leading-tight text-zinc-900 group-hover:tracking-widest transition-all duration-700">
                    {t("home.priority")}
                  </span>
                  <p className="text-[8px] tracking-[0.3em] uppercase text-zinc-400 font-black group-hover:text-black transition-colors">
                    {t("home.directFromTokyo")}
                  </p>
                </div>
              </motion.div>

              {/* Cell 7 — Secondary Featured */}
              <motion.div
                className="col-span-1 row-span-1 relative overflow-hidden group shadow-sm bg-zinc-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  delay: 0.6,
                  ease: [0.19, 1, 0.22, 1],
                }}
              >
                <Link
                  href={`/product/${products[2]?.id || "l1"}`}
                  className="block w-full h-full relative"
                >
                  {!loading && (products[2] || true) ? (
                    <Image
                      src={
                        products[2]?.image ||
                        "https://images.pexels.com/photos/1036856/pexels-photo-1036856.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop"
                      }
                      alt="Secondary Featured"
                      fill
                      className="object-cover transition-all duration-1000 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-200 animate-pulse" />
                  )}
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/40 transition-colors" />
                </Link>
              </motion.div>

              {/* Cell 8 — Full Archive Discovery */}
              <motion.div
                className="col-span-2 md:col-span-1 row-span-1 bg-white border border-zinc-100 flex flex-col items-center justify-center text-center p-8 lg:p-10 group hover:border-black transition-all duration-700 shadow-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  delay: 0.7,
                  ease: [0.19, 1, 0.22, 1],
                }}
              >
                <Link
                  href="/new-arrivals"
                  className="flex flex-col items-center gap-6"
                >
                  <span className="text-[9px] tracking-ultra uppercase font-black text-zinc-400 group-hover:text-black transition-colors">
                    {t("home.fullArchive")}
                  </span>
                  <div className="relative">
                    <span className="text-4xl font-light text-zinc-900 transition-all duration-700 group-hover:scale-150 inline-block">
                      →
                    </span>
                    <motion.div className="absolute inset-0 border border-zinc-900 rounded-full scale-0 group-hover:scale-125 opacity-0 group-hover:opacity-10 transition-all duration-700" />
                  </div>
                  <span className="text-[8px] tracking-[0.4em] uppercase font-black text-zinc-300 group-hover:text-zinc-500 transition-colors">
                    {t("home.discovery")}
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION: CURATED SELECTION / NEW ARRIVALS (Redesign 2026)
            ═══════════════════════════════════════════ */}
        <section className="py-32 md:py-48 px-6 bg-white border-t border-zinc-50 relative overflow-hidden">
          {/* Decorative Text */}
          <div className="absolute top-0 right-0 p-24 opacity-[0.03] select-none pointer-events-none hidden lg:block">
            <span className="text-[20vw] font-black tracking-tighter leading-none">
              MB
            </span>
          </div>

          <div className="luxury-container relative z-10">
            {/* Massive Header Architecture */}
            <div className="mb-32 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-zinc-900" />
                <span className="text-[10px] tracking-ultra uppercase font-black text-zinc-900">
                  {t("home.theCollection")}
                </span>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                <h2 className="text-6xl md:text-8xl luxury-serif text-black tracking-tight leading-[0.85] whitespace-pre-line">
                  {t("home.latestArrivals")}
                </h2>
                <Link
                  href="/new-arrivals"
                  className="group flex flex-col gap-2"
                >
                  <span className="text-[10px] uppercase tracking-ultra font-black text-zinc-900">
                    {t("home.viewCompleteArchive")}
                  </span>
                  <div className="w-full h-[1.5px] bg-zinc-900 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
                </Link>
              </div>
            </div>

            {/* Staggered Grid Presentation */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 md:gap-x-12 gap-y-24">
              {products.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 1,
                    delay: idx * 0.15,
                    ease: [0.19, 1, 0.22, 1],
                  }}
                  className={`group ${idx % 2 !== 0 ? "md:-translate-y-24" : "md:translate-y-24"}`}
                >
                  <ProductCard {...product} />
                  {/* Subtle index indicator for editorial feel */}
                  <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <span className="text-[8px] tracking-[0.5em] text-zinc-300 font-black">
                      {t("home.drop")} // 00{idx + 1}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile View All CTA */}
            <div className="mt-32 text-center md:hidden">
              <Link
                href="/new-arrivals"
                className="inline-block border border-black bg-black text-white px-12 py-5 text-[10px] uppercase tracking-ultra font-black hover:bg-zinc-800 transition-all shadow-xl"
              >
                Enter Archive
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION: IMMERSIVE CATEGORIES (Redesign 2026)
            ═══════════════════════════════════════════ */}
        <section className="bg-zinc-950 text-white font-thai">
          <div className="grid grid-cols-1 md:grid-cols-2 h-[80vh] md:h-screen">
            {/* Bags Panel */}
            <Link
              href="/bags"
              className="group relative w-full h-full overflow-hidden block border-r border-white/10"
            >
              <Image
                src="https://images.pexels.com/photos/2081199/pexels-photo-2081199.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="Bags"
                fill
                className="object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 transition-transform duration-1000 group-hover:scale-110">
                <h3 className="text-7xl md:text-9xl luxury-serif font-black uppercase tracking-tighter mix-blend-difference group-hover:tracking-widest transition-all duration-1000">
                  Bags
                </h3>
                <span className="mt-6 text-[9px] tracking-[0.6em] uppercase font-bold opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 text-white">
                  The Collection
                </span>
              </div>
            </Link>

            {/* Accessories Panel */}
            <Link
              href="/accessories"
              className="group relative w-full h-full overflow-hidden block"
            >
              <Image
                src="https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="Accessories"
                fill
                className="object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 mix-blend-difference">
                <h3 className="text-6xl md:text-8xl font-black uppercase tracking-tighter group-hover:tracking-widest transition-all duration-700">
                  Gems
                </h3>
                <span className="mt-4 text-[10px] tracking-[0.5em] uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                  Explore Accessories
                </span>
              </div>
            </Link>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION: THE MANIFESTO / TRUST (Redesign 2026)
            ═══════════════════════════════════════════ */}
        <section className="py-24 md:py-40 px-6 bg-zinc-50 font-thai">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
              <TextReveal>
                <h2 className="text-5xl md:text-7xl font-light tracking-tight leading-[0.9] text-zinc-900 whitespace-pre-line">
                  {t("home.ourPromise")}
                </h2>
              </TextReveal>
              <div className="pt-4">
                <p className="text-sm text-zinc-500 leading-loose tracking-wide uppercase font-medium">
                  {t("home.promiseDesc")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-zinc-200">
              {[
                {
                  id: "01",
                  title: t("home.authTitle"),
                  desc: t("home.authSub"),
                  icon: <ShieldCheck className="w-5 h-5" strokeWidth={1.5} />,
                },
                {
                  id: "02",
                  title: t("home.deliveryTitle"),
                  desc: t("home.deliverySub"),
                  icon: <Truck className="w-5 h-5" strokeWidth={1.5} />,
                },
                {
                  id: "03",
                  title: t("home.serviceTitle"),
                  desc: t("home.serviceSub"),
                  icon: <Headphones className="w-5 h-5" strokeWidth={1.5} />,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group border-b border-zinc-200 p-8 md:p-12 hover:bg-white hover:shadow-xl transition-all duration-500 cursor-default relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 border border-zinc-200 rounded-full px-3 py-1 bg-zinc-50 group-hover:bg-black group-hover:text-white transition-colors">
                      {item.id}
                    </span>
                    <span className="text-zinc-300 group-hover:text-black transition-colors duration-500 transform group-hover:scale-110">
                      {item.icon}
                    </span>
                  </div>
                  <h3 className="text-2xl font-light uppercase tracking-widest mb-2 group-hover:translate-x-2 transition-transform duration-300">
                    {item.title}
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-zinc-400">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION: SOCIAL PROOF / TESTIMONIALS
            ═══════════════════════════════════════════ */}
        <section className="py-24 md:py-32 bg-black text-white font-thai overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
              <TextReveal>
                <h2 className="text-4xl md:text-6xl font-light tracking-tight leading-[0.9] whitespace-pre-line">
                  {t("home.whatTheySay")}
                  <br />
                  <span className="font-serif italic text-white/40">
                    {t("home.say")}
                  </span>
                </h2>
              </TextReveal>
              <span className="text-[9px] tracking-[0.4em] uppercase font-bold text-zinc-500">
                {t("home.verifiedReviews")}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote: t("home.review1"),
                  name: "Sophia K.",
                  location: locale === "th" ? "กรุงเทพฯ" : "Bangkok",
                  rating: 5,
                },
                {
                  quote: t("home.review2"),
                  name: "James L.",
                  location: locale === "th" ? "สิงคโปร์" : "Singapore",
                  rating: 5,
                },
                {
                  quote: t("home.review3"),
                  name: "Mina T.",
                  location: locale === "th" ? "โตเกียว" : "Tokyo",
                  rating: 5,
                },
              ].map((review, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.7 }}
                  className="border border-zinc-800 p-8 md:p-10 group hover:border-zinc-600 hover:bg-zinc-900/50 transition-all duration-500"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-amber-400 text-xs">
                        ★
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-zinc-300 leading-relaxed font-light mb-8 tracking-wide">
                    &ldquo;{review.quote}&rdquo;
                  </p>

                  <div className="flex justify-between items-end">
                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                        {review.name}
                      </span>
                      <span className="text-[9px] tracking-[0.3em] uppercase text-zinc-500">
                        {review.location}
                      </span>
                    </div>
                    <span className="text-[8px] tracking-[0.2em] uppercase text-zinc-700 font-bold">
                      Verified
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION: INSTAGRAM / VISUAL GALLERY
            ═══════════════════════════════════════════ */}
        <section className="bg-white py-24 md:py-32 font-thai">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-[9px] tracking-[0.5em] uppercase font-bold text-zinc-400 block mb-4">
                @mbbrandname
              </span>
              <h2 className="text-3xl md:text-5xl font-light tracking-tight text-zinc-900">
                {locale === "th" ? "แชร์สไตล์ของคุณ" : "Share Your Style"}
              </h2>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5">
              {[
                "https://images.pexels.com/photos/5480696/pexels-photo-5480696.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
                "https://images.pexels.com/photos/5632382/pexels-photo-5632382.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
                "https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
                "https://images.pexels.com/photos/5632386/pexels-photo-5632386.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
                "https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
                "https://images.pexels.com/photos/5632386/pexels-photo-5632386.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
              ].map((src, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                  className="relative aspect-square overflow-hidden group cursor-pointer"
                >
                  <Image
                    src={src}
                    alt={`Gallery ${idx + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white text-[10px] tracking-[0.3em] uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      View
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION: NEWSLETTER CTA
            ═══════════════════════════════════════════ */}
        <section className="py-24 md:py-32 bg-zinc-950 text-white font-thai relative overflow-hidden">
          {/* Background decorative text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
            <span className="text-[20vw] font-bold uppercase tracking-tighter text-white/2 leading-none">
              Join
            </span>
          </div>

          <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[9px] tracking-[0.5em] uppercase font-bold text-zinc-500 block mb-6">
                {locale === "th" ? "เข้าร่วมชุมชนของเรา" : "Join the Circle"}
              </span>
              <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-6 leading-tight">
                {locale === "th"
                  ? "รับสิทธิพิเศษก่อนใคร"
                  : "Be the First to Know"}
              </h2>
              <p className="text-sm text-zinc-400 tracking-wide leading-relaxed mb-10 max-w-md mx-auto">
                {locale === "th"
                  ? "สมัครรับข่าวสารเพื่อเข้าถึงคอลเลกชันใหม่ โปรโมชันพิเศษ และข้อเสนอเฉพาะสมาชิกก่อนใคร"
                  : "Subscribe for early access to new collections, exclusive promotions, and members-only offers."}
              </p>

              <div className="flex gap-0 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder={
                    locale === "th" ? "อีเมลของคุณ" : "Your email address"
                  }
                  className="grow bg-transparent border border-zinc-700 border-r-0 px-5 py-3.5 text-[11px] tracking-widest uppercase focus:outline-none focus:border-white/50 placeholder:text-zinc-700 text-white transition-colors"
                />
                <button className="bg-white text-black px-6 py-3.5 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-zinc-200 transition-colors shrink-0">
                  {locale === "th" ? "สมัคร" : "Subscribe"}
                </button>
              </div>

              <p className="text-[8px] tracking-[0.2em] uppercase text-zinc-700 mt-4">
                {locale === "th"
                  ? "เราเคารพความเป็นส่วนตัวของคุณ ยกเลิกได้ทุกเมื่อ"
                  : "We respect your privacy. Unsubscribe anytime."}
              </p>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
