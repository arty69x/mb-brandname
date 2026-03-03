import ListingPage from '@/components/commerce/ListingPage';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import { PRODUCTS } from '@/data/products';
import { canonical } from '@/lib/seo';

export default function ShopPage() {
  return <Layout><SEO title='The Shop — MB BRANDNAME' description='Explore curated luxury selection at MB BRANDNAME.' canonical={canonical('/shop')} /><ListingPage products={PRODUCTS} title='THE SHOP' subtitle='Explore curated luxury selection at MB BRANDNAME.' /></Layout>;
}
