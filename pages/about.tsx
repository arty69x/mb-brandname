import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import PageTitleBlock from '@/components/ui/PageTitleBlock';
import { canonical } from '@/lib/seo';

export default function AboutPage() { return <Layout><SEO title='About — MB BRANDNAME' description='About MB BRANDNAME.' canonical={canonical('/about')} /><main><section className='py-10 lg:py-14'><div className='container mx-auto px-4'><PageTitleBlock title='ABOUT' /><p className='text-[14px] leading-[1.7] text-[var(--muted)]'>100% AUTHENTIC BRANDED ITEMS FROM JAPAN WITH OVER 10 YEARS OF EXPERIENCE IN AUTHENTIC SECONDHAND BRANDED GOODS, WE GUARANTEE GENUINE QUALITY.</p></div></section></main></Layout>; }
