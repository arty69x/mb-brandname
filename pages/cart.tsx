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

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal;

  return (
    <main>
      <section className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-[28px] font-light tracking-[0.06em] sm:text-[32px] md:text-[40px] lg:text-[52px]">Cart</h1>
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
                <div key={item.id} className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E6E6E6] pb-4">
                  <div>
                    <p className="text-[14px]">{item.title}</p>
                    <p className="text-[14px] text-[#6D6D6D]">${item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-8 w-8 border border-[#E6E6E6]" aria-label="Decrease quantity">-</button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-8 w-8 border border-[#E6E6E6]" aria-label="Increase quantity">+</button>
                  </div>
                  <button type="button" onClick={() => removeFromCart(item.id)} className="text-[13px] uppercase tracking-[0.08em] underline">Remove</button>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          {items.length > 0 ? (
            <div className="ml-auto max-w-md space-y-4 border border-[#E6E6E6] bg-[#FFFFFF] p-6">
              <h2 className="text-[20px] md:text-[24px] lg:text-[28px]">Summary</h2>
              <div className="flex items-center justify-between"><span>Subtotal</span><span>${subtotal.toLocaleString()}</span></div>
              <div className="flex items-center justify-between"><span>Total</span><span>${total.toLocaleString()}</span></div>
              <Link href="/checkout" className="block bg-[#111111] py-3 text-center text-[11px] uppercase tracking-[0.1em] text-[#FFFFFF]">Checkout</Link>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
