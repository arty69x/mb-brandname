"use client";

import Link from "next/link";
import { Search, User, ShoppingBag, Menu, X, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchOverlay from "./SearchOverlay";

export default function Navbar() {
  const { totalItems } = useCart();
  const { isLoggedIn, user, isAdmin } = useAuth();
  const { locale, setLocale, t } = useLanguage();
  const pathname = usePathname();

  const isBackend = pathname?.startsWith("/backend");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPromoVisible, setIsPromoVisible] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // If we are in the backend, don't show the consumer navbar
  // Scroll handling: collapse promo bar on scroll down, show on scroll up
  useEffect(() => {
    if (isBackend) return;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > 120) {
        setIsPromoVisible(false);
      } else {
        setIsPromoVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setExpandedCategory(null);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Pages with hero banners that need transparent navbar
  const isTransparentPage = ["/", "/about"].includes(pathname);
  const isTransparent = isTransparentPage && !isScrolled && !isMobileMenuOpen;

  const textColor = isTransparent ? "text-white" : "text-black";
  const iconColor = isTransparent ? "text-white" : "text-black";

  // Main navigation links
  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/new-arrivals", label: t("nav.newArrivals"), isNew: true },
    { href: "/bags", label: t("nav.bags") },
    { href: "/accessories", label: t("nav.accessories") },
    { href: "/about", label: t("nav.about") },
  ];

  // Mobile navigation links
  const mobileDirectLinks = [
    { href: "/", label: t("nav.home") },
    {
      href: "/new-arrivals",
      label: t("nav.newArrivals"),
      isNew: true,
    },
    { href: "/about", label: t("nav.about") },
  ];

  const mobileCategories = [
    {
      label: locale === "th" ? "คอลเลกชัน" : "COLLECTIONS",
      items: [
        {
          href: "/new-arrivals",
          label: t("nav.newArrivals"),
        },
        { href: "/bags", label: t("nav.bags") },
        {
          href: "/accessories",
          label: t("nav.accessories"),
        },
      ],
    },
    {
      label: locale === "th" ? "สินค้า" : "PRODUCTS",
      items: [
        {
          href: "/bags",
          label: locale === "th" ? "กระเป๋าทั้งหมด" : "ALL BAGS",
        },
        {
          href: "/accessories",
          label: locale === "th" ? "เครื่องประดับทั้งหมด" : "ALL ACCESSORIES",
        },
      ],
    },
  ];

  const toggleCategory = (label: string) => {
    setExpandedCategory(expandedCategory === label ? null : label);
  };

  // If we are in the backend, don't show the consumer navbar
  if (isBackend) return null;

  return (
    <>
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <header className="fixed top-0 left-0 w-full z-50">
        {/* ─── Top Promo / Marquee Bar ─── */}
        <motion.div
          animate={{
            height: isPromoVisible ? "auto" : 0,
            opacity: isPromoVisible ? 1 : 0,
          }}
          className="bg-black text-white text-[10px] tracking-[0.2em] font-medium overflow-hidden border-b border-white/5"
        >
          <div className="h-10 flex items-center justify-between px-6 lg:px-12">
            {/* Left: Language Toggle */}
            <div className="hidden lg:flex gap-4 border-r border-zinc-800 pr-8 mr-2 shrink-0">
              <button
                onClick={() => setLocale("en")}
                className={`hover:text-zinc-400 transition-colors ${locale === "en" ? "text-white font-bold" : "text-zinc-500"}`}
              >
                EN
              </button>
              <button
                onClick={() => setLocale("th")}
                className={`hover:text-zinc-400 transition-colors ${locale === "th" ? "text-white font-bold" : "text-zinc-500"}`}
              >
                TH
              </button>
            </div>

            {/* Center: Marquee */}
            <div className="grow overflow-hidden relative h-full flex items-center justify-center mx-4">
              <motion.div
                className="whitespace-nowrap absolute flex items-center gap-16"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                style={{ width: "fit-content" }}
              >
                {[...Array(6)].map((_, i) => (
                  <span
                    key={i}
                    className="text-[9px] tracking-[0.25em] uppercase px-8"
                  >
                    AUTHENTIC JAPAN DIRECT IMPORT{" "}
                    <span className="text-zinc-500 mx-4">|</span> FREE WORLDWIDE
                    SHIPPING <span className="text-zinc-500 mx-4">|</span>{" "}
                    SECURE 2025 AUTHENTICITY
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right: Social/Utility */}
            <div className="hidden lg:flex gap-6 border-l border-zinc-800 pl-8 ml-2 shrink-0">
              <Link
                href="/about"
                className="hover:text-zinc-400 transition-colors"
              >
                CONCIERGE
              </Link>
            </div>
          </div>
        </motion.div>

        <nav
          className={`w-full transition-all duration-700 cubic-bezier(0.19, 1, 0.22, 1) border-b relative ${
            isTransparent
              ? "bg-transparent border-white/10"
              : "bg-white/95 backdrop-blur-xl border-zinc-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)]"
          }`}
        >
          <div
            className={`container mx-auto px-6 lg:px-12 flex items-center justify-between transition-all duration-500 ${isScrolled ? "h-16" : "h-24"}`}
          >
            {/* Left Cluster: Menu & Desktop Links */}
            <div className="flex-1 flex items-center gap-12">
              <button
                className={`md:hidden p-1 ${iconColor} hover:scale-110 transition-transform`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu size={20} strokeWidth={1} />
              </button>

              <div
                className={`hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.35em] transition-colors ${textColor}`}
              >
                {navLinks.slice(0, 3).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="hover:opacity-40 transition-all font-thai relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-current transition-all duration-500 group-hover:w-full" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Absolute Center: Logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <Link href="/" className="group block">
                <Logo
                  variant={isTransparent ? "light" : "dark"}
                  className={`${isScrolled ? "scale-[0.85]" : "scale-100"} transition-all duration-700 cubic-bezier(0.19, 1, 0.22, 1)`}
                />
              </Link>
            </div>

            {/* Right Cluster: Desktop Links & Icons */}
            <div className="flex-1 flex items-center justify-end gap-8 lg:gap-12">
              <div
                className={`hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.35em] transition-colors ${textColor}`}
              >
                {navLinks.slice(3).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="hover:opacity-40 transition-all font-thai relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-current transition-all duration-500 group-hover:w-full" />
                  </Link>
                ))}
              </div>

              <div className={`flex items-center gap-6 lg:gap-8 ${iconColor}`}>
                {isAdmin && (
                  <Link
                    href="/backend"
                    className="hidden xl:flex items-center gap-2 border border-current px-3 py-1.5 text-[8px] tracking-widest uppercase font-black hover:bg-black hover:text-white transition-all"
                  >
                    <ShieldCheck size={12} strokeWidth={1} /> VAULT
                  </Link>
                )}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="hidden md:block hover:scale-110 transition-transform"
                >
                  <Search size={18} strokeWidth={1} />
                </button>
                <Link
                  href="/login"
                  className="hover:scale-110 transition-transform"
                >
                  {isLoggedIn ? (
                    <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[8px] font-black">
                      {user?.name.charAt(0)}
                    </div>
                  ) : (
                    <User size={18} strokeWidth={1} />
                  )}
                </Link>
                <Link
                  href="/cart"
                  className="relative hover:scale-110 transition-transform"
                >
                  <ShoppingBag size={18} strokeWidth={1} />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-black text-white text-[7px] w-4 h-4 flex items-center justify-center rounded-full font-black animate-in fade-in zoom-in">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* ─── Mobile Menu ─── */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-0 bg-white z-60 md:hidden flex flex-col p-10 font-thai"
            >
              <div className="flex justify-between items-center mb-10">
                <Logo variant="dark" />
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X size={26} />
                </button>
              </div>

              <div className="space-y-6 overflow-y-auto grow">
                {mobileDirectLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-2xl font-black tracking-widest uppercase"
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="w-full h-px bg-zinc-100 my-10" />

                {mobileCategories.map((cat) => (
                  <div key={cat.label} className="space-y-4">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 font-black">
                      {cat.label}
                    </p>
                    <div className="flex flex-col gap-3">
                      {cat.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="text-lg font-black tracking-wider uppercase"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}

                {isAdmin && (
                  <Link
                    href="/backend"
                    className="flex items-center gap-3 text-emerald-600 text-lg font-black tracking-widest uppercase pt-8"
                  >
                    <ShieldCheck size={20} /> VAULT ACCESS
                  </Link>
                )}
              </div>

              <div className="pt-10 border-t border-zinc-100 flex gap-6">
                <button
                  onClick={() => setLocale("en")}
                  className={`text-sm font-black ${locale === "en" ? "text-black" : "text-zinc-300"}`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLocale("th")}
                  className={`text-sm font-black ${locale === "th" ? "text-black" : "text-zinc-300"}`}
                >
                  TH
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
