import { Product } from '@/data/types';
import EmptyState from '../ui/EmptyState';
import ProductCard from './ProductCard';

export default function ProductGrid({ products }: { products: Product[] }) {
  if (!Array.isArray(products) || products.length === 0) return <EmptyState title='No products found' body='Try adjusting your filters.' ctaHref='/shop' ctaLabel='Reset filters' />;
  return <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}
