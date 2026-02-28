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
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
          <Image src={product.images[0]} alt={`${product.title} product image`} fill className="object-cover transition duration-700 group-hover:scale-[1.03]" />
        </div>
      </Link>
      <div className="mt-5 space-y-3">
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-black/70">{product.category}</p>
        <h3 className="text-sm uppercase tracking-[0.12em]">{product.title}</h3>
        <p className="text-sm">${product.price}</p>
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={() => addToCart(product.id)}>ADD</Button>
          <button className="h-10 border border-black text-[11px] font-black uppercase tracking-[0.3em]" onClick={() => toggleWishlist(product.id)}>WISH</button>
        </div>
        <button className="h-10 w-full border border-gray-300 text-[11px] font-black uppercase tracking-[0.3em]" onClick={() => toggleCompare(product.id)}>COMPARE</button>
      </div>
    </article>
  );
}
