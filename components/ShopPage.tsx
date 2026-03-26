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
      <section className="py-0 md:py-16">
        <div className="w-full md:container md:mx-auto md:px-4">
          <div className="relative h-[420px] overflow-hidden sm:h-[520px] lg:h-[600px]">
            <Image
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=80"
              alt={title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 flex h-full items-center justify-center px-8 text-center">
              <h1 className="max-w-[720px] text-[28px] font-light tracking-[0.06em] text-[#FFFFFF] sm:text-[32px] md:text-[40px] lg:text-[52px]">{title}</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="w-full lg:container lg:mx-auto lg:px-4">
          <div className="mb-6 grid gap-4 border-b border-[#E6E6E6] pb-4 text-[13px] uppercase tracking-[0.08em] sm:grid-cols-3">
            <button type="button" className="text-left">Sort: Latest</button>
            <button type="button" className="text-left sm:text-center">Filter: Category + Price</button>
            <p className="text-left sm:text-right">{filtered.length} items</p>
          </div>
          {loading ? <LoadingUI label="products" /> : null}
          {error ? <ErrorUI message={error} /> : null}
          {!loading && !error && filtered.length === 0 ? <EmptyUI label="products" /> : null}
          {!loading && !error && filtered.length > 0 ? <ProductGrid products={filtered} desktopColumns={5} /> : null}
          <div className="mt-8 flex items-center justify-center gap-2 text-[13px] uppercase tracking-[0.08em]">
            <button type="button" className="border border-[#E6E6E6] px-3 py-2">1</button>
            <button type="button" className="border border-[#E6E6E6] px-3 py-2">2</button>
            <button type="button" className="border border-[#E6E6E6] px-3 py-2">Next</button>
          </div>
        </div>
      </section>
    </main>
  );
}
