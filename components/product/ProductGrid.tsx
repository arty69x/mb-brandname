import type { Product } from "../../lib/products";
import ProductCard from "./ProductCard";
import Skeleton from "../ui/Skeleton";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  cols?: 3 | 4;
}

const GRID_FOUR = "grid grid-cols-2 gap-12 md:grid-cols-3 md:gap-16 lg:grid-cols-4 lg:gap-20";
const GRID_THREE = "grid grid-cols-2 gap-12 md:grid-cols-3 md:gap-16 lg:grid-cols-3 lg:gap-20";

export default function ProductGrid({ products, loading, cols = 4 }: ProductGridProps) {
  const gridClass = cols === 3 ? GRID_THREE : GRID_FOUR;

  if (loading) {
    return (
      <div className={gridClass}>
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="aspect-[3/4]" />
        ))}
      </div>
    );
  }

  if (!Array.isArray(products) || products.length === 0) {
    return <p className="text-sm font-medium opacity-80">No products found.</p>;
  }

  return (
    <div className={gridClass}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
