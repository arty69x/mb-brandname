import ListingPage from '@/components/commerce/ListingPage';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import { PRODUCTS } from '@/data/products';
import { canonical } from '@/lib/seo';

export default function NewArrivalsPage() {
  return <Layout><SEO title='New Arrivals — MB BRANDNAME' description='Explore curated luxury selection at MB BRANDNAME.' canonical={canonical('/new-arrivals')} /><ListingPage products={PRODUCTS} title='NEW ARRIVALS' subtitle='Latest luxury drops.' categoryDefault='new-arrivals' /></Layout>;
}
