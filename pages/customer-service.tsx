import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import PageTitleBlock from '@/components/ui/PageTitleBlock';
import Accordion from '@/components/ui/Accordion';
import Button from '@/components/ui/Button';
import { FAQS } from '@/data/faq';
import { canonical } from '@/lib/seo';

export default function CustomerServicePage() {
  return (
    <Layout>
      <SEO title='Customer Service — MB BRANDNAME' description='Support and FAQ.' canonical={canonical('/customer-service')} />
      <main>
        <section className='py-10 lg:py-14'>
          <div className='container mx-auto space-y-8 px-4'>
            <PageTitleBlock title='CUSTOMER SERVICE' />
            <div className='rounded-2xl border border-[var(--border)] bg-white p-6 lg:p-8'>
              <Accordion items={FAQS} />
            </div>
            <div className='flex flex-wrap gap-3'>
              <Button href='/contact'>Contact us</Button>
              <Button variant='secondary' href='/legal-privacy'>Returns & legal</Button>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
