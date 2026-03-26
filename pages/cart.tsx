import Link from 'next/link';
import { products } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import { EmptyUI, ErrorUI, LoadingUI } from '@/components/PageState';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useStore();
  const loading = false;
  const error = '';

  const safeCart = Array.isArray(cart) ? cart : [];
  const items = safeCart
    .map((entry) => {
      const product = products.find((item) => item.id === entry.productId);
      return product ? { ...product, quantity: entry.quantity } : null;
    })
    .filter((item): item is NonNullable<typeof item> => !!item);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main>
      <section className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-4xl">Cart</h1>
        </div>
      </section>

      <section className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          {loading ? <LoadingUI label="cart" /> : null}
          {error ? <ErrorUI message={error} /> : null}
          {!loading && !error && items.length === 0 ? <EmptyUI label="cart items" /> : null}
          {!loading && !error && items.length > 0 ? (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-4">
                  <div>
                    <p className="text-xl">{item.title}</p>
                    <p className="text-sm text-black/60">฿{item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-8 w-8 border border-black/30">-</button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-8 w-8 border border-black/30">+</button>
                  </div>
                  <button type="button" onClick={() => removeFromCart(item.id)} className="text-sm uppercase underline">Remove</button>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          {items.length > 0 ? (
            <div className="ml-auto max-w-md space-y-4 border border-black/10 p-6">
              <h2 className="text-2xl">Summary</h2>
              <div className="flex items-center justify-between"><span>Total</span><span>฿{total.toLocaleString()}</span></div>
              <Link href="/checkout" className="block bg-black py-3 text-center text-xs uppercase text-white">Proceed to checkout</Link>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
