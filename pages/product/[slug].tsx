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
      <section className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          {loading ? <LoadingUI label="product" /> : null}
          {error ? <ErrorUI message={error} /> : null}
          {!loading && !error && !product ? (
            <EmptyUI label="product" />
          ) : (
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="grid gap-4 lg:grid-cols-[80px_1fr]">
                <div className="order-2 grid grid-cols-3 gap-2 lg:order-1 lg:grid-cols-1">
                  {[product.image, ...related.slice(0, 2).map((item) => item.image)].map((image) => (
                    <div key={image} className="relative aspect-square overflow-hidden">
                      <Image src={image} alt={product.title} fill className="object-cover" />
                    </div>
                  ))}
                </div>
                <div className="relative order-1 aspect-square overflow-hidden lg:order-2">
                  <Image src={product.image} alt={product.title} fill className="object-cover" />
                </div>
              </div>
              <div className="space-y-6">
                <p className="text-sm uppercase">Home / The Shop</p>
                <h1 className="text-4xl">{product.title}</h1>
                <p className="text-4xl">${product.price}</p>
                <p className="text-black/70">{product.description}</p>
                <div className="flex gap-4">
                  <button type="button" onClick={() => addToCart(product.id)} className="bg-black px-10 py-4 text-xs uppercase text-white">Add to Cart</button>
                  <button type="button" onClick={() => toggleWishlist(product.id)} className="border border-black/20 px-10 py-4 text-xs uppercase">Add to wishlist</button>
                </div>
                <p className="text-sm text-black/70">Categories: {product.category}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl uppercase underline">Description</h2>
          <p className="mt-6 max-w-5xl text-black/70">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </section>

      <section className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl">Related</h2>
          {related.length > 0 ? <ProductGrid products={related} /> : <EmptyUI label="related products" />}
        </div>
      </section>
    </main>
  );
}
