import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";
import ProductGallery from "../../components/product/ProductGallery";
import ProductTabs from "../../components/product/ProductTabs";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { getProductById, products } from "../../lib/products";
import ProductGrid from "../../components/product/ProductGrid";
import { useStore } from "../../context/store";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const product = typeof id === "string" ? getProductById(id) : undefined;
  const { addToCart } = useStore();

  if (!product) {
    return <Layout><main><section className="py-32 md:py-40"><div className="container mx-auto px-4"><p>Product not found.</p><Link href="/shop">Back to shop</Link></div></section></main></Layout>;
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <Layout>
      <main>
        <section className="py-32 md:py-40"><div className="container mx-auto px-4 grid gap-16 md:grid-cols-2">
          <ProductGallery images={product.images} title={product.title} />
          <div>
            <h1 className="text-4xl font-light uppercase tracking-[0.45em]">{product.title}</h1>
            <p className="mt-4 text-xl">${product.price}</p>
            <div className="mt-6 flex flex-wrap gap-2"><Badge>Authenticity</Badge><Badge>{product.grade}</Badge><Badge>{product.origin}</Badge><Badge>Stock {product.stock}</Badge></div>
            <p className="mt-6 opacity-80">{product.story}</p>
            <div className="mt-8"><Button onClick={() => addToCart(product.id)}>Add to cart</Button></div>
            <div className="mt-10"><ProductTabs description={product.description} details={product.details} /></div>
          </div>
        </div></section>
        <section className="py-32 md:py-40 border-t border-gray-100"><div className="container mx-auto px-4"><h2 className="text-3xl font-light uppercase tracking-[0.45em] mb-10">Related</h2><ProductGrid products={related} cols={4} /></div></section>
      </main>
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-gray-200 bg-white p-3 md:hidden"><div className="container mx-auto flex items-center justify-between px-4"><p>${product.price}</p><Button onClick={() => addToCart(product.id)} className="py-2">Add</Button></div></div>
    </Layout>
  );
}
