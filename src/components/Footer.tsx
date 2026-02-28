import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-16 grid grid-cols-2 md:grid-cols-5 gap-10 text-sm border-b border-white/10">
        <div className="col-span-2 md:col-span-1 space-y-4">
          <Logo variant="light" />
          <p className="text-white/70 text-xs leading-6 mt-4">
            1418 River Drive, Suite 35 Cottonhall, CA 9622
            <br />
            United States
            <br />
            sale@uomo.com
            <br />
            +1 246-345-0695
          </p>
        </div>

        <div>
          <h4 className="uppercase text-xs tracking-wider mb-4">Company</h4>
          <div className="space-y-2 text-white/70">
            <Link href="/about" className="block hover:text-white">About Us</Link>
            <Link href="#" className="block hover:text-white">Careers</Link>
            <Link href="#" className="block hover:text-white">Affiliates</Link>
            <Link href="#" className="block hover:text-white">Blog</Link>
            <Link href="#" className="block hover:text-white">Contact Us</Link>
          </div>
        </div>

        <div>
          <h4 className="uppercase text-xs tracking-wider mb-4">Shop</h4>
          <div className="space-y-2 text-white/70">
            <Link href="/new-arrivals" className="block hover:text-white">New Arrivals</Link>
            <Link href="/accessories" className="block hover:text-white">Accessories</Link>
            <Link href="/bags" className="block hover:text-white">Bags</Link>
            <Link href="/wishlist" className="block hover:text-white">Wishlist</Link>
          </div>
        </div>

        <div>
          <h4 className="uppercase text-xs tracking-wider mb-4">Help</h4>
          <div className="space-y-2 text-white/70">
            <Link href="#" className="block hover:text-white">Customer Service</Link>
            <Link href="/profile" className="block hover:text-white">My Account</Link>
            <Link href="#" className="block hover:text-white">Find a Store</Link>
            <Link href="/privacy" className="block hover:text-white">Legal & Privacy</Link>
          </div>
        </div>

        <div>
          <h4 className="uppercase text-xs tracking-wider mb-4">Opening Time</h4>
          <p className="text-white/70 text-xs leading-7">
            Mon - Fri: 8AM – 9PM
            <br />
            Sat: 9 AM – 8 PM
            <br />
            Sun: Closed
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-5 text-xs text-white/60 flex items-center justify-between">
        <p>©2026 MB Brandname</p>
        <p>United Kingdom | English | $ USD</p>
      </div>
    </footer>
  );
}
