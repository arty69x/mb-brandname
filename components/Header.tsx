import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, Search, ShoppingBag, Heart } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/new-arrivals', label: 'New Arrivals' },
  { href: '/bags', label: 'Bags' },
  { href: '/accessories', label: 'Accessories' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
];

export function Header() {
  const { cart, setSearchOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const cartCount = Array.isArray(cart)
    ? cart.reduce((total, item) => total + (typeof item.quantity === 'number' ? item.quantity : 0), 0)
    : 0;

  return (
    <header
      className={`sticky top-0 z-[50] transition-all duration-300 ease-in-out ${
        scrolled ? 'border-b border-black/10 bg-white' : 'bg-transparent'
      }`}
    >
      <div className="hidden h-[72px] items-center justify-between px-4 md:px-6 lg:flex lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-[32px] font-light leading-none">
            MB
          </Link>
          <span className="text-[13px] uppercase tracking-[0.08em]">Brandname</span>
        </div>

        <nav className="flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-normal uppercase tracking-[0.08em] transition-all duration-300 ease-in-out hover:opacity-60"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Open search"
            onClick={() => setSearchOpen(true)}
            className="transition-all duration-300 ease-in-out hover:opacity-60"
          >
            <Search size={18} />
          </button>
          <Link href="/wishlist" aria-label="Wishlist" className="transition-all duration-300 ease-in-out hover:opacity-60">
            <Heart size={18} />
          </Link>
          <Link href="/cart" aria-label="Cart" className="relative transition-all duration-300 ease-in-out hover:opacity-60">
            <ShoppingBag size={18} />
            {cartCount > 0 ? (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#111111] text-[10px] text-[#FFFFFF]">
                {cartCount}
              </span>
            ) : null}
          </Link>
        </div>
      </div>

      <div className="relative flex h-[56px] items-center justify-between px-4 lg:hidden">
        <div className="flex items-center gap-4">
          <button type="button" aria-label="Menu" className="transition-all duration-300 ease-in-out hover:opacity-60">
            <Menu size={20} />
          </button>
          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            className="transition-all duration-300 ease-in-out hover:opacity-60"
          >
            <Search size={20} />
          </button>
        </div>
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-[28px] font-light leading-none">
          MB
        </Link>
        <Link href="/cart" aria-label="Cart" className="relative transition-all duration-300 ease-in-out hover:opacity-60">
          <ShoppingBag size={20} />
          {cartCount > 0 ? (
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#111111] text-[10px] text-[#FFFFFF]">
              {cartCount}
            </span>
          ) : null}
        </Link>
      </div>
    </header>
  );
}
