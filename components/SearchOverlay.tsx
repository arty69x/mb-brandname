import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { products } from '@/data/products';
import { useStore } from '@/context/StoreContext';

export function SearchOverlay() {
  const { searchOpen, searchTerm, setSearchOpen, setSearchTerm } = useStore();
  const [input, setInput] = useState(searchTerm);
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  useEffect(() => {
    setInput(searchTerm);
    setDebouncedTerm(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(input);
      setSearchTerm(input);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [input, setSearchTerm]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSearchOpen(false);
      }
    };

    if (searchOpen) {
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [searchOpen, setSearchOpen]);

  const filtered = useMemo(() => {
    if (!debouncedTerm.trim()) {
      return [];
    }
    const safeProducts = Array.isArray(products) ? products : [];
    return safeProducts.filter((product) => product.title.toLowerCase().includes(debouncedTerm.toLowerCase()));
  }, [debouncedTerm]);

  if (!searchOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] bg-white/95 p-4">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-3 border-b border-[#E6E6E6] pb-3">
          <Search className="text-[#6D6D6D]" />
          <input
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
            placeholder="Search products"
            className="w-full bg-transparent text-[20px] outline-none"
            aria-label="Search products"
          />
          <button type="button" aria-label="Close search" onClick={() => setSearchOpen(false)}>
            <X size={28} className="text-[#6D6D6D]" />
          </button>
        </div>
        <div className="mt-6 grid gap-4">
          {Array.isArray(filtered)
            ? filtered.slice(0, 8).map((item) => (
                <Link
                  key={item.id}
                  href={`/product/${item.slug}`}
                  className="border-b border-[#E6E6E6] pb-3 text-[14px]"
                  onClick={() => setSearchOpen(false)}
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
