import { FormEvent, useMemo, useState } from 'react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import PageTitleBlock from '@/components/ui/PageTitleBlock';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { canonical } from '@/lib/seo';

const benefits = [
  { title: 'Commission up to 15%', body: 'Competitive rate for luxury-focused creators and media partners.' },
  { title: 'Premium Assets', body: 'Receive campaign kits, launch calendars, and professional product visuals.' },
  { title: 'Dedicated Manager', body: 'Direct support for tracking, offers, and performance optimization.' },
];

const initial = { name: '', email: '', channel: '', audience: '' };

export default function AffiliatesPage() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState('');
  const valid = useMemo(() => form.name.trim().length > 1 && form.email.includes('@') && form.channel.trim().length > 2, [form]);

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault();
    if (!valid) {
      setStatus('Please complete required information.');
      return;
    }
    setStatus('Application submitted. Our partnership team will contact you.');
    setForm(initial);
  };

  return (
    <Layout>
      <SEO title='Affiliates — MB BRANDNAME' description='Join the MB BRANDNAME affiliate program.' canonical={canonical('/affiliates')} />
      <main>
        <section className='bg-[#f3f3f3] py-10 lg:py-14'>
          <div className='container mx-auto space-y-8 px-4'>
            <PageTitleBlock title='AFFILIATE PROGRAM' subtitle='Partner with MB BRANDNAME and grow together through premium luxury campaigns.' />
            <div className='grid gap-4 md:grid-cols-3'>
              {benefits.map((benefit) => (
                <article key={benefit.title} className='rounded-2xl border border-[#d9d9d9] bg-white p-6'>
                  <h2 className='text-[13px] font-medium uppercase tracking-[0.16em]'>{benefit.title}</h2>
                  <p className='mt-3 text-[14px] leading-[1.7] text-[#6b6b6b]'>{benefit.body}</p>
                </article>
              ))}
            </div>
            <form onSubmit={onSubmit} className='rounded-2xl border border-[#d9d9d9] bg-white p-6 lg:p-8'>
              <h2 className='text-[13px] font-medium uppercase tracking-[0.18em]'>Application form</h2>
              <div className='mt-4 grid gap-4 md:grid-cols-2'>
                <Input id='affiliateName' label='Full Name' value={form.name} onChange={(name) => setForm((p) => ({ ...p, name }))} required />
                <Input id='affiliateEmail' label='Email' value={form.email} onChange={(email) => setForm((p) => ({ ...p, email }))} required />
                <Input id='channel' label='Channel / Platform' value={form.channel} onChange={(channel) => setForm((p) => ({ ...p, channel }))} required />
                <Input id='followers' label='Monthly Reach (optional)' value={form.audience} onChange={(audience) => setForm((p) => ({ ...p, audience }))} />
              </div>
              <div className='mt-4'>
                <Textarea id='proposal' label='How do you plan to promote MB BRANDNAME?' value={form.audience} onChange={(audience) => setForm((p) => ({ ...p, audience }))} />
              </div>
              <div className='mt-5 flex flex-wrap items-center gap-3'>
                <Button type='submit' disabled={!valid}>Apply now</Button>
                {status ? <p className='text-sm text-[#6b6b6b]'>{status}</p> : null}
              </div>
            </form>
          </div>
        </section>
      </main>
    </Layout>
  );
}
