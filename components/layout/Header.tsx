import Link from 'next/link';
import { useState } from 'react';
import IconButton from '../ui/IconButton';
import Drawer from './Drawer';

const links = [
  { href: '/shop', label: 'Shop' },
  { href: '/new-arrivals', label: 'New Arrivals' },
  { href: '/bags', label: 'Bags' },
  { href: '/accessories', label: 'Accessories' },
  { href: '/blog', label: 'Blog' },
];

export default function Header({ variant = 'solid' }: { variant?: 'home' | 'solid' }) {
  const [open, setOpen] = useState(false);
  const isHome = variant === 'home';

  return (
    <header className={`${isHome ? 'absolute z-30 text-white' : 'border-b border-[var(--border)] bg-[var(--bg)] text-[var(--text)]'} left-0 right-0 top-0`}>
      <div className='container mx-auto flex items-center justify-between px-4 py-5'>
        <Link href='/' className='text-[12px] font-medium uppercase tracking-[0.22em]'>
          MB BRANDNAME
        </Link>
        <nav className='hidden gap-7 lg:flex'>
          {links.map((l) => (
            <Link key={l.href} className='text-[12px] uppercase tracking-[0.16em] transition-opacity hover:opacity-70' href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className='hidden items-center gap-1 lg:flex'>
          <IconButton label='Search'>⌕</IconButton>
          <Link href='/account'><IconButton label='Account'>👤</IconButton></Link>
          <Link href='/wishlist'><IconButton label='Wishlist'>♡</IconButton></Link>
          <Link href='/cart'><IconButton label='Cart'>👜</IconButton></Link>
        </div>
        <button aria-label='Open menu' onClick={() => setOpen(true)} className='text-xl lg:hidden'>☰</button>
      </div>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <nav className='flex flex-col gap-4 text-[13px] uppercase tracking-[0.14em]'>
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </nav>
      </Drawer>
    </header>
  );
}
