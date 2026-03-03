import Link from 'next/link';
import { Product } from '@/data/types';

export default function ProductCard({ product }: { product: Product }) {
  const image = Array.isArray(product.images) && product.images[0] ? product.images[0] : '';

  return (
    <article className='group'>
      <Link href={`/product/${product.slug}`} className='block'>
        <div className='relative aspect-square overflow-hidden rounded-2xl bg-[var(--bg-alt)]'>
          {image ? <img src={image} alt={product.title} className='h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-[1.03]' /> : null}
        </div>
        <div className='mt-4 space-y-2'>
          <p className='text-[11px] uppercase tracking-[0.14em] text-[var(--caption)]'>{product.category}</p>
          <h3 className='text-[14px] text-[var(--text)] lg:text-[15px]'>{product.title}</h3>
          <div className='flex items-baseline gap-3'>
            {product.compareAtPrice ? <span className='text-[12px] text-[var(--caption)] line-through'>${product.compareAtPrice}</span> : null}
            <span className={`text-[14px] font-medium ${product.compareAtPrice ? 'text-[var(--danger)]' : ''}`}>${product.price}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
