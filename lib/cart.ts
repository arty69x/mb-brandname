import { CartItem } from '@/data/types';
import { getItem, setItem } from './storage';

const KEY = 'mb_cart_v1';

export function getCart(): CartItem[] {
  const items = getItem<CartItem[]>(KEY, []);
  return Array.isArray(items) ? items : [];
}

export function addToCart(productId: string, qty: number): CartItem[] {
  const cart = getCart();
  const q = Math.max(1, qty);
  const idx = cart.findIndex((item) => item.productId === productId);
  if (idx >= 0) {
    const current = cart[idx];
    if (current) cart[idx] = { productId, qty: current.qty + q };
  } else {
    cart.push({ productId, qty: q });
  }
  setItem(KEY, cart);
  return cart;
}

export function updateQty(productId: string, qty: number): CartItem[] {
  const cart = getCart().map((item) => (item.productId === productId ? { ...item, qty: Math.max(1, qty) } : item));
  setItem(KEY, cart);
  return cart;
}

export function removeFromCart(productId: string): CartItem[] {
  const cart = getCart().filter((item) => item.productId !== productId);
  setItem(KEY, cart);
  return cart;
}

export function clearCart(): void { setItem(KEY, []); }
