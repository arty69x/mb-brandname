import Link from 'next/link';
import { Product } from '@/data/types';

export default function ProductCard({ product }: { product: Product }) {
  const image = Array.isArray(product.images) && product.images[0] ? product.images[0] : '';

  return (
    <article>
      <Link href={`/product/${product.slug}`} className='block'>
        <div className='relative aspect-[0.78] overflow-hidden bg-[#e7e7e7]'>
          {image ? <img src={image} alt={product.title} className='h-full w-full object-cover' /> : null}
        </div>
        <div className='pt-3'>
          <p className='text-[11px] text-[#666]'>Dresses</p>
          <h3 className='mt-1 text-[18px] leading-[1.2]'>{product.title}</h3>
          <div className='mt-1 flex items-baseline gap-2'>
            {product.compareAtPrice ? <span className='text-[12px] text-[#777] line-through'>${product.compareAtPrice}</span> : null}
            <span className={`text-[22px] ${product.compareAtPrice ? 'text-[#d54545]' : ''}`}>${product.price}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
