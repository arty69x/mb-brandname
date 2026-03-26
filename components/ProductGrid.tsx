import type { Product } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <div
      className="
  grid
  grid-cols-2
  lg:grid-cols-5
  border-t border-l border-black/10
  lg:border-none
  gap-0
  lg:gap-6
"
    >
      {safeProducts.map((product) => (
        <div
          key={product.id}
          className="
  border-r border-b border-black/10
  lg:border-none
"
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
