import { getProductById } from "../../lib/products";
import { useStore } from "../../context/store";

export default function CartLine({ productId, qty }: { productId: string; qty: number }) {
  const { setQty, removeFromCart } = useStore();
  const product = getProductById(productId);
  if (!product) return null;

  return (
    <div className="grid gap-4 border-b border-gray-100 py-6 md:grid-cols-[1fr_auto_auto]">
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.3em]">{product.title}</p>
        <p className="mt-2 text-sm opacity-70">${product.price}</p>
      </div>
      <input type="number" min={1} max={99} value={qty} onChange={(e) => setQty(productId, Number(e.target.value))} className="w-20 border border-gray-200 px-2 py-2" />
      <button className="text-[11px] font-black uppercase tracking-[0.3em]" onClick={() => removeFromCart(productId)}>Remove</button>
    </div>
  );
}
