"use client";

import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, CheckCircle2 } from "lucide-react";

function LoginForm() {
  const { login, register, isLoggedIn, user } = useAuth();
  const { locale, t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const isTH = locale === "th";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    let ok = false;
    if (mode === "login") {
      ok = await login(email, password);
      ok = await login(email, password);
      if (!ok) setError(t("auth.invalidEmail"));
    } else {
      if (!name.trim()) {
        setError(t("auth.nameRequired"));
        setLoading(false);
        return;
      }
      ok = await register(name, email, password);
      if (!ok) setError(t("auth.passwordLength"));
    }

    setLoading(false);
    if (ok) {
      setSuccess(true);
      setTimeout(() => router.push(redirectUrl), 1200);
    }
  };

  // If already logged in, show account info
  if (isLoggedIn && !success) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="grow pt-40 pb-20 px-6 font-thai">
          <div className="max-w-md mx-auto text-center space-y-12">
            <div className="w-20 h-20 mx-auto rounded-full bg-zinc-100 flex items-center justify-center text-2xl font-light uppercase text-zinc-600">
              {user?.name.charAt(0)}
            </div>
            <div className="space-y-3">
              <h1 className="text-2xl tracking-[0.2em] uppercase font-light">
                {t("auth.welcome")}, {user?.name}
              </h1>
              <p className="text-sm text-zinc-400">{user?.email}</p>
            </div>
            <div className="space-y-4">
              <Link
                href="/cart"
                className="block border border-black px-8 py-4 text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-black hover:text-white transition-all"
              >
                {t("auth.viewCart")}
              </Link>
              <Link
                href="/new-arrivals"
                className="block border border-zinc-200 px-8 py-4 text-[10px] tracking-[0.3em] uppercase font-bold text-zinc-500 hover:border-black hover:text-black transition-all"
              >
                {t("auth.continueShopping")}
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow pt-32 pb-20 font-thai">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
          {/* Left: Image */}
          <div className="relative hidden lg:block overflow-hidden">
            <Image
              src="https://images.pexels.com/photos/1204464/pexels-photo-1204464.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1600&fit=crop"
              alt="Login"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-12 left-12 right-12 text-white space-y-3">
              <div className="absolute bottom-12 left-12 right-12 text-white space-y-3">
                <h2 className="text-3xl font-light tracking-wide whitespace-pre-line">
                  {t("auth.welcomeTitle")}
                </h2>
                <p className="text-xs opacity-70 tracking-wider leading-relaxed">
                  {t("auth.signInDesc")}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="flex items-center justify-center px-8 md:px-16 py-16">
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6"
                >
                  <div className="w-16 h-16 mx-auto bg-emerald-50 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={32} className="text-emerald-500" />
                  </div>
                  <h2 className="text-xl tracking-[0.2em] uppercase font-light">
                    {t("auth.success")}
                  </h2>
                  <p className="text-xs text-zinc-400 tracking-wider">
                    {t("auth.redirecting")}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-sm space-y-10"
                >
                  {/* Tabs */}
                  <div className="flex gap-8 border-b border-zinc-200">
                    <button
                      onClick={() => {
                        setMode("login");
                        setError("");
                      }}
                      className={`pb-4 text-[11px] tracking-[0.3em] uppercase font-bold transition-all ${
                        mode === "login"
                          ? "border-b-2 border-black text-black"
                          : "text-zinc-400 hover:text-zinc-600"
                      }`}
                    >
                      {t("auth.signIn")}
                    </button>
                    <button
                      onClick={() => {
                        setMode("register");
                        setError("");
                      }}
                      className={`pb-4 text-[11px] tracking-[0.3em] uppercase font-bold transition-all ${
                        mode === "register"
                          ? "border-b-2 border-black text-black"
                          : "text-zinc-400 hover:text-zinc-600"
                      }`}
                    >
                      {t("auth.register")}
                    </button>
                  </div>

                  {/* Heading */}
                  <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl luxury-serif tracking-tight leading-[0.9] uppercase">
                      {mode === "login"
                        ? t("auth.welcomeBack")
                        : t("auth.joinArchive")}
                    </h1>
                    <p className="text-[10px] tracking-ultra uppercase text-zinc-400 font-bold leading-relaxed">
                      {mode === "login"
                        ? t("auth.signInAction")
                        : t("auth.registerAction")}
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {mode === "register" && (
                      <div className="space-y-4 group">
                        <label className="text-[9px] tracking-ultra uppercase font-black text-zinc-400 group-focus-within:text-black transition-colors">
                          {t("auth.fullName")}
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full border-b border-zinc-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent text-xs tracking-widest font-bold uppercase placeholder:text-zinc-300"
                          placeholder={isTH ? "สมชาย ใจดี" : "JOHN DOE"}
                          required
                        />
                      </div>
                    )}

                    <div className="space-y-4 group">
                      <label className="text-[9px] tracking-ultra uppercase font-black text-zinc-400 group-focus-within:text-black transition-colors">
                        {t("auth.email")}
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border-b border-zinc-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent text-xs tracking-widest font-bold uppercase placeholder:text-zinc-300"
                        placeholder={
                          isTH ? "you@example.com" : "CLIENT@EXAMPLE.COM"
                        }
                        required
                      />
                    </div>

                    <div className="space-y-4 group">
                      <label className="text-[9px] tracking-ultra uppercase font-black text-zinc-400 group-focus-within:text-black transition-colors">
                        {t("auth.password")}
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full border-b border-zinc-200 py-3 pr-10 focus:outline-none focus:border-black transition-colors bg-transparent text-xs tracking-widest font-bold uppercase placeholder:text-zinc-300"
                          placeholder="••••••••"
                          required
                          minLength={4}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-0 top-3 text-zinc-300 hover:text-black transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff size={16} strokeWidth={1.5} />
                          ) : (
                            <Eye size={16} strokeWidth={1.5} />
                          )}
                        </button>
                      </div>
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-50 border border-red-100 flex items-center gap-3"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        <span className="text-[9px] text-red-600 tracking-widest uppercase font-bold">
                          {error}
                        </span>
                      </motion.div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-black text-white py-5 text-[10px] tracking-ultra uppercase font-black hover:bg-zinc-800 transition-all shadow-xl flex items-center justify-center gap-4 disabled:opacity-50 group/btn"
                    >
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>
                            {mode === "login"
                              ? t("auth.authenticate")
                              : t("auth.registerAccount")}
                          </span>
                          <ArrowRight
                            size={14}
                            className="group-hover/btn:translate-x-1 transition-transform"
                          />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Divider */}
                  <div className="flex items-center gap-4">
                    <div className="grow h-px bg-zinc-200" />
                    <span className="text-[9px] tracking-[0.2em] text-zinc-400 uppercase">
                      {t("auth.or")}
                    </span>
                    <div className="grow h-px bg-zinc-200" />
                  </div>

                  {/* Social Login */}
                  <button className="w-full border border-zinc-200 py-4 text-[10px] tracking-[0.2em] uppercase font-bold hover:border-black transition-colors flex items-center justify-center gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    {t("auth.continueGoogle")}
                  </button>

                  {/* Footer text */}
                  <p className="text-[9px] text-zinc-400 text-center tracking-wider leading-relaxed">
                    {t("auth.terms")}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-zinc-200 border-t-black rounded-full animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
