import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/data/products';
import { useStore } from '@/context/StoreContext';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const inWishlist = Array.isArray(wishlist) ? wishlist.includes(product.id) : false;
  const fallbackSrc = '/images/fallback-product.svg';
  const safeInitialSrc = typeof product.image === 'string' && product.image.trim() ? product.image : fallbackSrc;
  const [imageSrc, setImageSrc] = useState(safeInitialSrc);

  return (
    <article className="group relative font-['Inter'] tracking-wide">
      <div className="relative aspect-square overflow-hidden bg-[#EEEEEE]">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={imageSrc}
            alt={product.title}
            fill
            className="object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
            sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
            onError={() => setImageSrc(fallbackSrc)}
          />
        </Link>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />
        {product.badge ? (
          <span className="absolute left-3 top-3 z-10 bg-[#111111] px-3 py-1 text-[11px] uppercase tracking-[0.1em] text-[#FFFFFF]">
            {product.badge}
          </span>
        ) : null}
        <button
          type="button"
          aria-label="Wishlist"
          onClick={() => toggleWishlist(product.id)}
          className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 text-[#111111] shadow-[0_6px_14px_rgba(0,0,0,0.12)] transition-all duration-300 ease-in-out hover:bg-white hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] active:scale-95"
        >
          <Heart size={16} className={inWishlist ? 'fill-[#111111]' : ''} />
        </button>
        <button
          type="button"
          aria-label="Add to cart"
          onClick={() => addToCart(product.id)}
          className="absolute bottom-3 right-3 z-10 rounded-full bg-[#111111] p-2 text-[#FFFFFF] shadow-[0_8px_20px_rgba(0,0,0,0.24)] transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 active:scale-95"
        >
          <ShoppingBag size={16} />
        </button>
      </div>
      <div className="space-y-2 p-4">
        <p className="text-[11px] uppercase tracking-wide text-[#6D6D6D]">{product.category}</p>
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/product/${product.slug}`}
            className="line-clamp-1 block font-['Playfair_Display'] text-[14px] tracking-wide transition-opacity duration-300 ease-in-out hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
          >
            {product.title}
          </Link>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-[14px]">${product.price.toLocaleString()}</p>
          <span className="text-[11px] uppercase tracking-[0.08em] text-[#6D6D6D]">Ready to ship</span>
        </div>
      </div>
    </article>
  );
}
