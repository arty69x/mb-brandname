import Link from "next/link";
import Layout from "../components/layout/Layout";

export default function NotFoundPage() {
  return <Layout><main><section className="py-32 md:py-40"><div className="container mx-auto px-4"><h1 className="text-2xl font-light uppercase tracking-[0.45em] md:text-4xl">404</h1><p className="mt-5 opacity-80">Page not found.</p><Link href="/shop" className="mt-5 inline-block border border-black px-4 py-3 text-[11px] font-black uppercase tracking-[0.3em]">Back to shop</Link></div></section></main></Layout>;
}
