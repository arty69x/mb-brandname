"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Headphones, ShieldCheck, Sparkles, Truck } from "lucide-react";

import { api } from "@/lib/api-client";
import { Product } from "@/types/api";

const spotlightCards = [
  {
    title: "Curated in Tokyo",
    description: "Hand-picked archive pieces sourced from trusted Japanese collectors.",
  },
  {
    title: "Verified Authenticity",
    description: "Every item is inspected, documented, and guaranteed authentic before listing.",
  },
  {
    title: "Worldwide Delivery",
    description: "Premium insured shipping with tracking and dedicated support.",
  },
];

const heroImages = [
  "https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=1400",
  "https://images.pexels.com/photos/5370706/pexels-photo-5370706.jpeg?auto=compress&cs=tinysrgb&w=1000",
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const response = await api.getProducts({ featured: true });
      setProducts(response.slice(0, 6));
    }

    loadProducts();
  }, []);

  return (
    <main className="bg-[#f8f7f4] text-[#171717]">
      <section className="mx-auto grid min-h-[85vh] w-full max-w-7xl grid-cols-1 gap-6 px-4 pb-8 pt-6 md:grid-cols-5 md:px-8 md:pb-16 md:pt-10">
        <div className="relative overflow-hidden rounded-3xl md:col-span-3">
          <Image src={heroImages[0]} alt="Luxury archive hero" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent" />
          <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-12">
            <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/40 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/90">
              <Sparkles className="h-3.5 w-3.5" /> New Blueprint
            </p>
            <h1 className="max-w-2xl text-4xl font-light uppercase tracking-[0.12em] text-white md:text-6xl">
              Redefined luxury archives for modern collectors
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/80 md:text-base">
              Discover rare pieces from iconic fashion houses with a fresh editorial experience built to feel elegant, calm, and premium.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/new-arrivals" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs uppercase tracking-[0.18em] text-black">
                Shop new arrivals <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/about" className="inline-flex items-center rounded-full border border-white/60 px-6 py-3 text-xs uppercase tracking-[0.18em] text-white">
                Our Story
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-6 md:col-span-2">
          <div className="relative h-[300px] overflow-hidden rounded-3xl md:h-[350px]">
            <Image src={heroImages[1]} alt="Fashion portrait" fill className="object-cover" />
          </div>
          <div className="relative h-[260px] overflow-hidden rounded-3xl bg-[#e8e4dc] p-8">
            <Image src={heroImages[2]} alt="Jewelry detail" fill className="object-cover opacity-15" />
            <div className="relative z-10 space-y-3">
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-700">Tokyo Edit</p>
              <p className="text-3xl font-light leading-tight">A cleaner, richer page blueprint with elevated visual rhythm.</p>
              <Link href="/bags" className="inline-flex items-center gap-2 pt-2 text-sm font-medium uppercase tracking-[0.15em] text-zinc-900">
                Explore collection <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-4 px-4 pb-8 md:grid-cols-3 md:px-8 md:pb-16">
        {spotlightCards.map((card) => (
          <article key={card.title} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm uppercase tracking-[0.18em] text-zinc-500">{card.title}</h2>
            <p className="mt-3 text-base leading-7 text-zinc-700">{card.description}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 md:px-8">
        <div className="mb-10 flex items-end justify-between gap-5">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">New Arrivals</p>
            <h3 className="mt-3 text-3xl font-light uppercase tracking-[0.12em]">Freshly Added Treasures</h3>
          </div>
          <Link href="/new-arrivals" className="hidden items-center gap-2 text-sm uppercase tracking-[0.18em] text-zinc-800 md:inline-flex">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
          {products.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-zinc-200">
                <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="pt-3 text-sm">
                <p className="text-[11px] uppercase tracking-[0.14em] text-zinc-500">{product.category}</p>
                <p className="mt-1 line-clamp-2 font-medium">{product.name}</p>
                <p className="mt-1 text-zinc-700">{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#111111] px-4 py-16 text-white md:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h3 className="text-3xl font-light uppercase tracking-[0.12em]">100% Authentic from Japan</h3>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/75">
              Over a decade of sourcing premium pre-owned luxury pieces with strict verification standards. This updated page blueprint focuses on storytelling, trust, and visual harmony.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-5 text-center">
              <Truck className="mx-auto h-8 w-8" strokeWidth={1.5} />
              <p className="mt-3 text-xs uppercase tracking-[0.16em]">Fast Delivery</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-5 text-center">
              <Headphones className="mx-auto h-8 w-8" strokeWidth={1.5} />
              <p className="mt-3 text-xs uppercase tracking-[0.16em]">24/7 Support</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-5 text-center">
              <ShieldCheck className="mx-auto h-8 w-8" strokeWidth={1.5} />
              <p className="mt-3 text-xs uppercase tracking-[0.16em]">Money Back</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
