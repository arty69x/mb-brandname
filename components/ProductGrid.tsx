import type { Product } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

type ProductGridProps = {
  products: Product[];
  desktopColumns?: 4;
};

export function ProductGrid({ products, desktopColumns = 4 }: ProductGridProps) {
  const safeProducts = Array.isArray(products) ? products : [];
  const responsiveColumnClass = desktopColumns === 4 ? 'md:grid-cols-3 lg:grid-cols-4' : 'md:grid-cols-3 lg:grid-cols-4';

  return (
    <div className={`grid grid-cols-2 ${responsiveColumnClass} gap-4 md:gap-6 lg:gap-8`}>
      {safeProducts.map((product) => (
        <div key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
