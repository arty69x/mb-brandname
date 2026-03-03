import Link from 'next/link';
import { useState } from 'react';
import IconButton from '../ui/IconButton';
import Drawer from './Drawer';

const links = [
  { href: '/', label: 'Home' },
  { href: '/new-arrivals', label: 'New Arrivals' },
  { href: '/bags', label: 'Bags' },
  { href: '/accessories', label: 'Accessories' },
  { href: '/about', label: 'About us' }
];

function Brand() {
  return (
    <Link href='/' className='leading-none'>
      <p className='text-[28px] lg:text-[34px] tracking-[-0.05em]'>m3</p>
      <p className='-mt-1 text-[10px] tracking-[0.01em]'>MBbrandname</p>
    </Link>
  );
}

export default function Header({ variant = 'solid' }: { variant?: 'home' | 'solid' }) {
  const [open, setOpen] = useState(false);
  const isHome = variant === 'home';

  return (
    <header className={`${isHome ? 'absolute z-30 text-white' : 'border-b border-[var(--border)] bg-white text-[var(--text)]'} left-0 right-0 top-0`}>
      <div className='container mx-auto flex items-center justify-between px-4 py-4 lg:py-5'>
        <Brand />
        <nav className='hidden items-center gap-8 lg:flex'>
          {links.map((l) => (
            <Link key={l.href} className='text-[13px] font-semibold tracking-[0.01em]' href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className='hidden items-center gap-0.5 lg:flex'>
          <IconButton label='Search'>⌕</IconButton>
          <Link href='/account'>
            <IconButton label='Account'>◌</IconButton>
          </Link>
          <Link href='/wishlist'>
            <IconButton label='Wishlist'>♡</IconButton>
          </Link>
          <Link href='/cart'>
            <IconButton label='Cart'>👜</IconButton>
          </Link>
        </div>
        <button aria-label='Open menu' onClick={() => setOpen(true)} className='text-[22px] lg:hidden'>
          ☰
        </button>
      </div>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <nav className='flex flex-col gap-4'>
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
      </Drawer>
    </header>
  );
}
