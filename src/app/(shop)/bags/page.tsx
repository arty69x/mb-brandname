"use client";

import Image from "next/image";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { api } from "@/lib/api-client";
import { Product } from "@/types/api";

export default function BagsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const data = await api.getProducts({ category: "bags" });
      setProducts(data);
    }

    loadProducts();
  }, []);

  const display = useMemo(() => products.slice(0, 15), [products]);

  return (
    <main className="bg-[#f2f2f2] min-h-screen">
      <section className="relative h-[360px] md:h-[420px] overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&cs=tinysrgb&w=2000"
          alt="Bags banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-7xl uppercase font-light tracking-[0.14em]">Bags</h1>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.12em] border-b border-zinc-300 pb-4 mb-8">
          <button className="hover:text-black text-zinc-600">Default Sorting</button>
          <div className="flex items-center gap-3 text-zinc-700">
            <span>View</span>
            <span className="underline">3</span>
            <span>4</span>
            <button className="flex items-center gap-2"><SlidersHorizontal className="w-3 h-3" />Filter</button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-6">
          {display.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="group">
              <div className="relative aspect-square md:aspect-[3/4] overflow-hidden bg-zinc-200">
                <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="pt-3 text-sm">
                <p className="text-xs text-zinc-500">{product.category}</p>
                <p>{product.name}</p>
                <p className="font-medium">{product.price}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="text-xs uppercase tracking-[0.14em] border-b border-black">Show More</button>
        </div>
      </section>
    </main>
  );
}
