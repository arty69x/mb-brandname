import { Product } from '@/data/types';
import EmptyState from '../ui/EmptyState';
import ProductCard from './ProductCard';

export default function ProductGrid({ products }: { products: Product[] }) {
  if (!Array.isArray(products) || products.length === 0) {
    return <EmptyState title='No products found' body='Try adjusting your filters.' ctaHref='/new-arrivals' ctaLabel='Reset filters' />;
  }

  return (
    <div className='grid grid-cols-2 border-l border-[#d7d7d7] md:grid-cols-3 lg:grid-cols-4'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
