import { FormEvent, useState } from 'react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import PageTitleBlock from '@/components/ui/PageTitleBlock';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { CAREER_ROLES } from '@/data/careers';
import { canonical } from '@/lib/seo';

export default function CareersPage() {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault();
    if (name.trim().length < 2) {
      setStatus('Please enter your full name.');
      return;
    }
    setStatus('Application received. Our recruiting team will review your profile.');
    setName('');
  };

  return (
    <Layout>
      <SEO title='Careers — MB BRANDNAME' description='Open roles at MB BRANDNAME.' canonical={canonical('/careers')} />
      <main>
        <section className='py-10 lg:py-14'>
          <div className='container mx-auto space-y-10 px-4'>
            <PageTitleBlock title='CAREERS' subtitle='Build the next chapter of trusted luxury commerce with us.' />
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {CAREER_ROLES.map((role) => (
                <article key={role.title} className='rounded-2xl border border-[var(--border)] bg-white p-6'>
                  <h2 className='text-[13px] font-medium uppercase tracking-[0.16em]'>{role.title}</h2>
                  <p className='mt-2 text-[14px] text-[var(--muted)]'>{role.location}</p>
                </article>
              ))}
            </div>
            <form onSubmit={onSubmit} className='max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--bg-alt)] p-6 lg:p-8'>
              <h2 className='text-[13px] font-medium uppercase tracking-[0.16em]'>General application</h2>
              <div className='mt-4 space-y-4'>
                <Input id='name' label='Full Name' value={name} onChange={setName} required />
                <Button disabled={name.trim().length < 2}>Apply</Button>
                {status ? <p className='text-sm text-[var(--muted)]'>{status}</p> : null}
              </div>
            </form>
          </div>
        </section>
      </main>
    </Layout>
  );
}
