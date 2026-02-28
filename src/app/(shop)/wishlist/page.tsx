"use client";

import Image from "next/image";
import Link from "next/link";
import { HeartOff, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <main className="pt-24 pb-16 min-h-screen bg-[#f4f4f4]">
      <section className="max-w-[1180px] mx-auto px-4 md:px-8">
        <div className="flex justify-between items-end mb-8">
          <h1 className="text-3xl md:text-5xl">Wishlist</h1>
          {wishlist.length > 0 && (
            <button onClick={clearWishlist} className="text-xs uppercase border-b border-black">
              Clear all
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <p className="text-zinc-500">No items in wishlist.</p>
            <Link href="/new-arrivals" className="inline-block bg-black text-white px-6 py-2 text-sm">
              Discover Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {wishlist.map((item) => (
              <div key={String(item.id)} className="bg-white p-4 border border-zinc-200 flex gap-4">
                <div className="relative w-24 h-28 shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="grow">
                  <p className="text-xs uppercase text-zinc-500">{item.category}</p>
                  <h3 className="text-lg mb-1">{item.name}</h3>
                  <p className="text-sm mb-3">${item.price}</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => addToCart(item, 1)}
                      className="inline-flex items-center gap-1.5 bg-black text-white px-3 py-1.5 text-xs"
                    >
                      <ShoppingBag size={12} /> Add to cart
                    </button>
                    <button
                      onClick={() => toggleWishlist(item)}
                      className="inline-flex items-center gap-1.5 border border-zinc-400 px-3 py-1.5 text-xs"
                    >
                      <HeartOff size={12} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
