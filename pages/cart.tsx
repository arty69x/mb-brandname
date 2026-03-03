import { useEffect, useMemo, useState } from 'react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import PageTitleBlock from '@/components/ui/PageTitleBlock';
import EmptyState from '@/components/ui/EmptyState';
import QuantityStepper from '@/components/commerce/QuantityStepper';
import CartSummary from '@/components/commerce/CartSummary';
import { PRODUCTS } from '@/data/products';
import { getCart, removeFromCart, updateQty } from '@/lib/cart';
import { canonical } from '@/lib/seo';

export default function CartPage() {
  const [items, setItems] = useState(getCart());
  useEffect(() => { setItems(getCart()); }, []);
  const rows = useMemo(() => items.map((item) => ({ item, product: PRODUCTS.find((p) => p.id === item.productId) })).filter((r) => Boolean(r.product)), [items]);
  const subtotal = rows.reduce((sum, row) => sum + (row.product?.price ?? 0) * row.item.qty, 0);
  return (
    <Layout>
      <SEO title='Cart — MB BRANDNAME' description='Review your shopping cart.' canonical={canonical('/cart')} />
      <main>
        <section className='py-16 lg:py-24'>
          <div className='container mx-auto px-4 max-w-[1200px]'>
            <PageTitleBlock title='SHOPPING CART' />
            
            {rows.length === 0 ? (
              <div className='mt-10'>
                <EmptyState title='Cart is empty' body='Add products to continue checkout.' ctaHref='/shop' ctaLabel='CONTINUE SHOPPING' />
              </div>
            ) : (
              <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mt-10'>
                <div className='lg:col-span-8'>
                  <div className='hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-[var(--border)] text-[12px] uppercase tracking-[0.1em] text-[var(--muted)] font-medium'>
                    <div className='col-span-6'>Product</div>
                    <div className='col-span-3 text-center'>Quantity</div>
                    <div className='col-span-3 text-right'>Total</div>
                  </div>
                  
                  {rows.map((row) => row.product ? (
                    <div key={row.item.productId} className='flex flex-col md:grid md:grid-cols-12 gap-6 items-center border-b border-[var(--border)] py-8'>
                      <div className='col-span-6 flex items-start gap-6 w-full'>
                        <div className='h-[120px] w-[90px] bg-[var(--bg-alt)] overflow-hidden shrink-0'>
                          {row.product.images[0] && <img src={row.product.images[0]} alt={row.product.title} className='h-full w-full object-cover'/>}
                        </div>
                        <div className='flex flex-col pt-2'>
                          <h2 className='text-[14px] uppercase tracking-[0.1em] mb-2'>{row.product.title}</h2>
                          <p className='text-[14px] text-[var(--muted)]'>${row.product.price.toFixed(2)}</p>
                          <button className='mt-4 text-[12px] uppercase tracking-[0.1em] text-[var(--muted)] hover:text-[var(--foreground)] text-left w-fit transition-colors' onClick={() => setItems(removeFromCart(row.item.productId))}>Remove</button>
                        </div>
                      </div>
                      <div className='col-span-3 flex justify-start md:justify-center w-full mt-4 md:mt-0'>
                        <QuantityStepper qty={row.item.qty} onChange={(qty) => setItems(updateQty(row.item.productId, qty))} />
                      </div>
                      <div className='col-span-3 flex justify-start md:justify-end w-full mt-2 md:mt-0 text-[14px] md:text-right'>
                        ${(row.product.price * row.item.qty).toFixed(2)}
                      </div>
                    </div>
                  ) : null)}
                </div>
                
                <div className='lg:col-span-4'>
                  <div className='sticky top-32'>
                    <CartSummary subtotal={subtotal} disabled={rows.length === 0} />
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
