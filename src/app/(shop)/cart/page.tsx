"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import {
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ShoppingBag,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function CartPage() {
  const { cart, removeFromCart, addToCart, totalPrice, totalItems } = useCart();
  const { locale, t } = useLanguage();

  const updateQuantity = (item: (typeof cart)[0], delta: number) => {
    if (item.quantity + delta > 0) {
      addToCart(item, delta);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="grow pt-40 pb-32 px-6 font-thai">
        <div className="container mx-auto px-4">
          <div className="flex items-baseline justify-between border-b border-black pb-8 mb-20">
            <h1 className="text-4xl md:text-6xl luxury-serif tracking-normal leading-none uppercase">
              {t("cart.title")}
            </h1>
            <span className="text-zinc-500 text-[10px] tracking-ultra uppercase font-bold">
              {totalItems} {t("nav.products")}
            </span>
          </div>

          {cart.length === 0 ? (
            <div className="py-32 text-center space-y-12">
              <div className="w-24 h-24 mx-auto border border-zinc-100 rounded-full flex items-center justify-center text-zinc-300">
                <ShoppingBag size={32} strokeWidth={1} />
              </div>
              <div className="space-y-6">
                <p className="text-2xl luxury-serif uppercase tracking-widest text-zinc-400">
                  {t("cart.empty")}
                </p>
                <p className="text-[10px] text-zinc-400 tracking-ultra uppercase font-bold max-w-md mx-auto leading-relaxed">
                  {locale === "th"
                    ? "ค้นพบสินค้าแบรนด์เนมคัดพิเศษจากญี่ปุ่นได้ที่หน้าสินค้ามาใหม่"
                    : "Your archive is currently empty. Discover our curated collection."}
                </p>
              </div>
              <Link
                href="/new-arrivals"
                className="inline-block bg-black text-white px-16 py-5 text-[10px] tracking-ultra font-black uppercase transition-all hover:bg-zinc-800 shadow-xl"
              >
                {t("cart.start")}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
              {/* Items List */}
              <div className="lg:col-span-7 space-y-16">
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="group"
                    >
                      <div className="flex gap-10">
                        <Link
                          href={`/product/${item.id}`}
                          className="relative aspect-3/4 w-32 md:w-48 bg-zinc-50 overflow-hidden shrink-0"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </Link>

                        <div className="grow flex flex-col justify-between py-2">
                          <div className="space-y-4">
                            <div className="flex justify-between items-start">
                              <h3 className="text-lg md:text-xl font-light tracking-[0.15em] uppercase leading-relaxed max-w-[200px] md:max-w-none">
                                {item.name}
                              </h3>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-zinc-300 hover:text-red-500 transition-colors"
                              >
                                <Trash2 size={18} strokeWidth={1} />
                              </button>
                            </div>
                            <p className="text-[10px] tracking-[0.3em] text-zinc-400 uppercase">
                              {item.category}
                            </p>
                          </div>

                          <div className="space-y-8">
                            <div className="flex items-center gap-8">
                              <div className="flex items-center border border-zinc-200">
                                <button
                                  onClick={() => updateQuantity(item, -1)}
                                  className="p-3 hover:bg-zinc-50 transition-colors text-zinc-400 hover:text-black"
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="w-8 text-center text-xs font-medium">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item, 1)}
                                  className="p-3 hover:bg-zinc-50 transition-colors text-zinc-400 hover:text-black"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                              <span className="text-lg font-light tracking-widest">
                                ฿{(item.price * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <div className="pt-12 border-t border-zinc-100">
                  <Link
                    href="/new-arrivals"
                    className="inline-flex items-center gap-4 text-[10px] tracking-[0.3em] font-bold uppercase group hover:text-zinc-600 transition-colors"
                  >
                    <ArrowLeft
                      size={14}
                      className="transition-transform group-hover:-translate-x-2"
                    />
                    <span>{t("checkout.back")}</span>
                  </Link>
                </div>
              </div>

              {/* Summary */}
              <div className="lg:col-span-5">
                <div className="bg-zinc-50 p-12 sticky top-32 space-y-12">
                  <h2 className="text-sm font-bold tracking-[0.3em] uppercase">
                    {t("cart.summary")}
                  </h2>

                  <div className="space-y-6 text-[11px] tracking-[0.2em] uppercase font-medium">
                    <div className="flex justify-between text-zinc-600">
                      <span>{t("cart.subtotal")}</span>
                      <span>฿{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-zinc-600">
                      <span>{t("cart.shipping")}</span>
                      <span>{t("cart.free")}</span>
                    </div>
                    <div className="flex justify-between text-zinc-600">
                      <span>{t("cart.duties")}</span>
                      <span>{t("cart.included")}</span>
                    </div>
                  </div>

                  <div className="border-t border-zinc-200 pt-8">
                    <div className="flex justify-between items-baseline mb-12">
                      <span className="text-[11px] tracking-[0.3em] uppercase font-bold">
                        {t("cart.total")}
                      </span>
                      <span className="text-3xl font-light tracking-widest">
                        ฿{totalPrice.toLocaleString()}
                      </span>
                    </div>

                    <Link
                      href="/checkout"
                      className="block w-full bg-black text-white text-center py-6 text-[10px] tracking-[0.4em] font-bold uppercase transition-all hover:bg-zinc-800"
                    >
                      {t("cart.checkout")}
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-6 pt-6 bg-white p-6 border border-zinc-100">
                    <div className="flex flex-col items-center gap-3 text-center">
                      <ShieldCheck
                        size={20}
                        strokeWidth={1}
                        className="text-zinc-400"
                      />
                      <span className="text-[9px] tracking-widest uppercase text-zinc-400 leading-relaxed">
                        {t("cart.authVerified")}
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-3 text-center">
                      <Truck
                        size={20}
                        strokeWidth={1}
                        className="text-zinc-400"
                      />
                      <span className="text-[9px] tracking-widest uppercase text-zinc-400 leading-relaxed">
                        {t("cart.globalShipping")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
