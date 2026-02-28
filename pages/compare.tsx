import Layout from "../components/layout/Layout";
import CompareTable from "../components/commerce/CompareTable";

export default function ComparePage() {
  return <Layout><main><section className="py-32 md:py-40"><div className="container mx-auto px-4"><h1 className="text-2xl font-light uppercase tracking-[0.45em] md:text-4xl">Compare</h1><div className="mt-10"><CompareTable /></div></div></section></main></Layout>;
}
