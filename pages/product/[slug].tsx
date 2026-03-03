import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ProductGrid from '@/components/commerce/ProductGrid';
import { PRODUCTS } from '@/data/products';
import { addToCart } from '@/lib/cart';
import { canonical } from '@/lib/seo';

export default function ProductDetailPage() {
  const router = useRouter();
  const slug = typeof router.query.slug === 'string' ? router.query.slug : '';
  const product = useMemo(() => PRODUCTS.find((p) => p.slug === slug), [slug]);
  const [img, setImg] = useState(0);
  const [qty, setQty] = useState(1);

  if (!product) return <Layout><main><section className='py-10 lg:py-14'><div className='container mx-auto px-4'>Not found</div></section></main></Layout>;

  const images = Array.isArray(product.images) ? product.images : [];

  return (
    <Layout>
      <SEO title={`${product.title} — MB BRANDNAME`} description={product.shortDescription} canonical={canonical(`/product/${product.slug}`)} />
      <main className='bg-[#efefef]'>
        <section className='py-8 lg:py-10'>
          <div className='container mx-auto px-4'>
            <div className='text-[11px] uppercase tracking-[0.08em]'><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'The shop', href: '/shop' }]} /></div>
            <div className='mt-5 grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr]'>
              <div className='grid grid-cols-[74px_1fr] gap-4'>
                <div className='space-y-2'>
                  {images.map((src, i) => (
                    <button key={src} onClick={() => setImg(i)} className={`block h-[74px] w-[74px] overflow-hidden border ${i === img ? 'border-black' : 'border-transparent'}`}>
                      <img src={src} alt={`${product.title} ${i + 1}`} className='h-full w-full object-cover' />
                    </button>
                  ))}
                </div>
                <div className='relative overflow-hidden'>
                  {images[img] ? <img src={images[img]} alt={product.title} className='h-full w-full object-cover' /> : null}
                </div>
              </div>

              <article className='max-w-[560px]'>
                <h1 className='text-[44px] font-light leading-[1.15]'>{product.title}</h1>
                <p className='mt-2 text-[40px]'>${product.price}</p>
                <p className='mt-5 text-[14px] leading-[1.8] text-[#444]'>{product.shortDescription}</p>

                <div className='mt-7 flex items-center gap-3'>
                  <div className='flex h-12 items-center border border-black px-4'>
                    <button onClick={() => setQty((q) => Math.max(1, q - 1))} className='w-6 text-xl'>-</button>
                    <span className='w-10 text-center text-[14px]'>{qty}</span>
                    <button onClick={() => setQty((q) => q + 1)} className='w-6 text-xl'>+</button>
                  </div>
                  <button className='h-12 bg-black px-12 text-[12px] font-semibold uppercase tracking-[0.12em] text-white' onClick={() => addToCart(product.id, qty)}>Add to cart</button>
                </div>

                <div className='mt-5 flex gap-5 text-[11px] uppercase tracking-[0.1em]'>
                  <button>Add to wishlist</button>
                  <button>Share</button>
                </div>

                <div className='mt-7 space-y-1 text-[12px] uppercase'>
                  <p>SKU: N/A</p>
                  <p>Categories: Casual & Urban Wear, Jackets, Men</p>
                  <p>Tags: biker, black, bomber, leather</p>
                </div>
              </article>
            </div>

            <section className='mt-14'>
              <h2 className='text-[13px] uppercase tracking-[0.12em] underline'>Description</h2>
              <p className='mt-6 text-[14px] leading-[1.8] text-[#444]'>{product.description}</p>
            </section>

            <section className='mt-12'>
              <h2 className='text-[13px] uppercase tracking-[0.12em] underline'>Additional information</h2>
              <div className='mt-5 grid grid-cols-1 gap-2 md:grid-cols-2'>
                {product.additionalInfo.map((item) => <p key={item.label} className='text-[13px]'>{item.label}: {item.value}</p>)}
              </div>
            </section>

            <section className='mt-16'>
              <h2 className='text-[36px] uppercase'>Related products</h2>
              <div className='mt-7'>
                <ProductGrid products={PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4)} />
              </div>
            </section>
          </div>
        </section>
      </main>
    </Layout>
  );
}
