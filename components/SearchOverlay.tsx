import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { products } from '@/data/products';
import { useStore } from '@/context/StoreContext';

export function SearchOverlay() {
  const { searchOpen, searchTerm, setSearchOpen, setSearchTerm } = useStore();
  const [input, setInput] = useState(searchTerm);

  useEffect(() => {
    setInput(searchTerm);
  }, [searchTerm]);

  const filtered = useMemo(() => {
    if (!input.trim()) {
      return [];
    }
    const safeProducts = Array.isArray(products) ? products : [];
    return safeProducts.filter((product) => product.title.toLowerCase().includes(input.toLowerCase()));
  }, [input]);

  if (!searchOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] bg-[#FFFFFF]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 border-b border-[#E6E6E6] pb-4">
          <Search className="text-[#6D6D6D]" />
          <input
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              setSearchTerm(event.target.value);
            }}
            placeholder="Search products..."
            className="w-full bg-transparent text-[28px] font-light outline-none"
          />
          <button type="button" aria-label="Close search" onClick={() => setSearchOpen(false)} className="transition-all duration-300 ease-in-out hover:opacity-70">
            <X size={32} className="text-[#6D6D6D]" />
          </button>
        </div>

        <div className="mt-8 space-y-4">
          {Array.isArray(filtered)
            ? filtered.slice(0, 8).map((item) => (
                <Link
                  key={item.id}
                  href={`/product/${item.slug}`}
                  onClick={() => setSearchOpen(false)}
                  className="block border-b border-[#E6E6E6] pb-4 text-[14px] uppercase tracking-[0.08em] transition-all duration-300 ease-in-out hover:opacity-70"
                >
                  {item.title}
                </Link>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
