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
  useEffect(() => { const c = getCart(); setCart(c); if (c.length === 0) { void router.replace('/cart'); } }, [router]);
  const total = useMemo(() => cart.reduce((sum, item) => sum + (PRODUCTS.find((p) => p.id === item.productId)?.price ?? 0) * item.qty, 0), [cart]);
  const valid = form.email.includes('@') && form.postalCode.length >= 3 && form.phone.length >= 7 && Object.values(form).every((v)=>v.trim().length>0);
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
        <section className='py-16 lg:py-24'>
          <div className='container mx-auto px-4 max-w-[1200px]'>
            <PageTitleBlock title='CHECKOUT' />
            
            {orderId ? (
              <div className='max-w-[600px] mx-auto text-center border border-[var(--border)] p-12 mt-10'>
                <h2 className='text-[20px] uppercase tracking-[0.1em] mb-4'>Order Confirmed</h2>
                <p className='text-[14px] text-[var(--muted)] mb-8'>Thank you for your purchase. Your order number is <strong>{orderId}</strong>.</p>
                <div className='mt-8'>
                  <Button href='/shop' variant='primary'>CONTINUE SHOPPING</Button>
                </div>
              </div>
            ) : (
              <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mt-10'>
                <div className='lg:col-span-8 space-y-10'>
                  <div>
                    <h2 className='text-[16px] uppercase tracking-[0.1em] font-medium mb-6 pb-4 border-b border-[var(--border)]'>1. Contact Input</h2>
                    <Input id='email' label='Email address' value={form.email} onChange={(v)=>setForm({ ...form, email: v })} />
                  </div>
                  
                  <div>
                    <h2 className='text-[16px] uppercase tracking-[0.1em] font-medium mb-6 pb-4 border-b border-[var(--border)]'>2. Shipping Address</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <Input id='firstName' label='First Name' value={form.firstName} onChange={(v)=>setForm({ ...form, firstName: v })} />
                      <Input id='lastName' label='Last Name' value={form.lastName} onChange={(v)=>setForm({ ...form, lastName: v })} />
                    </div>
                    <div className='mt-6 space-y-6'>
                      <Input id='address' label='Address' value={form.address} onChange={(v)=>setForm({ ...form, address: v })} />
                      <Input id='city' label='City' value={form.city} onChange={(v)=>setForm({ ...form, city: v })} />
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <Input id='country' label='Country' value={form.country} onChange={(v)=>setForm({ ...form, country: v })} />
                        <Input id='postalCode' label='Postal Code' value={form.postalCode} onChange={(v)=>setForm({ ...form, postalCode: v })} />
                      </div>
                      <Input id='phone' label='Phone' value={form.phone} onChange={(v)=>setForm({ ...form, phone: v })} />
                    </div>
                  </div>

                  <div className='pt-6 w-full flex'>
                     <Button variant='primary' onClick={submit} disabled={!valid}>PLACE ORDER</Button>
                  </div>
                </div>

                <div className='lg:col-span-4'>
                  <div className='bg-[var(--bg-alt)] p-8 sticky top-32'>
                    <h2 className='text-[16px] uppercase tracking-[0.1em] font-medium mb-6'>Order Summary</h2>
                    <div className='space-y-4 mb-6 border-b border-[var(--border)] pb-6'>
                      {cart.map((item) => {
                        const p = PRODUCTS.find((prod) => prod.id === item.productId);
                        if (!p) return null;
                        return (
                          <div key={item.productId} className='flex justify-between text-[13px]'>
                            <span className='text-[var(--text)]'>{p.title} <span className='text-[var(--muted)]'>x {item.qty}</span></span>
                            <span>${(p.price * item.qty).toFixed(2)}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className='flex justify-between text-[15px] font-medium uppercase tracking-[0.1em]'>
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
