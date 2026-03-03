import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import EmptyState from '@/components/ui/EmptyState';
import { canonical } from '@/lib/seo';
export default function NotFoundPage() { return <Layout><SEO title='Not Found — MB BRANDNAME' description='Page not found.' canonical={canonical('/404')} /><main><section className='py-10 lg:py-14'><div className='container mx-auto px-4'><EmptyState title='Not Found' body='The page you requested does not exist.' ctaHref='/shop' ctaLabel='Go to shop' /></div></section></main></Layout>; }
