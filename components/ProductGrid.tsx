import type { Product } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

type ProductGridProps = {
  products: Product[];
  desktopColumns?: 4 | 5;
};

export function ProductGrid({ products, desktopColumns = 5 }: ProductGridProps) {
  const safeProducts = Array.isArray(products) ? products : [];
  const desktopColumnClass = desktopColumns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-5';

  return (
    <div className={`grid grid-cols-2 ${desktopColumnClass} border-t border-l border-black/10 gap-0 lg:border-none lg:gap-8`}>
      {safeProducts.map((product) => (
        <div key={product.id} className="border-r border-b border-black/10 lg:border-none">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
