import Link from "next/link";
import { useEffect } from "react";

const links = ["/shop", "/wishlist", "/compare", "/cart", "/orders", "/account"];

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className={`fixed inset-0 z-40 h-screen w-full bg-white transition-transform duration-500 ${open ? "translate-x-0" : "translate-x-full"}`}>
      <button onClick={onClose} className="absolute right-5 top-5 text-2xl leading-none">×</button>
      <div className="flex h-full items-center px-8">
        <nav className="flex flex-col gap-8">
          {links.map((href) => (
            <Link key={href} href={href} onClick={onClose} className="text-2xl font-light uppercase tracking-[0.45em]">
              {href.replace("/", "")}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
