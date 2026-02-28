import { useStore } from "../../context/store";
import { getProductById } from "../../lib/products";

export default function CompareTable() {
  const { compare, toggleCompare, addToCart } = useStore();
  const rows = compare.map((id) => getProductById(id)).filter(Boolean);
  if (rows.length === 0) return <p className="text-sm opacity-70">Compare list is empty.</p>;

  return (
    <div className="overflow-x-auto border border-gray-100">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-gray-100 text-[11px] font-black uppercase tracking-[0.3em]"><tr><th className="p-3">Title</th><th>Price</th><th>Grade</th><th>Origin</th><th>Stock</th><th>Tags</th><th>Action</th></tr></thead>
        <tbody>
          {rows.map((p) => p && <tr key={p.id} className="border-b border-gray-100"><td className="p-3">{p.title}</td><td>${p.price}</td><td>{p.grade}</td><td>{p.origin}</td><td>{p.stock}</td><td>{p.tags.join(", ")}</td><td><button onClick={() => addToCart(p.id)} className="mr-3">Add</button><button onClick={() => toggleCompare(p.id)}>Remove</button></td></tr>)}
        </tbody>
      </table>
    </div>
  );
}
