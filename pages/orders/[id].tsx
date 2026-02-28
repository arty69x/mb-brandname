import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";
import { useStore } from "../../context/store";
import { getProductById } from "../../lib/products";

export default function OrderDetailPage() {
  const { id } = useRouter().query;
  const { orders } = useStore();
  const order = typeof id === "string" ? orders.find((o) => o.id === id) : undefined;
  return <Layout><main><section className="py-32 md:py-40"><div className="container mx-auto px-4">{!order?<p>Order not found.</p>:<div><h1 className="text-2xl font-light uppercase tracking-[0.45em] md:text-4xl">{order.id}</h1><p className="mt-3">{order.status} · {new Date(order.date).toLocaleString()}</p><div className="mt-8 space-y-3">{order.items.map((i)=>{const p=getProductById(i.productId);if(!p)return null;return <div key={i.productId} className="border-b border-gray-100 py-3"><Link href={`/product/${p.id}`}>{p.title}</Link> x {i.qty}</div>;})}</div><p className="mt-4">Total ${order.subtotal.toFixed(2)}</p></div>}</div></section></main></Layout>;
}
