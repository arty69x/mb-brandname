import ListingPage from '@/components/commerce/ListingPage';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import { PRODUCTS } from '@/data/products';
import { canonical } from '@/lib/seo';

export default function BagsPage() { return <Layout><SEO title='Bags — MB BRANDNAME' description='Explore curated luxury selection at MB BRANDNAME.' canonical={canonical('/bags')} /><ListingPage products={PRODUCTS} title='BAGS' subtitle='Curated bag collection.' categoryDefault='bags' /></Layout>; }
