"use client";

import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Share2,
  Heart,
  CheckCircle2,
  Plus,
  ShieldAlert,
  ShoppingCart,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

import { useParams } from "next/navigation";
import { api } from "@/lib/api-client";
import { Product } from "@/types/api";

export default function ProductPage() {
  const { id } = useParams() as { id: string };
  const { locale, t } = useLanguage();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);
  const { addToCart } = useCart();

  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      try {
        const data = await api.getProductById(id);
        setProduct(data);

        // Fetch related products
        if (data) {
          const allInCategory = await api.getProducts({
            category: data.category.toLowerCase(),
          });
          setRelatedProducts(
            allInCategory.filter((p) => p.id !== data.id).slice(0, 4),
          );
        }
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-t-2 border-black rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen font-thai">
        <h1 className="text-2xl luxury-serif mb-4">Product Not Found</h1>
        <Link href="/" className="text-sm border-b border-black pb-1">
          Return Home
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="grow pt-48 pb-32 font-thai">
        <div className="luxury-container">
          {/* Breadcrumbs — Minimalist Authority */}
          <div className="flex gap-4 text-[9px] tracking-ultra uppercase text-zinc-400 mb-16 border-b border-zinc-50 pb-8">
            <Link
              href="/"
              className="hover:text-black transition-colors font-black"
            >
              {locale === "th" ? "หน้าหลัก" : "Home"}
            </Link>
            <span className="text-zinc-200">/</span>
            <Link
              href="/new-arrivals"
              className="hover:text-black transition-colors font-black"
            >
              Archive Discovery
            </Link>
            <span className="text-zinc-200">/</span>
            <span className="text-zinc-900 font-black">{product.name}</span>
          </div>

          {/* Product Architecture Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24 mb-48">
            {/* Gallery — High-Fidelity Anchor */}
            <div className="lg:col-span-7 flex flex-col-reverse lg:flex-row gap-6 h-fit lg:sticky lg:top-40">
              <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible no-scrollbar shrink-0">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="relative w-24 aspect-3/4 border border-zinc-100 hover:border-black cursor-pointer bg-zinc-50 transition-all duration-700"
                  >
                    <Image
                      src={product.image}
                      alt="Thumbnail View"
                      fill
                      className="object-cover opacity-60 hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
              </div>

              <div
                className="grow relative aspect-3/4 bg-zinc-50 overflow-hidden cursor-zoom-in group border border-zinc-50 shadow-[0_20px_60px_rgba(0,0,0,0.02)]"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  setZoomPos({ x, y });
                  setIsZooming(true);
                }}
                onMouseLeave={() => setIsZooming(false)}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className={`object-cover transition-opacity duration-700 ${isZooming ? "opacity-0" : "opacity-100"}`}
                  priority
                />

                {/* Authentication Shield Overlay */}
                <div className="absolute top-8 left-8 z-10">
                  <div className="bg-white/90 backdrop-blur-md px-4 py-2 border border-zinc-200/50 shadow-sm flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                    <span className="text-[8px] tracking-ultra font-black uppercase text-zinc-900">
                      Ginza Authentic Grade A
                    </span>
                  </div>
                </div>

                {/* Zoomed Lens State */}
                <div
                  className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${isZooming ? "opacity-100" : "opacity-0"}`}
                  style={{
                    backgroundImage: `url(${product.image})`,
                    backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                    backgroundSize: "220%",
                  }}
                />
              </div>
            </div>

            {/* Narrative Content */}
            <div className="lg:col-span-5 flex flex-col pt-4">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex text-zinc-900 gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={10}
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  ))}
                </div>
                <span className="text-[9px] tracking-ultra uppercase font-black text-zinc-300">
                  Highly Coveted piece
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl luxury-serif mb-6 leading-[0.85] text-zinc-900 tracking-tight">
                {product.name}
              </h1>
              <p className="text-[10px] tracking-ultra uppercase text-zinc-400 font-black mb-12 flex items-center gap-3">
                <span className="w-6 h-px bg-zinc-200" />
                Tokyo Archive // {product.category}
              </p>

              <div className="text-3xl font-light mb-12 tracking-tighter text-zinc-900 border-y border-zinc-100 py-12 flex items-baseline gap-4">
                <span className="text-[10px] tracking-ultra uppercase font-black text-zinc-300">
                  Investment Value
                </span>
                ฿{product.price}
              </div>

              <p className="narrative-text text-zinc-600 leading-loose text-sm tracking-wide mb-16 text-justify italic font-thai border-l border-zinc-100 pl-8">
                {product.description?.[locale] ||
                  (locale === "th"
                    ? "สินค้าแบรนด์เนมแท้ นำเข้าจากร้านค้าชั้นนำในโตเกียว ผ่านการตรวจสอบคุณภาพอย่างพิถีพิถันโดยผู้เชี่ยวชาญ มาพร้อมใบรับรองความแท้และบริการจัดส่งฟรีทั่วประเทศ พร้อมประกันสินค้า 30 วัน"
                    : "An authenticated luxury piece sourced from Tokyo's most trusted boutiques. Each item undergoes rigorous quality inspection by our expert team. Comes with a certificate of authenticity, complimentary shipping, and 30-day guarantee.")}
              </p>

              {/* Integrity Module — Authentic Branding */}
              <div className="bg-zinc-950 p-10 space-y-6 mb-16 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] select-none pointer-events-none group-hover:opacity-[0.1] transition-opacity duration-1000">
                  <ShieldAlert size={80} className="text-white" />
                </div>

                <div className="flex items-center gap-4 border-b border-white/10 pb-6 relative z-10">
                  <CheckCircle2
                    size={18}
                    className="text-white"
                    strokeWidth={1}
                  />
                  <span className="text-[11px] tracking-ultra font-black uppercase text-white">
                    Tokyo Archive Integrity
                  </span>
                </div>
                <p className="text-[10px] leading-loose text-zinc-400 font-medium uppercase tracking-[0.25em] relative z-10">
                  {locale === "th"
                    ? "ใบรับรองความแท้จากรัฐบาลญี่ปุ่น มั่นใจด้วยมาตรฐานการตรวจสอบสูงสุดระดับสากล"
                    : "Double-verified by neutral authenticators under strict Japanese Secondhand Dealer licensing. Fully insured global transport nodes."}
                </p>
              </div>

              <div className="space-y-8 mb-16">
                <div className="flex flex-col md:flex-row items-stretch gap-6">
                  <div className="flex border border-zinc-100 w-full md:w-40 h-16 bg-white shadow-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-6 hover:bg-zinc-50 transition-colors flex items-center justify-center flex-1 text-lg font-light"
                    >
                      —
                    </button>
                    <div className="flex items-center justify-center w-12 font-black text-[12px] tracking-widest border-x border-zinc-50">
                      {quantity}
                    </div>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-6 hover:bg-zinc-50 transition-colors flex items-center justify-center flex-1 text-lg font-light"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className={`grow h-16 text-[10px] tracking-ultra font-black uppercase transition-all duration-700 flex items-center justify-center gap-4 relative overflow-hidden shadow-2xl ${
                      isAdded
                        ? "bg-zinc-800 text-white"
                        : "bg-black text-white hover:bg-zinc-900 group"
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {isAdded ? (
                        <motion.div
                          key="added"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          className="flex items-center gap-3"
                        >
                          <ShoppingCart size={16} strokeWidth={1} />
                          {locale === "th"
                            ? "เก็บชิ้นนี้แล้ว"
                            : "Archived to Bag"}
                        </motion.div>
                      ) : (
                        <motion.div
                          key="add"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          className="flex items-center gap-3"
                        >
                          <Plus
                            size={16}
                            strokeWidth={1}
                            className="group-hover:rotate-90 transition-transform duration-500"
                          />
                          {locale === "th"
                            ? "เก็บชิ้นนี้ใส่ถุง"
                            : "Add to Archive"}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-16 border-t border-zinc-50 pt-12">
                <div className="flex flex-col items-start p-2 gap-4">
                  <span className="text-[10px] tracking-ultra uppercase font-black text-zinc-900">
                    Provenance
                  </span>
                  <span className="text-[9px] text-zinc-400 uppercase tracking-widest font-medium leading-loose">
                    {locale === "th"
                      ? "คัดสรรจากย่านกินซ่า โตเกียว"
                      : "Curated from Ginza, Tokyo"}
                  </span>
                </div>
                <div className="flex flex-col items-start p-2 gap-4">
                  <span className="text-[10px] tracking-ultra uppercase font-black text-zinc-900">
                    Logistics
                  </span>
                  <span className="text-[9px] text-zinc-400 uppercase tracking-widest font-medium leading-loose">
                    {locale === "th"
                      ? "ขนส่งด่วนแบบประกันเต็มวงเงิน"
                      : "Insured Priority Shipping"}
                  </span>
                </div>
              </div>

              <div className="flex gap-12 py-8 border-y border-zinc-50">
                <button className="flex items-center gap-3 text-[10px] tracking-ultra uppercase font-black hover:opacity-50 transition-all font-thai">
                  <Heart size={16} strokeWidth={1} />{" "}
                  {locale === "th" ? "สิ่งที่ต้องการ" : "Wishlist"}
                </button>
                <button className="flex items-center gap-3 text-[10px] tracking-ultra uppercase font-black hover:opacity-50 transition-all font-thai">
                  <Share2 size={16} strokeWidth={1} />{" "}
                  {locale === "th" ? "แบ่งปัน" : "Share"}
                </button>
              </div>

              <div className="space-y-4 pt-10">
                <p className="text-[9px] tracking-ultra uppercase text-zinc-300 font-black">
                  Archive Index:{" "}
                  <span className="text-zinc-900">
                    MB-{product.id?.toUpperCase?.() || "001"}-JP
                  </span>
                </p>
                <p className="text-[9px] tracking-ultra uppercase text-zinc-300 font-black">
                  Availability:{" "}
                  <span className="text-emerald-500">
                    Authenticated & In-Vault
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Narrative Tabs */}
          <div className="border-t border-zinc-100 pt-32 pb-48">
            <div className="flex justify-center gap-16 md:gap-32 mb-24 overflow-x-auto no-scrollbar font-thai px-6 border-b border-zinc-50">
              {["description", "additional information", "reviews"].map(
                (tab) => {
                  let label = tab;
                  if (locale === "th") {
                    if (tab === "description") label = "เบื้องหลังชิ้นงาน";
                    if (tab === "additional information")
                      label = "รายละเอียดทางเทคนิค";
                    if (tab === "reviews") label = "บันทึกจากผู้เป็นเจ้าของ";
                  }
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`text-[10px] tracking-ultra font-black uppercase pb-8 transition-all relative group ${
                        activeTab === tab
                          ? "text-black"
                          : "text-zinc-300 hover:text-zinc-500"
                      }`}
                    >
                      {label}
                      <AnimatePresence>
                        {activeTab === tab && (
                          <motion.div
                            layoutId="activeTabUnderline"
                            className="absolute bottom-0 left-0 w-full h-[2px] bg-black"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            exit={{ scaleX: 0 }}
                            transition={{
                              duration: 0.7,
                              ease: [0.19, 1, 0.22, 1],
                            }}
                          />
                        )}
                      </AnimatePresence>
                    </button>
                  );
                },
              )}
            </div>

            <div className="max-w-5xl mx-auto font-thai min-h-[500px]">
              <AnimatePresence mode="wait">
                {activeTab === "description" && (
                  <motion.div
                    key="desc"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                    className="space-y-24"
                  >
                    <div className="text-center max-w-3xl mx-auto space-y-8">
                      <h3 className="text-4xl luxury-serif text-zinc-900 lowercase italic tracking-tight">
                        The Heritage Narrative
                      </h3>
                      <p className="narrative-text text-zinc-500 leading-loose text-base font-light italic">
                        {locale === "th"
                          ? "สินค้าทุกชิ้นใน MB Brandname ผ่านการคัดเลือกโดยทีมผู้เชี่ยวชาญจากประเทศญี่ปุ่น เพื่อรับประกันคุณภาพและความแท้ของสินค้าทุกรายการ สินค้าชิ้นนี้ได้รับการตรวจสอบเกรด A และมาพร้อมใบรับรองความแท้"
                          : "Every item at MB Brandname is a chapter in the history of luxury. This specific piece has been meticulously preserved in a climate-controlled vault, awaiting its next steward. Conditioned and authenticated to Ginza-Grade A standards."}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-24 pt-24 border-t border-zinc-50">
                      <div className="space-y-10 group">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 border border-zinc-100 flex items-center justify-center text-[10px] font-black group-hover:bg-black group-hover:text-white transition-all duration-700">
                            01
                          </div>
                          <h4 className="font-black tracking-ultra uppercase text-[11px] text-zinc-900">
                            Artistry & Craft
                          </h4>
                        </div>
                        <ul className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase space-y-6 pl-14">
                          <li className="flex items-center gap-4">
                            <span className="w-1 h-1 bg-zinc-200 rounded-full" />
                            Master-Grade Construction
                          </li>
                          <li className="flex items-center gap-4">
                            <span className="w-1 h-1 bg-zinc-200 rounded-full" />
                            Archival Integrity Verified
                          </li>
                          <li className="flex items-center gap-4">
                            <span className="w-1 h-1 bg-zinc-200 rounded-full" />
                            Bespoke Visual Symmetry
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-10 group">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 border border-zinc-100 flex items-center justify-center text-[10px] font-black group-hover:bg-black group-hover:text-white transition-all duration-700">
                            02
                          </div>
                          <h4 className="font-black tracking-ultra uppercase text-[11px] text-zinc-900">
                            Condition Protocol
                          </h4>
                        </div>
                        <ul className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase space-y-6 pl-14">
                          <li className="flex items-center gap-4">
                            <span className="w-1 h-1 bg-zinc-200 rounded-full" />
                            Professionally Conditioned
                          </li>
                          <li className="flex items-center gap-4">
                            <span className="w-1 h-1 bg-zinc-200 rounded-full" />
                            Hardware Polish & Polish
                          </li>
                          <li className="flex items-center gap-4">
                            <span className="w-1 h-1 bg-zinc-200 rounded-full" />
                            Structural Core Analysis
                          </li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "additional information" && (
                  <motion.div
                    key="info"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                    className="max-w-3xl mx-auto"
                  >
                    <div className="grid grid-cols-1 text-[10px] tracking-ultra uppercase font-black">
                      {[
                        {
                          label:
                            locale === "th" ? "สถานะความงาม" : "Visual Grade",
                          value: "S-Grade // Mint Condition",
                        },
                        {
                          label:
                            locale === "th"
                              ? "สัดส่วนทางสถาปัตย์"
                              : "Architecture",
                          value: "25 x 15 x 7 cm // Heritage-Scale",
                        },
                        {
                          label:
                            locale === "th" ? "วัสดุประกอบร่าง" : "Materiality",
                          value: "Premium Calfskin // 24k Gold Overlay",
                        },
                        {
                          label:
                            locale === "th"
                              ? "โทนสีสุนทรียะ"
                              : "Aesthetic Tone",
                          value: "Onyx Black // Noir Eternal",
                        },
                        {
                          label:
                            locale === "th" ? "พิกัดคัดสรร" : "Sourcing Node",
                          value: "Ginza, Tokyo // Japan Instance",
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex py-8 border-b border-zinc-50 last:border-none hover:bg-zinc-50 transition-all px-10 group"
                        >
                          <span className="w-1/3 text-zinc-300 group-hover:text-black transition-colors">
                            {item.label}
                          </span>
                          <span className="w-2/3 text-zinc-900 tracking-ultra">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "reviews" && (
                  <motion.div
                    key="reviews"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                    className="max-w-3xl mx-auto space-y-16"
                  >
                    <div className="flex justify-between items-end border-b border-zinc-100 pb-12">
                      <h3 className="text-4xl luxury-serif lowercase italic tracking-tight">
                        Archives Testimony
                      </h3>
                      <span className="text-[9px] tracking-ultra uppercase font-black text-zinc-300">
                        Total verified: 03
                      </span>
                    </div>

                    {[
                      {
                        name: "Sophia K.",
                        date: "Tokyo Node // 2025",
                        rating: 5,
                        text: "An absolute masterclass in curation. The Ginza sourcing is evident in the hardware's preservation. Truly beyond expectation.",
                      },
                      {
                        name: "คุณนิชา ว.",
                        date: "Bangkok Instance // 2024",
                        rating: 5,
                        text: "ความลับของการครอบครองความเลอค่า คือการไว้วางใจผู้เชี่ยวชาญ ระบบการจัดส่งและแพ็กเกจจิ้งของที่นี่คือที่สุดของความหรูหรา",
                      },
                      {
                        name: "Elena M.",
                        date: "Paris Relay // 2024",
                        rating: 4,
                        text: "Authentication protocol was transparent and reassuring. A subtle patina that only adds to its historical narrative. Exquisite.",
                      },
                    ].map((review, i) => (
                      <div
                        key={i}
                        className="flex gap-10 pb-16 border-b border-zinc-50 last:border-none group"
                      >
                        <div className="w-16 h-16 border border-zinc-100 flex items-center justify-center text-zinc-300 text-[10px] font-black shrink-0 group-hover:bg-black group-hover:text-white transition-all duration-1000">
                          {review.name.charAt(0)}
                        </div>
                        <div className="space-y-6">
                          <div className="flex items-center gap-6">
                            <span className="text-[11px] font-black uppercase tracking-ultra text-zinc-900 border-b border-zinc-900 pb-1">
                              {review.name}
                            </span>
                            <span className="text-[8px] text-zinc-300 uppercase tracking-ultra font-black">
                              {review.date}
                            </span>
                          </div>
                          <p className="narrative-text text-zinc-500 text-sm leading-loose italic">
                            &ldquo;{review.text}&rdquo;
                          </p>
                          <div className="flex text-zinc-900 gap-1 pt-2">
                            {[...Array(5)].map((_, starIdx) => (
                              <Star
                                key={starIdx}
                                size={10}
                                fill={
                                  starIdx < review.rating
                                    ? "currentColor"
                                    : "none"
                                }
                                strokeWidth={starIdx < review.rating ? 0 : 1}
                                className={
                                  starIdx < review.rating
                                    ? "text-zinc-900"
                                    : "text-zinc-100"
                                }
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Related Artifacts Presentation */}
          <div className="mt-48 pt-32 border-t border-zinc-100 font-thai">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
              <h2 className="text-6xl md:text-8xl luxury-serif text-black leading-[0.85] tracking-tight lowercase italic">
                Curated
                <br />
                <span className="narrative-text text-zinc-400 not-italic">
                  Parallels.
                </span>
              </h2>
              <div className="hidden md:block">
                <p className="text-[9px] tracking-ultra text-zinc-300 font-black uppercase max-w-[200px] text-right">
                  Discovery of similar historical nodes across the archive.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {relatedProducts.map((p, idx) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    delay: idx * 0.1,
                    ease: [0.19, 1, 0.22, 1],
                  }}
                >
                  <ProductCard {...p} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
