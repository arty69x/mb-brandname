import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import PageTitleBlock from '@/components/ui/PageTitleBlock';
import { canonical } from '@/lib/seo';

const values = [
  {
    title: 'Authenticity First',
    body: 'Every piece is carefully authenticated with strict multi-step review before it reaches our showcase.',
  },
  {
    title: 'Curated Selection',
    body: 'Our team handpicks iconic bags and accessories to keep each collection timeless and practical.',
  },
  {
    title: 'Client Experience',
    body: 'From consultation to delivery, we design each touchpoint to feel premium, clear, and reassuring.',
  },
];

export default function AboutPage() {
  return (
    <Layout>
      <SEO
        title='About — MB BRANDNAME'
        description='About MB BRANDNAME.'
        canonical={canonical('/about')}
      />
      <main>
        <section className='py-10 lg:py-14'>
          <div className='container mx-auto space-y-10 px-4'>
            <PageTitleBlock title='ABOUT' />
            <div className='grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start'>
              <p className='text-[14px] leading-[1.9] text-[var(--muted)] lg:text-[15px]'>
                MB BRANDNAME is built on one promise: luxury should feel trustworthy. We source 100% authentic branded items
                from Japan and combine over a decade of expertise in secondhand luxury to ensure every customer can shop with
                confidence.
              </p>
              <div className='grid gap-4'>
                {values.map((value) => (
                  <article key={value.title} className='rounded-2xl border border-[var(--border)] bg-white p-6'>
                    <h2 className='text-[13px] font-medium uppercase tracking-[0.18em]'>{value.title}</h2>
                    <p className='mt-3 text-[14px] leading-[1.7] text-[var(--muted)]'>{value.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
