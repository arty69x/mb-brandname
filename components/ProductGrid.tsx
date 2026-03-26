import type { Product } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <div className="-mx-4 grid grid-cols-2 gap-0 border-l border-t border-black/10 lg:mx-0 lg:grid-cols-5 lg:gap-8 lg:border-0">
      {safeProducts.map((product) => (
        <div key={product.id} className="border-b border-r border-black/10 lg:border-0">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
