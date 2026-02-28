import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { useStore } from "../../context/store";
import { luhnCheck, validateCardholder, validateCVC, validateEmail, validateExpiry } from "../../lib/validation";
import Button from "../ui/Button";

export default function CheckoutForm() {
  const router = useRouter();
  const { cart, cartSubtotal, createOrder, clearCart, notify } = useStore();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", cardholder: "", card: "", expiry: "", cvc: "" });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!validateEmail(form.email) || !validateCardholder(form.cardholder) || !luhnCheck(form.card) || !validateExpiry(form.expiry) || !validateCVC(form.cvc)) {
      setError("Please review payment details.");
      return;
    }
    try {
      setProcessing(true);
      await new Promise((r) => setTimeout(r, 900));
      const failed = Math.random() < 0.2;
      const orderId = createOrder(failed ? "FAILED" : "PAID");
      if (failed) {
        notify("Checkout failed. Please retry.");
        setError("Payment failed. Please try again.");
      } else {
        clearCart();
        notify("Checkout success.");
        router.push(`/orders/${orderId}`);
      }
    } catch {
      setError("Unexpected error.");
    } finally {
      setProcessing(false);
    }
  }

  if (cart.length === 0) return <p className="text-sm opacity-70">Cart is empty.</p>;

  return (
    <form onSubmit={onSubmit} className="space-y-4 border border-gray-100 p-6">
      <input className="w-full border border-gray-200 p-3" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} disabled={processing} />
      <input className="w-full border border-gray-200 p-3" placeholder="Cardholder name" value={form.cardholder} onChange={(e) => setForm({ ...form, cardholder: e.target.value })} disabled={processing} />
      <input className="w-full border border-gray-200 p-3" placeholder="Card number" value={form.card} onChange={(e) => setForm({ ...form, card: e.target.value })} disabled={processing} />
      <div className="grid grid-cols-2 gap-4">
        <input className="border border-gray-200 p-3" placeholder="MM/YY" value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })} disabled={processing} />
        <input className="border border-gray-200 p-3" placeholder="CVC" value={form.cvc} onChange={(e) => setForm({ ...form, cvc: e.target.value })} disabled={processing} />
      </div>
      {error && <div className="border border-gray-200 bg-gray-50 p-3 text-xs text-red-600">{error}</div>}
      <p className="text-sm opacity-80">Total: ${cartSubtotal.toFixed(2)}</p>
      <Button type="submit" disabled={processing}>{processing ? "Processing..." : "Place order"}</Button>
    </form>
  );
}
