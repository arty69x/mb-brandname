"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight, Loader } from "lucide-react";
import { api } from "@/lib/api-client";
import { Product } from "@/types/api";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const { locale } = useLanguage();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length > 1) {
        setLoading(true);
        const data = await api.getProducts({ search: query });
        setResults(data);
        setLoading(false);
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-white/95 backdrop-blur-xl font-thai"
        >
          <div className="container mx-auto px-6 h-full flex flex-col pt-32">
            
            {/* Header / Close */}
            <div className="absolute top-8 right-8">
              <button
                onClick={onClose}
                className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
              >
                <X size={32} strokeWidth={1} />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative mb-20 max-w-4xl mx-auto w-full">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={locale === "th" ? "ค้นหาสินค้า..." : "Search for items..."}
                className="w-full text-4xl md:text-6xl font-light bg-transparent border-b-2 border-zinc-200 focus:border-black outline-none py-8 placeholder:text-zinc-200 transition-colors uppercase tracking-widest"
              />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-400">
                {loading ? <Loader className="animate-spin" size={32} /> : <Search size={32} strokeWidth={1} />}
              </div>
            </div>

            {/* Results Area */}
            <div className="grow overflow-y-auto pb-20 max-w-6xl mx-auto w-full">
             
              {query && results.length === 0 && !loading && (
                <div className="text-center text-zinc-400 mt-20">
                  <p className="text-sm tracking-widest uppercase">
                    {locale === "th" ? "ไม่พบผลลัพธ์" : "No results found"}
                  </p>
                </div>
              )}

              {/* Suggestions (Initial State) */}
              {!query && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 opacity-50">
                   <div className="space-y-6">
                     <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400">
                        {locale === "th" ? "แบรนด์ยอดนิยม" : "Trending Brands"}
                     </h3>
                     <div className="flex flex-col gap-4 text-xl font-light cursor-pointer">
                        <span onClick={() => setQuery("Hermes")}>Hermès</span>
                        <span onClick={() => setQuery("Chanel")}>Chanel</span>
                        <span onClick={() => setQuery("Louis Vuitton")}>Louis Vuitton</span>
                     </div>
                   </div>
                </div>
              )}

              {/* Result Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    onClick={onClose}
                    className="flex gap-6 group border-b border-zinc-100 pb-6 hover:border-black transition-colors"
                  >
                     <div className="relative w-24 h-32 bg-zinc-50 shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                     </div>
                     <div className="flex flex-col justify-center gap-2">
                        <span className="text-[10px] tracking-widest uppercase font-bold text-zinc-400">
                           {product.brand}
                        </span>
                        <h4 className="text-lg luxury-serif group-hover:underline decoration-1 underline-offset-4">
                           {product.name}
                        </h4>
                        <span className="text-xs font-medium">฿{product.price}</span>
                     </div>
                  </Link>
                ))}
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
