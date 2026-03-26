import type { Product } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

type ProductGridProps = {
  products: Product[];
  desktopColumns?: 4;
};

export function ProductGrid({ products, desktopColumns = 4 }: ProductGridProps) {
  const safeProducts = Array.isArray(products) ? products : [];
  const responsiveColumnClass = desktopColumns === 4 ? 'sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4' : 'sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5';

  return (
    <div className={`grid grid-cols-2 ${responsiveColumnClass} border-t border-l border-black/10 gap-0 lg:border-none lg:gap-8`}>
      {safeProducts.map((product) => (
        <div key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
