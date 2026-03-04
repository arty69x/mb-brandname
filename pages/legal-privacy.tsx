import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import PageTitleBlock from '@/components/ui/PageTitleBlock';
import Tabs from '@/components/ui/Tabs';
import { canonical } from '@/lib/seo';

export default function LegalPage() {
  return (
    <Layout>
      <SEO title='Legal — MB BRANDNAME' description='Privacy and terms.' canonical={canonical('/legal-privacy')} />
      <main>
        <section className='bg-[#f3f3f3] py-10 lg:py-14'>
          <div className='container mx-auto space-y-8 px-4'>
            <PageTitleBlock title='LEGAL & PRIVACY' subtitle='Review MB BRANDNAME policy standards for secure and transparent purchases.' />
            <div className='grid gap-6 lg:grid-cols-[1fr_0.9fr]'>
              <div className='rounded-2xl border border-[#d9d9d9] bg-white p-6 lg:p-8'>
                <Tabs
                  items={[
                    {
                      id: 'privacy',
                      label: 'PRIVACY',
                      content: 'We use customer data only for order processing, communication, and service improvements. Payment information is handled by secure partners.',
                    },
                    {
                      id: 'terms',
                      label: 'TERMS',
                      content: 'All purchases are subject to stock availability, product condition notes, and shipping timelines specified at checkout.',
                    },
                    {
                      id: 'returns',
                      label: 'RETURNS',
                      content: 'Returns are accepted under stated conditions and timelines. Items must remain in original condition with proof of purchase.',
                    },
                  ]}
                />
              </div>
              <article className='rounded-2xl border border-[#d9d9d9] bg-white p-6'>
                <h2 className='text-[13px] font-medium uppercase tracking-[0.16em]'>Need policy clarification?</h2>
                <p className='mt-3 text-[14px] leading-[1.8] text-[#6b6b6b]'>If you need contract, payment, or return-condition details for client presentation, our support team can provide a complete policy summary document.</p>
                <p className='mt-4 text-[14px] text-[#6b6b6b]'>Email: sale@uomo.com</p>
              </article>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
