import { useEffect, useState } from 'react';
import { products } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import { ProductGrid } from '@/components/ProductGrid';
import { EmptyUI, ErrorUI, LoadingUI } from '@/components/PageState';

export default function WishlistPage() {
  const { wishlist } = useStore();
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-[28px] sm:text-[32px] md:text-[40px] lg:text-[52px] tracking-[0.06em] font-light">Wishlist</h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? <LoadingUI label="wishlist" /> : null}
          {error ? <ErrorUI message={error} /> : null}
          {!loading && !error && list.length === 0 ? <EmptyUI label="wishlist products" /> : null}
          {!loading && !error && list.length > 0 ? <ProductGrid products={list} desktopCols={5} /> : null}
        </div>
      </section>
    </main>
  );
}
