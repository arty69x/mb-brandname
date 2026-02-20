"use client";

import ProductCard from "@/components/ProductCard";
import FilterBar from "@/components/FilterBar";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import { Product } from "@/types/api";

export default function BagsPage() {
  const { locale } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ brand: undefined, sort: undefined });

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = await api.getProducts({ category: "bags", ...(filters as any) });
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [filters]);

  const uniqueBrands = ["Hermès", "Chanel", "Louis Vuitton", "Dior"];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow">
        {/* Banner */}
        <div className="relative h-[60vh] flex items-center justify-center overflow-hidden font-thai">
          <Image
            src="https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="Bags Collection"
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
              {locale === "th" ? "คอลเลกชันกระเป๋า" : "The Bag Edit"}
            </span>
            <h1 className="text-6xl md:text-9xl luxury-serif text-white tracking-widest leading-[0.8] drop-shadow-2xl">
              Archive Bags
            </h1>
            <div className="w-24 h-px bg-white/40 mx-auto" />
            <p className="text-xs tracking-[0.2em] font-light uppercase text-white/90 leading-relaxed max-w-lg mx-auto">
              {locale === "th"
                ? "คัดสรรกระเป๋าแบรนด์เนมมือสองสภาพดีจากบูทีคชั้นนำในโตเกียว"
                : "Pre-loved designer bags sourced from Tokyo's most prestigious boutiques. Every piece authenticated."}
            </p>
          </motion.div>
        </div>

        {/* Toolbar */}
        <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-100 font-thai transition-all duration-300">
          <div className="container mx-auto px-4 h-16 flex justify-between items-center">
            <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-zinc-500">
              {loading ? "..." : products.length}{" "}
              {locale === "th" ? "รายการ" : "Items"}
            </span>
            <div className="flex items-center gap-8 translate-y-3">
              <FilterBar 
                 brands={uniqueBrands}
                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
                 onFilterChange={(f: any) => setFilters(f)}
              />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <section className="container mx-auto px-4 py-20 font-thai bg-white">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16">
              {[...Array(8)].map((_, i) => (
                <LoadingSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16">
              {products.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.6 }}
                >
                  <ProductCard {...product} />
                </motion.div>
              ))}
            </div>
          )}

          {!loading && products.length > 0 && (
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
          
          {!loading && products.length === 0 && (
             <div className="text-center py-20 text-zinc-400 text-sm uppercase tracking-widest">
                {locale === "th" ? "ไม่พบสินค้า" : "No products found"}
             </div>
          )}
        </section>
      </main>
    </div>
  );
}
