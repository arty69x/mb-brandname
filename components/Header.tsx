import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, Search, ShoppingBag, Heart } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/new-arrivals', label: 'New Arrivals' },
  { href: '/bags', label: 'Bags' },
  { href: '/accessories', label: 'Accessories' },
  { href: '/about', label: 'About us' }
];

export function Header() {
  const { cart, setSearchOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const cartCount = Array.isArray(cart)
    ? cart.reduce((total, item) => total + (typeof item.quantity === 'number' ? item.quantity : 0), 0)
    : 0;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 border-b transition-all duration-300 ease-in-out ${scrolled ? 'border-[#E6E6E6] bg-[#FFFFFF]' : 'border-transparent bg-transparent'}`}>
      <div className="hidden h-[72px] items-center justify-between container mx-auto px-4 lg:flex">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-[32px] font-light leading-none">MB</Link>
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-[13px] uppercase tracking-[0.08em] font-light transition-all duration-300 ease-in-out hover:opacity-70">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button type="button" aria-label="Open search" onClick={() => setSearchOpen(true)} className="transition-all duration-300 ease-in-out hover:opacity-70">
            <Search size={16} />
          </button>
          <Link href="/wishlist" aria-label="Wishlist" className="transition-all duration-300 ease-in-out hover:opacity-70">
            <Heart size={16} />
          </Link>
          <Link href="/cart" aria-label="Cart" className="relative transition-all duration-300 ease-in-out hover:opacity-70">
            <ShoppingBag size={16} />
            {cartCount > 0 ? <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#C8A96A] text-[10px] text-[#111111]">{Math.min(cartCount, 9)}</span> : null}
          </Link>
        </div>
      </div>

      <div className="flex h-[56px] items-center justify-between container mx-auto px-4 lg:hidden">
        <div className="flex items-center gap-6">
          <button type="button" aria-label="Menu" className="transition-all duration-300 ease-in-out hover:opacity-70">
            <Menu size={20} />
          </button>
          <button type="button" aria-label="Search" onClick={() => setSearchOpen(true)} className="transition-all duration-300 ease-in-out hover:opacity-70">
            <Search size={20} />
          </button>
        </div>

        <Link href="/" className="text-[30px] leading-none font-light">MB</Link>

        <Link href="/cart" aria-label="Cart" className="relative transition-all duration-300 ease-in-out hover:opacity-70">
          <ShoppingBag size={20} />
          {cartCount > 0 ? <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#C8A96A] text-[10px] text-[#111111]">{Math.min(cartCount, 9)}</span> : null}
        </Link>
      </div>
    </header>
  );
}
