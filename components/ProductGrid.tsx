import type { Product } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

type ProductGridProps = {
  products: Product[];
  desktopCols?: 4 | 5;
};

export function ProductGrid({ products, desktopCols = 5 }: ProductGridProps) {
  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <div className={`grid grid-cols-2 ${desktopCols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-5'} border-t border-l border-[#E6E6E6] lg:border-none gap-0 lg:gap-6`}>
      {safeProducts.map((product) => (
        <div key={product.id} className="border-r border-b border-[#E6E6E6] lg:border-none">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
