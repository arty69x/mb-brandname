import { useMemo, useState } from 'react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import PageTitleBlock from '@/components/ui/PageTitleBlock';
import EmptyState from '@/components/ui/EmptyState';
import { STORES } from '@/data/stores';
import { canonical } from '@/lib/seo';

export default function FindStorePage() {
  const [q, setQ] = useState('');
  const filtered = useMemo(() => STORES.filter((s) => `${s.name} ${s.city} ${s.country}`.toLowerCase().includes(q.toLowerCase())), [q]);
  return <Layout><SEO title='Find a Store — MB BRANDNAME' description='Find a nearby MB BRANDNAME location.' canonical={canonical('/find-a-store')} /><main><section className='py-10 lg:py-14'><div className='container mx-auto px-4'><PageTitleBlock title='FIND A STORE' /><div className='mx-auto max-w-[720px]'><input value={q} onChange={(e) => setQ(e.target.value)} className='h-11 w-full rounded-full border border-[var(--border)] px-4' aria-label='Search stores' /></div><div className='mt-8 grid gap-4'>{filtered.map((s) => <div key={s.name} className='border p-4'>{s.name} — {s.city}, {s.country}<br />{s.address}</div>)}</div></div></section></main></Layout>;
}
