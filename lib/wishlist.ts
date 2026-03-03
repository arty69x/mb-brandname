import { getItem, setItem } from './storage';

const KEY = 'mb_wishlist_v1';

export function getWishlist(): string[] {
  const values = getItem<string[]>(KEY, []);
  return Array.isArray(values) ? values : [];
}

export function toggleWishlist(productId: string): string[] {
  const values = getWishlist();
  const next = values.includes(productId) ? values.filter((v) => v !== productId) : [...values, productId];
  setItem(KEY, next);
  return next;
}

export function clearWishlist(): void { setItem(KEY, []); }
