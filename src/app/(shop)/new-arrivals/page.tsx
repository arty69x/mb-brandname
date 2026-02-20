"use client";

import ProductCard from "@/components/ProductCard";
import FilterBar from "@/components/FilterBar";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "@/lib/api-client";
import { Product } from "@/types/api";

export default function NewArrivalsPage() {
  const { locale } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState(4);
  const [filters, setFilters] = useState({ brand: undefined, sort: undefined });

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = await api.getProducts({ newArrival: true, ...(filters as any) });
        setProducts(data);
      } catch (error) {
        console.error("Failed to load new arrivals:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [filters]);

  const getGridClass = () => {
    switch (columns) {
      case 2:
        return "md:grid-cols-2";
      case 3:
        return "md:grid-cols-3";
      default:
        return "md:grid-cols-4";
    }
  };

  const uniqueBrands = ["Hermès", "Chanel", "Louis Vuitton", "Dior", "Cartier", "Van Cleef & Arpels"];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow">
        {/* Banner */}
        <div className="relative h-[60vh] flex items-center justify-center overflow-hidden font-thai">
          <Image
            src="https://images.pexels.com/photos/5480696/pexels-photo-5480696.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="New Arrivals"
            fill
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black/40" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative text-center z-10 space-y-6 max-w-4xl px-6"
          >
            <span className="text-[10px] tracking-[0.5em] font-bold text-white/50 uppercase">
              {locale === "th" ? "คอลเลกชันล่าสุด" : "Spring / Summer 2025"}
            </span>
            <h1 className="text-6xl md:text-9xl luxury-serif text-white tracking-widest leading-[0.8] drop-shadow-2xl">
              Archive Additions
            </h1>
            <div className="w-24 h-px bg-white/40 mx-auto" />
            <p className="text-xs tracking-[0.2em] font-light uppercase text-white/90 leading-relaxed max-w-lg mx-auto">
              {locale === "th"
                ? "ค้นพบสินค้าแบรนด์เนมที่คัดสรรมาใหม่ล่าสุด ส่งตรงจากร้านค้าชั้นนำในโตเกียว"
                : "Discover the latest curated luxury items, freshly sourced from Tokyo's most trusted boutiques."}
            </p>
          </motion.div>
        </div>

        {/* Toolbar */}
        <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-100 font-thai transition-all duration-300">
          <div className="container mx-auto px-4 h-16 flex flex-col md:flex-row justify-between items-center gap-4 py-2 md:py-0">
            <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-zinc-500 hidden md:block">
              {locale === "th" ? "กำลังแสดง" : "Showing"} 1–
              {products.length} {locale === "th" ? "จาก" : "of"}{" "}
              {products.length} {locale === "th" ? "รายการ" : "Results"}
            </span>

            <div className="flex items-center justify-between w-full md:w-auto gap-8">
              {/* View Toggle (Desktop) */}
              <div className="hidden md:flex items-center gap-3 border-r border-zinc-200 pr-8">
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-zinc-400 mr-2">
                  {locale === "th" ? "มุมมอง" : "View"}
                </span>
                {[2, 3, 4].map((col) => (
                  <button
                    key={col}
                    onClick={() => setColumns(col)}
                    className={`text-[10px] font-bold transition-colors ${
                      columns === col
                        ? "text-black"
                        : "text-zinc-300 hover:text-zinc-500"
                    }`}
                  >
                    {col}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-6 translate-y-3">
                 <FilterBar 
                    brands={uniqueBrands}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onFilterChange={(f: any) => setFilters(f)}
                 />
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <section className="container mx-auto px-4 py-20 font-thai bg-white min-h-screen">
          {loading ? (
            <div className={`grid grid-cols-2 ${getGridClass()} gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16`}>
              {[...Array(8)].map((_, i) => (
                <LoadingSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              <div
                className={`grid grid-cols-2 ${getGridClass()} gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16 transition-all duration-500`}
              >
                {products.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.04, duration: 0.6 }}
                  >
                    <ProductCard {...product} />
                  </motion.div>
                ))}
              </div>

              {products.length > 0 && (
                <div className="mt-32 flex flex-col items-center gap-4">
                  <span className="text-[10px] tracking-widest text-zinc-400">
                    {locale === "th"
                      ? `แสดง ${products.length} จาก ${products.length} รายการ`
                      : `Showing ${products.length} of ${products.length} Items`}
                  </span>
                  <button className="border border-black px-12 py-4 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-black hover:text-white transition-all duration-300">
                    {locale === "th" ? "ดูเพิ่มเติม" : "Load More"}
                  </button>
                </div>
              )}
              
              {products.length === 0 && (
                 <div className="text-center py-20 text-zinc-400 text-sm uppercase tracking-widest">
                    {locale === "th" ? "ไม่พบสินค้า" : "No products found"}
                 </div>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
}
