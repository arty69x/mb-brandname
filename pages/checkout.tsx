import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import { PRODUCTS } from '@/data/products';
import { clearCart, getCart } from '@/lib/cart';
import { createOrderId } from '@/lib/order';
import { getItem, setItem } from '@/lib/storage';
import { Order } from '@/data/types';
import { canonical } from '@/lib/seo';

const emptyForm = {
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  country: '',
  postalCode: '',
};

function toTHB(price: number, slug: string): number {
  if (slug === 'calvin-shorts') return 2190;
  if (slug === 'bottega-brown') return 1990;
  return Math.round((price * 32.1) / 10) * 10;
}

function formatTHB(value: number): string {
  return `${value.toLocaleString('en-US')} THB`;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState(getCart());
  const [form, setForm] = useState(emptyForm);
  const [orderId, setOrderId] = useState('');
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const loaded = getCart();
    setCart(loaded);
    if (loaded.length === 0) void router.replace('/cart');
  }, [router]);

  const rows = useMemo(
    () => cart.map((item) => ({ item, product: PRODUCTS.find((p) => p.id === item.productId) })).filter((row) => Boolean(row.product)),
    [cart],
  );

  const total = useMemo(
    () => rows.reduce((sum, row) => sum + (row.product ? toTHB(row.product.price, row.product.slug) * row.item.qty : 0), 0),
    [rows],
  );

  const valid =
    form.email.includes('@') &&
    form.firstName.trim().length > 0 &&
    form.lastName.trim().length > 0 &&
    form.phone.trim().length > 0 &&
    form.country.trim().length > 0 &&
    form.postalCode.trim().length > 0;

  const onSubmit = (): void => {
    setSubmitError('');
    if (!valid || rows.length === 0) {
      setSubmitError('Please complete all required fields.');
      return;
    }

    try {
      const id = createOrderId(cart);
      const orders = getItem<Order[]>('mb_orders_v1', []);
      const safeOrders = Array.isArray(orders) ? orders : [];

      setItem('mb_orders_v1', [
        ...safeOrders,
        {
          id,
          items: cart,
          total,
          createdAtISO: new Date().toISOString(),
          shipping: {
            email: form.email,
            firstName: form.firstName,
            lastName: form.lastName,
            address: '-',
            city: '-',
            country: form.country,
            postalCode: form.postalCode,
            phone: form.phone,
          },
        },
      ]);
      clearCart();
      setOrderId(id);
    } catch {
      setSubmitError('Unable to place order right now. Please try again.');
    }
  };

  return (
    <Layout>
      <SEO title='Checkout — MB BRANDNAME' description='Complete your order.' canonical={canonical('/checkout')} />
      <main>
        <section className='bg-[#f2f2f2] pb-16'>
          <div className='container mx-auto px-4'>
            {orderId ? (
              <div className='pb-16 pt-16 sm:pt-20'>
                <h1 className='text-center text-[32px] font-black uppercase tracking-[0.06em] sm:text-[44px]'>THANK YOU</h1>
                <p className='mt-4 text-center text-[15px] font-medium uppercase tracking-[0.02em] text-[#4f5b6d] sm:text-[20px]'>
                  ORDER {orderId} HAS BEEN PLACED SUCCESSFULLY.
                </p>

                <div className='mx-auto mt-8 max-w-[920px] bg-[#ececec] px-4 py-6 sm:px-7 sm:py-8'>
                  <div className='space-y-0'>
                    {rows.map((row) =>
                      row.product ? (
                        <div key={row.item.productId} className='border-b border-[#d7d7d7] py-4 sm:py-5'>
                          <div className='flex items-center justify-between gap-2 text-[15px] font-bold uppercase sm:text-[22px]'>
                            <p>
                              {row.item.qty} X {row.product.title}
                            </p>
                            <p>{formatTHB(toTHB(row.product.price, row.product.slug) * row.item.qty)}</p>
                          </div>
                        </div>
                      ) : null,
                    )}
                    <div className='pt-6 sm:pt-8'>
                      <div className='flex items-center justify-between text-[18px] font-black uppercase sm:text-[26px]'>
                        <span>TOTAL</span>
                        <span>{formatTHB(total)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='mt-10 flex justify-center sm:mt-14'>
                  <Link
                    href='/new-arrivals'
                    className='border-b-2 border-black pb-1 text-[16px] font-bold uppercase tracking-[0.08em] transition-opacity hover:opacity-70 sm:text-[22px]'
                  >
                    CONTINUE SHOPPING
                  </Link>
                </div>
              </div>
            ) : (
              <div className='pb-16 pt-16 sm:pt-20'>
                <h1 className='text-center text-[32px] font-black uppercase tracking-[0.06em] sm:text-[44px]'>CHECKOUT</h1>

                <form
                  className='mx-auto mt-8 grid max-w-[920px] grid-cols-1 gap-4 sm:mt-10 sm:gap-6'
                  onSubmit={(event) => {
                    event.preventDefault();
                    onSubmit();
                  }}
                >
                  <input
                    value={form.email}
                    placeholder='EMAIL'
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    className='h-14 border border-[#cfcfcf] bg-transparent px-4 text-[14px] font-bold uppercase tracking-[0.08em] placeholder:text-[#7d7d7d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 sm:h-16 sm:px-6 sm:text-[18px]'
                    aria-label='Email'
                  />
                  <input
                    value={form.firstName}
                    placeholder='FIRST NAME'
                    onChange={(e) => setForm((prev) => ({ ...prev, firstName: e.target.value }))}
                    className='h-14 border border-[#cfcfcf] bg-transparent px-4 text-[14px] font-bold uppercase tracking-[0.08em] placeholder:text-[#7d7d7d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 sm:h-16 sm:px-6 sm:text-[18px]'
                    aria-label='First name'
                  />
                  <input
                    value={form.lastName}
                    placeholder='LAST NAME'
                    onChange={(e) => setForm((prev) => ({ ...prev, lastName: e.target.value }))}
                    className='h-14 border border-[#cfcfcf] bg-transparent px-4 text-[14px] font-bold uppercase tracking-[0.08em] placeholder:text-[#7d7d7d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 sm:h-16 sm:px-6 sm:text-[18px]'
                    aria-label='Last name'
                  />

                  <div className='grid grid-cols-3 gap-3 sm:gap-4'>
                    <input
                      value={form.phone}
                      placeholder='PHONE'
                      onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                      className='h-14 border border-[#cfcfcf] bg-transparent px-3 text-[12px] font-bold uppercase tracking-[0.08em] placeholder:text-[#7d7d7d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 sm:h-16 sm:px-4 sm:text-[14px]'
                      aria-label='Phone'
                    />
                    <input
                      value={form.country}
                      placeholder='COUNTRY'
                      onChange={(e) => setForm((prev) => ({ ...prev, country: e.target.value }))}
                      className='h-14 border border-[#cfcfcf] bg-transparent px-3 text-[12px] font-bold uppercase tracking-[0.08em] placeholder:text-[#7d7d7d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 sm:h-16 sm:px-4 sm:text-[14px]'
                      aria-label='Country'
                    />
                    <input
                      value={form.postalCode}
                      placeholder='ZIP'
                      onChange={(e) => setForm((prev) => ({ ...prev, postalCode: e.target.value }))}
                      className='h-14 border border-[#cfcfcf] bg-transparent px-3 text-[12px] font-bold uppercase tracking-[0.08em] placeholder:text-[#7d7d7d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 sm:h-16 sm:px-4 sm:text-[14px]'
                      aria-label='Postal code'
                    />
                  </div>

                  {submitError ? <p className='text-[13px] text-[#bb1f1f] sm:text-[16px]'>{submitError}</p> : null}

                  <button
                    type='submit'
                    disabled={!valid || rows.length === 0}
                    className='mt-2 h-14 bg-black text-[16px] font-bold uppercase tracking-[0.08em] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:h-16 sm:text-[24px]'
                  >
                    PAY {total.toLocaleString('en-US')} THB
                  </button>
                </form>
              </div>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
