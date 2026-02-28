"use client";

import Link from "next/link";
import { Menu, Search, ShoppingBag, User, Heart, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import Logo from "./Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/new-arrivals", label: "New Arrivals" },
  { href: "/bags", label: "Bags" },
  { href: "/accessories", label: "Accessories" },
  { href: "/about", label: "About us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/backend")) return null;

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? "bg-white/95 backdrop-blur border-b border-zinc-200" : "bg-white border-b border-zinc-200"}`}>
        <div className="h-16 max-w-[1280px] mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link href="/" className="shrink-0">
            <Logo variant="dark" />
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-[13px]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:underline underline-offset-4 transition-colors ${pathname === link.href ? "underline font-semibold" : "text-zinc-700 hover:text-black"}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4 text-zinc-900">
            <button aria-label="Search" className="hover:text-zinc-500"><Search size={16} /></button>
            <button aria-label="Account" className="hover:text-zinc-500"><User size={16} /></button>
            <Link href="/wishlist" className="relative hover:text-zinc-500" aria-label="Wishlist">
              <Heart size={16} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 w-3.5 h-3.5 rounded-full bg-black text-white text-[9px] grid place-items-center">
                  {wishlist.length > 9 ? "9+" : wishlist.length}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative hover:text-zinc-500" aria-label="Cart">
              <ShoppingBag size={16} />
              <span className="absolute -top-2 -right-2 w-3.5 h-3.5 rounded-full bg-black text-white text-[9px] grid place-items-center">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            </Link>
          </div>

          <button className="md:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu size={22} />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[70] bg-[#f1f1f1] pt-8 px-6 overflow-y-auto md:hidden">
          <div className="flex justify-end">
            <button aria-label="Close menu" onClick={() => setMobileOpen(false)}>
              <X size={44} strokeWidth={1.5} />
            </button>
          </div>

          <div className="mt-8 space-y-3 text-[42px] leading-[1.02] font-semibold">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
                {link.label.toUpperCase()}
              </Link>
            ))}
            <Link href="/wishlist" onClick={() => setMobileOpen(false)}>WISHLIST +</Link>
            <Link href="/cart" onClick={() => setMobileOpen(false)}>CART +</Link>
          </div>
        </div>
      )}
    </>
  );
}
