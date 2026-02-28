import Link from "next/link";
import { useState } from "react";
import { useStore } from "../../context/store";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { cartCount } = useStore();

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-30 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between px-4 py-5">
          <Link href="/" className="text-[11px] font-black uppercase tracking-[0.3em]">MB ARCHIVE</Link>
          <nav className="hidden items-center gap-6 md:flex text-[11px] font-black uppercase tracking-[0.3em]">
            <Link href="/shop">SHOP</Link>
            <Link href="/wishlist">WISHLIST</Link>
            <Link href="/compare">COMPARE</Link>
            <Link href="/cart">CART({cartCount})</Link>
            <Link href="/account">ACCOUNT</Link>
          </nav>
          <button className="text-[11px] font-black uppercase tracking-[0.3em] md:hidden" onClick={() => setOpen(true)}>MENU</button>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
