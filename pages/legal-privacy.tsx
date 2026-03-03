import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import PageTitleBlock from '@/components/ui/PageTitleBlock';
import Tabs from '@/components/ui/Tabs';
import { canonical } from '@/lib/seo';

export default function LegalPage() { const [hash, setHash] = useState('#privacy'); useEffect(()=>{ if (window.location.hash) setHash(window.location.hash); }, []); return <Layout><SEO title='Legal — MB BRANDNAME' description='Privacy and terms.' canonical={canonical('/legal-privacy')} /><main><section className='py-10 lg:py-14'><div className='container mx-auto px-4'><PageTitleBlock title='LEGAL' /><Tabs items={[{id:'privacy',label:'PRIVACY',content:'Privacy policy content.'},{id:'terms',label:'TERMS',content:'Terms content.'},{id:'returns',label:'RETURNS',content:'Returns content.'}]} /><p className='text-xs text-[var(--caption)]'>Current hash: {hash}</p></div></section></main></Layout>; }
