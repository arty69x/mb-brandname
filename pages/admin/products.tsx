import Layout from '@/components/layout/Layout';
import { PRODUCTS } from '@/data/products';
export default function AdminProductsPage() { return <Layout><main><section className='py-10 lg:py-14'><div className='container mx-auto px-4'>{PRODUCTS.map((p)=><div key={p.id}>{p.title}</div>)}</div></section></main></Layout>; }
