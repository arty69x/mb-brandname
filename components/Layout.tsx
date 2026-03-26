import type { ReactNode } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SearchOverlay } from '@/components/SearchOverlay';
import { Toasts } from '@/components/Toasts';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header />
      {children}
      <Footer />
      <SearchOverlay />
      <Toasts />
    </div>
  );
}
