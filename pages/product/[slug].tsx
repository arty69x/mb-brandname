import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { products } from '@/data/products';
import { ProductGrid } from '@/components/ProductGrid';
import { EmptyUI, ErrorUI, LoadingUI } from '@/components/PageState';
import { useStore } from '@/context/StoreContext';

export default function ProductDetailPage() {
  const router = useRouter();
  const slug = typeof router.query.slug === 'string' ? router.query.slug : '';
  const loading = !router.isReady;
  const error = router.isReady && !slug ? 'Invalid product route' : '';
  const [qty, setQty] = useState(1);

  const product = useMemo(() => {
    const safeProducts = Array.isArray(products) ? products : [];
    return safeProducts.find((item) => item.slug === slug);
  }, [slug]);

  const related = useMemo(() => {
    const safeProducts = Array.isArray(products) ? products : [];
    return safeProducts.filter((item) => item.slug !== slug).slice(0, 5);
  }, [slug]);

  const { addToCart, toggleWishlist } = useStore();

  return (
    <main>
      <section className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          {loading ? <LoadingUI label="product" /> : null}
          {error ? <ErrorUI message={error} /> : null}
          {!loading && !error && !product ? <EmptyUI label="product" /> : null}
          {!loading && !error && product ? (
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="grid gap-4 lg:grid-cols-[88px_1fr]">
                <div className="order-2 grid grid-cols-3 gap-2 lg:order-1 lg:grid-cols-1">
                  {[product.image, ...related.slice(0, 2).map((item) => item.image)].map((image) => (
                    <div key={image} className="relative aspect-square overflow-hidden border border-[#E6E6E6]">
                      <Image src={image} alt={product.title} fill className="object-cover" />
                    </div>
                  ))}
                </div>
                <div className="relative order-1 aspect-square overflow-hidden lg:order-2">
                  <Image src={product.image} alt={product.title} fill className="object-cover" />
                </div>
              </div>
              <div className="space-y-6">
                <p className="text-[11px] uppercase tracking-[0.1em] text-[#6D6D6D]">{product.category}</p>
                <h1 className="text-[20px] md:text-[24px] lg:text-[28px]">{product.title}</h1>
                <p className="text-[14px]">${product.price.toLocaleString()}</p>
                <p className="text-[14px] text-[#6D6D6D]">{product.description}</p>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setQty((prev) => Math.max(1, prev - 1))} className="h-10 w-10 border border-[#E6E6E6]" aria-label="Decrease quantity">-</button>
                  <span className="min-w-8 text-center">{qty}</span>
                  <button type="button" onClick={() => setQty((prev) => prev + 1)} className="h-10 w-10 border border-[#E6E6E6]" aria-label="Increase quantity">+</button>
                </div>
                <div className="flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      Array.from({ length: qty }).forEach(() => addToCart(product.id));
                    }}
                    className="bg-[#111111] px-8 py-3 text-[11px] uppercase tracking-[0.1em] text-[#FFFFFF]"
                  >
                    Add to cart
                  </button>
                  <button type="button" onClick={() => toggleWishlist(product.id)} className="border border-[#E6E6E6] px-8 py-3 text-[11px] uppercase tracking-[0.1em]">Wishlist</button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-[20px] md:text-[24px] lg:text-[28px]">Description</h2>
          <p className="mt-4 max-w-4xl text-[14px] text-[#6D6D6D]">This piece is selected by our buyers for quality, balance, and iconic style. Authenticity and finishing are verified before listing.</p>
        </div>
      </section>

      <section className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="mb-6 text-[20px] md:text-[24px] lg:text-[28px]">Related products</h2>
          {related.length > 0 ? <ProductGrid products={related} /> : <EmptyUI label="related products" />}
        </div>
      </section>
    </main>
  );
}
