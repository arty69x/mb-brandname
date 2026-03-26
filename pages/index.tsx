import Image from 'next/image';
import Link from 'next/link';
import { ProductGrid } from '@/components/ProductGrid';
import { EmptyUI, ErrorUI, LoadingUI } from '@/components/PageState';
import { useProductsLoader } from '@/hooks/useProductsLoader';

export default function HomePage() {
  const { loading, error, data } = useProductsLoader();

  return (
    <main>
      <section className="py-0 md:py-16">
        <div className="w-full md:container md:mx-auto md:px-4">
          <div className="relative min-h-[420px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1800&q=80"
              alt="Hero"
              fill
              className="object-cover"
              priority
            />
            <div className="relative z-10 flex min-h-[420px] items-center justify-center bg-black/20 text-center">
              <h1 className="px-4 text-4xl text-white sm:text-5xl">NO.1 Luxury Brandname</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl">New Arrivals</h2>
            <Link href="/new-arrivals" className="text-sm uppercase underline">View more</Link>
          </div>
          {loading ? <LoadingUI label="products" /> : null}
          {error ? <ErrorUI message={error} /> : null}
          {!loading && !error && data.length === 0 ? <EmptyUI label="products" /> : null}
          {!loading && !error && data.length > 0 ? <ProductGrid products={data.slice(0, 10)} /> : null}
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
            <div className="space-y-6">
              <h3 className="text-4xl">A bracelet with timeless elegance.</h3>
              <p className="text-xl text-black/70">This bracelet embodies timeless beauty through its refined design and iconic details.</p>
              <p className="text-xl text-black/70">More than just jewelry, this piece carries a story of craftsmanship and individuality.</p>
              <button type="button" className="rounded-full bg-black px-8 py-3 text-xs uppercase text-white">Find your style</button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="bg-[#e5e5e5] px-4 py-16 text-center sm:px-8">
            <p className="text-4xl uppercase">About us</p>
            <p className="mx-auto mt-8 max-w-3xl text-3xl">100% AUTHENTIC BRANDED ITEMS FROM JAPAN</p>
            <p className="mx-auto mt-6 max-w-4xl text-xl text-black/70">CAREFULLY SELECTED AND IMPORTED DIRECTLY FROM JAPAN.</p>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              <div>
                <p className="text-2xl">Fast And Free Delivery</p>
                <p className="mt-2 text-sm text-black/70">Free delivery for all orders over $140</p>
              </div>
              <div>
                <p className="text-2xl">24/7 Customer Support</p>
                <p className="mt-2 text-sm text-black/70">Friendly 24/7 customer support</p>
              </div>
              <div>
                <p className="text-2xl">Money Back Guarantee</p>
                <p className="mt-2 text-sm text-black/70">We return money within 30 days</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
