import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import ErrorState from '@/components/ui/ErrorState';
import { canonical } from '@/lib/seo';
export default function ErrorPage() { return <Layout><SEO title='Error — MB BRANDNAME' description='An unexpected error occurred.' canonical={canonical('/500')} /><main><section className='py-10 lg:py-14'><div className='container mx-auto px-4'><ErrorState message='Internal server error.' onRetry={() => window.location.reload()} /></div></section></main></Layout>; }
