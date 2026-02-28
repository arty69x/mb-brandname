import Link from "next/link";
import Layout from "../components/layout/Layout";
import CartLine from "../components/commerce/CartLine";
import OrderSummary from "../components/commerce/OrderSummary";
import { useStore } from "../context/store";

export default function CartPage() {
  const { cart } = useStore();
  return <Layout><main><section className="py-32 md:py-40"><div className="container mx-auto px-4 grid gap-12 md:grid-cols-[1fr_360px]"><div>{cart.length===0?<p>Cart is empty.</p>:cart.map((line)=><CartLine key={line.productId} productId={line.productId} qty={line.qty} />)}<Link href="/checkout" className="mt-6 inline-block border border-black px-4 py-3 text-[11px] font-black uppercase tracking-[0.3em]">Proceed to checkout</Link></div><OrderSummary /></div></section></main></Layout>;
}
