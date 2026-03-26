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
    <div className="group relative font-['Inter'] tracking-wide">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#EEEEEE]">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={imageSrc}
            alt={product.title}
            fill
            className="object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
            sizes="(max-width: 1023px) 50vw, 20vw"
            onError={() => setImageSrc(fallbackSrc)}
          />
        </Link>
        {product.badge ? <span className="absolute left-3 top-3 bg-[#111111] px-3 py-1 text-[11px] uppercase tracking-[0.1em] text-[#FFFFFF]">{product.badge}</span> : null}
      </div>
      <div className="p-4">
        <p className="text-[11px] uppercase tracking-wide text-[#6D6D6D]">{product.category}</p>
        <div className="mt-2 flex items-start justify-between gap-2">
          <Link href={`/product/${product.slug}`} className="line-clamp-1 block font-['Playfair_Display'] text-[14px] tracking-wide">
            {product.title}
          </Link>
          <button
            type="button"
            aria-label="Add to cart"
            onClick={() => addToCart(product.id)}
            className="shrink-0 rounded-full p-1 transition-all duration-300 ease-in-out hover:opacity-80 focus-visible:ring-2 focus-visible:ring-[#111111]"
          >
            <ShoppingBag size={20} />
          </button>
        </div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="text-[14px]">${product.price.toLocaleString()}</p>
          <button
            type="button"
            aria-label="Wishlist"
            onClick={() => toggleWishlist(product.id)}
            className="shrink-0 rounded-full p-1 transition-all duration-300 ease-in-out hover:opacity-80 focus-visible:ring-2 focus-visible:ring-[#111111]"
          >
            <Heart size={20} className={inWishlist ? 'fill-[#111111]' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
}
