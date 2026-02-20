"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api-client";
import { Order } from "@/types/api";
import { useAuth } from "@/context/AuthContext";
import { Package, User } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function ProfilePage() {
  const { user, isLoggedIn } = useAuth();
  const { locale } = useLanguage();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      if (!user) return;
      const data = await api.getOrders(user.id);
      setOrders(data);
      setLoading(false);
    }
    loadOrders();
  }, [user]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center font-thai pt-32">
        <Link href="/login" className="border-b border-black pb-1">
          Please Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-40 pb-20 px-6 font-thai">
      <div className="container mx-auto max-w-4xl">
        <div className="flex gap-8 items-start mb-20">
          <div className="w-24 h-24 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-300">
            <User size={32} strokeWidth={1} />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl luxury-serif">{user?.name}</h1>
            <p className="text-[10px] tracking-widest uppercase text-zinc-400">
              {user?.email}
            </p>
            <div className="inline-block px-4 py-2 bg-black text-white text-[9px] tracking-ultra uppercase font-bold">
              VIP Member
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-100 pt-16">
          <h2 className="text-2xl luxury-serif mb-12">
            {locale === "th" ? "ประวัติการสั่งซื้อ" : "Order History"}
          </h2>

          {loading ? (
            <div className="w-8 h-8 border-t-2 border-black rounded-full animate-spin" />
          ) : orders.length === 0 ? (
            <p className="text-zinc-400 text-sm italic">No orders found.</p>
          ) : (
            <div className="space-y-12">
              {orders.map((order) => (
                <div key={order.id} className="group">
                  <div className="flex justify-between items-end mb-6 pb-4 border-b border-zinc-100 group-hover:border-black transition-colors">
                    <div className="space-y-1">
                      <p className="text-[10px] tracking-widest uppercase font-bold">
                        {order.id}
                      </p>
                      <p className="text-[9px] text-zinc-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="text-[9px] uppercase tracking-widest font-bold text-emerald-600">
                      {order.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {order.items.slice(0, 2).map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-16 h-16 bg-zinc-50 relative shrink-0">
                          <img
                            src={item.image}
                            className="object-cover w-full h-full"
                            alt=""
                          />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-wider line-clamp-1">
                            {item.name}
                          </p>
                          <p className="text-[9px] text-zinc-400 pt-1">
                            ฿{item.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <div className="flex items-center text-[9px] text-zinc-400 uppercase tracking-widest">
                        + {order.items.length - 2} more items
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
