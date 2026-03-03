import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import PageTitleBlock from '@/components/ui/PageTitleBlock';
import Button from '@/components/ui/Button';
import { canonical } from '@/lib/seo';

const pillars = [
  {
    title: 'Luxury Authentication Lab',
    body: 'Every piece is reviewed by trained specialists across material, serial, hardware, and craftsmanship checkpoints before listing.',
  },
  {
    title: 'Japan Sourcing Network',
    body: 'We source from long-term trusted partners in Japan so customers receive high-quality secondhand luxury with transparent condition grading.',
  },
  {
    title: 'White-Glove Client Care',
    body: 'From product consultation to after-sales support, our team provides premium assistance at every stage of the purchase journey.',
  },
];

const timeline = [
  '2013 — Started as a boutique luxury reseller team with Japanese market specialists.',
  '2018 — Expanded authentication workflow and launched nationwide shipping program.',
  '2022 — Built omnichannel customer care for online + in-store experiences.',
  'Today — Delivering trusted curated luxury collections for modern collectors.',
];

export default function AboutPage() {
  return (
    <Layout>
      <SEO title='About — MB BRANDNAME' description='About MB BRANDNAME.' canonical={canonical('/about')} />
      <main>
        <section className='bg-[var(--bg-alt)] py-10 lg:py-14'>
          <div className='container mx-auto space-y-8 px-4'>
            <PageTitleBlock title='ABOUT MB BRANDNAME' subtitle='A premium secondhand luxury destination built on authentication, curation, and exceptional service.' />
            <div className='grid gap-6 lg:grid-cols-[1.1fr_0.9fr]'>
              <article className='rounded-2xl border border-[var(--border)] bg-white p-6 lg:p-8'>
                <h2 className='text-[13px] font-medium uppercase tracking-[0.18em]'>Our Brand Story</h2>
                <p className='mt-4 text-[14px] leading-[1.9] text-[var(--muted)]'>
                  MB BRANDNAME was established to make luxury shopping feel confident and modern. We combine professional authentication standards with curated product selection to ensure each item matches both quality and style expectations.
                </p>
                <p className='mt-4 text-[14px] leading-[1.9] text-[var(--muted)]'>
                  Our mission is to deliver premium branded pieces with complete transparency, practical value, and an experience worthy of luxury clients.
                </p>
                <div className='mt-6 flex flex-wrap gap-3'>
                  <Button href='/new-arrivals'>Shop collection</Button>
                  <Button variant='secondary' href='/contact'>Talk to advisor</Button>
                </div>
              </article>
              <img src='/assets/mb/v1/hero1.svg' alt='MB BRANDNAME showroom mood' className='h-full min-h-[320px] w-full rounded-2xl object-cover' />
            </div>

            <div className='grid gap-4 md:grid-cols-3'>
              {pillars.map((item) => (
                <article key={item.title} className='rounded-2xl border border-[var(--border)] bg-white p-6'>
                  <h3 className='text-[13px] font-medium uppercase tracking-[0.16em]'>{item.title}</h3>
                  <p className='mt-3 text-[14px] leading-[1.7] text-[var(--muted)]'>{item.body}</p>
                </article>
              ))}
            </div>

            <article className='rounded-2xl border border-[var(--border)] bg-white p-6 lg:p-8'>
              <h2 className='text-[13px] font-medium uppercase tracking-[0.18em]'>Milestones</h2>
              <ul className='mt-4 space-y-3 text-[14px] text-[var(--muted)]'>
                {timeline.map((entry) => <li key={entry}>{entry}</li>)}
              </ul>
            </article>
          </div>
        </section>
      </main>
    </Layout>
  );
}
