import Link from "next/link";
import Image from "next/image";
import type { Product } from "../../lib/products";
import { useStore } from "../../context/store";
import Button from "../ui/Button";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, toggleCompare } = useStore();

  return (
    <article className="group border border-gray-100 p-2">
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
          <Image src={product.images[0] || ""} alt={`${product.title} product image`} fill className="object-cover transition duration-1000 ease-out group-hover:scale-[1.03]" />
        </div>
      </Link>
      <div className="pt-4">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/70">{product.category}</p>
        <h3 className="mt-2 text-sm font-medium uppercase tracking-[0.1em]">{product.title}</h3>
        <p className="mt-2 text-sm font-medium opacity-80">${product.price}</p>
        <div className="mt-4 grid grid-cols-2 gap-2 md:opacity-0 md:transition md:duration-700 md:ease-out md:group-hover:opacity-100">
          <Button onClick={() => addToCart(product.id)} className="px-2 py-2">Add</Button>
          <button className="border border-black px-2 py-2 text-[10px] font-black uppercase tracking-[0.3em]" onClick={() => toggleWishlist(product.id)}>Wish</button>
        </div>
        <button className="mt-2 w-full border border-gray-200 px-2 py-2 text-[10px] font-black uppercase tracking-[0.3em]" onClick={() => toggleCompare(product.id)}>Compare</button>
      </div>
    </article>
  );
}
