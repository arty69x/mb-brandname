import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import QuantityStepper from '@/components/commerce/QuantityStepper';
import { PRODUCTS } from '@/data/products';
import { getCart, removeFromCart, updateQty } from '@/lib/cart';
import { canonical } from '@/lib/seo';

function formatTHB(price: number): string {
  const mapped = Math.round((price * 32.1) / 10) * 10;
  return `${mapped.toLocaleString('en-US')} THB`;
}

export default function CartPage() {
  const [items, setItems] = useState(getCart());

  useEffect(() => {
    setItems(getCart());
  }, []);

  const rows = useMemo(
    () => items.map((item) => ({ item, product: PRODUCTS.find((p) => p.id === item.productId) })).filter((row) => Boolean(row.product)),
    [items],
  );

  return (
    <Layout>
      <SEO title='Cart — MB BRANDNAME' description='Review your shopping cart.' canonical={canonical('/cart')} />
      <main>
        <section className='bg-[#f2f2f2] pb-16'>
          <div className='container mx-auto px-4'>
            {rows.length === 0 ? (
              <div className='flex min-h-[calc(100vh-160px)] flex-col items-center justify-center text-center'>
                <h1 className='text-[28px] font-black uppercase tracking-[0.06em] sm:text-[36px]'>YOUR BAG IS EMPTY</h1>
                <Link
                  href='/new-arrivals'
                  className='mt-12 border-b-2 border-black pb-1 text-[16px] font-bold uppercase tracking-[0.08em] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 sm:text-[20px]'
                >
                  CONTINUE SHOPPING
                </Link>
              </div>
            ) : (
              <div className='py-8'>
                <h1 className='pb-8 text-center text-[24px] font-black uppercase tracking-[0.08em] sm:text-[30px]'>YOUR BAG</h1>
                <div className='space-y-4'>
                  {rows.map((row) =>
                    row.product ? (
                      <article key={row.item.productId} className='grid grid-cols-12 gap-4 border border-[#d7d7d7] bg-white p-4'>
                        <div className='col-span-4'>
                          <div className='aspect-square overflow-hidden bg-[#ededed]'>
                            {row.product.images[0] ? (
                              <img src={row.product.images[0]} alt={row.product.title} loading='lazy' className='h-full w-full object-cover' />
                            ) : null}
                          </div>
                        </div>
                        <div className='col-span-8 flex flex-col'>
                          <div className='flex items-start justify-between gap-2'>
                            <h2 className='text-[14px] font-bold uppercase sm:text-[16px]'>{row.product.title}</h2>
                            <button
                              onClick={() => setItems(removeFromCart(row.item.productId))}
                              className='text-[11px] uppercase tracking-[0.08em] text-[#5a5a5a] hover:text-black sm:text-[12px]'
                            >
                              Remove
                            </button>
                          </div>
                          <p className='mt-2 text-[14px] font-semibold sm:text-[16px]'>{formatTHB(row.product.price)}</p>
                          <div className='mt-auto flex items-center justify-between pt-4'>
                            <QuantityStepper qty={row.item.qty} onChange={(qty) => setItems(updateQty(row.item.productId, qty))} />
                            <div className='flex items-center gap-2'>
                              <ShoppingBag className='h-5 w-5 sm:h-6 sm:w-6' />
                              <Heart className='h-5 w-5 sm:h-6 sm:w-6' />
                            </div>
                          </div>
                        </div>
                      </article>
                    ) : null,
                  )}
                </div>
                <div className='mt-6'>
                  <Link
                    href='/checkout'
                    className='flex h-14 items-center justify-center bg-black text-[16px] font-bold uppercase tracking-[0.08em] text-white transition-opacity hover:opacity-90 sm:h-16 sm:text-[20px]'
                  >
                    CHECKOUT
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
