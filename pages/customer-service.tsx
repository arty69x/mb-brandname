import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import PageTitleBlock from '@/components/ui/PageTitleBlock';
import Accordion from '@/components/ui/Accordion';
import Button from '@/components/ui/Button';
import { FAQS } from '@/data/faq';
import { canonical } from '@/lib/seo';

const contactBoxes = [
  { title: 'Order Support', body: 'Track order, delivery status, and payment confirmation.' },
  { title: 'Product Consultation', body: 'Get recommendations and condition details from our advisors.' },
  { title: 'After-Sales Care', body: 'Request return guidance and warranty policy support.' },
];

export default function CustomerServicePage() {
  return (
    <Layout>
      <SEO title='Customer Service — MB BRANDNAME' description='Support and FAQ.' canonical={canonical('/customer-service')} />
      <main>
        <section className='bg-[#f3f3f3] py-10 lg:py-14'>
          <div className='container mx-auto space-y-8 px-4'>
            <PageTitleBlock title='CUSTOMER SERVICE' subtitle='Everything you need before and after checkout, all in one premium support center.' />
            <div className='grid gap-4 md:grid-cols-3'>
              {contactBoxes.map((item) => (
                <article key={item.title} className='rounded-2xl border border-[#d9d9d9] bg-white p-5'>
                  <h2 className='text-[13px] font-medium uppercase tracking-[0.16em]'>{item.title}</h2>
                  <p className='mt-3 text-[14px] text-[#6b6b6b]'>{item.body}</p>
                </article>
              ))}
            </div>
            <div className='rounded-2xl border border-[#d9d9d9] bg-white p-6 lg:p-8'>
              <Accordion items={FAQS} />
            </div>
            <div className='flex flex-wrap justify-center gap-3 lg:justify-start'>
              <Button href='/contact'>Contact us now</Button>
              <Button variant='secondary' href='/legal-privacy'>Returns & legal policy</Button>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
