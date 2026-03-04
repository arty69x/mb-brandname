import { useMemo, useState } from 'react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import PageTitleBlock from '@/components/ui/PageTitleBlock';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';
import { STORES } from '@/data/stores';
import { canonical } from '@/lib/seo';

export default function FindStorePage() {
  const [q, setQ] = useState('');
  const filtered = useMemo(() => STORES.filter((s) => `${s.name} ${s.city} ${s.country}`.toLowerCase().includes(q.toLowerCase())), [q]);

  return (
    <Layout>
      <SEO title='Find a Store — MB BRANDNAME' description='Find a nearby MB BRANDNAME location.' canonical={canonical('/find-a-store')} />
      <main>
        <section className='bg-[#f3f3f3] py-10 lg:py-14'>
          <div className='container mx-auto space-y-8 px-4'>
            <PageTitleBlock title='FIND A STORE' subtitle='Visit our stores for in-person authentication consultation and luxury shopping services.' />
            <div className='mx-auto max-w-[720px] rounded-2xl border border-[#d9d9d9] bg-white p-4'>
              <input value={q} onChange={(e) => setQ(e.target.value)} className='h-11 w-full rounded-full border border-[#d9d9d9] bg-white px-4' aria-label='Search stores' placeholder='Search by store name, city, or country' />
            </div>
            {filtered.length === 0 ? (
              <EmptyState title='No stores found' body='Try another city keyword, or contact our support team for assistance.' ctaHref='/contact' ctaLabel='Contact support' />
            ) : (
              <div className='grid gap-4 lg:grid-cols-2'>
                {filtered.map((store) => (
                  <article key={store.name} className='rounded-2xl border border-[#d9d9d9] bg-white p-5'>
                    <h2 className='text-[13px] font-medium uppercase tracking-[0.16em]'>{store.name}</h2>
                    <p className='mt-2 text-[14px] text-[#6b6b6b]'>{store.city}, {store.country}</p>
                    <p className='mt-1 text-[14px] text-[#6b6b6b]'>{store.address}</p>
                    <div className='mt-4'>
                      <Button variant='secondary' href='/contact'>Book consultation</Button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
