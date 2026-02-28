import Layout from "../components/layout/Layout";
import ProductGrid from "../components/product/ProductGrid";
import { useStore } from "../context/store";
import { getProductById, Product } from "../lib/products";

export default function WishlistPage() {
  const { wishlist } = useStore();
  const items = wishlist.map((id) => getProductById(id)).filter((item): item is Product => Boolean(item));
  return <Layout><main><section className="py-32 md:py-40"><div className="container mx-auto px-4"><h1 className="text-2xl font-light uppercase tracking-[0.45em] md:text-4xl">Wishlist</h1><div className="mt-12"><ProductGrid products={items} /></div></div></section></main></Layout>;
}
