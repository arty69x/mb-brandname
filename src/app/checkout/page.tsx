"use client";

import { api } from "@/lib/api-client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, CreditCard, ChevronRight, LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const { isLoggedIn, user } = useAuth();
  const { locale, t } = useLanguage();
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);

  const isTH = locale === "th";

  // Login gate
  if (!isLoggedIn) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="grow pt-40 pb-20 px-6 font-thai">
          <div className="max-w-md mx-auto text-center space-y-10">
            <div className="w-20 h-20 mx-auto border border-zinc-200 rounded-full flex items-center justify-center text-zinc-300">
              <LogIn size={28} strokeWidth={1} />
            </div>
            <div className="space-y-4">
              <h1 className="text-2xl tracking-[0.2em] uppercase font-light">
                {isTH ? "กรุณาเข้าสู่ระบบ" : "Sign In Required"}
              </h1>
              <p className="text-xs text-zinc-400 tracking-wider leading-relaxed">
                {isTH
                  ? "เข้าสู่ระบบเพื่อดำเนินการชำระเงิน"
                  : "Please sign in to proceed with your checkout"}
              </p>
            </div>
            <Link
              href="/login?redirect=/checkout"
              className="inline-block bg-black text-white px-16 py-5 text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-zinc-800 transition-colors"
            >
              {isTH ? "เข้าสู่ระบบ" : "Sign In"}
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow pt-32 pb-20 px-6 bg-zinc-50/50 font-thai">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto text-center py-20 space-y-12 bg-white border border-zinc-100 shadow-sm"
              >
                <div className="w-24 h-24 mx-auto bg-emerald-50 rounded-full flex items-center justify-center">
                  <ShieldCheck
                    size={48}
                    className="text-emerald-500"
                    strokeWidth={1}
                  />
                </div>
                <div className="space-y-6">
                  <h1 className="text-5xl luxury-serif text-black leading-none">
                    {isTH ? "ยืนยันคำสั่งซื้อแล้ว" : "Order Confirmed"}
                  </h1>
                  <p className="text-[10px] text-zinc-400 tracking-ultra uppercase font-bold leading-relaxed max-w-sm mx-auto">
                    {isTH
                      ? "ขอบคุณที่ร่วมเป็นส่วนหนึ่งของ MB Boutique คำสั่งซื้อของคุณกำลังดำเนินการ"
                      : "Thank you for curating with MB Boutique. Your archive request is being processed."}
                  </p>
                </div>
                <div className="pt-8 flex flex-col items-center gap-6">
                  <Link
                    href="/"
                    className="bg-black text-white px-16 py-5 text-[10px] tracking-ultra font-black uppercase transition-all hover:bg-zinc-800 shadow-xl"
                  >
                    {isTH ? "กลับสู่หน้าหลัก" : "Return to Archive"}
                  </Link>
                  <p className="text-[9px] text-zinc-300 tracking-widest uppercase italic font-serif">
                    {isTH
                      ? "อีเมลยืนยันถูกส่งไปแล้ว"
                      : "A confirmation dispatch has been sent."}
                  </p>
                </div>
              </motion.div>
            ) : (
              <div key="checkout-form">
                <div className="flex gap-4 items-center mb-12 text-[10px] tracking-[0.3em] font-bold uppercase">
                  <span className={step >= 1 ? "text-black" : "text-zinc-400"}>
                    01. {t("checkout.shipping")}
                  </span>
                  <ChevronRight size={12} className="text-zinc-300" />
                  <span className={step >= 2 ? "text-black" : "text-zinc-400"}>
                    02. {t("checkout.payment")}
                  </span>
                  <ChevronRight size={12} className="text-zinc-300" />
                  <span className={step >= 3 ? "text-black" : "text-zinc-400"}>
                    03. {t("checkout.confirmation")}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                  <div className="lg:col-span-7 bg-white p-12 shadow-sm border border-zinc-100">
                    {step === 1 ? (
                      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <h2 className="text-3xl luxury-serif tracking-widest uppercase mb-12">
                          {t("checkout.shipping")}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                          <div className="space-y-4 group">
                            <label className="text-[9px] tracking-ultra uppercase font-black text-zinc-400 group-focus-within:text-black transition-colors">
                              {t("checkout.firstName")}
                            </label>
                            <input
                              type="text"
                              className="w-full border-b border-zinc-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent text-[11px] tracking-widest font-bold uppercase placeholder:text-zinc-300"
                              placeholder={locale === "th" ? "สมชาย" : "JOHN"}
                            />
                          </div>
                          <div className="space-y-4 group">
                            <label className="text-[9px] tracking-ultra uppercase font-black text-zinc-400 group-focus-within:text-black transition-colors">
                              {t("checkout.lastName")}
                            </label>
                            <input
                              type="text"
                              className="w-full border-b border-zinc-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent text-[11px] tracking-widest font-bold uppercase placeholder:text-zinc-300"
                              placeholder={locale === "th" ? "ใจดี" : "DOE"}
                            />
                          </div>
                        </div>

                        <div className="space-y-4 mb-8 group">
                          <label className="text-[9px] tracking-ultra uppercase font-black text-zinc-400 group-focus-within:text-black transition-colors">
                            {t("checkout.street")}
                          </label>
                          <input
                            type="text"
                            className="w-full border-b border-zinc-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent text-[11px] tracking-widest font-bold uppercase placeholder:text-zinc-300"
                            placeholder={
                              locale === "th"
                                ? "ที่อยู่ของคุณ"
                                : "123 LUXURY AVENUE"
                            }
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                          <div className="space-y-4 group">
                            <label className="text-[9px] tracking-ultra uppercase font-black text-zinc-400 group-focus-within:text-black transition-colors">
                              {t("checkout.city")}
                            </label>
                            <input
                              type="text"
                              className="w-full border-b border-zinc-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent text-[11px] tracking-widest font-bold uppercase placeholder:text-zinc-300"
                              placeholder={
                                locale === "th" ? "กรุงเทพฯ" : "GINZA"
                              }
                            />
                          </div>
                          <div className="space-y-4 group">
                            <label className="text-[9px] tracking-ultra uppercase font-black text-zinc-400 group-focus-within:text-black transition-colors">
                              {t("checkout.postalCode")}
                            </label>
                            <input
                              type="text"
                              className="w-full border-b border-zinc-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent text-[11px] tracking-widest font-bold uppercase placeholder:text-zinc-300"
                              placeholder="104-0061"
                            />
                          </div>
                          <div className="space-y-4 group">
                            <label className="text-[9px] tracking-ultra uppercase font-black text-zinc-400 group-focus-within:text-black transition-colors">
                              {t("checkout.country")}
                            </label>
                            <select className="w-full border-b border-zinc-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent appearance-none text-[11px] tracking-widest font-bold uppercase">
                              <option>
                                {locale === "th" ? "ไทย" : "Thailand"}
                              </option>
                              <option>
                                {locale === "th" ? "ญี่ปุ่น" : "Japan"}
                              </option>
                              <option>United States</option>
                            </select>
                          </div>
                        </div>

                        <button
                          onClick={() => setStep(2)}
                          className="w-full bg-black text-white py-6 text-[11px] tracking-[0.4em] font-bold uppercase hover:bg-zinc-800 transition-all"
                        >
                          {locale === "th"
                            ? "ต่อไปยังขั้นตอนการชำระเงิน"
                            : "Continue to Payment"}
                        </button>
                      </div>
                    ) : (
                      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <h2 className="text-3xl luxury-serif tracking-widest uppercase mb-12">
                          {t("checkout.payment")}
                        </h2>

                        <div className="space-y-8 mb-12">
                          <div className="p-6 border border-black flex justify-between items-center">
                            <div className="flex items-center gap-4">
                              <CreditCard size={20} />
                              <span className="text-xs font-bold tracking-widest uppercase">
                                {t("checkout.creditCard")}
                              </span>
                            </div>
                            <div className="w-4 h-4 rounded-full border-4 border-black" />
                          </div>

                          <div className="space-y-6">
                            <div className="space-y-4 group">
                              <label className="text-[9px] tracking-ultra uppercase font-black text-zinc-400 group-focus-within:text-black transition-colors">
                                {t("checkout.cardNumber")}
                              </label>
                              <input
                                type="text"
                                className="w-full border-b border-zinc-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent text-[11px] tracking-widest font-bold uppercase placeholder:text-zinc-300"
                                placeholder="0000 0000 0000 0000"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-8">
                              <div className="space-y-4 group">
                                <label className="text-[9px] tracking-ultra uppercase font-black text-zinc-400 group-focus-within:text-black transition-colors">
                                  {locale === "th"
                                    ? "วันหมดอายุ"
                                    : "Expiry Date"}
                                </label>
                                <input
                                  type="text"
                                  className="w-full border-b border-zinc-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent text-[11px] tracking-widest font-bold uppercase placeholder:text-zinc-300"
                                  placeholder="MM/YY"
                                />
                              </div>
                              <div className="space-y-4 group">
                                <label className="text-[9px] tracking-ultra uppercase font-black text-zinc-400 group-focus-within:text-black transition-colors">
                                  CVC
                                </label>
                                <input
                                  type="text"
                                  className="w-full border-b border-zinc-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent text-[11px] tracking-widest font-bold uppercase placeholder:text-zinc-300"
                                  placeholder="---"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <button
                            onClick={() => setStep(1)}
                            className="grow-0 px-12 border border-zinc-200 py-6 text-[11px] tracking-[0.4em] font-bold uppercase hover:bg-zinc-50 transition-all font-thai"
                          >
                            {t("checkout.back")}
                          </button>
                          <button
                            onClick={async () => {
                              const orderData = {
                                items: cart,
                                total: totalPrice,
                                status: "pending",
                                shippingAddress: {
                                  name: "Test User", // In real app, bind to inputs
                                  street: "123 Luxury Ave",
                                  city: "Bangkok",
                                  postalCode: "10110",
                                  country: "Thailand",
                                },
                                userId: user?.id || "guest-" + Date.now(),
                              };
                              const result = await api.createOrder(orderData);
                              if (result) {
                                window.scrollTo({ top: 0, behavior: "smooth" });
                                setSuccess(true);
                                clearCart();
                              }
                            }}
                            className="grow bg-black text-white py-6 text-[11px] tracking-[0.4em] font-bold uppercase hover:bg-zinc-800 transition-all font-thai"
                          >
                            {t("checkout.complete")}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-5 space-y-8">
                    <div className="bg-white p-10 border border-zinc-100 shadow-sm">
                      <h3 className="text-sm font-bold tracking-[0.3em] uppercase mb-8 pb-4 border-b border-zinc-100">
                        {t("checkout.orderSummary")}
                      </h3>
                      <div className="space-y-6 mb-10 max-h-[40vh] overflow-y-auto pr-2">
                        {cart.map((item) => (
                          <div key={item.id} className="flex gap-6">
                            <div className="relative aspect-3/4 w-16 bg-zinc-50 shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="grow">
                              <p className="text-[10px] tracking-widest uppercase font-bold mb-1">
                                {item.name}
                              </p>
                              <p className="text-[10px] text-zinc-400">
                                {locale === "th" ? "จำนวน" : "Qty"}:{" "}
                                {item.quantity}
                              </p>
                            </div>
                            <span className="text-[11px] font-medium">
                              ฿{(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-4 border-t border-zinc-100 pt-8 text-[11px] tracking-widest uppercase">
                        <div className="flex justify-between">
                          <span className="text-zinc-500">
                            {t("cart.subtotal")}
                          </span>
                          <span>฿{totalPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">
                            {t("cart.globalShipping")}
                          </span>
                          <span className="text-green-600 font-bold">
                            {t("cart.free")}
                          </span>
                        </div>
                        <div className="flex justify-between pt-4 border-t border-zinc-100 text-lg font-light tracking-[0.2em] text-black">
                          <span>{t("cart.total")}</span>
                          <span className="font-bold">
                            ฿{totalPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-zinc-100 p-8 space-y-6 font-thai">
                      <div className="flex items-center gap-4 text-[10px] tracking-widest uppercase font-bold text-zinc-500">
                        <ShieldCheck size={18} className="text-zinc-400" />
                        {t("checkout.secure")}
                      </div>
                      <div className="flex items-center gap-4 text-[10px] tracking-widest uppercase font-bold text-zinc-500">
                        <CreditCard size={18} className="text-zinc-400" />
                        {t("checkout.cards")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
