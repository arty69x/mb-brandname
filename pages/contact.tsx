import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import PageTitleBlock from '@/components/ui/PageTitleBlock';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { canonical } from '@/lib/seo';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  return (
    <Layout>
      <SEO title='Contact — MB BRANDNAME' description='Contact MB BRANDNAME customer experience team.' canonical={canonical('/contact')} />
      <main>
        <section className='py-10 lg:py-14'>
          <div className='container mx-auto space-y-10 px-4'>
            <PageTitleBlock title='CONTACT US' />
            <div className='grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]'>
              <div className='rounded-2xl border border-[var(--border)] bg-white p-6 lg:p-8'>
                <p className='mb-6 text-[14px] text-[var(--muted)]'>
                  Need help with an order, authentication, or product details? Send us a message and our team will reply within one business day.
                </p>
                <div className='space-y-4'>
                  <Input id='fullName' label='Full Name' value='' onChange={() => null} />
                  <Input id='email' label='Email' value='' onChange={() => null} />
                  <Input id='subject' label='Subject' value='' onChange={() => null} />
                  <Textarea id='message' label='Message' value='' onChange={() => null} />
                  <Button
                    onClick={async () => {
                      setLoading(true);
                      try {
                        await new Promise((resolve) => setTimeout(resolve, 200));
                        setStatus('Message sent successfully.');
                      } catch {
                        setStatus('Unable to send your message right now.');
                      }
                      setLoading(false);
                    }}
                  >
                    {loading ? 'Sending…' : 'Send message'}
                  </Button>
                  {status ? <p className='text-sm text-[var(--muted)]'>{status}</p> : null}
                </div>
              </div>
              <aside className='rounded-2xl border border-[var(--border)] bg-[var(--bg-alt)] p-6 lg:p-8'>
                <h2 className='text-[13px] font-medium uppercase tracking-[0.18em]'>Client care office</h2>
                <div className='mt-4 space-y-4 text-[14px] leading-[1.7] text-[var(--muted)]'>
                  <p>
                    1418 River Drive, Suite 35
                    <br />
                    Cottonhall, CA 9622, United States
                  </p>
                  <p>
                    sale@uomo.com
                    <br />
                    +1 246-345-0695
                  </p>
                  <p>Mon - Fri: 8AM-9PM, Sat: 9AM-8PM, Sun: Closed</p>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
