"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Eye, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
  id: number | string;
  image: string;
  category: string;
  name: string;
  price: string;
  oldPrice?: string;
}

export default function ProductCard({
  id,
  image,
  category,
  name,
  price,
  oldPrice,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const itemPayload = { id, image, category, name, price };

  return (
    <>
      <Link href={`/product/${id}`} className="group block">
        <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 20vw"
          />

          <div className="absolute top-2 right-2 flex flex-col gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleWishlist(itemPayload);
              }}
              className="p-1.5 bg-white/90 rounded-full"
              aria-label="Wishlist"
            >
              <Heart
                size={14}
                className={isWishlisted(id) ? "fill-black text-black" : "text-zinc-700"}
              />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setQuickViewOpen(true);
              }}
              className="p-1.5 bg-white/90 rounded-full"
              aria-label="Quick view"
            >
              <Eye size={14} className="text-zinc-700" />
            </button>
          </div>
        </div>

        <div className="pt-3 space-y-0.5">
          <p className="text-[10px] text-zinc-500">{category}</p>
          <p className="text-sm leading-5 text-zinc-900">{name}</p>
          <p className="text-sm text-zinc-900">
            {oldPrice && <span className="line-through text-zinc-400 mr-2">${oldPrice}</span>}
            <span className={oldPrice ? "text-red-600" : ""}>${price}</span>
          </p>
        </div>
      </Link>

      {quickViewOpen && (
        <div className="fixed inset-0 z-[90] bg-black/40 grid place-items-center p-4" onClick={() => setQuickViewOpen(false)}>
          <div className="bg-white w-full max-w-2xl grid md:grid-cols-2 relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setQuickViewOpen(false)}
              aria-label="Close quick view"
              className="absolute right-3 top-3"
            >
              <X size={20} />
            </button>
            <div className="relative min-h-80">
              <Image src={image} alt={name} fill className="object-cover" />
            </div>
            <div className="p-6 space-y-4">
              <p className="text-xs uppercase text-zinc-500">{category}</p>
              <h4 className="text-2xl">{name}</h4>
              <p className="text-xl">${price}</p>
              <p className="text-sm text-zinc-600">
                Authenticated luxury archive piece, curated from Japan and inspected before delivery.
              </p>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => addToCart(itemPayload, 1)}
                  className="flex items-center gap-2 bg-black text-white px-4 py-2 text-sm"
                >
                  <ShoppingBag size={14} /> Add to Cart
                </button>
                <Link href={`/product/${id}`} className="border border-zinc-400 px-4 py-2 text-sm">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
