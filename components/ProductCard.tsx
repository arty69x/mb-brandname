import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import type { Product } from '@/data/products';
import { useStore } from '@/context/StoreContext';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const inWishlist = Array.isArray(wishlist) ? wishlist.includes(product.id) : false;

  return (
    <div className="group relative">
      <div className="relative aspect-[3/4] overflow-hidden">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition-all duration-300 ease-in-out group-hover:scale-[1.08]"
            sizes="(max-width: 1024px) 50vw, 20vw"
          />
        </Link>
        {product.badge ? <span className="absolute left-3 top-3 bg-[#111111] px-3 py-1 text-[11px] uppercase tracking-[0.1em] text-[#FFFFFF]">{product.badge}</span> : null}
        <button
          type="button"
          aria-label="Wishlist"
          onClick={() => toggleWishlist(product.id)}
          className="absolute right-3 top-3 rounded-full bg-[#FFFFFF] p-2 transition-all duration-300 ease-in-out hover:opacity-80"
        >
          <Heart size={14} className={inWishlist ? 'fill-[#111111]' : ''} />
        </button>
      </div>
      <div className="bg-[#F5F5F5] p-4">
        <p className="text-[11px] uppercase tracking-[0.1em] text-[#6D6D6D]">{product.category}</p>
        <Link href={`/product/${product.slug}`} className="mt-2 block text-[14px]">
          {product.title}
        </Link>
        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="text-[14px]">${product.price.toLocaleString()}</p>
          <button
            type="button"
            onClick={() => addToCart(product.id)}
            className="bg-[#111111] px-4 py-2 text-[11px] uppercase tracking-[0.1em] text-[#FFFFFF] transition-all duration-300 ease-in-out hover:opacity-80"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
