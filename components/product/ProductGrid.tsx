import type { Product } from "../../lib/products";
import ProductCard from "./ProductCard";
import Skeleton from "../ui/Skeleton";

export default function ProductGrid({ products, loading, cols = 4 }: { products: Product[]; loading?: boolean; cols?: 3 | 4 }) {
  const gridClass = cols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";

  if (loading) {
    return <div className={`grid grid-cols-2 gap-6 md:grid-cols-3 ${gridClass}`}>{Array.from({ length: 8 }).map((_,i)=><Skeleton key={i} className="aspect-[3/4]" />)}</div>;
  }
  if (!Array.isArray(products) || products.length === 0) return <p className="text-sm opacity-70">No products found.</p>;

  return <div className={`grid grid-cols-2 gap-6 md:grid-cols-3 ${gridClass}`}>{products.map((p) => <ProductCard key={p.id} product={p} />)}</div>;
}
