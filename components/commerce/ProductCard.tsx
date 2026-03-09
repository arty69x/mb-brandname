import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '@/data/types';

function formatTHB(price: number): string {
  const mapped = Math.round((price * 32.1) / 10) * 10;
  return `${mapped.toLocaleString('en-US')} THB`;
}

export default function ProductCard({ product }: { product: Product }) {
  const image = Array.isArray(product.images) && product.images[0] ? product.images[0] : '';

  return (
    <article className='border-b border-r border-[#d7d7d7]'>
      <Link href={`/product/${product.slug}`} className='block'>
        <div className='relative aspect-square overflow-hidden bg-[#ededed]'>
          {image ? <img src={image} alt={product.title} loading='lazy' className='h-full w-full object-cover' /> : null}
        </div>

        <div className='px-2 pb-3 pt-2 sm:px-3 sm:pt-3'>
          <div className='flex items-start justify-between gap-2'>
            <h3 className='line-clamp-1 text-[12px] font-semibold uppercase leading-[1.2] tracking-[0.01em] text-black sm:text-[14px]'>
              {product.title}
            </h3>
            <ShoppingBag className='h-5 w-5 shrink-0 stroke-[1.7] sm:h-6 sm:w-6' />
          </div>
          <div className='mt-2 flex items-end justify-between'>
            <span className='text-[12px] font-medium leading-none sm:text-[14px]'>{formatTHB(product.price)}</span>
            <Heart className='h-5 w-5 shrink-0 stroke-[1.7] sm:h-6 sm:w-6' />
          </div>
        </div>
      </Link>
    </article>
  );
}
