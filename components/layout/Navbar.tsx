import Link from "next/link";
import { useEffect, useState } from "react";
import { useStore } from "../../context/store";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { cartCount } = useStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const base = scrolled ? "bg-white border-b border-gray-100 text-black" : "bg-transparent text-white";

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-30 transition duration-700 ease-out ${base}`}>
        <div className="container mx-auto flex items-center justify-between px-4 py-5">
          <Link href="/" className="text-[11px] font-black uppercase tracking-[0.3em]">MB ARCHIVE</Link>
          <nav className="hidden gap-6 md:flex text-[11px] font-black uppercase tracking-[0.3em]">
            <Link href="/shop">SHOP</Link><Link href="/wishlist">WISHLIST</Link><Link href="/compare">COMPARE</Link><Link href="/cart">CART({cartCount})</Link><Link href="/account">ACCOUNT</Link>
          </nav>
          <button className="md:hidden text-[11px] font-black uppercase tracking-[0.3em]" onClick={() => setOpen(true)}>MENU</button>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
