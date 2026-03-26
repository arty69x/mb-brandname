import { useMemo, useState } from 'react';
import { products } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import { EmptyUI, ErrorUI, LoadingUI } from '@/components/PageState';

export default function CheckoutPage() {
  const { cart } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [formError, setFormError] = useState('');

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

  const onSubmit = () => {
    if (!name.trim() || !email.trim() || !address.trim()) {
      setFormError('Please fill all fields before checkout.');
      return;
    }
    setFormError('');
  };

  return (
    <main>
      <section className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <h1 className="text-[28px] font-light tracking-[0.06em] sm:text-[32px] md:text-[40px] lg:text-[52px]">Checkout</h1>
              <input aria-label="Full name" value={name} onChange={(event) => setName(event.target.value)} className="w-full border border-[#E6E6E6] bg-[#FFFFFF] px-4 py-3" placeholder="Full name" />
              <input aria-label="Email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full border border-[#E6E6E6] bg-[#FFFFFF] px-4 py-3" placeholder="Email" />
              <input aria-label="Address" value={address} onChange={(event) => setAddress(event.target.value)} className="w-full border border-[#E6E6E6] bg-[#FFFFFF] px-4 py-3" placeholder="Address" />
              {formError ? <p className="text-[14px] text-[#CC3333]">{formError}</p> : null}
              <button type="button" onClick={onSubmit} className="bg-[#111111] px-8 py-3 text-[11px] uppercase tracking-[0.1em] text-[#FFFFFF]">Submit order</button>
            </div>
            <div className="border border-[#E6E6E6] bg-[#FFFFFF] p-6">
              <h2 className="text-[20px] md:text-[24px] lg:text-[28px]">Order summary</h2>
              {loading ? <LoadingUI label="checkout" /> : null}
              {error ? <ErrorUI message={error} /> : null}
              {!items.length ? <EmptyUI label="checkout items" /> : null}
              <div className="mt-4 space-y-3">
                {Array.isArray(items)
                  ? items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span>{item.title} x {item.quantity}</span>
                        <span>${(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))
                  : null}
              </div>
              <div className="mt-6 flex justify-between border-t border-[#E6E6E6] pt-4"><span>Total</span><span>${total.toLocaleString()}</span></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
