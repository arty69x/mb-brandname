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
    return products.filter((product) => product.title.toLowerCase().includes(input.toLowerCase()));
  }, [input]);

  if (!searchOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-white/95 p-4">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-3 border-b border-black/20 pb-3">
          <Search className="text-black/40" />
          <input
            value={input}
            onChange={(event) => { setInput(event.target.value); setSearchTerm(event.target.value); }}
            placeholder="Search products..."
            className="w-full bg-transparent text-3xl outline-none"
          />
          <button type="button" aria-label="Close search" onClick={() => setSearchOpen(false)}>
            <X size={32} className="text-black/40" />
          </button>
        </div>
        <div className="mt-6 grid gap-4">
          {Array.isArray(filtered)
            ? filtered.slice(0, 5).map((item) => (
                <Link key={item.id} href={`/product/${item.slug}`} className="border-b border-black/10 pb-3 text-xl" onClick={() => setSearchOpen(false)}>
                  {item.title}
                </Link>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
