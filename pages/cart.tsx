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
  return <Layout><SEO title='Cart — MB BRANDNAME' description='Review your shopping cart.' canonical={canonical('/cart')} /><main><section className='py-10 lg:py-14'><div className='container mx-auto px-4'><PageTitleBlock title='SHOPPING CART' />{rows.length === 0 ? <EmptyState title='Cart is empty' body='Add products to continue checkout.' ctaHref='/shop' ctaLabel='Shop now' /> : <div className='grid grid-cols-1 gap-10 lg:grid-cols-3'><div className='lg:col-span-2'>{rows.map((row) => row.product ? <div key={row.item.productId} className='flex gap-4 border-b border-[var(--border)] py-6'><div className='h-24 w-24 bg-[var(--bg-alt)] overflow-hidden'>{row.product.images[0] ? <img src={row.product.images[0]} alt={row.product.title} className='h-full w-full object-cover'/> : null}</div><div className='flex-1'><h2 className='text-[14px] uppercase tracking-[0.08em]'>{row.product.title}</h2><p>${row.product.price}</p><div className='mt-3'><QuantityStepper qty={row.item.qty} onChange={(qty)=>setItems(updateQty(row.item.productId, qty))} /></div><button className='mt-3 underline' onClick={() => setItems(removeFromCart(row.item.productId))}>Remove</button></div></div> : null)}</div><div className='lg:col-span-1'><CartSummary subtotal={subtotal} disabled={rows.length===0} /></div></div>}</div></section></main></Layout>;
}
