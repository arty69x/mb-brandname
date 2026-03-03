import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Tabs from '@/components/ui/Tabs';
import Button from '@/components/ui/Button';
import WishlistButton from '@/components/commerce/WishlistButton';
import { PRODUCTS } from '@/data/products';
import { addToCart } from '@/lib/cart';
import { canonical } from '@/lib/seo';

export default function ProductDetailPage() {
  const router = useRouter();
  const slug = typeof router.query.slug === 'string' ? router.query.slug : '';
  const product = useMemo(() => PRODUCTS.find((p) => p.slug === slug), [slug]);
  const [img, setImg] = useState(0);

  if (!product) return <Layout><main><section className='py-10 lg:py-14'><div className='container mx-auto px-4'>Not found</div></section></main></Layout>;

  const images = Array.isArray(product.images) ? product.images : [];

  return (
    <Layout>
      <SEO title={`${product.title} — MB BRANDNAME`} description={product.shortDescription} canonical={canonical(`/product/${product.slug}`)} />
      <main>
        <section className='py-10 lg:py-14'>
          <div className='container mx-auto px-4'>
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Shop', href: '/shop' }, { label: product.title }]} />
            <div className='mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.9fr]'>
              <div>
                <div className='aspect-square overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-alt)]'>
                  {images[img] ? <img src={images[img]} alt={product.title} className='h-full w-full object-cover' /> : null}
                </div>
                <div className='mt-4 grid grid-cols-5 gap-3'>
                  {images.map((src, i) => (
                    <button key={src} onClick={() => setImg(i)} className={`aspect-square overflow-hidden rounded-xl border border-[var(--border)] ${i === img ? 'border-[var(--cta)]' : ''}`}>
                      <img src={src} alt={`${product.title} ${i + 1}`} className='h-full w-full object-cover' />
                    </button>
                  ))}
                </div>
              </div>
              <article className='rounded-2xl border border-[var(--border)] bg-white p-6 lg:p-8'>
                <p className='text-[11px] uppercase tracking-[0.16em] text-[var(--caption)]'>{product.category}</p>
                <h1 className='mt-3 text-[24px] font-light tracking-[0.02em] lg:text-[34px]'>{product.title}</h1>
                <div className='mt-4 flex items-baseline gap-3'>
                  {product.compareAtPrice ? <span className='text-[12px] text-[var(--caption)] line-through'>${product.compareAtPrice}</span> : null}
                  <span className={`text-[20px] ${product.compareAtPrice ? 'text-[var(--danger)]' : ''}`}>${product.price}</span>
                </div>
                <p className='mt-6 text-[14px] leading-[1.8] text-[var(--muted)]'>{product.shortDescription}</p>
                <ul className='mt-6 space-y-2 text-[13px] text-[var(--muted)]'>
                  {product.additionalInfo.map((item) => <li key={item.label}>{item.label}: {item.value}</li>)}
                </ul>
                <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
                  <Button onClick={() => addToCart(product.id, 1)}>Add to cart</Button>
                  <WishlistButton productId={product.id} />
                  <Button variant='secondary' onClick={async () => { try { await navigator.clipboard.writeText(window.location.href); } catch {} }}>Share</Button>
                </div>
              </article>
            </div>
            <div className='mt-10'>
              <Tabs items={[{ id: 'description', label: 'DESCRIPTION', content: product.description }, { id: 'additional', label: 'ADDITIONAL INFORMATION', content: product.additionalInfo.map((i) => `${i.label}: ${i.value}`).join(', ') }, { id: 'reviews', label: 'REVIEWS', content: 'No reviews yet.' }]} />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
