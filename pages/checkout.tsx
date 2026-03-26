import { useMemo } from 'react';
import { products } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import { EmptyUI, ErrorUI, LoadingUI } from '@/components/PageState';

export default function CheckoutPage() {
  const { cart } = useStore();

  const [loading, error] = [false, ''];
  const items = useMemo(() => {
    const safeCart = Array.isArray(cart) ? cart : [];
    return safeCart
      .map((entry) => {
        const product = products.find((item) => item.id === entry.productId);
        return product ? { ...product, quantity: entry.quantity } : null;
      })
      .filter((item): item is NonNullable<typeof item> => !!item);
  }, [cart]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main>
      <section className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <h1 className="text-4xl">Checkout</h1>
              <input className="w-full border border-black/20 bg-white px-4 py-3" placeholder="Full name" />
              <input className="w-full border border-black/20 bg-white px-4 py-3" placeholder="Email" />
              <input className="w-full border border-black/20 bg-white px-4 py-3" placeholder="Address" />
              <button type="button" className="bg-black px-8 py-3 text-xs uppercase text-white">Place order</button>
            </div>
            <div className="border border-black/10 p-6">
              <h2 className="text-2xl">Summary</h2>
              {loading ? <LoadingUI label="checkout" /> : null}
              {error ? <ErrorUI message={error} /> : null}
              {!items.length ? <EmptyUI label="checkout items" /> : null}
              <div className="mt-4 space-y-3">
                {Array.isArray(items) ? items.map((item) => <div key={item.id} className="flex justify-between"><span>{item.title} x {item.quantity}</span><span>฿{item.price * item.quantity}</span></div>) : null}
              </div>
              <div className="mt-6 flex justify-between border-t border-black/10 pt-4"><span>Total</span><span>฿{total.toLocaleString()}</span></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
