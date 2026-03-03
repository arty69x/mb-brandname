import Link from 'next/link';
import { useState } from 'react';
import IconButton from '../ui/IconButton';
import Drawer from './Drawer';

const links = [{ href: '/shop', label: 'Shop' }, { href: '/new-arrivals', label: 'New Arrivals' }, { href: '/bags', label: 'Bags' }, { href: '/accessories', label: 'Accessories' }, { href: '/blog', label: 'Blog' }];

export default function Header({ variant = 'solid' }: { variant?: 'home' | 'solid' }) {
  const [open, setOpen] = useState(false);
  const isHome = variant === 'home';
  return <header className={`${isHome ? 'absolute z-30 text-white' : 'border-b text-[var(--text)]'} left-0 right-0 top-0`}><div className='container mx-auto px-4 py-4 flex items-center justify-between'><Link href='/' className='text-[12px] lg:text-[13px] uppercase tracking-[0.12em]'>MB BRANDNAME</Link><nav className='hidden lg:flex gap-6'>{links.map((l) => <Link key={l.href} className='text-[12px] lg:text-[13px] uppercase tracking-[0.12em]' href={l.href}>{l.label}</Link>)}</nav><div className='hidden lg:flex items-center gap-1'><IconButton label='Search'>⌕</IconButton><Link href='/account'><IconButton label='Account'>👤</IconButton></Link><Link href='/wishlist'><IconButton label='Wishlist'>♡</IconButton></Link><Link href='/cart'><IconButton label='Cart'>👜</IconButton></Link></div><button aria-label='Open menu' onClick={() => setOpen(true)} className='lg:hidden'>☰</button></div><Drawer open={open} onClose={() => setOpen(false)}><nav className='flex flex-col gap-4'>{links.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}</nav></Drawer></header>;
}
