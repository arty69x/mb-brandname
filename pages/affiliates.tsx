import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import PageTitleBlock from '@/components/ui/PageTitleBlock';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { canonical } from '@/lib/seo';

const benefits = ['High commissions', 'Premium catalog', 'Fast payouts'];

export default function AffiliatesPage() {
  return (
    <Layout>
      <SEO title='Affiliates — MB BRANDNAME' description='Join the MB BRANDNAME affiliate program.' canonical={canonical('/affiliates')} />
      <main>
        <section className='py-10 lg:py-14'>
          <div className='container mx-auto space-y-10 px-4'>
            <PageTitleBlock title='AFFILIATES' />
            <div className='grid gap-4 md:grid-cols-3'>
              {benefits.map((benefit) => (
                <article key={benefit} className='rounded-2xl border border-[var(--border)] bg-white p-6 text-center'>
                  <h2 className='text-[13px] font-medium uppercase tracking-[0.16em]'>{benefit}</h2>
                </article>
              ))}
            </div>
            <div className='max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--bg-alt)] p-6 lg:p-8'>
              <p className='mb-5 text-[14px] text-[var(--muted)]'>Tell us about your audience and we'll get back to you with partnership details.</p>
              <div className='space-y-4'>
                <Input id='email2' label='Email' value='' onChange={() => null} />
                <Button>Apply now</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
