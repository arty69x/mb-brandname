import Link from "next/link";
import Layout from "../../components/layout/Layout";
import { useStore } from "../../context/store";

export default function OrdersPage() {
  const { orders } = useStore();
  return <Layout><main><section className="py-32 md:py-40"><div className="container mx-auto px-4"><h1 className="text-4xl font-light uppercase tracking-[0.45em]">Orders</h1><div className="mt-10 space-y-4">{orders.length===0?<p>No orders yet.</p>:orders.map((o)=><Link key={o.id} href={`/orders/${o.id}`} className="block border border-gray-100 p-4">{o.id} · {o.status}</Link>)}</div></div></section></main></Layout>;
}
