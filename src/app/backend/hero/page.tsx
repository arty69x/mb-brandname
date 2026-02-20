"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import { HeroSlide } from "@/types/api";
import {
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Play,
  Image as ImageIcon,
  Save,
  Monitor,
  Smartphone,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function BackendHero() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSlides() {
      setLoading(true);
      try {
        const data = await api.getHeroSlides();
        setSlides(data);
      } catch (err) {
        console.error("Failed to fetch slides:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSlides();
  }, []);

  return (
    <div className="space-y-16 max-w-7xl mx-auto pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
        <div className="space-y-2">
          <h1 className="text-4xl luxury-serif text-black leading-tight tracking-tight">
            Hero Experience
          </h1>
          <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-400 font-black flex items-center gap-3">
            <span className="flex gap-1">
              <Monitor size={12} /> <Smartphone size={12} />
            </span>
            Curating high-fidelity visual trajectories
          </p>
        </div>
        <button className="w-full md:w-auto flex items-center justify-center gap-4 bg-black text-white px-10 py-5 text-[10px] tracking-[0.5em] uppercase font-black hover:bg-zinc-800 transition-all shadow-2xl group active:scale-[0.98]">
          <Plus
            size={18}
            className="group-hover:rotate-180 transition-transform duration-700"
          />{" "}
          New Narrative
        </button>
      </div>

      <div className="space-y-12">
        <AnimatePresence mode="popLayout">
          {loading ? (
            <div className="flex flex-col justify-center items-center py-40 space-y-6">
              <div className="w-12 h-12 border-t-2 border-black rounded-full animate-spin" />
              <span className="text-[10px] tracking-[0.4em] uppercase font-black opacity-20">
                Accessing Visual Feed
              </span>
            </div>
          ) : (
            slides.map((slide, index) => (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-white border border-zinc-100 group relative shadow-sm hover:shadow-2xl transition-all duration-700"
              >
                {/* Index Badge */}
                <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-black text-white flex items-center justify-center text-[11px] font-black z-10 shadow-2xl">
                  0{index + 1}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  {/* Visual Canvas Rendering */}
                  <div className="lg:col-span-5 relative aspect-video lg:aspect-auto bg-zinc-950 overflow-hidden shadow-inner">
                    <Image
                      src={slide.image}
                      alt="Slide Preview"
                      fill
                      className="object-cover opacity-40 group-hover:scale-110 group-hover:opacity-60 transition-all duration-3200"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/20 to-transparent flex flex-col justify-end p-10">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                          <p className="text-[8px] tracking-[0.5em] uppercase text-white/40 font-black">
                            Live Content Stage
                          </p>
                        </div>
                        <h4 className="text-2xl luxury-serif text-white leading-tight drop-shadow-xl">
                          {slide.title?.en ?? ""}
                        </h4>
                      </div>
                    </div>
                    {slide.video && (
                      <div className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/5 backdrop-blur-xl flex items-center justify-center text-white border border-white/10 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                        <Play size={14} fill="currentColor" strokeWidth={0} />
                      </div>
                    )}
                  </div>

                  {/* Content Control Instance */}
                  <div className="lg:col-span-7 p-12 lg:p-16 space-y-12 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-8">
                        <div className="space-y-3 group/field">
                          <label className="text-[10px] tracking-[0.3em] uppercase font-black text-zinc-300 group-focus-within/field:text-black transition-colors">
                            Primary Heading (EN)
                          </label>
                          <input
                            type="text"
                            defaultValue={slide.title?.en ?? ""}
                            className="w-full bg-transparent border-b border-zinc-100 py-4 text-base focus:border-black outline-none transition-all luxury-serif placeholder:text-zinc-100"
                          />
                        </div>
                        <div className="space-y-3 group/field font-thai">
                          <label className="text-[10px] tracking-[0.3em] uppercase font-black text-zinc-300 group-focus-within/field:text-black transition-colors">
                            Heading Translation (TH)
                          </label>
                          <input
                            type="text"
                            defaultValue={slide.title?.th ?? ""}
                            className="w-full bg-transparent border-b border-zinc-100 py-4 text-base focus:border-black outline-none transition-all font-thai placeholder:text-zinc-100"
                          />
                        </div>
                      </div>

                      <div className="space-y-8">
                        <div className="space-y-3 group/field">
                          <label className="text-[10px] tracking-[0.3em] uppercase font-black text-zinc-300 group-focus-within/field:text-black transition-colors">
                            Sub-Narrative (EN)
                          </label>
                          <input
                            type="text"
                            defaultValue={slide.subtitle?.en ?? ""}
                            className="w-full bg-transparent border-b border-zinc-100 py-4 text-[13px] focus:border-black outline-none transition-all tracking-wider font-light text-zinc-600"
                          />
                        </div>
                        <div className="space-y-3 group/field font-thai">
                          <label className="text-[10px] tracking-[0.3em] uppercase font-black text-zinc-300 group-focus-within/field:text-black transition-colors">
                            Narrative Translation (TH)
                          </label>
                          <input
                            type="text"
                            defaultValue={slide.subtitle?.th ?? ""}
                            className="w-full bg-transparent border-b border-zinc-100 py-4 text-[13px] focus:border-black outline-none transition-all font-thai font-light text-zinc-600"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col xl:flex-row justify-between items-center pt-12 border-t border-zinc-50 gap-8">
                      <div className="flex gap-8 w-full xl:w-auto overflow-x-auto pb-4 xl:pb-0 scrollbar-none">
                        <button className="shrink-0 flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase font-black text-zinc-400 hover:text-black transition-colors group/btn">
                          <ImageIcon
                            size={18}
                            className="group-hover/btn:scale-110 transition-transform"
                          />{" "}
                          Replace Asset
                        </button>
                        {slide.video && (
                          <button className="shrink-0 flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase font-black text-zinc-400 hover:text-black transition-colors group/btn">
                            <Play
                              size={18}
                              className="group-hover/btn:scale-110 transition-transform"
                            />{" "}
                            Reconfigure Feed
                          </button>
                        )}
                        <div className="shrink-0 flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase font-black text-emerald-500">
                          <CheckCircle2 size={16} /> Optimized 4K
                        </div>
                      </div>

                      <div className="flex items-center gap-4 w-full xl:w-auto justify-end">
                        <div className="flex bg-zinc-50 border border-zinc-100 p-1">
                          <button className="p-4 hover:bg-white hover:shadow-sm transition-all text-zinc-300 hover:text-black active:scale-90">
                            <MoveUp size={16} strokeWidth={2.5} />
                          </button>
                          <button className="p-4 hover:bg-white hover:shadow-sm transition-all text-zinc-300 hover:text-black active:scale-90">
                            <MoveDown size={16} strokeWidth={2.5} />
                          </button>
                        </div>
                        <button className="p-4 group/del text-zinc-300 hover:text-red-500 transition-colors">
                          <Trash2
                            size={20}
                            className="group-hover/del:rotate-12 transition-transform"
                          />
                        </button>
                        <button className="bg-black text-white px-10 py-5 text-[10px] tracking-[0.5em] uppercase font-black flex items-center gap-4 hover:bg-zinc-800 transition-all shadow-xl active:scale-95 group">
                          <Save
                            size={18}
                            className="group-hover:scale-110 transition-transform"
                          />{" "}
                          Save State
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Global Directive Notice */}
      <div className="bg-zinc-950 p-20 text-center relative overflow-hidden group border border-white/5">
        <div className="absolute top-0 right-0 p-10 opacity-10 flex gap-4 rotate-12 group-hover:rotate-0 transition-all duration-1000">
          <Monitor size={80} />
          <Smartphone size={80} />
        </div>

        <div className="relative z-10 space-y-8">
          <h3 className="text-white text-3xl luxury-serif tracking-widest leading-tight">
            Visual Deployment Strategy
          </h3>
          <p className="text-zinc-500 text-[11px] tracking-[0.3em] uppercase max-w-3xl mx-auto leading-loose font-bold">
            High-convergance hero trajectories utilize 4K-ready video sequences
            (mutted, 30fps+) and structural typography. Ensure all focal points
            are mobile-responsive and maintain localized brand gravity across
            all edge nodes.
          </p>
          <div className="w-12 h-px bg-white/20 mx-auto" />
          <p className="text-[9px] tracking-[0.5em] text-zinc-700 uppercase font-bold">
            Node MB-HERO-DEPLOY-01 / Global Sync Active
          </p>
        </div>
      </div>
    </div>
  );
}
