import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import ProductGrid from '@/components/commerce/ProductGrid';
import Button from '@/components/ui/Button';
import { PRODUCTS } from '@/data/products';
import { canonical } from '@/lib/seo';

const highlights = [
  { title: '100% Authentic', body: 'Professionally authenticated luxury goods from trusted Japan sourcing channels.' },
  { title: 'Client-Centric Service', body: 'Dedicated advisors help with sizing, condition checks, and post-purchase support.' },
  { title: 'Secure Delivery', body: 'Careful packaging with reliable shipping partners and tracking for every order.' },
];

export default function HomePage() {
  return (
    <Layout headerVariant='home'>
      <SEO title='MB BRANDNAME — No.1 Luxury Store' description='Discover MB BRANDNAME. Luxury bags, accessories, and new arrivals.' canonical={canonical('/')} />
      <main>
        <section className='relative h-screen'>
          <div className='container mx-auto h-full px-4'>
            <div className='absolute inset-0 grid h-full w-full grid-cols-12 grid-rows-6'>
              <div className='col-span-7 row-span-6'><img src='/assets/mb/v1/hero1.svg' alt='MB hero visual' className='h-full w-full object-cover' /></div>
              <div className='col-span-5 row-span-3'><img src='/assets/mb/v1/hero2.svg' alt='MB hero visual secondary' className='h-full w-full object-cover' /></div>
              <div className='col-span-5 row-span-3'><img src='/assets/mb/v1/hero3.svg' alt='MB hero visual tertiary' className='h-full w-full object-cover' /></div>
            </div>
            <div className='absolute inset-0 bg-black/30' />
            <div className='absolute inset-0 flex items-center justify-center px-6'>
              <div className='text-center text-white'>
                <p className='mb-4 text-[11px] uppercase tracking-[0.25em]'>Premium curated secondhand luxury</p>
                <h1 className='text-[30px] font-light leading-[1.08] tracking-[0.06em] lg:text-[52px]'>NO.1 MB BRANDNAME STORE</h1>
                <div className='mt-8 flex flex-wrap justify-center gap-3'>
                  <Button href='/shop'>Shop now</Button>
                  <Button href='/about' variant='secondary'>Our story</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='bg-[var(--bg-alt)] py-14 lg:py-20'>
          <div className='container mx-auto px-4'>
            <h2 className='mb-10 text-center text-[18px] font-medium uppercase tracking-[0.22em] lg:text-[20px]'>New Arrivals</h2>
            <ProductGrid products={PRODUCTS.slice(0, 4)} />
            <div className='mt-10 text-center'><Button href='/new-arrivals'>View more</Button></div>
          </div>
        </section>

        <section className='py-14 lg:py-20'>
          <div className='container mx-auto grid grid-cols-1 gap-10 px-4 lg:grid-cols-2'>
            <img src='/assets/mb/v1/hero1.svg' alt='MB BRANDNAME story' className='w-full rounded-2xl object-cover shadow-[0_8px_30px_rgba(0,0,0,0.08)]' />
            <article className='rounded-2xl border border-[var(--border)] bg-white p-6 lg:p-8'>
              <h2 className='mb-4 text-[18px] uppercase tracking-[0.22em] lg:text-[20px]'>Our Story</h2>
              <p className='text-[14px] leading-[1.8] text-[var(--muted)] lg:text-[15px]'>
                MB BRANDNAME curates authenticated secondhand luxury pieces with strict quality standards, transparent condition grading, and elevated customer support.
              </p>
              <p className='mt-4 text-[14px] leading-[1.8] text-[var(--muted)] lg:text-[15px]'>
                We combine Japanese sourcing expertise and premium retail presentation to help clients shop confidently across categories.
              </p>
              <div className='mt-6'><Button href='/about'>Learn more</Button></div>
            </article>
          </div>
        </section>

        <section className='bg-[var(--bg-alt)] py-14 lg:py-20'>
          <div className='container mx-auto grid grid-cols-1 gap-6 px-4 md:grid-cols-3'>
            {highlights.map((item) => (
              <article key={item.title} className='rounded-2xl border border-[var(--border)] bg-white p-6'>
                <h3 className='text-[13px] font-medium uppercase tracking-[0.18em]'>{item.title}</h3>
                <p className='mt-3 text-[14px] text-[var(--muted)]'>{item.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
