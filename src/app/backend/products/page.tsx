"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import { Product } from "@/types/api";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Filter,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function BackendProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await api.getProducts();
      setProducts(data || []);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to purge "${name}" from the Vault?`))
      return;

    try {
      await api.deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
      setSuccessMsg("Archive entry successfully purged");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("Purge failure:", err);
      alert("Failed to purge the archive entry.");
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-12">
      <AnimatePresence>
        {successMsg && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed top-10 right-10 z-100 bg-black text-white px-8 py-5 flex items-center gap-4 border border-white/10 shadow-2xl"
          >
            <CheckCircle2 size={18} className="text-emerald-500" />
            <span className="text-[10px] tracking-[0.3em] uppercase font-black">
              {successMsg}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl luxury-serif mb-2">Inventory Audit</h1>
          <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-400 font-black flex items-center gap-2">
            Authenticated luxury archives curated for the global market
          </p>
        </div>
        <Link
          href="/backend/products/new"
          className="flex items-center gap-3 bg-black text-white px-8 py-4 text-[10px] tracking-widest uppercase font-black hover:bg-zinc-800 transition-all shadow-2xl"
        >
          <Plus size={16} /> Register Entry
        </Link>
      </div>

      {/* Advanced Toolbar */}
      <div className="bg-white border border-zinc-100 p-6 flex flex-col lg:flex-row justify-between items-center gap-6 shadow-sm">
        <div className="relative w-full lg:w-[500px] group">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-black transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="FILTER BY PIECE, BRAND, OR CATEGORY..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-50 border border-transparent focus:border-zinc-200 outline-none pl-14 pr-6 py-4 text-[11px] tracking-[0.2em] uppercase font-bold transition-all placeholder:text-zinc-300"
          />
        </div>
        <div className="flex items-center gap-8 w-full lg:w-auto justify-end">
          <button className="flex items-center gap-3 text-[10px] tracking-widest uppercase font-black text-zinc-400 hover:text-black transition-colors">
            <Filter size={16} /> Advanced Filter
          </button>
          <div className="w-px h-6 bg-zinc-100" />
          <span className="text-[10px] tracking-widest uppercase text-zinc-900 font-black">
            {filteredProducts.length}{" "}
            <span className="text-zinc-400">Archived Items</span>
          </span>
        </div>
      </div>

      {/* Data Grid */}
      <div className="bg-white border border-zinc-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50/50">
                <th className="py-6 px-8 text-[10px] tracking-[0.3em] uppercase font-black text-zinc-400">
                  Archive Piece
                </th>
                <th className="py-6 px-8 text-[10px] tracking-[0.3em] uppercase font-black text-zinc-400">
                  Class
                </th>
                <th className="py-6 px-8 text-[10px] tracking-[0.3em] uppercase font-black text-zinc-400">
                  Valuation
                </th>
                <th className="py-6 px-8 text-[10px] tracking-[0.3em] uppercase font-black text-zinc-400">
                  Assets
                </th>
                <th className="py-6 px-8 text-[10px] tracking-[0.3em] uppercase font-black text-zinc-400">
                  Status
                </th>
                <th className="py-6 px-8 text-[10px] tracking-[0.3em] uppercase font-black text-zinc-400 text-right">
                  Directives
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {loading ? (
                [...Array(6)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={6} className="py-10 px-8">
                      <div className="h-12 bg-zinc-50 rounded-sm" />
                    </td>
                  </tr>
                ))
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-40 px-8 text-center">
                    <div className="max-w-xs mx-auto space-y-4">
                      <p className="text-zinc-300 text-[10px] tracking-[0.5em] uppercase font-black">
                        Empty Result
                      </p>
                      <p className="text-zinc-500 text-xs font-light">
                        No archives detected in the current filter parameters.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-zinc-50/80 transition-all group"
                  >
                    <td className="py-6 px-8">
                      <div className="flex items-center gap-6">
                        <div className="relative w-16 aspect-3/4 bg-zinc-100 overflow-hidden shrink-0 shadow-sm transition-transform group-hover:scale-105 duration-500">
                          <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="space-y-1">
                          <p className="text-[13px] font-black tracking-tight uppercase text-zinc-900 leading-tight">
                            {p.name}
                          </p>
                          <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-400 font-bold underline decoration-zinc-200 underline-offset-4">
                            {p.brand}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-8 font-thai">
                      <span className="text-[10px] tracking-widest uppercase font-black text-zinc-500 bg-zinc-100 px-4 py-1.5 rounded-sm">
                        {p.category}
                      </span>
                    </td>
                    <td className="py-6 px-8">
                      <div className="space-y-1">
                        <p className="text-sm font-light tracking-tighter text-black">
                          ฿{p.price}
                        </p>
                        <p className="text-[9px] tracking-widest uppercase font-black text-zinc-300">
                          THB Instance
                        </p>
                      </div>
                    </td>
                    <td className="py-6 px-8">
                      <span
                        className={`text-[11px] font-black ${p.stock < 3 ? "text-red-500" : "text-zinc-600"} flex items-center gap-2`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${p.stock < 3 ? "bg-red-500 animate-pulse" : "bg-emerald-500"}`}
                        />
                        {p.stock}{" "}
                        <span className="text-[9px] text-zinc-300">Units</span>
                      </span>
                    </td>
                    <td className="py-6 px-8">
                      <div className="flex flex-wrap gap-2">
                        {p.featured && (
                          <span className="text-[8px] tracking-[0.2em] uppercase font-black text-amber-700 bg-amber-100/50 px-2.5 py-1 rounded-sm border border-amber-200/50">
                            Featured
                          </span>
                        )}
                        {p.newArrival && (
                          <span className="text-[8px] tracking-[0.2em] uppercase font-black text-blue-700 bg-blue-100/50 px-2.5 py-1 rounded-sm border border-blue-200/50">
                            Arrival
                          </span>
                        )}
                        {!p.featured && !p.newArrival && (
                          <span className="text-[8px] tracking-[0.2em] uppercase font-black text-zinc-400 bg-zinc-50 px-2.5 py-1 rounded-sm">
                            Base
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-6 px-8 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 duration-500">
                        <Link
                          href={`/backend/products/${p.id}`}
                          className="p-2.5 hover:bg-zinc-200 rounded transition-all text-zinc-600"
                          title="Edit Metadata"
                        >
                          <Edit2 size={16} strokeWidth={1.5} />
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          className="p-2.5 hover:bg-red-50 hover:text-red-600 rounded transition-all text-zinc-600"
                          title="Purge Entry"
                        >
                          <Trash2 size={16} strokeWidth={1.5} />
                        </button>
                        <Link
                          href={`/product/${p.id}`}
                          target="_blank"
                          className="p-2.5 hover:bg-zinc-200 rounded transition-all text-zinc-600"
                          title="Sync Review"
                        >
                          <ExternalLink size={16} strokeWidth={1.5} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Precision Pagination */}
      <div className="flex flex-col md:flex-row justify-between items-center py-10 border-t border-zinc-100 gap-6">
        <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 font-black">
          Data Instance:{" "}
          <span className="text-black underline">mb-archives-primary-01</span>
        </p>
        <div className="flex gap-4">
          <button
            className="h-12 px-6 border border-zinc-200 flex items-center justify-center text-zinc-400 hover:border-black hover:text-black transition-all disabled:opacity-20 uppercase text-[9px] tracking-widest font-black"
            disabled
          >
            <ChevronLeft size={16} className="mr-2" /> Previous
          </button>
          <button className="h-12 px-6 border border-black flex items-center justify-center text-zinc-900 font-black hover:bg-zinc-50 transition-all uppercase text-[9px] tracking-widest">
            Next <ChevronRight size={16} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}
