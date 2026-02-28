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
    let list = products.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()));
    if (category !== "ALL") list = list.filter((product) => product.category === category);
    list = list.filter((product) => product.price >= min && product.price <= max);
    if (sort === "NEWEST") list = [...list].sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
    if (sort === "LOW") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "HIGH") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [search, category, min, max, sort]);

  return (
    <Layout>
      <main>
        <section className="py-32 md:py-40">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-light uppercase tracking-[0.55em] md:text-7xl">SHOP</h1>
            <div className="mt-12 grid gap-4 md:grid-cols-6">
              <input className="border border-gray-200 p-3 md:col-span-2" placeholder="SEARCH" value={search} onChange={(e) => setSearch(e.target.value)} />
              <select className="border border-gray-200 p-3" value={category} onChange={(e) => setCategory(e.target.value as Category | "ALL")}> <option>ALL</option><option>BAGS</option><option>ACCESSORIES</option><option>READY-TO-WEAR</option><option>FOOTWEAR</option></select>
              <select className="border border-gray-200 p-3" value={sort} onChange={(e) => setSort(e.target.value)}><option value="FEATURED">FEATURED</option><option value="NEWEST">NEWEST</option><option value="LOW">PRICE ↑</option><option value="HIGH">PRICE ↓</option></select>
              <input type="number" className="border border-gray-200 p-3" placeholder="MIN" value={min} onChange={(e) => setMin(Number(e.target.value) || 0)} />
              <input type="number" className="border border-gray-200 p-3" placeholder="MAX" value={max} onChange={(e) => setMax(Number(e.target.value) || 0)} />
            </div>
            <div className="mt-6 flex items-center gap-3">
              <p className="text-[11px] font-black uppercase tracking-[0.3em]">{filtered.length} RESULTS</p>
              <button className={`h-10 border px-4 text-[11px] font-black uppercase tracking-[0.3em] ${cols === 3 ? "border-black" : "border-gray-200"}`} onClick={() => setCols(3)}>3 COL</button>
              <button className={`h-10 border px-4 text-[11px] font-black uppercase tracking-[0.3em] ${cols === 4 ? "border-black" : "border-gray-200"}`} onClick={() => setCols(4)}>4 COL</button>
            </div>
            <div className="mt-12">
              {filtered.length ? <ProductGrid products={filtered} cols={cols} /> : <div className="border border-gray-100 p-10 text-center text-sm uppercase tracking-[0.25em]">NO PRODUCTS MATCH YOUR FILTERS</div>}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
