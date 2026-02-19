"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  RotateCcw,
  Heart,
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  ChevronRight,
  BadgeCheck,
  Sparkles
} from "lucide-react";
import { useMemo, useState } from "react";

const navItems = ["HOME", "NEW ARRIVALS", "BAGS", "ACCESSORIES", "AUTHENTICITY", "ABOUT"];
const ticker = ["NEW DROP WEEKLY", "PROMO: LUXE10", "FREE SHIPPING OVER ฿50,000", "AUTHENTICITY GUARANTEED"];

const products = [
  { brand: "CHANEL", name: "Classic Flap Bag Medium", price: "฿148,000", image: "/products/p1.svg" },
  { brand: "LOUIS VUITTON", name: "Monogram Pochette Accessoires", price: "฿42,000", image: "/products/p2.svg" },
  { brand: "HERMÈS", name: "Kelly Wallet To Go", price: "฿119,000", image: "/products/p3.svg" },
  { brand: "DIOR", name: "Lady Dior Mini Cannage", price: "฿138,000", image: "/products/p4.svg" },
  { brand: "GUCCI", name: "Horsebit 1955 Shoulder Bag", price: "฿65,000", image: "/products/p5.svg" },
  { brand: "PRADA", name: "Re-Edition Nylon Bag", price: "฿58,000", image: "/products/p6.svg" }
];

function MagneticButton({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <motion.button
      onClick={onClick}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({ x: (e.clientX - rect.left - rect.width / 2) * 0.1, y: (e.clientY - rect.top - rect.height / 2) * 0.12 });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 230, damping: 14 }}
      className={`border border-gold/70 px-6 py-2 text-[11px] tracking-[0.22em] text-gold transition hover:bg-gold hover:text-ivory ${className}`}
    >
      {children}
    </motion.button>
  );
}

