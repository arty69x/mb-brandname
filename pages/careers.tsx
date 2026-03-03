import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import PageTitleBlock from '@/components/ui/PageTitleBlock';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { CAREER_ROLES } from '@/data/careers';
import { canonical } from '@/lib/seo';

export default function CareersPage() {
  return (
    <Layout>
      <SEO title='Careers — MB BRANDNAME' description='Open roles at MB BRANDNAME.' canonical={canonical('/careers')} />
      <main>
        <section className='py-10 lg:py-14'>
          <div className='container mx-auto space-y-10 px-4'>
            <PageTitleBlock title='CAREERS' />
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {CAREER_ROLES.map((role) => (
                <article key={role.title} className='rounded-2xl border border-[var(--border)] bg-white p-6'>
                  <h2 className='text-[13px] font-medium uppercase tracking-[0.16em]'>{role.title}</h2>
                  <p className='mt-2 text-[14px] text-[var(--muted)]'>{role.location}</p>
                </article>
              ))}
            </div>
            <div className='max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--bg-alt)] p-6 lg:p-8'>
              <h2 className='text-[13px] font-medium uppercase tracking-[0.16em]'>General application</h2>
              <div className='mt-4 space-y-4'>
                <Input id='name' label='Full Name' value='' onChange={() => null} />
                <Button>Apply</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
