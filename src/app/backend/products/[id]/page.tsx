"use client";

import {
  ArrowLeft,
  Save,
  Plus,
  Info,
  Layers,
  FileText,
  Eye,
  Target,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api-client";
import { useRouter, useParams } from "next/navigation";

export default function EditArchive() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "bags",
    price: "",
    brand: "",
    descriptionEN: "",
    descriptionTH: "",
    isFeatured: false,
    isNewArrival: false,
    image: "",
  });

  useEffect(() => {
    async function loadProduct() {
      try {
        const product = await api.getProductById(id);
        if (product) {
          setFormData({
            name: product.name,
            category: product.category.toLowerCase(),
            price: product.price,
            brand: product.brand,
            descriptionEN: product.description.en,
            descriptionTH: product.description.th,
            isFeatured: product.featured || false,
            isNewArrival: product.newArrival || false,
            image: product.image,
          });
        }
      } catch (err) {
        console.error("Failed to load archive for editing:", err);
      } finally {
        setFetching(false);
      }
    }
    loadProduct();
  }, [id]);

  const handleSave = async () => {
    if (!formData.name || !formData.price) {
      alert("Please provide the archive nomenclature and global valuation.");
      return;
    }

    setLoading(true);
    try {
      await api.updateProduct(id, {
        name: formData.name,
        category: formData.category,
        price: formData.price,
        brand: formData.brand,
        description: {
          en: formData.descriptionEN,
          th: formData.descriptionTH,
        },
        featured: formData.isFeatured,
        newArrival: formData.isNewArrival,
      });

      setSuccess(true);
      setTimeout(() => {
        router.push("/backend/products");
      }, 2000);
    } catch (err) {
      console.error("Vault commitment failure:", err);
      alert("Operational failure during vault commitment.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-black/10 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-16 pb-32 px-4 md:px-0">
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xl"
          >
            <div className="bg-white p-16 text-center space-y-8 border border-zinc-100 shadow-2xl">
              <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                <CheckCircle2 size={40} />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl luxury-serif text-black uppercase tracking-tight">
                  Vault Synchronized
                </h3>
                <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-400 font-black">
                  Archive metadata successfully updated in digital bounty
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-10 border-b border-zinc-100">
        <div className="space-y-4">
          <Link
            href="/backend/products"
            className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase font-black text-zinc-400 hover:text-black transition-all group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Inventory Audit
          </Link>
          <h1 className="text-4xl luxury-serif text-black leading-tight">
            Metadata Amendment
          </h1>
          <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-300 font-black">
            Editing Resource: <span className="text-zinc-500">{id}</span>
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full md:w-auto bg-black text-white px-10 py-5 text-[10px] tracking-[0.5em] uppercase font-black flex items-center justify-center gap-4 hover:bg-zinc-800 transition-all shadow-2xl active:scale-[0.98] group disabled:opacity-50"
        >
          {loading ? (
            <div className="w-4 h-4 border-t-2 border-white rounded-full animate-spin" />
          ) : (
            <Save
              size={18}
              className="group-hover:scale-110 transition-transform"
            />
          )}
          {loading ? "COMMITTING..." : "Save Amendment"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Primary Data Column */}
        <div className="lg:col-span-8 space-y-16">
          {/* Section: Identity */}
          <section className="bg-white border border-zinc-100 p-12 space-y-12 shadow-sm">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-zinc-900 text-white flex items-center justify-center text-xs font-black shadow-lg">
                  01
                </div>
                <h2 className="text-2xl luxury-serif">Core Identity</h2>
              </div>
              <Info size={18} className="text-zinc-200" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-3 group">
                <label className="text-[10px] tracking-[0.3em] uppercase font-black text-zinc-400 group-focus-within:text-black transition-colors">
                  Archive Nomenclature
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="E.G. VINTAGE KELLY 32 SELLIER"
                  className="w-full bg-transparent border-b border-zinc-100 py-4 text-sm focus:border-black outline-none transition-all placeholder:text-zinc-200 uppercase font-black tracking-wider"
                />
              </div>
              <div className="space-y-3 group">
                <label className="text-[10px] tracking-[0.3em] uppercase font-black text-zinc-400 group-focus-within:text-black transition-colors">
                  Original Maison
                </label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) =>
                    setFormData({ ...formData, brand: e.target.value })
                  }
                  placeholder="E.G. HERMÈS"
                  className="w-full bg-transparent border-b border-zinc-100 py-4 text-sm focus:border-black outline-none transition-all placeholder:text-zinc-200 uppercase font-black tracking-wider"
                />
              </div>
              <div className="space-y-3 group">
                <label className="text-[10px] tracking-[0.3em] uppercase font-black text-zinc-400 group-focus-within:text-black transition-colors">
                  Class Taxonomy
                </label>
                <div className="relative">
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-zinc-100 py-4 text-sm focus:border-black outline-none transition-all appearance-none cursor-pointer uppercase font-black tracking-wider"
                  >
                    <option value="bags">Luxury Handbags</option>
                    <option value="accessories">Elite Accessories</option>
                    <option value="jewelry">Finest Jewelry</option>
                  </select>
                  <Layers
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-300 pointer-events-none"
                    size={14}
                  />
                </div>
              </div>
              <div className="space-y-3 group">
                <label className="text-[10px] tracking-[0.3em] uppercase font-black text-zinc-400 group-focus-within:text-black transition-colors">
                  Global Valuation (THB)
                </label>
                <div className="relative">
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-300">
                    ฿
                  </span>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="0.00"
                    className="w-full bg-transparent border-b border-zinc-100 py-4 pl-6 text-sm focus:border-black outline-none transition-all placeholder:text-zinc-200 font-bold"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section: Narrative */}
          <section className="bg-white border border-zinc-100 p-12 space-y-12 shadow-sm">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-zinc-900 text-white flex items-center justify-center text-xs font-black shadow-lg">
                  02
                </div>
                <h2 className="text-2xl luxury-serif">Archive Narrative</h2>
              </div>
              <FileText size={18} className="text-zinc-200" />
            </div>

            <div className="space-y-12">
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-zinc-400">
                  <span className="text-[8px] tracking-[0.5em] font-black uppercase underline underline-offset-8">
                    EN Instance
                  </span>
                </div>
                <textarea
                  value={formData.descriptionEN}
                  onChange={(e) =>
                    setFormData({ ...formData, descriptionEN: e.target.value })
                  }
                  placeholder="ARTICULATE THE PIECE'S PROVENANCE AND CURRENT METRIC CONDITION..."
                  rows={5}
                  className="w-full bg-zinc-50 border border-transparent p-6 text-[13px] focus:bg-white focus:border-zinc-200 outline-none transition-all resize-none font-light leading-relaxed tracking-tight"
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-zinc-400 font-thai">
                  <span className="text-[8px] tracking-[0.5em] font-black uppercase underline underline-offset-8">
                    TH Instance
                  </span>
                </div>
                <textarea
                  value={formData.descriptionTH}
                  onChange={(e) =>
                    setFormData({ ...formData, descriptionTH: e.target.value })
                  }
                  placeholder="บทบรรยายภาษาไทย..."
                  rows={5}
                  className="w-full bg-zinc-50 border border-transparent p-6 text-[13px] focus:bg-white focus:border-zinc-200 outline-none transition-all resize-none font-thai font-light leading-relaxed"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Configuration Sidebar */}
        <div className="lg:col-span-4 space-y-12">
          {/* Section: Visual Stage */}
          <section className="bg-white border border-zinc-100 p-10 space-y-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-6">
              <h2 className="text-[11px] tracking-[0.3em] uppercase font-black">
                Visual Stage
              </h2>
              <Eye size={16} className="text-black" />
            </div>

            <div className="space-y-6">
              <div className="aspect-3/4 bg-zinc-50 border border-zinc-100 relative overflow-hidden group shadow-lg">
                {formData.image ? (
                  <Image
                    src={formData.image}
                    alt="Preview"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-zinc-400">
                    <Plus size={24} />
                    <span className="text-[8px] tracking-widest uppercase mt-2">
                      No Asset
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[9px] tracking-[0.4em] font-black text-white">
                    REPLACE ASSET
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-zinc-100 border border-zinc-50 flex items-center justify-center text-zinc-300 hover:bg-zinc-200 transition-colors cursor-pointer group"
                  >
                    <Plus
                      size={16}
                      className="group-hover:scale-125 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section: Deployment Config */}
          <section className="bg-zinc-950 p-10 space-y-10 text-white shadow-2xl relative overflow-hidden group">
            <Target
              size={40}
              className="text-zinc-900 absolute -bottom-4 -right-4 transition-transform group-hover:scale-110 duration-700"
            />

            <h2 className="text-[11px] tracking-[0.4em] uppercase font-black relative z-10">
              Vault Directives
            </h2>

            <div className="space-y-8 relative z-10">
              <div className="flex items-center justify-between group/toggle">
                <div className="space-y-1">
                  <label className="text-[10px] tracking-[0.3em] uppercase font-black text-zinc-400 group-hover/toggle:text-white transition-colors cursor-pointer">
                    Featured Rank
                  </label>
                  <p className="text-[8px] text-zinc-600 uppercase font-bold">
                    Homepage Priority
                  </p>
                </div>
                <div
                  onClick={() =>
                    setFormData({
                      ...formData,
                      isFeatured: !formData.isFeatured,
                    })
                  }
                  className={`w-12 h-6 rounded-full cursor-pointer relative transition-colors ${formData.isFeatured ? "bg-white" : "bg-zinc-800 hover:bg-zinc-700"}`}
                >
                  <div
                    className={`absolute top-1.5 w-3 h-3 rounded-full transition-all ${formData.isFeatured ? "right-1.5 bg-black" : "left-1.5 bg-zinc-500"}`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between group/toggle">
                <div className="space-y-1">
                  <label className="text-[10px] tracking-[0.3em] uppercase font-black text-zinc-400 group-hover/toggle:text-white transition-colors cursor-pointer">
                    Arrival Status
                  </label>
                  <p className="text-[8px] text-zinc-600 uppercase font-bold">
                    Latest Discovery
                  </p>
                </div>
                <div
                  onClick={() =>
                    setFormData({
                      ...formData,
                      isNewArrival: !formData.isNewArrival,
                    })
                  }
                  className={`w-12 h-6 rounded-full cursor-pointer relative transition-colors ${formData.isNewArrival ? "bg-white" : "bg-zinc-800 hover:bg-zinc-700"}`}
                >
                  <div
                    className={`absolute top-1.5 w-3 h-3 rounded-full transition-all ${formData.isNewArrival ? "right-1.5 bg-black" : "left-1.5 bg-zinc-500"}`}
                  />
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-zinc-900 space-y-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[8px] tracking-[0.3em] font-black text-zinc-500 uppercase">
                  Live Distribution Ready
                </span>
              </div>
              <p className="text-[9px] text-zinc-600 uppercase font-bold leading-relaxed">
                Upon committing, this data instance will be synchronized across
                the global edge network in real-time.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
