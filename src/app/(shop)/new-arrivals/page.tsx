"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { api } from "@/lib/api-client";
import { Product } from "@/types/api";

const brandFilters = ["All", "Hermès", "Chanel", "Louis Vuitton", "Dior"];

type SortMode = "latest" | "price-asc" | "price-desc";

export default function NewArrivalsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [brand, setBrand] = useState("All");
  const [sortMode, setSortMode] = useState<SortMode>("latest");
  const [columns, setColumns] = useState<3 | 4 | 5>(5);

  useEffect(() => {
    api.getProducts({ newArrival: true }).then(setProducts);
  }, []);

  const filtered = useMemo(() => {
    let data = [...products];

    if (brand !== "All") {
      data = data.filter((item) => item.brand === brand);
    }

    if (sortMode === "price-asc") {
      data.sort((a, b) => Number(a.price.toString().replace(/,/g, "")) - Number(b.price.toString().replace(/,/g, "")));
    }

    if (sortMode === "price-desc") {
      data.sort((a, b) => Number(b.price.toString().replace(/,/g, "")) - Number(a.price.toString().replace(/,/g, "")));
    }

    return data;
  }, [brand, products, sortMode]);

  const gridClass = columns === 3 ? "md:grid-cols-3" : columns === 4 ? "md:grid-cols-4" : "md:grid-cols-5";

  return (
    <main className="pt-16 bg-[#f2f2f2] min-h-screen">
      <section className="relative h-64 md:h-[390px]">
        <Image
          src="/mock/banner.svg"
          alt="new arrivals"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center">
          <p className="text-[10px] tracking-[0.35em] uppercase mb-3">Tokyo Archive Selection</p>
          <h1 className="text-5xl md:text-7xl tracking-[0.08em]">NEW ARRIVALS</h1>
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto px-4 md:px-8 py-6 md:py-8">
        <div className="flex flex-col gap-4 border-b border-zinc-300 pb-5">
          <div className="flex flex-wrap gap-2">
            {brandFilters.map((item) => (
              <button
                key={item}
                onClick={() => setBrand(item)}
                className={`text-xs uppercase border px-2.5 py-1 transition-colors ${brand === item ? "bg-black text-white border-black" : "border-zinc-400 hover:border-zinc-700"}`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <span>Sort:</span>
              <button className={`px-2 py-1 border ${sortMode === "latest" ? "bg-black text-white" : ""}`} onClick={() => setSortMode("latest")}>Latest</button>
              <button className={`px-2 py-1 border ${sortMode === "price-asc" ? "bg-black text-white" : ""}`} onClick={() => setSortMode("price-asc")}>Price ↑</button>
              <button className={`px-2 py-1 border ${sortMode === "price-desc" ? "bg-black text-white" : ""}`} onClick={() => setSortMode("price-desc")}>Price ↓</button>
            </div>
            <div className="flex items-center gap-2">
              <span>View:</span>
              {[3, 4, 5].map((v) => (
                <button key={v} className={`px-2 py-1 border ${columns === v ? "bg-black text-white" : ""}`} onClick={() => setColumns(v as 3 | 4 | 5)}>{v}</button>
              ))}
            </div>
          </div>
        </div>

        <div className={`grid grid-cols-2 ${gridClass} gap-4 md:gap-6 mt-8`}>
          {filtered.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="text-center mt-10 text-xs text-zinc-600">Showing {filtered.length} items</div>
      </section>
    </main>
  );
}
