import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import ProductGrid from '@/components/commerce/ProductGrid';
import Button from '@/components/ui/Button';
import { PRODUCTS } from '@/data/products';
import { canonical } from '@/lib/seo';

const promises = [
  { title: 'AUTHENTICITY GUARANTEE', body: 'Every item is reviewed through multi-step authentication before display and shipment.' },
  { title: 'PROFESSIONAL CURATION', body: 'Collections are selected by category specialists for condition, value, and timeless design.' },
  { title: 'WHITE-GLOVE SUPPORT', body: 'Luxury advisors help from pre-purchase consultation to post-purchase aftercare.' },
];

const categories = [
  { title: 'BAGS', image: '/assets/mb/v1/p1a.svg', href: '/bags' },
  { title: 'ACCESSORIES', image: '/assets/mb/v1/p3a.svg', href: '/accessories' },
  { title: 'NEW ARRIVALS', image: '/assets/mb/v1/p2a.svg', href: '/new-arrivals' },
];

export default function HomePage() {
  return (
    <Layout headerVariant='home'>
      <SEO title='MB BRANDNAME — No.1 Luxury Store' description='Discover MB BRANDNAME. Luxury bags, accessories, and new arrivals.' canonical={canonical('/')} />
      <main>
        <section className='relative h-screen min-h-[760px]'>
          <div className='absolute inset-0 grid h-full w-full grid-cols-12 grid-rows-6'>
            <div className='col-span-7 row-span-6'><img src='/assets/mb/v1/hero1.svg' alt='MB hero primary' className='h-full w-full object-cover' /></div>
            <div className='col-span-5 row-span-3'><img src='/assets/mb/v1/hero2.svg' alt='MB hero secondary' className='h-full w-full object-cover' /></div>
            <div className='col-span-5 row-span-3'><img src='/assets/mb/v1/hero3.svg' alt='MB hero tertiary' className='h-full w-full object-cover' /></div>
          </div>
          <div className='absolute inset-0 bg-black/35' />
          <div className='container relative z-10 mx-auto flex h-full items-center justify-center px-4'>
            <div className='max-w-[980px] text-center text-white'>
              <p className='mb-6 text-[11px] uppercase tracking-[0.3em]'>Premium curated secondhand luxury from Japan</p>
              <h1 className='text-[34px] font-light leading-[1.08] tracking-[0.06em] lg:text-[60px]'>NO.1 MB BRANDNAME STORE</h1>
              <p className='mx-auto mt-6 max-w-[720px] text-[14px] leading-[1.8] text-white/85 lg:text-[15px]'>Discover authenticated luxury pieces with transparent quality grading and elevated customer experience.</p>
              <div className='mt-9 flex flex-wrap justify-center gap-3'>
                <Button href='/shop'>Shop collection</Button>
                <Button href='/about' variant='secondary'>Brand story</Button>
              </div>
            </div>
          </div>
        </section>

        <section className='bg-white py-10'>
          <div className='container mx-auto grid grid-cols-1 gap-3 px-4 md:grid-cols-3'>
            {promises.map((item) => (
              <article key={item.title} className='rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6'>
                <h2 className='text-[12px] uppercase tracking-[0.18em]'>{item.title}</h2>
                <p className='mt-3 text-[14px] leading-[1.7] text-[var(--muted)]'>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className='bg-[var(--bg-alt)] py-14 lg:py-20'>
          <div className='container mx-auto px-4'>
            <h2 className='mb-10 text-center text-[18px] font-medium uppercase tracking-[0.24em] lg:text-[22px]'>Shop by Category</h2>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
              {categories.map((category) => (
                <article key={category.title} className='overflow-hidden rounded-2xl border border-[var(--border)] bg-white'>
                  <img src={category.image} alt={category.title} className='aspect-[1/1.05] w-full object-cover' />
                  <div className='p-5 text-center'>
                    <h3 className='text-[12px] uppercase tracking-[0.16em]'>{category.title}</h3>
                    <div className='mt-4'><Button variant='secondary' href={category.href}>View</Button></div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className='py-14 lg:py-20'>
          <div className='container mx-auto px-4'>
            <h2 className='mb-10 text-center text-[18px] font-medium uppercase tracking-[0.24em] lg:text-[22px]'>New Arrivals</h2>
            <ProductGrid products={PRODUCTS.slice(0, 4)} />
            <div className='mt-10 text-center'><Button href='/new-arrivals'>View more</Button></div>
          </div>
        </section>

        <section className='bg-[var(--bg-alt)] py-14 lg:py-20'>
          <div className='container mx-auto grid grid-cols-1 gap-8 px-4 lg:grid-cols-[1.1fr_0.9fr]'>
            <img src='/assets/mb/v1/hero1.svg' alt='MB story visual' className='h-full min-h-[360px] w-full rounded-2xl object-cover' />
            <article className='rounded-2xl border border-[var(--border)] bg-white p-6 lg:p-8'>
              <h2 className='text-[12px] uppercase tracking-[0.2em]'>OUR STORY</h2>
              <p className='mt-4 text-[14px] leading-[1.8] text-[var(--muted)]'>MB BRANDNAME delivers trusted secondhand luxury through strict authentication, Japanese sourcing expertise, and premium service standards.</p>
              <p className='mt-4 text-[14px] leading-[1.8] text-[var(--muted)]'>Our mission is to help modern clients access iconic pieces with confidence, clarity, and exceptional post-purchase care.</p>
              <div className='mt-6 flex flex-wrap gap-3'>
                <Button href='/about'>Learn more</Button>
                <Button href='/contact' variant='secondary'>Contact advisor</Button>
              </div>
            </article>
          </div>
        </section>
      </main>
    </Layout>
  );
}
