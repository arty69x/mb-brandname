import ListingPage from '@/components/commerce/ListingPage';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import { PRODUCTS } from '@/data/products';
import { canonical } from '@/lib/seo';

export default function AccessoriesPage() { return <Layout><SEO title='Accessories — MB BRANDNAME' description='Explore curated luxury selection at MB BRANDNAME.' canonical={canonical('/accessories')} /><ListingPage products={PRODUCTS} title='ACCESSORIES' subtitle='Luxury accessories.' categoryDefault='accessories' /></Layout>; }
