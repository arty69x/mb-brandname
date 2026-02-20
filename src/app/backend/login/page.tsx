"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, Lock, User, ArrowRight, Loader2 } from "lucide-react";

export default function BackendLogin() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        // Double check if it was an admin login (the simulation handles this in context)
        router.push("/backend");
      } else {
        setError("Invalid credentials or insufficient clearance.");
      }
    } catch (_err) {
      setError("System unreachable. Internal Error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 font-thai relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px] z-10"
      >
        <div className="bg-black border border-white/10 p-12 shadow-2xl space-y-10 group hover:border-white/20 transition-all duration-700">
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 bg-white flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <Shield className="text-black" size={32} />
            </div>
            <h1 className="text-3xl luxury-serif text-white tracking-widest uppercase">
              Security Gateway
            </h1>
            <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-500 font-bold">
              MB Brandname Vault Authorization
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
              <div className="relative group/field">
                <User
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within/field:text-white transition-colors"
                  size={16}
                />
                <input
                  type="email"
                  placeholder="ADMIN EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent border-b border-white/10 py-4 pl-8 text-[11px] tracking-[0.2em] text-white focus:border-white outline-none transition-all placeholder:text-zinc-700"
                />
              </div>
              <div className="relative group/field">
                <Lock
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within/field:text-white transition-colors"
                  size={16}
                />
                <input
                  type="password"
                  placeholder="ACCESS KEY"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-transparent border-b border-white/10 py-4 pl-8 text-[11px] tracking-[0.2em] text-white focus:border-white outline-none transition-all placeholder:text-zinc-700"
                />
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-[10px] font-bold tracking-widest uppercase text-center"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-5 text-[10px] tracking-[0.5em] uppercase font-black hover:bg-zinc-200 transition-all disabled:opacity-50 flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <>
                  Enter Vault <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          <div className="pt-6 border-t border-white/5 flex flex-col items-center gap-4">
            <p className="text-[9px] tracking-[0.2em] uppercase text-zinc-600 font-medium">
              System strictly monitored. unauthorized access is logged.
            </p>
            <div className="flex gap-4">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[8px] tracking-widest text-zinc-400 uppercase">
                Secure Node Active
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center flex flex-col gap-2">
          <span className="text-[9px] tracking-widest text-zinc-600 uppercase">
            Test Credentials
          </span>
          <span className="text-[9px] tracking-widest text-zinc-400 uppercase">
            admin@mb-brandname.com / admin123
          </span>
        </div>
      </motion.div>
    </div>
  );
}
