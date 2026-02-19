"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  CreditCard,
  Heart,
  Menu,
  RotateCcw,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  User,
  X
} from "lucide-react";
import { useMemo, useState } from "react";

type Product = {
  brand: string;
  name: string;
  price: number;
  image: string;
};

const navItems = [
  { label: "NEW ARRIVALS", href: "#new-arrivals" },
  { label: "AUTHENTICITY", href: "#authenticity" },
  { label: "CATEGORY", href: "#categories" },
  { label: "STORY", href: "#story" },
  { label: "CONTACT", href: "#footer" }
];

const products: Product[] = [
  { brand: "CHANEL", name: "Classic Flap Bag Medium", price: 148000, image: "/products/p1.svg" },
  { brand: "LOUIS VUITTON", name: "Monogram Pochette Accessoires", price: 42000, image: "/products/p2.svg" },
  { brand: "HERMÈS", name: "Kelly Wallet To Go", price: 119000, image: "/products/p3.svg" },
  { brand: "DIOR", name: "Lady Dior Mini Cannage", price: 138000, image: "/products/p4.svg" },
  { brand: "GUCCI", name: "Horsebit 1955 Shoulder Bag", price: 65000, image: "/products/p5.svg" },
  { brand: "PRADA", name: "Re-Edition Nylon Bag", price: 58000, image: "/products/p6.svg" }
];

const categoryShowcase = [
  ["Designer Bags", "/category/c1.svg"],
  ["Fine Jewelry", "/category/c2.svg"],
  ["Rare Vintage", "/category/c3.svg"]
];

const formatPrice = (value: number) =>
  new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0
  }).format(value);

