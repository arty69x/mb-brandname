import Image from 'next/image';
import Link from 'next/link';
import { HeroCarousel } from '@/components/HeroCarousel';
import { ProductGrid } from '@/components/ProductGrid';
import { EmptyUI, ErrorUI, LoadingUI } from '@/components/PageState';
import { useProductsLoader } from '@/hooks/useProductsLoader';

export default function HomePage() {
  const { loading, error, data } = useProductsLoader();
  const empty = !loading && !error && data.length === 0;

  return (
    <main>
      <section className="py-0">
        <div className="container mx-auto px-4">
          <HeroCarousel />
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-[20px] md:text-[24px] lg:text-[28px]">New Arrivals</h2>
            <Link href="/new-arrivals" className="text-[13px] uppercase tracking-[0.08em] underline">View more</Link>
          </div>
          {loading ? <LoadingUI label="products" /> : null}
          {error ? <ErrorUI message={error} /> : null}
          {empty ? <EmptyUI label="products" /> : null}
          {!loading && !error && data.length > 0 ? <ProductGrid products={data.slice(0, 8)} desktopCols={4} /> : null}
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="relative aspect-square overflow-hidden bg-[#E6E6E6]">
              <Image
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80"
                alt="Story"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-[20px] md:text-[24px] lg:text-[28px]">A bracelet with timeless elegance.</h2>
              <p className="text-[14px] text-[#6D6D6D]">This bracelet embodies timeless beauty through its refined yet powerful design.</p>
              <p className="text-[14px] text-[#6D6D6D]">More than jewelry, this piece carries a story of craftsmanship and individuality.</p>
              <button type="button" className="rounded-full bg-[#111111] px-8 py-2 text-[13px] uppercase tracking-[0.08em] text-[#FFFFFF] transition-all duration-300 ease-in-out hover:opacity-90">Find your style</button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-[#E6E6E6] px-4 py-16 text-center">
            <h2 className="text-[20px] md:text-[24px] lg:text-[28px] uppercase">About us</h2>
            <p className="mx-auto mt-8 max-w-[720px] text-[14px] text-[#6D6D6D]">CAREFULLY SELECTED AND IMPORTED DIRECTLY FROM JAPAN. WITH OVER 10 YEARS OF EXPERIENCE IN AUTHENTIC SECONDHAND BRANDED GOODS.</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="bg-[#F5F5F5] p-6 text-center">
              <h3 className="text-[20px]">Fast and Free Delivery</h3>
              <p className="mt-4 text-[14px] text-[#6D6D6D]">Free delivery for all orders over $140</p>
            </div>
            <div className="bg-[#F5F5F5] p-6 text-center">
              <h3 className="text-[20px]">24/7 Customer Support</h3>
              <p className="mt-4 text-[14px] text-[#6D6D6D]">Friendly customer support every day</p>
            </div>
            <div className="bg-[#F5F5F5] p-6 text-center">
              <h3 className="text-[20px]">Money Back Guarantee</h3>
              <p className="mt-4 text-[14px] text-[#6D6D6D]">We return money within 30 days</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
