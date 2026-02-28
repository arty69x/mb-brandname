import Link from "next/link";

const links = ["/shop", "/wishlist", "/compare", "/cart", "/account"];

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div className={`fixed inset-0 z-40 bg-white transition-transform duration-700 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end"><button onClick={onClose} className="text-xl">×</button></div>
        <nav className="mt-8 flex flex-col gap-6">
          {links.map((href) => (
            <Link key={href} href={href} onClick={onClose} className="text-3xl uppercase tracking-[0.3em]">{href.replace("/", "") || "home"}</Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
