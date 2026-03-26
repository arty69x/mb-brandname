import Image from 'next/image';
import { useRouter } from 'next/router';
import { products } from '@/data/products';
import { ProductGrid } from '@/components/ProductGrid';
import { EmptyUI, ErrorUI, LoadingUI } from '@/components/PageState';
import { useStore } from '@/context/StoreContext';

export default function ProductDetailPage() {
  const router = useRouter();
  const slug = typeof router.query.slug === 'string' ? router.query.slug : '';
  const loading = !router.isReady;
  const error = router.isReady && !slug ? 'Invalid product route' : '';
  const product = Array.isArray(products) ? products.find((item) => item.slug === slug) : undefined;
  const related = Array.isArray(products) ? products.filter((item) => item.slug !== slug).slice(0, 5) : [];
  const { addToCart, toggleWishlist } = useStore();

  return (
    <main>
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? <LoadingUI label="product" /> : null}
          {error ? <ErrorUI message={error} /> : null}
          {!loading && !error && !product ? <EmptyUI label="product" /> : null}

          {!loading && !error && product ? (
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="grid gap-4 lg:grid-cols-[80px_1fr]">
                <div className="grid grid-cols-3 gap-2 lg:grid-cols-1">
                  {[product.image, ...related.slice(0, 2).map((item) => item.image)].map((image) => (
                    <div key={image} className="relative aspect-square overflow-hidden bg-[#E6E6E6]">
                      <Image src={image} alt={product.title} fill className="object-cover" />
                    </div>
                  ))}
                </div>
                <div className="relative aspect-square overflow-hidden bg-[#E6E6E6]">
                  <Image src={product.image} alt={product.title} fill className="object-cover" />
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[13px] uppercase tracking-[0.08em]">Home / The Shop</p>
                <h1 className="text-[28px] sm:text-[32px] md:text-[40px] lg:text-[52px] tracking-[0.06em] font-light">{product.title}</h1>
                <p className="text-[20px] md:text-[24px] lg:text-[28px]">฿{product.price}</p>
                <p className="text-[14px] text-[#6D6D6D]">{product.description}</p>
                <div className="flex flex-wrap gap-4">
                  <button type="button" onClick={() => addToCart(product.id)} className="bg-[#111111] px-8 py-3 text-[13px] uppercase tracking-[0.08em] text-[#FFFFFF] transition-all duration-300 ease-in-out hover:opacity-90">Add to cart</button>
                  <button type="button" onClick={() => toggleWishlist(product.id)} className="border border-[#E6E6E6] px-8 py-3 text-[13px] uppercase tracking-[0.08em] transition-all duration-300 ease-in-out hover:opacity-70">Add to wishlist</button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-[20px] md:text-[24px] lg:text-[28px]">Description</h2>
          <p className="mt-4 text-[14px] text-[#6D6D6D]">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-[20px] md:text-[24px] lg:text-[28px]">Related</h2>
          {related.length > 0 ? <ProductGrid products={related} desktopCols={5} /> : <EmptyUI label="related products" />}
        </div>
      </section>
    </main>
  );
}
