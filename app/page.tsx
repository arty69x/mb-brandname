"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, CreditCard, RotateCcw, Heart, Search, User, ShoppingBag, Sparkles, Menu, X } from "lucide-react";
import { useMemo, useState } from "react";

const navItems = ["NEW ARRIVALS", "BAGS", "ACCESSORIES", "AUTHENTICITY", "ABOUT"];

const products = [
  { brand: "CHANEL", name: "Classic Flap Bag Medium", price: "฿148,000", image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1400" },
  { brand: "LOUIS VUITTON", name: "Monogram Pochette Accessoires", price: "฿42,000", image: "https://images.unsplash.com/photo-1559563458-527698bf5295?q=80&w=1400" },
  { brand: "HERMÈS", name: "Kelly Wallet To Go", price: "฿119,000", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1400" },
  { brand: "DIOR", name: "Lady Dior Mini Cannage", price: "฿138,000", image: "https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?q=80&w=1400" },
  { brand: "GUCCI", name: "Horsebit 1955 Shoulder Bag", price: "฿65,000", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1400" },
  { brand: "PRADA", name: "Re-Edition Nylon Bag", price: "฿58,000", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1400" }
];

function MagneticButton({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <motion.button
      onClick={onClick}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({ x: (e.clientX - rect.left - rect.width / 2) * 0.14, y: (e.clientY - rect.top - rect.height / 2) * 0.18 });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 220, damping: 16 }}
      className={`rounded-full border border-gold/70 px-7 py-3 text-xs tracking-[0.28em] text-gold transition hover:bg-gold hover:text-ivory ${className}`}
    >
      {children}
    </motion.button>
  );
}

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(products[0]);
  const cartTotal = useMemo(() => "฿148,000", []);

  return (
    <main>
      <header className="sticky top-0 z-50 border-b border-charcoal/10 bg-ivory/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <button className="lg:hidden" onClick={() => setMobileOpen((v) => !v)}>{mobileOpen ? <X size={18} /> : <Menu size={18} />}</button>
          <div className="font-serif text-3xl gold-shimmer">m3</div>
          <nav className="hidden gap-8 text-xs tracking-[0.22em] lg:flex">
            {navItems.map((item) => (
              <a key={item} className="group relative pb-1" href="#">
                {item}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold transition group-hover:scale-x-100" />
              </a>
            ))}
          </nav>
          <div className="flex gap-3 text-charcoal/80">
            <Search size={17} /> <User size={17} /> <Heart size={17} />
            <button onClick={() => setCartOpen(true)}><ShoppingBag size={17} /></button>
          </div>
        </div>
        {mobileOpen && <div className="space-y-3 border-t border-charcoal/10 px-6 py-4 text-xs tracking-[0.2em] lg:hidden">{navItems.map((i) => <p key={i}>{i}</p>)}</div>}
      </header>

      <section className="relative min-h-[84vh] overflow-hidden">
        <motion.div initial={{ scale: 1.08, opacity: 0.45 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.8 }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1523170335258-f5c46c4f2c1b?q=80&w=1920" alt="luxury hero" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/50 to-black/60" />
        </motion.div>
        <div className="relative mx-auto flex min-h-[84vh] max-w-7xl flex-col items-start justify-center px-6 text-ivory lg:px-10">
          <motion.p initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="font-serif text-xl tracking-[0.25em] md:text-2xl">NO.1 AUTHENTIC LUXURY BRANDNAME</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="mt-3 max-w-3xl font-serif text-5xl leading-tight md:text-7xl">Timeless elegance. Guaranteed authenticity.</motion.h1>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-10"><MagneticButton className="bg-charcoal/20">SHOP NEW ARRIVALS</MagneticButton></motion.div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-px bg-charcoal/15 md:grid-cols-4">
        {[
          [ShieldCheck, "100% Authentic Guarantee"],
          [Sparkles, "Verified by Experts in Japan"],
          [CreditCard, "Secure Payment"],
          [RotateCcw, "7-Day Return Protection"]
        ].map(([Icon, label]) => (
          <div key={label as string} className="flex items-center justify-center gap-3 bg-ivory py-4 text-xs tracking-[0.18em]"><Icon size={16} className="text-gold" />{label as string}</div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="mb-10 flex items-center justify-between"><h2 className="font-serif text-4xl">NEW ARRIVALS</h2><MagneticButton>VIEW ALL</MagneticButton></div>
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <motion.article key={product.name} whileHover={{ y: -8 }} className="group overflow-hidden rounded-2xl border border-charcoal/10 bg-[#fbf8f2] p-4 shadow-sm">
              <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-xl">
                <Image src={product.image} alt={product.name} fill className="object-cover transition duration-700 group-hover:scale-105" />
                <button className="absolute right-3 top-3 rounded-full bg-ivory/90 p-2"><Heart size={14} /></button>
                <button onClick={() => setCartOpen(true)} className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-charcoal px-6 py-2 text-xs tracking-[0.16em] text-ivory opacity-0 transition group-hover:opacity-100">QUICK ADD</button>
              </div>
              <p className="text-[11px] tracking-[0.16em] text-charcoal/65">{product.brand}</p>
              <p className="font-medium">{product.name}</p>
              <p className="mt-1 text-sm text-gold">{product.price}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="bg-[#f2ece0]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2 lg:px-10">
          <div className="relative aspect-square overflow-hidden rounded-2xl">
            <Image src={activeProduct.image} alt={activeProduct.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x)_var(--y),transparent_20%,rgba(0,0,0,0.4)_70%)]" style={{ ['--x' as string]: '50%', ['--y' as string]: '50%' }} />
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] text-gold">ULTRA DETAIL ZOOM EXPERIENCE</p>
            <h3 className="mt-3 font-serif text-4xl">Inspect every stitch, engraving and texture.</h3>
            <p className="mt-4 max-w-xl text-charcoal/75">Built for confidence: buyers can inspect macro-level clarity before purchasing, helping increase trust and reduce return rates.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {products.slice(0, 4).map((p) => (
                <button key={p.name} onClick={() => setActiveProduct(p)} className={`rounded-full border px-4 py-2 text-xs tracking-[0.18em] ${activeProduct.name === p.name ? 'border-gold bg-gold text-ivory' : 'border-charcoal/25'}`}>{p.brand}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:px-10">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-luxe"><Image src="https://images.unsplash.com/photo-1594633313593-bab3825d0caf?q=80&w=1400" alt="story" fill className="object-cover" /></div>
        <div className="flex flex-col justify-center">
          <p className="text-xs tracking-[0.2em] text-gold">EDITORIAL STORY</p>
          <h3 className="mt-4 font-serif text-5xl">Each piece tells a story.</h3>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-charcoal/80">Luxury is defined by craftsmanship, heritage, and authenticity. Our curation from Japan blends collectible icons with timeless personal expression.</p>
          <div className="mt-8"><MagneticButton>DISCOVER THE STORY</MagneticButton></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <h3 className="mb-8 text-center font-serif text-4xl">CATEGORY SHOWCASE</h3>
        <div className="grid gap-7 md:grid-cols-3">
          {[
            ["Designer Bags", "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200"],
            ["Fine Jewelry", "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200"],
            ["Rare Vintage", "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1200"]
          ].map(([name, img]) => (
            <article key={name as string} className="group relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image src={img as string} alt={name as string} fill className="object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <h4 className="absolute bottom-8 left-7 font-serif text-4xl text-ivory">{name as string}</h4>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-charcoal py-20 text-ivory">
        <div className="mx-auto max-w-6xl px-6 text-center lg:px-10">
          <div className="emboss-seal relative mx-auto mb-6 h-24 w-24 overflow-hidden rounded-full border border-gold/50 bg-gold/15" />
          <h3 className="font-serif text-5xl">100% AUTHENTIC GUARANTEE</h3>
          <p className="mx-auto mt-4 max-w-2xl text-ivory/80">Carefully inspected and sourced from Japan. Every item verified before delivery.</p>
          <div className="mt-10 grid gap-5 md:grid-cols-4">{[[ShieldCheck, "Authentic Guarantee"], [Truck, "Fast Shipping"], [CreditCard, "Secure Checkout"], [RotateCcw, "Money-back Protection"]].map(([Icon, label]) => <div key={label as string} className="rounded-xl border border-gold/25 bg-ivory/5 p-5"><Icon size={18} className="mx-auto mb-2 text-gold" /><p className="text-sm">{label as string}</p></div>)}</div>
        </div>
      </section>

      <section className="relative min-h-[58vh] overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1920" alt="featured" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative mx-auto flex min-h-[58vh] max-w-7xl items-center px-6 lg:px-10">
          <div>
            <p className="text-xs tracking-[0.2em] text-gold">FEATURED COLLECTION</p>
            <h3 className="mt-3 max-w-xl font-serif text-6xl text-ivory">Timeless elegance for modern icons.</h3>
            <div className="mt-8"><MagneticButton className="bg-ivory/10">VIEW COLLECTION</MagneticButton></div>
          </div>
        </div>
      </section>

      <footer className="bg-[#11100f] px-6 py-14 text-sm text-ivory/70 lg:px-10"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row"><p><span className="gold-shimmer font-serif text-3xl">m3</span><br />MBbrandname flagship boutique.</p><p>© {new Date().getFullYear()} MB Brandname</p></div></footer>

      <motion.aside initial={false} animate={{ x: cartOpen ? 0 : "100%" }} transition={{ type: "spring", damping: 25, stiffness: 220 }} className="fixed right-0 top-0 z-[80] h-full w-full max-w-md border-l border-charcoal/15 bg-ivory p-6 shadow-luxe">
        <div className="mb-6 flex items-center justify-between"><h4 className="font-serif text-3xl">Your Cart</h4><button onClick={() => setCartOpen(false)}><X /></button></div>
        <div className="rounded-2xl border border-charcoal/10 p-4">
          <p className="text-xs tracking-[0.18em] text-charcoal/60">ITEM 1</p>
          <p className="mt-1 font-medium">Classic Flap Bag Medium</p>
          <p className="mt-1 text-gold">{cartTotal}</p>
        </div>
        <div className="mt-6 flex items-center justify-between border-t border-charcoal/10 pt-5"><span className="text-sm tracking-[0.2em]">SUBTOTAL</span><span className="font-serif text-3xl">{cartTotal}</span></div>
        <button className="mt-7 w-full rounded-full bg-charcoal py-3 text-xs tracking-[0.2em] text-ivory">CHECKOUT SECURELY</button>
      </motion.aside>
      {cartOpen && <button aria-label="close drawer backdrop" onClick={() => setCartOpen(false)} className="fixed inset-0 z-[70] bg-black/25" />}
    </main>
  );
}
