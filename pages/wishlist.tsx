import { useEffect, useState } from 'react';
import Link from 'next/link';
import { products } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import { EmptyUI, ErrorUI, LoadingUI } from '@/components/PageState';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const run = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 120));
        setLoading(false);
      } catch {
        setError('Wishlist error');
        setLoading(false);
      }
    };
    run().catch(() => {
      setError('Wishlist error');
      setLoading(false);
    });
  }, []);

  const ids = Array.isArray(wishlist) ? wishlist : [];
  const list = products.filter((item) => ids.includes(item.id));

  return (
    <main>
      <section className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-[28px] font-light tracking-[0.06em] sm:text-[32px] md:text-[40px] lg:text-[52px]">Wishlist</h1>
        </div>
      </section>

      <section className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          {loading ? <LoadingUI label="wishlist" /> : null}
          {error ? <ErrorUI message={error} /> : null}
          {!loading && !error && list.length === 0 ? <EmptyUI label="wishlist products" /> : null}
          {!loading && !error && list.length > 0 ? (
            <div className="space-y-4">
              {list.map((item) => (
                <div key={item.id} className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E6E6E6] pb-4">
                  <Link href={`/product/${item.slug}`} className="text-[14px]">{item.title}</Link>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => toggleWishlist(item.id)} className="border border-[#E6E6E6] px-3 py-2 text-[11px] uppercase tracking-[0.1em]">Remove</button>
                    <button type="button" onClick={() => addToCart(item.id)} className="bg-[#111111] px-3 py-2 text-[11px] uppercase tracking-[0.1em] text-[#FFFFFF]">Move to cart</button>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
