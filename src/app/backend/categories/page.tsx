"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import { Category } from "@/types/api";
import { Plus, Edit2, Trash2, Layers, Database } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function BackendCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      try {
        const data = await api.getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  return (
    <div className="space-y-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl luxury-serif text-black leading-tight tracking-tight">
            Category Architecture
          </h1>
          <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-400 font-black flex items-center gap-2">
            Structural taxonomy and slug distribution
          </p>
        </div>
        <button className="flex items-center gap-3 bg-black text-white px-8 py-4 text-[10px] tracking-widest uppercase font-black hover:bg-zinc-800 transition-all shadow-xl">
          <Plus size={16} /> Define Taxonomy
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {loading
          ? [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-80 bg-zinc-50 animate-pulse border border-zinc-100"
              />
            ))
          : categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-zinc-100 group overflow-hidden relative shadow-sm hover:shadow-xl transition-all duration-700"
              >
                <div className="relative h-64 bg-zinc-900">
                  <Image
                    src={cat.image}
                    alt={cat.name.en}
                    fill
                    className="object-cover opacity-50 group-hover:scale-110 group-hover:opacity-70 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-4">
                    <span className="text-[8px] tracking-[0.6em] text-white/40 uppercase font-black">
                      Node Identifier
                    </span>
                    <h3 className="text-white text-3xl luxury-serif tracking-widest drop-shadow-2xl">
                      {cat.name.en}
                    </h3>
                    <div className="w-10 h-px bg-white/20 group-hover:w-20 transition-all duration-700" />
                  </div>
                </div>

                <div className="p-8 flex justify-between items-center bg-white relative z-10">
                  <div className="space-y-2">
                    <p className="text-[9px] tracking-[0.3em] uppercase font-black text-zinc-300">
                      Routing Instance
                    </p>
                    <p className="text-[11px] font-black text-black tracking-widest uppercase">
                      /{cat.slug}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-3 hover:bg-zinc-100 rounded-sm transition-all text-zinc-400 hover:text-black">
                      <Edit2 size={16} strokeWidth={1.5} />
                    </button>
                    <button className="p-3 hover:bg-red-50 rounded-sm transition-all text-zinc-400 hover:text-red-600">
                      <Trash2 size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>

                {/* Hover Indicator */}
                <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Database size={14} className="text-white/40" />
                </div>
              </motion.div>
            ))}
      </div>

      <div className="bg-zinc-950 p-16 flex flex-col items-center justify-center text-center space-y-8 relative overflow-hidden group">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white rounded-full blur-[100px]" />
        </div>

        <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white/20 relative z-10 group-hover:text-white transition-colors duration-700">
          <Layers size={32} />
        </div>
        <div className="space-y-4 relative z-10">
          <h4 className="text-[12px] tracking-[0.5em] uppercase font-black text-white">
            Global Taxonomy Distribution
          </h4>
          <p className="text-zinc-500 text-[10px] tracking-[0.2em] uppercase max-w-lg mx-auto leading-loose font-bold">
            Refining the category architecture impacts the storefront&apos;s
            navigational gravity. Every slug change is propagated through the
            CDN in real-time.
          </p>
        </div>
        <button className="relative z-10 text-[10px] tracking-[0.4em] uppercase font-black border-b border-white pb-2 text-white hover:text-zinc-400 hover:border-zinc-400 transition-all">
          Audit Routing Structure
        </button>
      </div>
    </div>
  );
}
