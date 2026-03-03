import { useEffect, useMemo, useState } from 'react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import PageTitleBlock from '@/components/ui/PageTitleBlock';
import ProductGrid from '@/components/commerce/ProductGrid';
import { PRODUCTS } from '@/data/products';
import { getWishlist } from '@/lib/wishlist';
import { canonical } from '@/lib/seo';

export default function WishlistPage() {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => { setIds(getWishlist()); }, []);
  const products = useMemo(() => PRODUCTS.filter((p) => ids.includes(p.id)), [ids]);
  return <Layout><SEO title='Wishlist — MB BRANDNAME' description='Your saved products.' canonical={canonical('/wishlist')} /><main><section className='py-10 lg:py-14'><div className='container mx-auto px-4'><PageTitleBlock title='WISHLIST' /><ProductGrid products={products} /></div></section></main></Layout>;
}
