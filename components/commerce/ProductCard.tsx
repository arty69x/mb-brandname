import Link from 'next/link';
import { Product } from '@/data/types';

export default function ProductCard({ product }: { product: Product }) {
  const image = Array.isArray(product.images) && product.images[0] ? product.images[0] : '';

  return (
    <article className='group'>
      <Link href={`/product/${product.slug}`} className='block'>
        <div className='relative aspect-square overflow-hidden bg-[var(--bg-alt)]'>
          {image ? (
            <img src={image} alt={product.title} className='h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-[1.03]' />
          ) : null}
          <span className='absolute right-3 top-3 text-xl'>♡</span>
          <span className='absolute bottom-3 left-3 right-3 bg-white py-2 text-center text-[12px] font-semibold uppercase tracking-[0.08em]'>
            Add to cart
          </span>
        </div>

        <div className='mt-3 space-y-0.5'>
          <p className='text-[12px] text-[var(--caption)]'>Dresses</p>
          <h3 className='text-[36px] leading-tight text-[var(--text)]'>{product.title}</h3>
          <div className='flex items-baseline gap-2'>
            {product.compareAtPrice ? <span className='text-[34px] text-[var(--caption)] line-through'>${product.compareAtPrice}</span> : null}
            <span className={`text-[36px] ${product.compareAtPrice ? 'text-[var(--danger)]' : ''}`}>${product.price}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
