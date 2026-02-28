"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Headphones, ShieldCheck, Truck } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { api } from "@/lib/api-client";
import { Product } from "@/types/api";
import { HOME_MOCK, SERVICE_MOCK } from "@/lib/mock-content";

const SERVICE_ICONS = [Truck, Headphones, ShieldCheck] as const;

export default function HomePage() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);

  useEffect(() => {
    async function load() {
      const [featuredData, arrivalData] = await Promise.all([
        api.getProducts({ featured: true }),
        api.getProducts({ newArrival: true }),
      ]);
      setFeatured(featuredData.slice(0, 4));
      setNewArrivals(arrivalData.slice(0, 4));
    }
    load();
  }, []);

  const spotlight = useMemo(() => featured[0] ?? null, [featured]);

  return (
    <main className="pt-16 bg-[#f3f3f3] text-zinc-900">
      <section className="relative h-[70vh] md:h-[84vh] overflow-hidden">
        <div className="grid grid-cols-2 h-full">
          <div className="grid grid-rows-2">
            <div className="relative">
              <Image src={HOME_MOCK.heroImages[0]} alt="hero left" fill className="object-cover" priority />
            </div>
            <div className="relative">
              <Image src={HOME_MOCK.heroImages[1]} alt="hero bottom left" fill className="object-cover" priority />
            </div>
          </div>
          <div className="relative">
            <Image src={HOME_MOCK.heroImages[2]} alt="hero right" fill className="object-cover" priority />
          </div>
        </div>

        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 text-white">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-6">Authentic Luxury Archives</p>
          <h1 className="text-4xl md:text-7xl tracking-[0.08em] leading-tight max-w-5xl">{HOME_MOCK.heroTitle}</h1>
          <Link href="/new-arrivals" className="mt-8 border border-white px-8 py-3 text-xs tracking-[0.25em] uppercase hover:bg-white hover:text-black transition-colors">
            Discover Collection
          </Link>
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto px-4 md:px-8 py-16 grid lg:grid-cols-[380px_1fr] gap-10 items-center">
        <div className="relative aspect-[3/4] overflow-hidden group">
          <Image src={HOME_MOCK.story.image} alt="story" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-zinc-500 mb-4">Editorial Story</p>
          <h2 className="text-3xl md:text-5xl mb-6 leading-tight">{HOME_MOCK.story.title}</h2>
          {HOME_MOCK.story.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-zinc-700 leading-8 mb-5 max-w-3xl">
              {paragraph}
            </p>
          ))}
          <Link href="/about" className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] border-b border-black pb-1 hover:gap-4 transition-all">
            Read our philosophy
          </Link>
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto px-4 md:px-8 py-10">
        <div className="flex items-end justify-between mb-8">
          <h3 className="text-3xl md:text-4xl tracking-wide">Featured Selection</h3>
          <Link href="/new-arrivals" className="text-xs uppercase tracking-[0.2em] border-b border-black pb-1">View all</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
          {featured.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      {spotlight && (
        <section className="max-w-[1240px] mx-auto px-4 md:px-8 py-14">
          <div className="bg-white border border-zinc-200 grid md:grid-cols-[1.2fr_1fr]">
            <div className="relative aspect-[4/3] md:aspect-auto min-h-80">
              <Image src={spotlight.image} alt={spotlight.name} fill className="object-cover" />
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <p className="text-xs tracking-[0.25em] uppercase text-zinc-500 mb-3">Spotlight Item</p>
              <h4 className="text-2xl md:text-3xl mb-2">{spotlight.name}</h4>
              <p className="text-zinc-700 mb-6 line-clamp-4">{spotlight.description.en}</p>
              <Link href={`/product/${spotlight.id}`} className="inline-block bg-black text-white px-6 py-3 text-xs tracking-[0.2em] uppercase w-fit hover:bg-zinc-800">
                View item
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="max-w-[1240px] mx-auto px-4 md:px-8 py-10">
        <div className="flex items-end justify-between mb-8">
          <h3 className="text-3xl md:text-4xl tracking-wide">New Arrivals</h3>
          <Link href="/new-arrivals" className="text-xs uppercase tracking-[0.2em] border-b border-black pb-1">Browse all</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      <section className="py-16 bg-[#ececec] text-center px-4 mt-8">
        <h3 className="text-4xl mb-7">ABOUT US</h3>
        <h4 className="text-2xl md:text-4xl font-semibold mb-4">{HOME_MOCK.about.title}</h4>
        <p className="max-w-5xl mx-auto uppercase tracking-wide text-zinc-700 leading-8 text-sm md:text-lg">
          {HOME_MOCK.about.description}
        </p>
      </section>

      <section className="max-w-[1240px] mx-auto px-4 md:px-8 py-14 grid md:grid-cols-3 gap-8 text-center">
        {SERVICE_MOCK.map((item, index) => {
          const Icon = SERVICE_ICONS[index];
          return (
            <div key={item.title} className="bg-white border border-zinc-200 p-8 hover:border-zinc-400 transition-colors">
              <Icon className="mx-auto mb-3" />
              <p className="font-medium mb-1">{item.title}</p>
              <p className="text-xs text-zinc-600">{item.subtitle}</p>
            </div>
          );
        })}
      </section>
    </main>
  );
}
