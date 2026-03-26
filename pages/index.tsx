import Image from 'next/image';
import Link from 'next/link';
import { ProductGrid } from '@/components/ProductGrid';
import { EmptyUI, ErrorUI, LoadingUI } from '@/components/PageState';
import { useProductsLoader } from '@/hooks/useProductsLoader';
import { HeroCarousel } from '@/components/HeroCarousel';

export default function HomePage() {
  const { loading, error, data } = useProductsLoader();

  return (
    <main>
      <section className="py-0 md:py-16">
        <div className="w-full md:container md:mx-auto md:px-4">
          <HeroCarousel />
        </div>
      </section>

      <section className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="w-full lg:container lg:mx-auto lg:px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-[20px] md:text-[24px] lg:text-[28px]">New Arrivals</h2>
            <Link href="/new-arrivals" className="text-[13px] uppercase tracking-[0.08em] underline transition-opacity duration-300 ease-in-out hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]">
              View more
            </Link>
          </div>
          {loading ? <LoadingUI label="products" /> : null}
          {error ? <ErrorUI message={error} /> : null}
          {!loading && !error && data.length === 0 ? <EmptyUI label="products" /> : null}
          {!loading && !error && data.length > 0 ? <ProductGrid products={data.slice(0, 10)} desktopColumns={4} /> : null}
        </div>
      </section>

      <section className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1535556116002-6281ff3e9f36?auto=format&fit=crop&w=1200&q=80"
                alt="Story"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-[20px] md:text-[24px] lg:text-[28px]">A story of timeless elegance</h2>
              <p className="text-[14px] text-[#6D6D6D]">Curated collections sourced from Japan and restored with premium care.</p>
              <p className="text-[14px] text-[#6D6D6D]">Every product is checked for authenticity, detail, and long-term wearability.</p>
              <button
                type="button"
                className="bg-[#111111] px-6 py-3 text-[11px] uppercase tracking-[0.1em] text-[#FFFFFF] transition-all duration-300 ease-in-out hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 active:scale-[0.98]"
              >
                Find your style
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="bg-[#F5F5F5] px-4 py-10 text-center sm:px-8">
            <h2 className="text-[20px] md:text-[24px] lg:text-[28px]">Our Services</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div><p className="text-[14px]">Fast & Free Delivery</p><p className="mt-2 text-[14px] text-[#6D6D6D]">Free delivery for orders over $140.</p></div>
              <div><p className="text-[14px]">24/7 Support</p><p className="mt-2 text-[14px] text-[#6D6D6D]">Always-on service for every order.</p></div>
              <div><p className="text-[14px]">Money Back Guarantee</p><p className="mt-2 text-[14px] text-[#6D6D6D]">Returns accepted within 30 days.</p></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
