import crypto from 'node:crypto';
import { CartItem } from '@/data/types';

export function createOrderPayload(items: CartItem[]): string {
  return [...items].sort((a, b) => a.productId.localeCompare(b.productId)).map((i) => `${i.productId}:${i.qty}`).join('|');
}

export function hashSHA256(payload: string): string {
  return crypto.createHash('sha256').update(payload).digest('hex').toLowerCase();
}

export function createOrderId(items: CartItem[]): string {
  return `ord_${hashSHA256(createOrderPayload(items)).slice(0, 12)}`;
}
