import Image from 'next/image';
import { ProductGrid } from '@/components/ProductGrid';
import { useStore } from '@/context/StoreContext';
import { EmptyUI, ErrorUI, LoadingUI } from '@/components/PageState';
import { useProductsLoader } from '@/hooks/useProductsLoader';
import type { Product } from '@/data/products';

type ShopPageProps = {
  title: string;
  filter: (item: Product) => boolean;
};

export function ShopPage({ title, filter }: ShopPageProps) {
  const { searchTerm } = useStore();
  const { loading, error, data } = useProductsLoader(filter);
  const filtered = data.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <main>
      <section className="py-0">
        <div className="container mx-auto px-4">
          <div className="relative h-[420px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1800&q=80"
              alt={title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center px-8 text-center">
              <h1 className="max-w-[720px] text-[28px] sm:text-[32px] md:text-[40px] lg:text-[52px] tracking-[0.06em] font-light text-[#FFFFFF]">{title}</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-wrap items-center justify-end gap-6 border-b border-[#E6E6E6] pb-4">
            <button type="button" className="text-[13px] uppercase tracking-[0.08em]">Default sorting</button>
            <span className="text-[13px] uppercase tracking-[0.08em]">View 2 3 4</span>
            <button type="button" className="text-[13px] uppercase tracking-[0.08em]">Filter</button>
          </div>
          {loading ? <LoadingUI label="products" /> : null}
          {error ? <ErrorUI message={error} /> : null}
          {!loading && !error && filtered.length === 0 ? <EmptyUI label="products" /> : null}
          {!loading && !error && filtered.length > 0 ? <ProductGrid products={filtered} desktopCols={5} /> : null}
        </div>
      </section>
    </main>
  );
}
