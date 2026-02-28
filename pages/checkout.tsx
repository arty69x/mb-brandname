import Layout from "../components/layout/Layout";
import CheckoutForm from "../components/commerce/CheckoutForm";
import { useStore } from "../context/store";

export default function CheckoutPage() {
  const { account } = useStore();
  return <Layout><main><section className="py-32 md:py-40"><div className="container mx-auto px-4"><h1 className="text-2xl font-light uppercase tracking-[0.45em] md:text-4xl">Checkout</h1><p className="mt-4 opacity-80">{account.signedIn ? `Signed in as ${account.email}` : "Checkout as guest"}</p><div className="mt-10 max-w-2xl"><CheckoutForm /></div></div></section></main></Layout>;
}
