import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Button from '@/components/ui/Button';
import WishlistButton from '@/components/commerce/WishlistButton';
import ProductGrid from '@/components/commerce/ProductGrid';
import { PRODUCTS } from '@/data/products';
import { addToCart } from '@/lib/cart';
import { canonical } from '@/lib/seo';

export default function ProductDetailPage() {
  const router = useRouter();
  const slug = typeof router.query.slug === 'string' ? router.query.slug : '';
  const product = useMemo(() => PRODUCTS.find((p) => p.slug === slug), [slug]);
  const [img, setImg] = useState(0);

  if (!product)
    return (
      <Layout>
        <main>
          <section className='py-10 lg:py-14'>
            <div className='container mx-auto px-4'>Not found</div>
          </section>
        </main>
      </Layout>
    );

  const images = Array.isArray(product.images) ? product.images : [];
  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <Layout>
      <SEO title={`${product.title} — MB BRANDNAME`} description={product.shortDescription} canonical={canonical(`/product/${product.slug}`)} />
      <main>
        <section className='py-10 lg:py-14'>
          <div className='container mx-auto px-4'>
            <Breadcrumbs items={[{ label: 'HOME', href: '/' }, { label: 'THE SHOP', href: '/shop' }]} />
            <div className='mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[110px_1fr_1fr]'>
              <div className='order-2 flex gap-3 lg:order-1 lg:flex-col'>
                {images.map((src, i) => (
                  <button key={src} onClick={() => setImg(i)} className={`h-24 w-24 overflow-hidden border ${i === img ? 'border-black' : 'border-[#d9d9d9]'}`}>
                    <img src={src} alt={`${product.title} ${i + 1}`} className='h-full w-full object-cover' />
                  </button>
                ))}
              </div>

              <div className='order-1 lg:order-2'>
                <div className='aspect-square overflow-hidden bg-[#f3f3f3]'>
                  {images[img] ? <img src={images[img]} alt={product.title} className='h-full w-full object-cover' /> : null}
                </div>
              </div>

              <div className='order-3'>
                <h1 className='text-[50px] leading-tight'>{product.title}</h1>
                <p className='mt-2 text-[44px] font-medium'>${product.price}</p>
                <p className='mt-6 text-[17px] leading-8 text-[#6b6b6b]'>{product.shortDescription}</p>

                <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
                  <Button onClick={() => addToCart(product.id, 1)}>Add to cart</Button>
                  <WishlistButton productId={product.id} />
                  <Button
                    variant='secondary'
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(window.location.href);
                      } catch {}
                    }}
                  >
                    Share
                  </Button>
                </div>

                <div className='mt-8 space-y-2 text-[14px] text-[#6b6b6b]'>
                  <p>
                    <b className='text-[#1a1a1a]'>SKU:</b> N/A
                  </p>
                  <p>
                    <b className='text-[#1a1a1a]'>Categories:</b> {product.category}
                  </p>
                  <p>
                    <b className='text-[#1a1a1a]'>Tags:</b> {product.tags.join(', ')}
                  </p>
                </div>
              </div>
            </div>

            <div className='mt-16 grid gap-10 border-t border-[#d9d9d9] pt-10 lg:grid-cols-2'>
              <div>
                <h2 className='mb-5 text-[26px] uppercase'>Description</h2>
                <p className='text-[17px] leading-8 text-[#6b6b6b]'>{product.description}</p>
              </div>
              <div>
                <h2 className='mb-5 text-[26px] uppercase'>Additional information</h2>
                <ul className='space-y-3 text-[17px] text-[#6b6b6b]'>
                  {product.additionalInfo.map((item) => (
                    <li key={item.label}>
                      <b className='text-[#1a1a1a]'>{item.label}:</b> {item.value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className='mt-16'>
              <h2 className='mb-8 text-[36px] uppercase'>Related products</h2>
              <ProductGrid products={related} />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
