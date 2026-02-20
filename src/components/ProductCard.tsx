"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

interface ProductCardProps {
  id: number | string;
  image: string;
  category: string;
  name: string;
  price: string;
  oldPrice?: string;
}

export default function ProductCard({
  id,
  image,
  category,
  name,
  price,
  oldPrice,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();
  const { locale, t } = useLanguage();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id, image, category, name, price });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <Link
      href={`/product/${id}`}
      className="group block font-thai relative soft-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-3/4 overflow-hidden bg-zinc-50 mb-6">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-all duration-1000 cubic-bezier(0.19, 1, 0.22, 1) group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Wishlist Button — Minimalist top-right */}
        <button
          onClick={handleWishlist}
          className="absolute top-4 right-4 z-20 p-2 transition-transform duration-500 hover:scale-110 active:scale-95"
        >
          <Heart
            size={18}
            strokeWidth={1}
            className={`transition-all duration-500 ${
              isWishlisted
                ? "fill-zinc-900 text-zinc-900"
                : "text-zinc-900/40 hover:text-zinc-900"
            }`}
          />
        </button>

        {/* Sale Badge */}
        {oldPrice && (
          <div className="absolute top-4 right-14 z-20 bg-black text-white text-[8px] font-bold tracking-widest uppercase px-2 py-0.5">
            Sale
          </div>
        )}

        {/* Hover Actions Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              className="absolute inset-x-0 bottom-0 z-10 p-4"
            >
              <div className="flex gap-2">
                <button
                  onClick={handleAddToCart}
                  className="grow flex items-center justify-center gap-2 bg-black text-white py-3.5 text-[9px] font-black tracking-widest uppercase shadow-xl hover:bg-zinc-800 transition-colors"
                >
                  <ShoppingBag size={14} strokeWidth={1} />
                  {locale === "th" ? "เก็บชิ้นนี้ใส่ถุง" : t("common.addToBag")}
                </button>
                <div className="flex items-center justify-center bg-white text-black w-14 shadow-xl hover:bg-zinc-50 transition-colors">
                  <Eye size={16} strokeWidth={1} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tokyo Certified Badge — High Fidelity Anchor */}
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-white/95 backdrop-blur-md px-2.5 py-1.5 flex items-center gap-2 shadow-sm border border-zinc-100/50">
            <div className="w-1 h-1 rounded-full bg-red-600 animate-pulse" />
            <span className="text-[8px] tracking-widest font-black uppercase text-zinc-900">
              Tokyo Certified
            </span>
          </div>
        </div>
      </div>

      {/* Product Info — Spaced for Elegance */}
      <div className="space-y-2">
        {/* Brand/Category */}
        <div className="flex justify-between items-center">
          <span className="text-[8px] tracking-ultra uppercase font-black text-zinc-400 block">
            {category}
          </span>
          <span className="text-[7px] tracking-widest uppercase font-bold text-zinc-300">
            Archive v2.0
          </span>
        </div>

        {/* Name */}
        <h3 className="text-[11px] md:text-[12px] font-medium uppercase tracking-widest leading-relaxed line-clamp-1 text-zinc-900 group-hover:text-black transition-colors">
          {name}
        </h3>

        {/* Price Architecture */}
        <div className="flex gap-3 items-center pt-2 border-t border-zinc-100">
          <span
            className={`text-[11px] md:text-[12px] font-black tracking-widest ${
              oldPrice ? "text-red-700" : "text-zinc-900"
            }`}
          >
            ฿{price}
          </span>
          {oldPrice && (
            <span className="text-[9px] text-zinc-300 line-through tracking-widest font-medium">
              ฿{oldPrice}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
