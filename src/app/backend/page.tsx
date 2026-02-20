"use client";

import { motion } from "framer-motion";
import {
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
  ArrowUpRight,
  Plus,
  ShieldAlert,
  Clock,
  ChevronRight,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";

export default function BackendDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    inventoryValue: "0",
    newArrivals: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [products, categories] = await Promise.all([
          api.getProducts(),
          api.getCategories(),
        ]);

        const totalValue = products.reduce(
          (acc, p) => acc + (parseFloat(p.price.replace(/,/g, "")) || 0),
          0,
        );
        const newArrivalsCount = products.filter((p) => p.newArrival).length;

        setStats({
          products: products.length,
          categories: categories.length,
          inventoryValue: totalValue.toLocaleString(),
          newArrivals: newArrivalsCount,
        });
      } catch (err) {
        console.error("Failed to load dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const cards = [
    {
      label: "Archived Pieces",
      value: stats.products,
      icon: Package,
      color: "text-zinc-900",
      bg: "bg-zinc-50",
      desc: "Total authenticated units in vault",
    },
    {
      label: "Active Nodes",
      value: stats.categories,
      icon: ShoppingCart,
      color: "text-zinc-600",
      bg: "bg-zinc-50",
      desc: "Curated category verticals",
    },
    {
      label: "Holding Value",
      value: `฿${stats.inventoryValue}`,
      icon: TrendingUp,
      color: "text-zinc-900",
      bg: "bg-zinc-100",
      desc: "Estimated total portfolio value",
    },
    {
      label: "Pulse Rate",
      value: stats.newArrivals,
      icon: Users,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      desc: "New arrivals in last 72 hours",
    },
  ];

  return (
    <div className="space-y-24">
      {/* Header Architecture */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-zinc-100 pb-12">
        <div className="space-y-3">
          <h1 className="text-5xl luxury-serif text-black leading-none tracking-tight">
            Vault Overview
          </h1>
          <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-400 font-black flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            Synchronized with Tokyo Database — v2.4.0
          </p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <Link
            href="/backend/products/new"
            className="flex-1 md:flex-none flex items-center justify-center gap-4 bg-black text-white px-10 py-5 text-[10px] tracking-[0.3em] uppercase font-black hover:bg-zinc-800 transition-all shadow-[0_15px_30px_rgba(0,0,0,0.1)] group"
          >
            <Plus
              size={16}
              className="group-hover:rotate-90 transition-transform duration-700"
            />
            Add Entry
          </Link>
        </div>
      </div>

      {/* Stats Grid — Tiered Discovery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: i * 0.1,
              duration: 0.8,
              ease: [0.19, 1, 0.22, 1],
            }}
            className="bg-white p-10 border border-zinc-100 relative group overflow-hidden soft-hover"
          >
            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <ArrowUpRight size={14} className="text-zinc-300" />
            </div>

            <div
              className={`${card.bg} ${card.color} w-14 h-14 flex items-center justify-center mb-10 transition-transform duration-700 group-hover:scale-110`}
            >
              <card.icon size={20} strokeWidth={1} />
            </div>

            <div className="space-y-1">
              <span className="text-[9px] tracking-[0.25em] uppercase font-bold text-zinc-400">
                {card.label}
              </span>
              <p className="text-4xl font-light tracking-tighter text-black">
                {loading ? (
                  <span className="inline-block w-24 h-8 bg-zinc-50 animate-pulse" />
                ) : (
                  card.value
                )}
              </p>
              <p className="text-[8px] tracking-widest text-zinc-300 uppercase font-medium pt-2">
                {card.desc}
              </p>
            </div>

            {/* Subtle Gradient Glow */}
            <div
              className={`absolute -bottom-10 -right-10 w-32 h-32 ${card.bg} opacity-0 group-hover:opacity-30 rounded-full blur-3xl transition-opacity duration-1000`}
            />
          </motion.div>
        ))}
      </div>

      {/* Strategic Insights & System Diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Active Directives */}
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-white border border-zinc-100 p-12 space-y-12">
            <div className="flex justify-between items-end border-b border-zinc-50 pb-10">
              <div className="space-y-2">
                <h3 className="text-3xl luxury-serif">Active Directives</h3>
                <p className="text-[10px] tracking-[0.2em] text-zinc-400 uppercase font-medium">
                  Core System Workflows
                </p>
              </div>
              <span className="text-[9px] tracking-widest uppercase font-bold text-zinc-300">
                System Latency: 12ms
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <Link href="/backend/products" className="group block space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-zinc-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                    <Package size={16} strokeWidth={1} />
                  </div>
                  <h4 className="text-[11px] tracking-[0.3em] font-black uppercase text-zinc-900 group-hover:translate-x-1 transition-transform">
                    Inventory Sync
                  </h4>
                </div>
                <p className="text-[11px] text-zinc-500 font-light leading-loose tracking-wide text-justify italic font-thai">
                  Audit authenticated pieces, refine valuations, and distribute
                  archives to global endpoints across the synchronized network.
                </p>
                <div className="pt-4 flex items-center gap-3 text-[9px] tracking-[0.4em] uppercase font-black text-black opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                  Launch Terminal <ChevronRight size={12} strokeWidth={2} />
                </div>
              </Link>

              <Link href="/backend/hero" className="group block space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-zinc-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                    <ImageIcon size={16} strokeWidth={1} />
                  </div>
                  <h4 className="text-[11px] tracking-[0.3em] font-black uppercase text-zinc-900 group-hover:translate-x-1 transition-transform">
                    Visual Feed
                  </h4>
                </div>
                <p className="text-[11px] text-zinc-500 font-light leading-loose tracking-wide text-justify italic font-thai">
                  Curate the leading visual narratives for the boutique. Deploy
                  un-compromised motion backdrops and high-fidelity localized
                  assets.
                </p>
                <div className="pt-4 flex items-center gap-3 text-[9px] tracking-[0.4em] uppercase font-black text-black opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                  Configure UI <ChevronRight size={12} strokeWidth={2} />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* System & Security Sidebar */}
        <div className="lg:col-span-4 space-y-12">
          {/* Security Module */}
          <div className="bg-zinc-950 p-12 text-white space-y-10 relative overflow-hidden group border border-white/5">
            <ShieldAlert
              size={60}
              className="text-white opacity-[0.03] absolute -top-4 -right-4 rotate-12 group-hover:opacity-[0.08] group-hover:scale-125 transition-all duration-1000"
            />
            <div className="space-y-4 relative z-10">
              <h3 className="text-2xl luxury-serif text-white">
                Security Protocol
              </h3>
              <p className="text-[10px] tracking-[0.2em] text-zinc-500 font-bold uppercase leading-relaxed">
                Node operating within Ginza-Standard encrypted environment. All
                data persists to private instances.
              </p>
            </div>
            <button className="relative z-10 w-full bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 py-5 text-[9px] tracking-[0.5em] uppercase font-black transition-all duration-500">
              Run Integrity Check
            </button>
          </div>

          {/* Uptime Module */}
          <div className="bg-white border border-zinc-100 p-12 flex flex-col justify-between h-[240px] soft-hover">
            <div className="flex items-center gap-4 text-emerald-500">
              <Clock size={18} strokeWidth={1} />
              <span className="text-[10px] tracking-[0.4em] uppercase font-black">
                Uptime: 99.98%
              </span>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-[9px] tracking-widest text-zinc-400 uppercase font-bold">
                  Network Connectivity
                </p>
                <p className="text-sm font-light uppercase tracking-tighter">
                  Content Distribution:{" "}
                  <span className="text-emerald-500 font-black">Active</span>
                </p>
              </div>
              <div className="w-full h-px bg-zinc-50" />
              <p className="text-[10px] text-zinc-400 font-medium tracking-wide">
                Distributed via Tokyo Node 01
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
