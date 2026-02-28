import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout/Layout";
import ProductGrid from "../components/product/ProductGrid";
import { Category, products } from "../lib/products";

export default function ShopPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "ALL">((router.query.category as Category) || "ALL");
  const [sort, setSort] = useState("FEATURED");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(2000);
  const [cols, setCols] = useState<3 | 4>(4);

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
    if (category !== "ALL") list = list.filter((p) => p.category === category);
    list = list.filter((p) => p.price >= min && p.price <= max);
    if (sort === "NEWEST") list = [...list].sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
    if (sort === "LOW") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "HIGH") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [search, category, min, max, sort]);

  return (
    <Layout>
      <main>
        <section className="py-32 md:py-40"><div className="container mx-auto px-4"><h1 className="text-4xl font-light uppercase tracking-[0.55em] md:text-7xl">Shop</h1>
          <div className="mt-12 grid gap-4 md:grid-cols-6">
            <input className="border border-gray-200 p-3 md:col-span-2" placeholder="Search" value={search} onChange={(e)=>setSearch(e.target.value)} />
            <select className="border border-gray-200 p-3" value={category} onChange={(e)=>setCategory(e.target.value as Category | "ALL")}><option>ALL</option><option>BAGS</option><option>ACCESSORIES</option><option>READY-TO-WEAR</option><option>FOOTWEAR</option></select>
            <select className="border border-gray-200 p-3" value={sort} onChange={(e)=>setSort(e.target.value)}><option value="FEATURED">Featured</option><option value="NEWEST">Newest</option><option value="LOW">Price low→high</option><option value="HIGH">Price high→low</option></select>
            <input type="number" className="border border-gray-200 p-3" placeholder="Min" value={min} onChange={(e)=>setMin(Number(e.target.value))} />
            <input type="number" className="border border-gray-200 p-3" placeholder="Max" value={max} onChange={(e)=>setMax(Number(e.target.value))} />
          </div>
          <div className="mt-4 flex items-center gap-4"><p className="text-[11px] font-black uppercase tracking-[0.3em]">{filtered.length} Results</p><button onClick={()=>setCols(3)} className="border px-3 py-1">3</button><button onClick={()=>setCols(4)} className="border px-3 py-1">4</button></div>
          <div className="mt-10"><ProductGrid products={filtered} cols={cols} /></div>
        </div></section>
      </main>
    </Layout>
  );
}
