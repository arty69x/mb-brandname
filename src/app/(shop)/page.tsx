"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Headphones, ShieldCheck, Truck } from "lucide-react";

import { api } from "@/lib/api-client";
import { Product } from "@/types/api";

const heroImages = [
  "https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/5325880/pexels-photo-5325880.jpeg?auto=compress&cs=tinysrgb&w=1000",
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const response = await api.getProducts({ featured: true });
      setProducts(response.slice(0, 4));
    }

    loadProducts();
  }, []);

  return (
    <main className="bg-[#f2f2f2] text-[#111]">
      <section className="relative min-h-[72vh] grid grid-cols-4 grid-rows-2 overflow-hidden">
        <div className="relative col-span-2 row-span-1">
          <Image src={heroImages[0]} alt="Jewelry hero" fill className="object-cover" priority />
        </div>
        <div className="relative col-span-2 row-span-2">
          <Image src={heroImages[1]} alt="Model hero" fill className="object-cover" priority />
        </div>
        <div className="relative col-span-1 row-span-1">
          <Image src={heroImages[2]} alt="Earring hero" fill className="object-cover" priority />
        </div>
        <div className="col-span-1 row-span-1 bg-black/20" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h1 className="text-white text-center text-3xl md:text-6xl font-light tracking-[0.14em] uppercase">
            No.1 Luxury Brandname Stone
          </h1>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[3/4]">
            <Image
              src="https://images.pexels.com/photos/5370706/pexels-photo-5370706.jpeg?auto=compress&cs=tinysrgb&w=1000"
              alt="Story image"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-5">
            <h2 className="text-3xl font-medium">Each necklace has its own unique story to tell.</h2>
            <p className="text-zinc-700 leading-8">In the world of fashion, true luxury is not defined by price alone, but by the story behind each piece.</p>
            <p className="text-zinc-700 leading-8">Whether worn on a special occasion or as a touch of charm in your everyday look, this necklace completes your style and tells a story of refined taste.</p>
            <Link href="/new-arrivals" className="inline-block rounded-full bg-zinc-700 px-8 py-2 text-xs tracking-[0.2em] text-white uppercase">
              Find Your Style
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-14 md:py-20">
        <h3 className="text-center text-3xl tracking-[0.15em] uppercase mb-12">New Arrivals</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="group">
              <div className="relative aspect-[3/4] bg-zinc-200 overflow-hidden">
                <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="pt-3 text-sm">
                <p className="text-xs text-zinc-500">{product.category}</p>
                <p className="font-medium">{product.name}</p>
                <p>{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/new-arrivals" className="inline-block rounded-full bg-zinc-700 px-8 py-2 text-xs tracking-[0.2em] text-white uppercase">View More</Link>
        </div>
      </section>

      <section className="py-20 px-4 text-center bg-[#ededed]">
        <h3 className="text-3xl tracking-[0.15em] uppercase mb-12">About Us</h3>
        <p className="text-2xl md:text-4xl font-semibold uppercase max-w-4xl mx-auto mb-8">100% Authentic Branded Items From Japan</p>
        <p className="max-w-4xl mx-auto text-zinc-700 leading-8 uppercase">Carefully selected and imported directly from Japan. With over 10 years of experience in authentic secondhand branded goods, we guarantee genuine quality.</p>

        <div className="max-w-5xl mx-auto mt-16 grid md:grid-cols-3 gap-10">
          <div className="flex flex-col items-center gap-3">
            <Truck className="w-9 h-9" strokeWidth={1.5} />
            <p className="font-semibold">Fast And Free Delivery</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Headphones className="w-9 h-9" strokeWidth={1.5} />
            <p className="font-semibold">24/7 Customer Support</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <ShieldCheck className="w-9 h-9" strokeWidth={1.5} />
            <p className="font-semibold">Money Back Guarantee</p>
          </div>
        </div>
      </section>
    </main>
  );
}
