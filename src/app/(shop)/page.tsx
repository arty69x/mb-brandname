"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Headphones, ShieldCheck, Sparkles, Star, Truck } from "lucide-react";

import { api } from "@/lib/api-client";
import { Product } from "@/types/api";
import ProductCard from "@/components/ProductCard";

const valuePillars = [
  {
    title: "Tokyo Curated",
    description: "Luxury archives selected with strict quality checks from trusted Japanese sources.",
  },
  {
    title: "Authentication First",
    description: "Every listing is reviewed for condition and originality before it reaches the storefront.",
  },
  {
    title: "Collector Experience",
    description: "Private-client level support from discovery through delivery.",
  },
];

const collectionHighlights = [
  { label: "Bags", href: "/bags", tone: "from-[#f8efe3] to-[#efe7dc]" },
  { label: "Accessories", href: "/accessories", tone: "from-[#ececf6] to-[#dedeee]" },
  { label: "New Arrivals", href: "/new-arrivals", tone: "from-[#e6f0ef] to-[#d5e4e2]" },
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const response = await api.getProducts({ featured: true });
      setProducts(response.slice(0, 8));
    }

    loadProducts();
  }, []);

  return (
    <main className="bg-[#f6f4ef] text-[#131313]">
      <section className="relative overflow-hidden border-b border-zinc-200/80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#d9cab0_0%,transparent_42%),radial-gradient(circle_at_25%_15%,#efe8db_0%,transparent_46%)]" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 pb-16 pt-14 md:px-8 md:pb-24 md:pt-20">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-zinc-600">
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white/70 px-3 py-1.5">
              <Sparkles className="h-3.5 w-3.5" /> New Blueprint
            </span>
            <span>MB Brandname Archive House</span>
          </div>

          <div className="grid gap-10 md:grid-cols-[1.3fr_0.7fr] md:items-end">
            <div>
              <h1 className="max-w-4xl text-4xl font-light uppercase leading-tight tracking-[0.1em] md:text-6xl">
                A different full-page blueprint for modern luxury shopping
              </h1>
              <p className="mt-7 max-w-2xl text-sm leading-8 text-zinc-700 md:text-base">
                Designed to feel elegant and cinematic while remaining clean and conversion-focused. Discover authenticated pieces from Chanel,
                Hermès, Louis Vuitton, and Dior in a storefront built for collectors.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/new-arrivals"
                  className="inline-flex items-center gap-2 rounded-full bg-[#111] px-6 py-3 text-xs uppercase tracking-[0.2em] text-white"
                >
                  Shop Now <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center rounded-full border border-zinc-400 bg-white/70 px-6 py-3 text-xs uppercase tracking-[0.2em]"
                >
                  About MB
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-300/70 bg-white/70 p-6 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Client Promise</p>
              <ul className="mt-5 space-y-4 text-sm text-zinc-700">
                <li className="flex items-start gap-3">
                  <Star className="mt-0.5 h-4 w-4" />
                  100% authentic products with transparent condition notes.
                </li>
                <li className="flex items-start gap-3">
                  <Star className="mt-0.5 h-4 w-4" />
                  Carefully photographed and curated archive selections.
                </li>
                <li className="flex items-start gap-3">
                  <Star className="mt-0.5 h-4 w-4" />
                  Concierge-like support before and after checkout.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {valuePillars.map((pillar) => (
            <article key={pillar.title} className="rounded-2xl border border-zinc-200 bg-white p-6">
              <h2 className="text-xs uppercase tracking-[0.22em] text-zinc-500">{pillar.title}</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-700 md:text-base">{pillar.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-8 md:px-8 md:pb-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Curated Collections</p>
            <h3 className="mt-2 text-2xl font-light uppercase tracking-[0.1em] md:text-3xl">Choose your lane</h3>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {collectionHighlights.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`group rounded-2xl border border-zinc-200 bg-gradient-to-br ${item.tone} p-7 transition-transform duration-300 hover:-translate-y-1`}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Collection</p>
              <p className="mt-3 text-2xl font-light uppercase tracking-[0.08em]">{item.label}</p>
              <p className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-800">
                Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 pt-8 md:px-8 md:pt-12">
        <div className="mb-10 flex items-end justify-between gap-5">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">New Arrivals</p>
            <h3 className="mt-3 text-3xl font-light uppercase tracking-[0.1em]">Fresh archive drops</h3>
          </div>
          <Link href="/new-arrivals" className="hidden items-center gap-2 text-xs uppercase tracking-[0.2em] md:inline-flex">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              category={product.category}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-[#101010] px-4 py-16 text-white md:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <h3 className="text-3xl font-light uppercase tracking-[0.1em]">All page experience, one luxury standard</h3>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75 md:text-base">
              This full-page redesign is built to make every section feel intentional—from hero storytelling and curated discovery to trust signals and
              premium service proof points.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-5 text-center">
              <Truck className="mx-auto h-8 w-8" strokeWidth={1.5} />
              <p className="mt-3 text-[11px] uppercase tracking-[0.16em]">Fast Delivery</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-5 text-center">
              <Headphones className="mx-auto h-8 w-8" strokeWidth={1.5} />
              <p className="mt-3 text-[11px] uppercase tracking-[0.16em]">24/7 Support</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-5 text-center">
              <ShieldCheck className="mx-auto h-8 w-8" strokeWidth={1.5} />
              <p className="mt-3 text-[11px] uppercase tracking-[0.16em]">Money Back</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
