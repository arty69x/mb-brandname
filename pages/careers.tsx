import { FormEvent, useState } from 'react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import PageTitleBlock from '@/components/ui/PageTitleBlock';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { CAREER_ROLES } from '@/data/careers';
import { canonical } from '@/lib/seo';

const initial = { name: '', email: '', role: '', portfolio: '' };

export default function CareersPage() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState('');
  const valid = useMemo(() => form.name.trim().length > 1 && form.email.includes('@') && form.role.trim().length > 1, [form]);

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault();
    if (!valid) {
      setStatus('Please fill your name, email, and role.');
      return;
    }
    setStatus('Application received. Our recruitment team will review and contact you.');
    setForm(initial);
  };

  return (
    <Layout>
      <SEO title='Careers — MB BRANDNAME' description='Open roles at MB BRANDNAME.' canonical={canonical('/careers')} />
      <main>
        <section className='py-10 lg:py-14'>
          <div className='container mx-auto space-y-8 px-4'>
            <PageTitleBlock title='CAREERS AT MB BRANDNAME' subtitle='Join a fast-growing luxury commerce team and shape premium customer experiences.' />
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {CAREER_ROLES.map((role) => (
                <article key={role.title} className='rounded-2xl border border-[var(--border)] bg-white p-6'>
                  <h2 className='text-[13px] font-medium uppercase tracking-[0.16em]'>{role.title}</h2>
                  <p className='mt-2 text-[14px] text-[var(--muted)]'>{role.location}</p>
                  <p className='mt-3 text-[13px] text-[var(--muted)]'>Full-time · Hybrid</p>
                </article>
              ))}
            </div>
            <form onSubmit={onSubmit} className='rounded-2xl border border-[var(--border)] bg-[var(--bg-alt)] p-6 lg:p-8'>
              <h2 className='text-[13px] font-medium uppercase tracking-[0.16em]'>General application</h2>
              <div className='mt-4 grid gap-4 md:grid-cols-2'>
                <Input id='careerName' label='Full Name' value={form.name} onChange={(name) => setForm((prev) => ({ ...prev, name }))} required />
                <Input id='careerEmail' label='Email' value={form.email} onChange={(email) => setForm((prev) => ({ ...prev, email }))} required />
                <Input id='careerRole' label='Interested Role' value={form.role} onChange={(role) => setForm((prev) => ({ ...prev, role }))} required />
                <Input id='careerPortfolio' label='Portfolio URL (optional)' value={form.portfolio} onChange={(portfolio) => setForm((prev) => ({ ...prev, portfolio }))} />
              </div>
              <div className='mt-4'>
                <Textarea id='careerMessage' label='Tell us about yourself' value={form.portfolio} onChange={(portfolio) => setForm((prev) => ({ ...prev, portfolio }))} />
              </div>
              <div className='mt-5 flex flex-wrap items-center gap-3'>
                <Button type='submit' disabled={!valid}>Submit application</Button>
                {status ? <p className='text-sm text-[var(--muted)]'>{status}</p> : null}
              </div>
            </form>
          </div>
        </section>
      </main>
    </Layout>
  );
}