function PromoTicker() {
  return (
    <div className="overflow-hidden border-y border-charcoal/10 bg-[#ece3d4] py-2 text-[10px] tracking-[0.18em] text-charcoal/80">
      <div className="marquee flex gap-8 whitespace-nowrap">
        {[...ticker, ...ticker].map((t, i) => (
          <span key={`${t}-${i}`} className="inline-flex items-center gap-2">
            <Sparkles size={12} className="text-gold" /> {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(products[0]);
  const cartTotal = useMemo(() => "฿148,000", []);

  return (
    <main>
      <section className="md:hidden">
        <div className="sticky top-0 z-50 border-b border-charcoal/10 bg-ivory/95 px-4 py-3 backdrop-blur">
          <div className="mb-2 flex items-center justify-between">
            <div className="font-serif text-2xl gold-shimmer">MB</div>
            <div className="flex items-center gap-3 text-charcoal/75"><X size={18} /><User size={18} /><Heart size={18} /><ShoppingBag size={18} /></div>
          </div>
          <div className="flex items-center gap-2 border border-charcoal/15 bg-white px-3 py-2 text-charcoal/65"><Menu size={16} /><Search size={16} /><span className="text-xs">SEARCH LUXURY ITEMS</span></div>
        </div>
        <PromoTicker />
        <div className="grid grid-cols-2 gap-px bg-charcoal/15">
          {products.map((product) => (
            <article key={`m-${product.name}`} className="bg-ivory">
              <div className="relative aspect-[3/4]"><Image src={product.image} alt={product.name} fill className="object-cover" /></div>
              <div className="space-y-1 px-2 py-2">
                <p className="truncate text-[11px] text-charcoal/85">{product.name.toUpperCase()}</p>
                <div className="flex items-center justify-between text-[11px]"><p>{product.price}</p><Heart size={13} className="text-charcoal/55" /></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="hidden md:block">
        <header className="sticky top-0 z-50 border-b border-charcoal/10 bg-ivory/80 backdrop-blur-xl">
          <PromoTicker />
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-10">
            <button className="lg:hidden" onClick={() => setMobileOpen((v) => !v)}>{mobileOpen ? <X size={18} /> : <Menu size={18} />}</button>
            <div className="flex items-center gap-2"><div className="font-serif text-3xl gold-shimmer">MB</div><p className="hidden text-[10px] tracking-[0.3em] text-charcoal/70 sm:block">BRANDNAME</p></div>
            <nav className="hidden gap-8 text-[11px] tracking-[0.22em] lg:flex">{navItems.map((item) => <a key={item} className="group relative pb-1" href="#">{item}<span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold transition group-hover:scale-x-100" /></a>)}</nav>
            <div className="flex gap-3 text-charcoal/80"><Search size={17} /> <User size={17} /> <Heart size={17} /> <button onClick={() => setCartOpen(true)}><ShoppingBag size={17} /></button></div>
          </div>
        </header>

        <section className="relative min-h-[86vh] overflow-hidden">
          <motion.div initial={{ scale: 1.1, opacity: 0.4 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 2 }} className="absolute inset-0">
            <Image src="/hero/main.svg" alt="luxury hero" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/65" />
          </motion.div>
          <div className="relative mx-auto flex min-h-[86vh] max-w-7xl flex-col items-start justify-center px-6 text-ivory lg:px-10">
            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-serif text-2xl tracking-[0.22em]">NO.1 AUTHENTIC LUXURY BRANDNAME</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-4 max-w-4xl font-serif text-6xl leading-tight">Timeless elegance. Guaranteed authenticity.</motion.h1>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-10"><MagneticButton className="bg-charcoal/20">SHOP NEW ARRIVALS</MagneticButton></motion.div>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-px bg-charcoal/15 md:grid-cols-4">{[[ShieldCheck, "100% Authentic Guarantee"], [BadgeCheck, "Verified by Experts in Japan"], [CreditCard, "Secure Payment"], [RotateCcw, "7-Day Return Protection"]].map(([Icon, label]) => <div key={label as string} className="flex items-center justify-center gap-2 bg-ivory py-4 text-xs tracking-[0.13em]"><Icon size={15} className="text-gold" />{label as string}</div>)}</section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="mb-8 flex items-center justify-between"><h2 className="font-serif text-4xl">NEW ARRIVALS</h2><MagneticButton>VIEW ALL</MagneticButton></div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <motion.article key={product.name} whileHover={{ y: -6 }} className="group border border-charcoal/10 bg-[#fbf8f2] p-3 shadow-sm">
                <div className="relative mb-3 aspect-[4/5] overflow-hidden"><Image src={product.image} alt={product.name} fill className="object-cover transition duration-700 group-hover:scale-105" /><button className="absolute right-2 top-2 bg-ivory/90 p-2"><Heart size={14} /></button><button onClick={() => setCartOpen(true)} className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-charcoal px-5 py-2 text-xs tracking-[0.15em] text-ivory opacity-0 transition group-hover:opacity-100">QUICK ADD</button></div>
                <p className="text-[11px] tracking-[0.14em] text-charcoal/65">{product.brand}</p><p className="font-medium">{product.name}</p><p className="mt-1 text-sm text-gold">{product.price}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="bg-[#f2ece0]"><div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2 lg:px-10"><div className="relative aspect-square overflow-hidden border border-charcoal/10"><Image src={activeProduct.image} alt={activeProduct.name} fill className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" /></div><div><p className="text-xs tracking-[0.2em] text-gold">ULTRA DETAIL ZOOM EXPERIENCE</p><h3 className="mt-3 font-serif text-4xl">Inspect every stitch, engraving and texture.</h3><p className="mt-4 max-w-xl text-charcoal/75">Built for confidence and fewer returns. Inspect details before purchase.</p><div className="mt-8 flex flex-wrap gap-3">{products.slice(0,4).map((p)=><button key={p.name} onClick={()=>setActiveProduct(p)} className={`border px-4 py-2 text-xs tracking-[0.16em] ${activeProduct.name===p.name?"border-gold bg-gold text-ivory":"border-charcoal/25"}`}>{p.brand}</button>)}</div></div></div></section>

        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2 lg:px-10"><div className="relative aspect-[4/5] overflow-hidden border border-charcoal/10 shadow-luxe"><Image src="/story/main.svg" alt="story" fill className="object-cover" /></div><div className="flex flex-col justify-center"><p className="text-xs tracking-[0.2em] text-gold">EDITORIAL STORY SECTION</p><h3 className="mt-4 font-serif text-5xl">Each piece tells a story.</h3><p className="mt-6 max-w-lg text-lg leading-relaxed text-charcoal/80">Luxury is defined by craftsmanship, heritage, and authenticity.</p><div className="mt-8"><MagneticButton>DISCOVER THE STORY</MagneticButton></div></div></section>

        <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10"><h3 className="mb-8 text-center font-serif text-4xl">CATEGORY SHOWCASE</h3><div className="grid gap-5 md:grid-cols-3">{[["Designer Bags","/category/c1.svg"],["Fine Jewelry","/category/c2.svg"],["Rare Vintage","/category/c3.svg"]].map(([name,img])=><article key={name as string} className="group relative aspect-[4/5] overflow-hidden border border-charcoal/10"><Image src={img as string} alt={name as string} fill className="object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" /><h4 className="absolute bottom-7 left-6 font-serif text-4xl text-ivory">{name as string}</h4></article>)}</div></section>

        <section className="bg-charcoal py-20 text-ivory"><div className="mx-auto max-w-6xl px-6 text-center lg:px-10"><div className="emboss-seal relative mx-auto mb-6 h-20 w-20 overflow-hidden border border-gold/50 bg-gold/15" /><h3 className="font-serif text-5xl">100% AUTHENTIC GUARANTEE</h3><p className="mx-auto mt-4 max-w-2xl text-ivory/80">Carefully inspected and sourced from Japan.</p><div className="mt-10 grid gap-4 md:grid-cols-4">{[[ShieldCheck,"Authentic Guarantee"],[Truck,"Fast Shipping"],[CreditCard,"Secure Checkout"],[RotateCcw,"Money-back Protection"]].map(([Icon,label])=><div key={label as string} className="border border-gold/25 bg-ivory/5 p-5"><Icon size={18} className="mx-auto mb-2 text-gold" /><p className="text-sm">{label as string}</p></div>)}</div></div></section>

        <section className="relative min-h-[52vh] overflow-hidden"><Image src="/featured/main.svg" alt="featured" fill className="object-cover" /><div className="absolute inset-0 bg-black/45" /><div className="relative mx-auto flex min-h-[52vh] max-w-7xl items-center px-6 lg:px-10"><div><p className="text-xs tracking-[0.2em] text-gold">FEATURED COLLECTION</p><h3 className="mt-3 max-w-xl font-serif text-6xl text-ivory">Timeless elegance for modern icons.</h3><div className="mt-8"><MagneticButton className="bg-ivory/10">VIEW COLLECTION</MagneticButton></div></div></div></section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10"><div className="border border-gold/20 bg-gradient-to-br from-[#f4ebdd] to-[#efe2cd] p-10 text-center"><p className="text-xs tracking-[0.22em] text-gold">SIGNATURE BRAND MOMENT</p><h3 className="mt-3 font-serif text-4xl">MB BRANDNAME</h3><p className="mx-auto mt-4 max-w-2xl text-charcoal/75">Use code <b>LUXE10</b> for limited new-arrival promotion.</p><button className="mt-7 inline-flex items-center gap-2 border border-charcoal/20 px-6 py-3 text-xs tracking-[0.18em]">EXPLORE NOW <ChevronRight size={14} /></button></div></section>

        <footer className="bg-[#11100f] px-6 py-14 text-sm text-ivory/70 lg:px-10"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row"><p><span className="gold-shimmer font-serif text-3xl">MB</span><br />MB BRANDNAME flagship boutique.</p><p>© {new Date().getFullYear()} MB BRANDNAME</p></div></footer>
      </div>

      <motion.aside initial={false} animate={{ x: cartOpen ? 0 : "100%" }} transition={{ type: "spring", damping: 25, stiffness: 220 }} className="fixed right-0 top-0 z-[80] h-full w-full max-w-md border-l border-charcoal/15 bg-ivory p-6 shadow-luxe">
        <div className="mb-6 flex items-center justify-between"><h4 className="font-serif text-3xl">Your Cart</h4><button onClick={() => setCartOpen(false)}><X /></button></div>
        <div className="border border-charcoal/10 p-4"><p className="text-xs tracking-[0.18em] text-charcoal/60">ITEM 1</p><p className="mt-1 font-medium">Classic Flap Bag Medium</p><p className="mt-1 text-gold">{cartTotal}</p></div>
        <div className="mt-6 flex items-center justify-between border-t border-charcoal/10 pt-5"><span className="text-sm tracking-[0.2em]">SUBTOTAL</span><span className="font-serif text-3xl">{cartTotal}</span></div>
        <button className="mt-7 w-full bg-charcoal py-3 text-xs tracking-[0.2em] text-ivory">CHECKOUT SECURELY</button>
      </motion.aside>
      {cartOpen && <button aria-label="close drawer backdrop" onClick={() => setCartOpen(false)} className="fixed inset-0 z-[70] bg-black/25" />}
    </main>
  );
}
