"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api-client";
import { Order } from "@/types/api";
import { useAuth } from "@/context/AuthContext";
import { Package, Truck, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

export default function AdminOrdersPage() {
  const { isAdmin } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      if (!isAdmin) return;
      const data = await api.getOrders();
      setOrders(data);
      setLoading(false);
    }
    loadOrders();
  }, [isAdmin]);

  const updateStatus = async (id: string, newStatus: string) => {
    await api.updateOrderStatus(id, newStatus);
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus as any } : o)),
    );
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center font-thai">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <Link href="/" className="text-sm underline">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 pt-32 pb-20 px-6 font-thai">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-zinc-400 block mb-2">
              Backend // Vault
            </span>
            <h1 className="text-4xl luxury-serif uppercase">Order Management</h1>
          </div>
          <div className="text-right">
            <p className="text-3xl font-black">{orders.length}</p>
            <p className="text-[9px] tracking-widest uppercase text-zinc-400">
              Total Requests
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-t-2 border-black rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-zinc-100 p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row justify-between gap-8 mb-8 border-b border-zinc-50 pb-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-black tracking-widest uppercase">
                        {order.id}
                      </span>
                      <span
                        className={`text-[9px] px-2 py-1 uppercase tracking-widest font-bold border ${
                          order.status === "delivered"
                            ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                            : "border-zinc-200 bg-zinc-50 text-zinc-500"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      Placed on: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {["pending", "processing", "shipped", "delivered"].map(
                      (s) => (
                        <button
                          key={s}
                          onClick={() => updateStatus(order.id, s)}
                          className={`px-4 py-2 text-[9px] tracking-widest uppercase font-bold border transition-colors ${
                            order.status === s
                              ? "bg-black text-white border-black"
                              : "border-zinc-100 text-zinc-300 hover:border-zinc-300"
                          }`}
                        >
                          {s}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-zinc-50 relative">
                          <img
                            src={item.image}
                            className="w-full h-full object-cover"
                            alt=""
                          />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-wider">
                            {item.name}
                          </p>
                          <p className="text-[9px] text-zinc-400">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-medium">
                        ฿{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                  <div className="flex justify-between pt-4 border-t border-zinc-50 font-black tracking-widest uppercase text-xs">
                    <span>Total Valuation</span>
                    <span>฿{order.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
