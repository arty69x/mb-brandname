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
        <section className='bg-[var(--bg-alt)] py-10 lg:py-14'>
          <div className='container mx-auto space-y-8 px-4'>
            <PageTitleBlock title='LEGAL' subtitle='Review our privacy, terms, and returns framework before checkout.' />
            <div className='rounded-2xl border border-[var(--border)] bg-white p-6 lg:p-8'>
              <Tabs
                items={[
                  {
                    id: 'privacy',
                    label: 'PRIVACY',
                    content: 'We protect your personal information and use it only for essential order and service operations.',
                  },
                  {
                    id: 'terms',
                    label: 'TERMS',
                    content: 'By purchasing from MB BRANDNAME, you agree to our pricing, shipping, and product condition disclosures.',
                  },
                  {
                    id: 'returns',
                    label: 'RETURNS',
                    content: 'Eligible returns can be requested within the stated policy period with original condition and proof of purchase.',
                  },
                ]}
              />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
