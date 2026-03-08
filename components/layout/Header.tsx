import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Heart, Menu, ShoppingBag } from 'lucide-react';
import Drawer from './Drawer';
import { getCart } from '@/lib/cart';

const links = [
  { href: '/new-arrivals', label: 'NEW ARRIVALS' },
  { href: '/bags', label: 'BAGS' },
  { href: '/accessories', label: 'ACCESSORIES' },
  { href: '/shop', label: 'SHOP' },
  { href: '/about', label: 'ABOUT US' },
];

function Brand() {
  return (
    <Link href='/' className='leading-none'>
      <span className='font-serif text-[30px] font-semibold tracking-[0.01em] text-black sm:text-[34px]'>
        GENTLEWOMAN
      </span>
    </Link>
  );
}

export default function Header({ variant = 'solid' }: { variant?: 'home' | 'solid' }) {
  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const isHome = variant === 'home';

  useEffect(() => {
    const refresh = () => {
      const total = getCart().reduce((sum, item) => sum + item.qty, 0);
      setCartCount(total);
    };

    refresh();
    window.addEventListener('focus', refresh);
    window.addEventListener('storage', refresh);

    return () => {
      window.removeEventListener('focus', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const headerClass = useMemo(
    () =>
      isHome
        ? 'absolute left-0 right-0 top-0 z-30 border-b border-white/10 bg-black/55 text-white'
        : 'border-b border-[#d7d7d7] bg-[#f2f2f2] text-black',
    [isHome],
  );

  return (
    <header className={headerClass}>
      <div className='container mx-auto px-4'>
        <div className='flex h-[56px] items-center justify-between gap-3 sm:h-[64px]'>
          <button
            aria-label='Open menu'
            onClick={() => setOpen(true)}
            className='inline-flex h-10 w-10 items-center justify-center rounded-sm transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40'
          >
            <Menu className='h-7 w-7 stroke-[1.75]' />
          </button>

          <Brand />

          <div className='flex items-center gap-1 sm:gap-2'>
            <Link
              href='/wishlist'
              aria-label='Wishlist'
              className='inline-flex h-10 w-10 items-center justify-center rounded-sm transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40'
            >
              <Heart className='h-6 w-6 stroke-[1.75]' />
            </Link>
            <Link
              href='/cart'
              aria-label='Cart'
              className='relative inline-flex h-10 w-10 items-center justify-center rounded-sm transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40'
            >
              <ShoppingBag className='h-6 w-6 stroke-[1.75]' />
              <span className='absolute -right-1 -top-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold leading-none text-white'>
                {cartCount}
              </span>
            </Link>
          </div>
        </div>
      </div>

      <Drawer open={open} onClose={() => setOpen(false)}>
        <nav className='flex flex-col gap-6 pt-8'>
          <Link href='/' className='text-[24px] font-black uppercase tracking-[0.05em]' onClick={() => setOpen(false)}>
            HOME
          </Link>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className='text-[24px] font-black uppercase tracking-[0.05em]'
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <p className='pt-2 text-[22px] font-black uppercase tracking-[0.03em] text-[#e64ca1]'>SPECIAL PRICE</p>
          <p className='text-[28px] font-semibold italic tracking-[-0.01em] text-[#d92727]'>GentlewomanUniverse</p>
          <p className='text-[24px] font-black uppercase tracking-[0.08em]'>GENTLE LITTLEWOMAN</p>
          <p className='pt-2 text-[24px] font-black uppercase tracking-[0.08em]'>EN / <span className='text-[#a6adb9]'>TH</span></p>
        </nav>
      </Drawer>
    </header>
  );
}
