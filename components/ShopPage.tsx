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
          <div className="relative min-h-[280px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=80"
              alt={title}
              fill
              className="object-cover"
            />
            <div className="relative z-10 flex min-h-[280px] items-center justify-center bg-black/25">
              <h1 className="text-5xl text-white">{title}</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-6 flex flex-wrap items-center justify-end gap-6 border-b border-black/10 pb-4 text-sm uppercase">
            <button type="button">Default sorting</button>
            <span>View 2 3 4</span>
            <button type="button">Filter</button>
          </div>
          {loading ? <LoadingUI label="products" /> : null}
          {error ? <ErrorUI message={error} /> : null}
          {!loading && !error && filtered.length === 0 ? <EmptyUI label="products" /> : null}
          {!loading && !error && filtered.length > 0 ? <ProductGrid products={filtered} /> : null}
        </div>
      </section>
    </main>
  );
}