function MagneticButton({
  children,
  className = "",
  onClick,
  type = "button"
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <motion.button
      type={type}
      onClick={onClick}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({
          x: (e.clientX - rect.left - rect.width / 2) * 0.14,
          y: (e.clientY - rect.top - rect.height / 2) * 0.18
        });
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
  const [cartItems, setCartItems] = useState<Product[]>([products[0]]);

  const cartTotal = useMemo(() => cartItems.reduce((sum, item) => sum + item.price, 0), [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems((current) => [...current, product]);
    setCartOpen(true);
  };

  return (
    <main>
      <header className="sticky top-0 z-50 border-b border-charcoal/10 bg-ivory/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <button aria-label="Toggle navigation menu" className="lg:hidden" onClick={() => setMobileOpen((v) => !v)}>
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <div className="font-serif text-3xl gold-shimmer">m3</div>
          <nav className="hidden gap-8 text-xs tracking-[0.22em] lg:flex">
            {navItems.map((item) => (
              <a key={item.label} className="group relative pb-1" href={item.href}>
                {item.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold transition group-hover:scale-x-100" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3 text-charcoal/80">
            <button aria-label="Search products"><Search size={17} /></button>
            <button aria-label="Account"><User size={17} /></button>
            <button aria-label="Favorites"><Heart size={17} /></button>
            <button aria-label="Open shopping cart" onClick={() => setCartOpen(true)}>
              <ShoppingBag size={17} />
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="space-y-3 border-t border-charcoal/10 px-6 py-4 text-xs tracking-[0.2em] lg:hidden">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setMobileOpen(false)}>
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <section className="relative min-h-[84vh] overflow-hidden">
        <motion.div initial={{ scale: 1.08, opacity: 0.45 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.8 }} className="absolute inset-0">
          <Image src="/hero/main.svg" alt="luxury hero" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/50 to-black/60" />
        </motion.div>
        <div className="relative mx-auto flex min-h-[84vh] max-w-7xl flex-col items-start justify-center px-6 text-ivory lg:px-10">
          <motion.p initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="font-serif text-xl tracking-[0.25em] md:text-2xl">NO.1 AUTHENTIC LUXURY BRANDNAME</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="mt-3 max-w-3xl font-serif text-5xl leading-tight md:text-7xl">Timeless elegance. Guaranteed authenticity.</motion.h1>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-10">
            <MagneticButton className="bg-charcoal/20" onClick={() => document.getElementById("new-arrivals")?.scrollIntoView({ behavior: "smooth" })}>
              SHOP NEW ARRIVALS
            </MagneticButton>
          </motion.div>
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

      <section id="new-arrivals" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-serif text-4xl">NEW ARRIVALS</h2>
          <MagneticButton>VIEW ALL</MagneticButton>
        </div>
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article key={product.name} className="group overflow-hidden rounded-3xl border border-charcoal/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-luxe">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image src={product.image} alt={product.name} fill className="object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <p className="text-xs tracking-[0.22em] text-charcoal/60">{product.brand}</p>
                <h3 className="mt-2 font-serif text-2xl leading-tight">{product.name}</h3>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <p className="text-lg font-medium text-gold">{formatPrice(product.price)}</p>
                  <button className="rounded-full border border-charcoal/20 px-4 py-2 text-xs tracking-[0.18em] transition hover:border-gold hover:text-gold" onClick={() => addToCart(product)}>
                    ADD TO CART
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="grid gap-8 rounded-3xl bg-white p-8 shadow-luxe lg:grid-cols-2 lg:p-12">
          <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
            <Image src={activeProduct.image} alt={activeProduct.name} fill className="object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs tracking-[0.2em] text-gold">AUTHENTICATION DETAILS</p>
            <h3 className="mt-3 font-serif text-4xl">Inspect every stitch, engraving and texture.</h3>
            <p className="mt-4 max-w-xl text-charcoal/75">Built for confidence: buyers can inspect macro-level clarity before purchasing, helping increase trust and reduce return rates.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {products.slice(0, 4).map((product) => (
                <button key={product.name} onClick={() => setActiveProduct(product)} className={`rounded-full border px-4 py-2 text-xs tracking-[0.18em] ${activeProduct.name === product.name ? "border-gold bg-gold text-ivory" : "border-charcoal/25"}`}>
                  {product.brand}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="story" className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:px-10">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-luxe"><Image src="/story/main.svg" alt="story" fill className="object-cover" /></div>
        <div className="flex flex-col justify-center">
          <p className="text-xs tracking-[0.2em] text-gold">EDITORIAL STORY</p>
          <h3 className="mt-4 font-serif text-5xl">Each piece tells a story.</h3>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-charcoal/80">Luxury is defined by craftsmanship, heritage, and authenticity. Our curation from Japan blends collectible icons with timeless personal expression.</p>
          <div className="mt-8"><MagneticButton>DISCOVER THE STORY</MagneticButton></div>
        </div>
      </section>

      <section id="categories" className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <h3 className="mb-8 text-center font-serif text-4xl">CATEGORY SHOWCASE</h3>
        <div className="grid gap-7 md:grid-cols-3">
          {categoryShowcase.map(([name, image]) => (
            <article key={name} className="group relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image src={image} alt={name} fill className="object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <h4 className="absolute bottom-8 left-7 font-serif text-4xl text-ivory">{name}</h4>
            </article>
          ))}
        </div>
      </section>

      <section id="authenticity" className="bg-charcoal py-20 text-ivory">
        <div className="mx-auto max-w-6xl px-6 text-center lg:px-10">
          <div className="emboss-seal relative mx-auto mb-6 h-24 w-24 overflow-hidden rounded-full border border-gold/50 bg-gold/15" />
          <h3 className="font-serif text-5xl">100% AUTHENTIC GUARANTEE</h3>
          <p className="mx-auto mt-4 max-w-2xl text-ivory/80">Carefully inspected and sourced from Japan. Every item verified before delivery.</p>
          <div className="mt-10 grid gap-5 md:grid-cols-4">{[[ShieldCheck, "Authentic Guarantee"], [Truck, "Fast Shipping"], [CreditCard, "Secure Checkout"], [RotateCcw, "Money-back Protection"]].map(([Icon, label]) => <div key={label as string} className="rounded-xl border border-gold/25 bg-ivory/5 p-5"><Icon size={18} className="mx-auto mb-2 text-gold" /><p className="text-sm">{label as string}</p></div>)}</div>
        </div>
      </section>

      <section className="relative min-h-[58vh] overflow-hidden">
        <Image src="/featured/main.svg" alt="featured" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative mx-auto flex min-h-[58vh] max-w-7xl items-center px-6 lg:px-10">
          <div>
            <p className="text-xs tracking-[0.2em] text-gold">FEATURED COLLECTION</p>
            <h3 className="mt-3 max-w-xl font-serif text-6xl text-ivory">Timeless elegance for modern icons.</h3>
            <div className="mt-8"><MagneticButton className="bg-ivory/10">VIEW COLLECTION</MagneticButton></div>
          </div>
        </div>
      </section>

      <footer id="footer" className="bg-[#11100f] px-6 py-14 text-sm text-ivory/70 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto_auto] md:items-start">
          <p><span className="gold-shimmer font-serif text-3xl">m3</span><br />MBbrandname flagship boutique.</p>
          <div className="space-y-3 text-xs tracking-[0.16em]">
            <p>LINE: @mbbrandname</p>
            <p>INSTAGRAM: @mbbrandname</p>
            <p>OPEN DAILY 11:00 - 20:00</p>
          </div>
          <p>© {new Date().getFullYear()} MB Brandname</p>
        </div>
      </footer>

      <motion.aside initial={false} animate={{ x: cartOpen ? 0 : "100%" }} transition={{ type: "spring", damping: 25, stiffness: 220 }} className="fixed right-0 top-0 z-[80] h-full w-full max-w-md border-l border-charcoal/15 bg-ivory p-6 shadow-luxe">
        <div className="mb-6 flex items-center justify-between"><h4 className="font-serif text-3xl">Your Cart</h4><button aria-label="Close cart" onClick={() => setCartOpen(false)}><X /></button></div>
        <div className="space-y-3">
          {cartItems.length === 0 && <p className="rounded-2xl border border-charcoal/10 p-4 text-sm text-charcoal/70">Your cart is empty.</p>}
          {cartItems.map((item, index) => (
            <div key={`${item.name}-${index}`} className="rounded-2xl border border-charcoal/10 p-4">
              <p className="text-xs tracking-[0.18em] text-charcoal/60">{item.brand}</p>
              <p className="mt-1 font-medium">{item.name}</p>
              <p className="mt-1 text-gold">{formatPrice(item.price)}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between border-t border-charcoal/10 pt-5"><span className="text-sm tracking-[0.2em]">SUBTOTAL</span><span className="font-serif text-3xl">{formatPrice(cartTotal)}</span></div>
        <button className="mt-7 w-full rounded-full bg-charcoal py-3 text-xs tracking-[0.2em] text-ivory">CHECKOUT SECURELY</button>
      </motion.aside>
      {cartOpen && <button aria-label="close drawer backdrop" onClick={() => setCartOpen(false)} className="fixed inset-0 z-[70] bg-black/25" />}
    </main>
  );
}
