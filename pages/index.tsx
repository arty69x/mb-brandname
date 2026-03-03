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
          <div className='absolute inset-0 grid grid-cols-12 grid-rows-6'>
            <img src='/assets/mb/v1/hero1.svg' alt='hero 1' className='col-span-5 row-span-3 h-full w-full object-cover' />
            <img src='/assets/mb/v1/hero2.svg' alt='hero 2' className='col-span-7 row-span-6 h-full w-full object-cover' />
            <img src='/assets/mb/v1/hero3.svg' alt='hero 3' className='col-span-5 row-span-3 h-full w-full object-cover' />
          </div>
          <div className='absolute inset-0 bg-black/25' />
          <div className='absolute inset-0 flex items-center justify-center'>
            <h1 className='px-4 text-center text-[34px] font-light tracking-[0.02em] text-white lg:text-[62px]'>NO.1 Luxury Brandname</h1>
          </div>
        </section>

        <section className='bg-[var(--bg-alt)] py-16 lg:py-20'>
          <div className='container mx-auto px-4'>
            <h2 className='mb-10 text-center text-[20px] font-medium uppercase tracking-[0.16em]'>New Arrivals</h2>
            <ProductGrid products={PRODUCTS.slice(0, 8)} />
            <div className='mt-10 text-center'>
              <Button href='/new-arrivals' variant='pill'>
                View More →
              </Button>
            </div>
          </div>
        </section>

        <section className='bg-[var(--bg-alt)] py-16 lg:py-20'>
          <div className='container mx-auto grid grid-cols-1 items-center gap-10 px-4 lg:grid-cols-2'>
            <img src='/assets/mb/v1/p4a.svg' alt='brand story' className='w-full object-cover' />
            <div>
              <h2 className='mb-6 text-[52px] leading-tight font-medium'>A bracelet with timeless elegance.</h2>
              <p className='mb-5 text-[19px] leading-9 text-[var(--muted)]'>
                This bracelet embodies timeless beauty through its refined yet powerful design. The gold-tone frame is paired with soft,
                luminous white accents, highlighted by the brand&apos;s iconic logo.
              </p>
              <p className='mb-8 text-[19px] leading-9 text-[var(--muted)]'>
                More than just jewelry, this piece carries a story of taste, craftsmanship, and individuality.
              </p>
              <Button variant='pill' href='/about'>
                Find your style
              </Button>
            </div>
          </div>
        </section>

        <section className='bg-[var(--bg-alt)] py-16 text-center'>
          <div className='container mx-auto px-4'>
            <h2 className='mb-7 text-[20px] uppercase tracking-[0.16em]'>About us</h2>
            <p className='mb-6 text-[30px] uppercase'>100% Authentic branded items from Japan</p>
            <p className='mx-auto max-w-[980px] text-[20px] leading-9 text-[var(--muted)]'>
              MB BRANDNAME carefully selects and imports authentic secondhand luxury from Japan. With over 10 years of experience, every
              item is inspected thoroughly before delivery.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
