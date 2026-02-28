import type { Product } from "../../lib/products";
import ProductCard from "./ProductCard";
import Skeleton from "../ui/Skeleton";

export default function ProductGrid({ products, loading, cols = 4 }: { products: Product[]; loading?: boolean; cols?: 3 | 4 }) {
  const desktopClass = cols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";

  if (loading) {
    return <div className={`grid grid-cols-2 gap-12 md:grid-cols-3 md:gap-16 lg:gap-20 ${desktopClass}`}>{Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="aspect-[3/4]" />)}</div>;
  }
  if (!products.length) return <p className="text-sm opacity-70">No products found.</p>;

  return <div className={`grid grid-cols-2 gap-12 md:grid-cols-3 md:gap-16 lg:gap-20 ${desktopClass}`}>{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}
