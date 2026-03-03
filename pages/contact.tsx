import { FormEvent, useMemo, useState } from 'react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import PageTitleBlock from '@/components/ui/PageTitleBlock';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { canonical } from '@/lib/seo';

const defaultForm = { fullName: '', email: '', phone: '', subject: '', message: '' };

const supportChannels = [
  { title: 'Client Advisor', detail: 'sale@uomo.com', meta: 'Response within 24 hours' },
  { title: 'Phone Support', detail: '+1 246-345-0695', meta: 'Mon-Sat, 09:00-20:00' },
  { title: 'Line / Chat', detail: '@mbbrandname', meta: 'Quick order and stock support' },
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [form, setForm] = useState(defaultForm);

  const valid = useMemo(
    () => form.fullName.trim().length > 1 && form.email.includes('@') && form.subject.trim().length > 2 && form.message.trim().length > 9,
    [form],
  );

  const onSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    if (!valid) {
      setStatus('Please complete all required fields before sending.');
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setStatus('Message sent successfully. A client advisor will contact you shortly.');
    setForm(defaultForm);
    setLoading(false);
  };

  return (
    <Layout>
      <SEO title='Contact — MB BRANDNAME' description='Contact MB BRANDNAME customer experience team.' canonical={canonical('/contact')} />
      <main>
        <section className='bg-[var(--bg-alt)] py-10 lg:py-14'>
          <div className='container mx-auto space-y-8 px-4'>
            <PageTitleBlock title='CONTACT CLIENT CARE' subtitle='Connect with our luxury advisors for product consultation, order support, and after-sales service.' />
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr]'>
              <form onSubmit={onSubmit} className='rounded-2xl border border-[var(--border)] bg-white p-6 lg:p-8'>
                <h2 className='text-[13px] font-medium uppercase tracking-[0.18em]'>Send us a message</h2>
                <div className='mt-5 grid gap-4 md:grid-cols-2'>
                  <Input id='fullName' label='Full Name' value={form.fullName} onChange={(fullName) => setForm((prev) => ({ ...prev, fullName }))} required />
                  <Input id='email' label='Email' value={form.email} onChange={(email) => setForm((prev) => ({ ...prev, email }))} required />
                  <Input id='phone' label='Phone' value={form.phone} onChange={(phone) => setForm((prev) => ({ ...prev, phone }))} />
                  <Input id='subject' label='Subject' value={form.subject} onChange={(subject) => setForm((prev) => ({ ...prev, subject }))} required />
                </div>
                <div className='mt-4'>
                  <Textarea id='message' label='Message' value={form.message} onChange={(message) => setForm((prev) => ({ ...prev, message }))} required />
                </div>
                <div className='mt-5 flex flex-wrap items-center gap-3'>
                  <Button type='submit' disabled={loading || !valid}>{loading ? 'Sending…' : 'Send message'}</Button>
                  {status ? <p className='text-sm text-[var(--muted)]'>{status}</p> : null}
                </div>
              </form>

              <aside className='space-y-6'>
                <img src='/assets/mb/v1/hero2.svg' alt='Customer support at MB BRANDNAME' className='h-[220px] w-full rounded-2xl object-cover' />
                <div className='rounded-2xl border border-[var(--border)] bg-white p-6'>
                  <h2 className='text-[13px] font-medium uppercase tracking-[0.18em]'>Support channels</h2>
                  <div className='mt-4 space-y-4'>
                    {supportChannels.map((channel) => (
                      <div key={channel.title}>
                        <h3 className='text-[12px] uppercase tracking-[0.14em]'>{channel.title}</h3>
                        <p className='mt-1 text-[14px]'>{channel.detail}</p>
                        <p className='text-[13px] text-[var(--muted)]'>{channel.meta}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
