"use client";

import { useState } from "react";
import { ChevronDown, SlidersHorizontal, ArrowDownAZ, ArrowUpAZ, ArrowDownUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface FilterBarProps {
  onFilterChange: (filters: { brand?: string; sort?: string }) => void;
  brands: string[];
}

export default function FilterBar({ onFilterChange, brands }: FilterBarProps) {
  const { locale } = useLanguage();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>(undefined);
  const [selectedSort, setSelectedSort] = useState<string | undefined>(undefined);

  const applyFilters = (newBrand?: string, newSort?: string) => {
    setSelectedBrand(newBrand);
    setSelectedSort(newSort);
    onFilterChange({ brand: newBrand, sort: newSort });
    setIsFilterOpen(false);
    setIsSortOpen(false);
  };

  return (
    <div className="flex items-center gap-4 mb-8">
      {/* FILTER BUTTON */}
      <div className="relative">
        <button
          onClick={() => {
             setIsFilterOpen(!isFilterOpen);
             setIsSortOpen(false);
          }}
          className={`flex items-center gap-2 px-6 py-2 border ${
            selectedBrand ? "bg-black text-white border-black" : "border-zinc-200 hover:border-black"
          } transition-colors text-xs font-bold tracking-widest uppercase`}
        >
          <SlidersHorizontal size={14} />
          {locale === "th" ? "กรอง" : "FILTER"}
          {selectedBrand && <span className="ml-1 opacity-70">({selectedBrand})</span>}
        </button>

        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 mt-2 w-64 bg-white border border-zinc-100 shadow-xl z-30 p-4"
            >
              <h4 className="text-[10px] uppercase tracking-widest text-zinc-400 mb-4 font-black">
                 {locale === "th" ? "แบรนด์" : "BRANDS"}
              </h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                <button
                   onClick={() => applyFilters(undefined, selectedSort)}
                   className={`block text-sm w-full text-left hover:text-black ${
                     !selectedBrand ? "font-bold text-black" : "text-zinc-500"
                   }`}
                >
                   {locale === "th" ? "ทั้งหมด" : "All Brands"}
                </button>
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => applyFilters(brand, selectedSort)}
                    className={`block text-sm w-full text-left hover:text-black ${
                      selectedBrand === brand ? "font-bold text-black" : "text-zinc-500"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SORT BUTTON */}
      <div className="relative">
        <button
          onClick={() => {
            setIsSortOpen(!isSortOpen);
            setIsFilterOpen(false);
          }}
          className={`flex items-center gap-2 px-6 py-2 border ${
             selectedSort ? "bg-black text-white border-black" : "border-zinc-200 hover:border-black"
          } transition-colors text-xs font-bold tracking-widest uppercase`}
        >
          <ArrowDownUp size={14} />
          {locale === "th" ? "เรียงลำดับ" : "SORT"}
        </button>

        <AnimatePresence>
          {isSortOpen && (
             <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 mt-2 w-48 bg-white border border-zinc-100 shadow-xl z-30 p-2"
            >
               <div className="flex flex-col">
                  {[
                     { label: locale === "th" ? "มาใหม่ล่าสุด" : "Newest Arrivals", value: "newest" },
                     { label: locale === "th" ? "ราคา: ต่ำ - สูง" : "Price: Low to High", value: "price_asc" },
                     { label: locale === "th" ? "ราคา: สูง - ต่ำ" : "Price: High to Low", value: "price_desc" },
                  ].map((opt) => (
                     <button
                        key={opt.value}
                        onClick={() => applyFilters(selectedBrand, opt.value)}
                        className={`text-left px-4 py-3 text-xs tracking-wider uppercase hover:bg-zinc-50 ${
                           selectedSort === opt.value ? "font-bold bg-zinc-50" : ""
                        }`}
                     >
                        {opt.label}
                     </button>
                  ))}
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
