import Link from 'next/link';
import { useState } from 'react';
import IconButton from '../ui/IconButton';
import Drawer from './Drawer';

const links = [
  { href: '/', label: 'Home' },
  { href: '/new-arrivals', label: 'New Arrivals' },
  { href: '/bags', label: 'Bags' },
  { href: '/accessories', label: 'Accessories' },
  { href: '/about', label: 'About us' },
];

const mobileMenu = ['GENTLE PACE', 'LEAGUE VIBE CLUB', 'SUN-DRENCHED WHIMSY', 'GENTLEWOMAN CLUB', 'COLLECTIONS +', 'PRODUCTS +'];

export default function Header({ variant = 'solid' }: { variant?: 'home' | 'solid' }) {
  const [open, setOpen] = useState(false);
  const isHome = variant === 'home';

  return (
    <header className={`${isHome ? 'absolute z-30 text-white' : 'border-b border-[#1a1a1a] bg-[var(--bg)] text-black'} left-0 right-0 top-0`}>
      <div className='container mx-auto flex items-center justify-between px-3 py-4 lg:px-4'>
        <div className='flex items-center gap-3'>
          <button aria-label='Open menu' onClick={() => setOpen(true)} className='text-[20px] lg:hidden'>☰</button>
          <Link href='/' className='text-[38px] font-light leading-none tracking-[-0.02em]'>mB</Link>
        </div>

        <nav className='hidden gap-9 lg:flex'>
          {links.map((l) => (
            <Link key={l.href} className='text-[14px] font-medium' href={l.href}>{l.label}</Link>
          ))}
        </nav>

        <div className='flex items-center gap-0.5'>
          <IconButton label='Search'>⌕</IconButton>
          <Link href='/account'><IconButton label='Account'>⌔</IconButton></Link>
          <Link href='/wishlist'><IconButton label='Wishlist'>♡</IconButton></Link>
          <Link href='/cart'><IconButton label='Cart'>◍</IconButton></Link>
        </div>
      </div>

      <Drawer open={open} onClose={() => setOpen(false)}>
        <nav className='space-y-2 pt-1'>
          {mobileMenu.map((item) => <p key={item} className='text-[35px] font-semibold uppercase leading-[1.15]'>{item}</p>)}
          <p className='pt-1 text-[34px] font-semibold uppercase text-[#eb4e8f]'>Special Price</p>
          <p className='text-[32px] italic text-[#d15a78]'>GentlewomanUniverse</p>
          <p className='text-[27px] uppercase tracking-[0.16em]'>Gentle Littlewoman</p>
          <p className='pt-2 text-[45px] font-semibold uppercase'>EN / TH</p>
        </nav>
      </Drawer>
    </header>
  );
}
