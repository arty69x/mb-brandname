import { FormEvent, useMemo, useState } from 'react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import PageTitleBlock from '@/components/ui/PageTitleBlock';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { canonical } from '@/lib/seo';

const defaultForm = { fullName: '', email: '', subject: '', message: '' };

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
      setStatus('Please complete all fields before sending.');
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setStatus('Message sent successfully. Our team will get back to you shortly.');
      setForm(defaultForm);
    } catch {
      setStatus('Unable to send your message right now.');
    }
    setLoading(false);
  };

  return (
    <Layout>
      <SEO title='Contact — MB BRANDNAME' description='Contact MB BRANDNAME customer experience team.' canonical={canonical('/contact')} />
      <main>
        <section className='bg-[var(--bg-alt)] py-10 lg:py-14'>
          <div className='container mx-auto space-y-10 px-4'>
            <PageTitleBlock title='CONTACT US' subtitle='We are here to support your luxury journey—before, during, and after every order.' />
            <div className='grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]'>
              <form onSubmit={onSubmit} className='rounded-2xl border border-[var(--border)] bg-white p-6 lg:p-8'>
                <div className='space-y-4'>
                  <Input id='fullName' label='Full Name' value={form.fullName} onChange={(fullName) => setForm((prev) => ({ ...prev, fullName }))} required />
                  <Input id='email' label='Email' value={form.email} onChange={(email) => setForm((prev) => ({ ...prev, email }))} required />
                  <Input id='subject' label='Subject' value={form.subject} onChange={(subject) => setForm((prev) => ({ ...prev, subject }))} required />
                  <Textarea id='message' label='Message' value={form.message} onChange={(message) => setForm((prev) => ({ ...prev, message }))} required />
                  <Button disabled={loading || !valid}>{loading ? 'Sending…' : 'Send message'}</Button>
                  {status ? <p className='text-sm text-[var(--muted)]'>{status}</p> : null}
                </div>
              </form>
              <aside className='rounded-2xl border border-[var(--border)] bg-white p-6 lg:p-8'>
                <h2 className='text-[13px] font-medium uppercase tracking-[0.18em]'>Client care office</h2>
                <div className='mt-4 space-y-4 text-[14px] leading-[1.7] text-[var(--muted)]'>
                  <p>1418 River Drive, Suite 35<br />Cottonhall, CA 9622, United States</p>
                  <p>sale@uomo.com<br />+1 246-345-0695</p>
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
