import Link from "next/link";
import Image from "next/image";

import type { Product } from "../../lib/products";
import { useStore } from "../../context/store";
import Button from "../ui/Button";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, toggleCompare } = useStore();

  return (
    <article className="group">
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden border border-gray-100 bg-white">
          <Image
            src={product.images[0] || ""}
            alt={`${product.title} product image`}
            fill
            className="object-cover transition duration-1000 ease-out group-hover:scale-[1.03]"
          />
        </div>
      </Link>

      <div className="mt-6 space-y-2">
        <p className="text-[11px] font-black uppercase tracking-[0.3em] opacity-70">{product.category}</p>
        <h3 className="text-sm font-medium uppercase tracking-[0.1em]">{product.title}</h3>
        <p className="text-sm font-medium opacity-80">${product.price}</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2 md:opacity-0 md:transition md:duration-700 md:ease-out md:group-hover:opacity-100">
        <Button onClick={() => addToCart(product.id)} className="h-10 px-2 py-0">
          Add
        </Button>
        <button
          className="h-10 border border-black px-2 text-[11px] font-black uppercase tracking-[0.3em]"
          onClick={() => toggleWishlist(product.id)}
        >
          Wish
        </button>
      </div>
      <button
        className="mt-2 h-10 w-full border border-gray-100 px-2 text-[11px] font-black uppercase tracking-[0.3em]"
        onClick={() => toggleCompare(product.id)}
      >
        Compare
      </button>
    </article>
  );
}
