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
    <div className="group relative cursor-pointer">
      <div className="relative aspect-[3/4] overflow-hidden">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:opacity-90"
            sizes="(max-width: 1024px) 50vw, 20vw"
          />
        </Link>
        {product.badge ? <span className="absolute left-3 top-3 bg-black px-3 py-1 text-xs text-white">{product.badge}</span> : null}
        <button
          type="button"
          aria-label="Wishlist"
          onClick={() => toggleWishlist(product.id)}
          className="absolute right-3 top-3 rounded-full bg-white p-2 transition-all duration-300 ease-in-out hover:opacity-80"
        >
          <Heart size={14} className={inWishlist ? 'fill-black' : ''} />
        </button>
      </div>
      <div className="bg-[#F5F5F5] p-4">
        <p className="text-xs uppercase tracking-[0.24em] text-black/40">{product.category}</p>
        <Link href={`/product/${product.slug}`} className="mt-2 block text-[20px] leading-tight">
          {product.title}
        </Link>
        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="text-[36px] leading-none">฿{product.price.toLocaleString()}</p>
          <button
            type="button"
            onClick={() => addToCart(product.id)}
            className="bg-black px-4 py-2 text-xs uppercase text-white transition-all duration-300 ease-in-out hover:opacity-80"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
