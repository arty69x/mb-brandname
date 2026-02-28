import { useStore } from "../../context/store";

export default function OrderSummary() {
  const { cartSubtotal, cartCount } = useStore();
  return (
    <div className="border border-gray-100 p-6">
      <p className="text-[11px] font-black uppercase tracking-[0.3em]">Order Summary</p>
      <div className="mt-5 space-y-2 text-sm opacity-80">
        <p>Items: {cartCount}</p>
        <p>Subtotal: ${cartSubtotal.toFixed(2)}</p>
      </div>
    </div>
  );
}
