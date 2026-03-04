import { useEffect, useState } from 'react';
import { getWishlist, toggleWishlist } from '@/lib/wishlist';

export default function WishlistButton({ productId }: { productId: string }) {
  const [active, setActive] = useState(false);
  useEffect(() => { setActive(getWishlist().includes(productId)); }, [productId]);
  return <button onClick={() => { const next = toggleWishlist(productId); setActive(next.includes(productId)); }} className='rounded-full border border-[#d9d9d9] px-4 py-2 text-[12px] uppercase tracking-[0.12em]'>{active ? 'Wishlisted' : 'Wishlist'}</button>;
}
