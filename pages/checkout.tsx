import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import PageTitleBlock from '@/components/ui/PageTitleBlock';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { PRODUCTS } from '@/data/products';
import { clearCart, getCart } from '@/lib/cart';
import { createOrderId } from '@/lib/order';
import { getItem, setItem } from '@/lib/storage';
import { Order } from '@/data/types';
import { canonical } from '@/lib/seo';

const emptyForm = { email: '', firstName: '', lastName: '', address: '', city: '', country: '', postalCode: '', phone: '' };

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState(getCart());
  const [form, setForm] = useState(emptyForm);
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    const c = getCart();
    setCart(c);
    if (c.length === 0) void router.replace('/cart');
  }, [router]);

  const total = useMemo(() => cart.reduce((sum, item) => sum + (PRODUCTS.find((p) => p.id === item.productId)?.price ?? 0) * item.qty, 0), [cart]);
  const valid = form.email.includes('@') && form.postalCode.length >= 3 && form.phone.length >= 7 && Object.values(form).every((v) => v.trim().length > 0);

  const submit = (): void => {
    if (!valid || cart.length === 0) return;
    const id = createOrderId(cart);
    const orders = getItem<Order[]>('mb_orders_v1', []);
    setItem('mb_orders_v1', [...orders, { id, items: cart, total, createdAtISO: '2026-01-01T00:00:00.000Z', shipping: form }]);
    clearCart();
    setOrderId(id);
  };

  return (
    <Layout>
      <SEO title='Checkout — MB BRANDNAME' description='Complete your order.' canonical={canonical('/checkout')} />
      <main>
        <section className='bg-[var(--bg-alt)] py-10 lg:py-14'>
          <div className='container mx-auto px-4'>
            <PageTitleBlock title='CHECKOUT' subtitle='Secure your order with verified shipping and payment flow.' />
            {orderId ? (
              <div className='mx-auto max-w-xl rounded-2xl border border-[var(--border)] bg-white p-6 text-center lg:p-8'>
                <p className='text-[14px] text-[var(--muted)]'>Order confirmed</p>
                <p className='mt-2 text-[20px] tracking-[0.08em]'>{orderId}</p>
                <div className='mt-6'><Button href='/shop'>Continue shopping</Button></div>
              </div>
            ) : (
              <div className='grid grid-cols-1 gap-10 lg:grid-cols-3'>
                <div className='lg:col-span-2 rounded-2xl border border-[var(--border)] bg-white p-6 lg:p-8'>
                  <div className='grid gap-4 md:grid-cols-2'>
                    <Input id='email' label='Email' value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                    <Input id='phone' label='Phone' value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                    <Input id='firstName' label='First name' value={form.firstName} onChange={(v) => setForm({ ...form, firstName: v })} />
                    <Input id='lastName' label='Last name' value={form.lastName} onChange={(v) => setForm({ ...form, lastName: v })} />
                    <Input id='address' label='Address' value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
                    <Input id='city' label='City' value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
                    <Input id='country' label='Country' value={form.country} onChange={(v) => setForm({ ...form, country: v })} />
                    <Input id='postalCode' label='Postal code' value={form.postalCode} onChange={(v) => setForm({ ...form, postalCode: v })} />
                  </div>
                  <div className='mt-5'>
                    <Button onClick={submit} disabled={!valid}>Place order</Button>
                  </div>
                </div>
                <aside className='rounded-2xl border border-[var(--border)] bg-white p-6'>
                  <h2 className='text-[12px] uppercase tracking-[0.14em]'>Order summary</h2>
                  <p className='mt-3 text-[14px] text-[var(--muted)]'>Subtotal</p>
                  <p className='text-[24px]'>${total.toFixed(2)}</p>
                </aside>
              </div>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
