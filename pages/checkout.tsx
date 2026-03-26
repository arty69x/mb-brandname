import { useMemo, useState } from 'react';
import { products } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import { EmptyUI, ErrorUI, LoadingUI } from '@/components/PageState';

export default function CheckoutPage() {
  const { cart } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const loading = false;

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

  const onSubmit = async () => {
    try {
      if (!name.trim() || !email.trim() || !address.trim()) {
        setError('All fields are required');
        return;
      }
      if (!email.includes('@')) {
        setError('Email must include @');
        return;
      }
      setError('');
    } catch {
      setError('Checkout failed');
    }
  };

  return (
    <main>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <h1 className="text-[28px] sm:text-[32px] md:text-[40px] lg:text-[52px] tracking-[0.06em] font-light">Checkout</h1>
              {loading ? <LoadingUI label="checkout" /> : null}
              <input value={name} onChange={(event) => setName(event.target.value)} className="w-full border border-[#E6E6E6] bg-[#FFFFFF] px-4 py-3 text-[14px]" placeholder="Name" />
              <input value={email} onChange={(event) => setEmail(event.target.value)} className="w-full border border-[#E6E6E6] bg-[#FFFFFF] px-4 py-3 text-[14px]" placeholder="Email" />
              <input value={address} onChange={(event) => setAddress(event.target.value)} className="w-full border border-[#E6E6E6] bg-[#FFFFFF] px-4 py-3 text-[14px]" placeholder="Address" />
              {error ? <ErrorUI message={error} /> : null}
              <button type="button" onClick={() => void onSubmit()} className="bg-[#111111] px-8 py-3 text-[13px] uppercase tracking-[0.08em] text-[#FFFFFF] transition-all duration-300 ease-in-out hover:opacity-90">Place order</button>
            </div>
            <div className="border border-[#E6E6E6] bg-[#F5F5F5] p-6">
              <h2 className="text-[20px] md:text-[24px] lg:text-[28px]">Summary</h2>
              {!items.length ? <EmptyUI label="checkout items" /> : null}
              <div className="mt-4 space-y-3">
                {Array.isArray(items)
                  ? items.map((item) => (
                      <div key={item.id} className="flex justify-between text-[14px]">
                        <span>{item.title} x {item.quantity}</span>
                        <span>฿{item.price * item.quantity}</span>
                      </div>
                    ))
                  : null}
              </div>
              <div className="mt-6 flex justify-between border-t border-[#E6E6E6] pt-4 text-[14px]"><span>Total</span><span>฿{total.toLocaleString()}</span></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
