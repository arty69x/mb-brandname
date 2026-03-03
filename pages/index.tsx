import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import ProductGrid from '@/components/commerce/ProductGrid';
import Button from '@/components/ui/Button';
import { PRODUCTS } from '@/data/products';
import { canonical } from '@/lib/seo';

export default function HomePage() {
  return (
    <Layout headerVariant='home'>
      <SEO
        title='MB BRANDNAME — No.1 Luxury Store'
        description='Discover MB BRANDNAME. Luxury bags, accessories, and new arrivals.'
        canonical={canonical('/')}
      />
      <main>
        <section className='relative h-[78vh] min-h-[520px]'>
          <div className='absolute inset-0 grid grid-cols-2 grid-rows-2'>
            <img src='/assets/mb/v1/hero1.svg' alt='hero 1' className='h-full w-full object-cover' />
            <img src='/assets/mb/v1/hero2.svg' alt='hero 2' className='h-full w-full object-cover' />
            <img src='/assets/mb/v1/hero3.svg' alt='hero 3' className='h-full w-full object-cover' />
            <img src='/assets/mb/v1/p4a.svg' alt='hero 4' className='h-full w-full object-cover' />
          </div>
          <div className='absolute inset-0 bg-black/30' />
          <div className='absolute inset-0 flex items-center justify-center'>
            <h1 className='px-4 text-center text-[44px] font-light tracking-[0.02em] text-white lg:text-[64px]'>NO.1 Luxury Brandname</h1>
          </div>
        </section>

        <section className='bg-[var(--bg-alt)] py-14 lg:py-20'>
          <div className='container mx-auto px-4'>
            <h2 className='mb-10 text-center text-[42px] uppercase'>New Arrivals</h2>
            <ProductGrid products={PRODUCTS.slice(0, 8)} />
            <div className='mt-10 text-center'>
              <Button href='/new-arrivals' variant='pill'>
                View More →
              </Button>
            </div>
          </div>
        </section>

        <section className='py-14 lg:py-20'>
          <div className='container mx-auto grid grid-cols-1 items-center gap-10 px-4 lg:grid-cols-2'>
            <img src='/assets/mb/v1/p4a.svg' alt='brand story' className='w-full object-cover' />
            <div>
              <h2 className='mb-6 text-[44px] font-medium'>Each necklace has its own unique story to tell.</h2>
              <p className='mb-5 text-[20px] leading-8 text-[var(--muted)]'>
                In the world of fashion, true luxury is not defined by price alone, but by the story behind each piece.
              </p>
              <p className='mb-8 text-[20px] leading-8 text-[var(--muted)]'>
                Designed to embody timeless elegance, this signature necklace mixes classic craftsmanship with modern charm.
              </p>
              <Button variant='pill' href='/about'>
                Find your style
              </Button>
            </div>
          </div>
        </section>

        <section className='bg-[var(--bg-alt)] py-16 text-center'>
          <div className='container mx-auto px-4'>
            <h2 className='mb-7 text-[42px] uppercase'>About us</h2>
            <p className='mb-6 text-[32px] uppercase'>100% Authentic branded items from Japan</p>
            <p className='mx-auto max-w-[980px] text-[22px] leading-9 text-[var(--muted)]'>
              Carefully selected and imported directly from Japan. With over 10 years of experience in authentic secondhand branded
              goods, we guarantee genuine quality. Each item is thoroughly inspected before delivery.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
