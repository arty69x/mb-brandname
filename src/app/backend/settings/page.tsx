"use client";

import { useState } from "react";
import {
  Settings,
  Database,
  Globe,
  Shield,
  Save,
  CheckCircle2,
  RefreshCw,
  Server,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function BackendSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1500);
  };

  const tabs = [
    { id: "general", label: "System Config", icon: Settings },
    { id: "database", label: "Tokyo Node", icon: Database },
    { id: "security", label: "Access Protocols", icon: Shield },
    { id: "regional", label: "Localization", icon: Globe },
  ];

  return (
    <div className="space-y-16 max-w-4xl">
      <div className="flex justify-between items-end pb-10 border-b border-zinc-100">
        <div className="space-y-4">
          <h1 className="text-4xl luxury-serif text-black leading-tight">
            System Configuration
          </h1>
          <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-400 font-black flex items-center gap-3">
            Recursive Node: MB-CORE-ALPHA-01
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`flex items-center gap-4 px-10 py-5 text-[10px] tracking-[0.5em] uppercase font-black transition-all shadow-2xl active:scale-[0.98] ${
            saved
              ? "bg-emerald-500 text-white"
              : "bg-black text-white hover:bg-zinc-800"
          }`}
        >
          {isSaving ? (
            <RefreshCw className="animate-spin" size={18} />
          ) : saved ? (
            <CheckCircle2 size={18} />
          ) : (
            <Save size={18} />
          )}
          {saved ? "State Synchronized" : "Commit Changes"}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Tab Navigation */}
        <div className="lg:w-64 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 text-[10px] tracking-[0.25em] uppercase font-black transition-all ${
                activeTab === tab.id
                  ? "bg-black text-white shadow-lg translate-x-2"
                  : "text-zinc-400 hover:text-black hover:bg-zinc-50"
              }`}
            >
              <tab.icon size={16} strokeWidth={2} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="grow space-y-12">
          <AnimatePresence mode="wait">
            {activeTab === "general" && (
              <motion.div
                key="general"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div className="bg-white border border-zinc-100 p-10 space-y-10">
                  <h3 className="text-xl luxury-serif pb-6 border-b border-zinc-50">
                    Global Instance
                  </h3>
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <label className="text-[9px] tracking-[0.3em] uppercase font-black text-zinc-400">
                        Environment Node
                      </label>
                      <p className="text-sm font-black text-black tracking-widest uppercase">
                        Tokyo Synchronized Production
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className="text-[9px] tracking-[0.3em] uppercase font-black text-zinc-400">
                          API Protocol
                        </label>
                        <div className="flex items-center gap-3 text-emerald-500 font-black text-[10px] tracking-widest uppercase">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                          SECURE-HTTPS-V3
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[9px] tracking-[0.3em] uppercase font-black text-zinc-400">
                          CDN Propagation
                        </label>
                        <div className="flex items-center gap-3 text-blue-500 font-black text-[10px] tracking-widest uppercase">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                          EDGE-GLOBAL-01
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-zinc-100 p-10 space-y-10">
                  <h3 className="text-xl luxury-serif pb-6 border-b border-zinc-50">
                    Boutique Identity
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-[9px] tracking-[0.3em] uppercase font-black text-zinc-400">
                        Site Title
                      </label>
                      <input
                        type="text"
                        defaultValue="MB BRANDNAME"
                        className="w-full bg-zinc-50 border border-transparent focus:bg-white focus:border-zinc-200 p-4 text-xs font-black tracking-[0.2em] outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] tracking-[0.3em] uppercase font-black text-zinc-400">
                        Meta Description
                      </label>
                      <textarea
                        rows={3}
                        defaultValue="Curating the rarest luxury archives directly from Japan."
                        className="w-full bg-zinc-50 border border-transparent focus:bg-white focus:border-zinc-200 p-4 text-xs font-light leading-relaxed outline-none transition-all resize-none"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "database" && (
              <motion.div
                key="database"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-zinc-950 p-12 text-white space-y-10 border border-white/5"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl luxury-serif">Node Intelligence</h3>
                  <Server size={24} className="text-zinc-800" />
                </div>
                <div className="space-y-8">
                  <div className="p-6 bg-white/5 border border-white/10 space-y-3">
                    <span className="text-[9px] tracking-[0.4em] uppercase text-zinc-500 font-black">
                      Cluster Status
                    </span>
                    <div className="flex items-center gap-4">
                      <div className="h-2 grow bg-zinc-900 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "98%" }}
                          transition={{ duration: 1.5 }}
                          className="h-full bg-linear-to-r from-emerald-500 to-teal-400"
                        />
                      </div>
                      <span className="text-[10px] font-black uppercase text-emerald-400">
                        Stable
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] tracking-[0.3em] uppercase font-black text-zinc-600">
                      Replication Factor
                    </label>
                    <p className="text-lg luxury-serif">
                      3x Redundancy (Japan-East / US-West / EU-North)
                    </p>
                  </div>
                </div>
                <button className="w-full bg-white text-black py-4 text-[10px] tracking-[0.5em] uppercase font-black hover:bg-zinc-200 transition-all">
                  Sync Primary Node
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
