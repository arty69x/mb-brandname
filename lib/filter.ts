import { Product } from '@/data/types';

export function filterProducts(products: Product[], category: string, search: string): Product[] {
  const q = search.toLowerCase();
  return products.filter((p) => (category ? p.category === category : true)).filter((p) => (q ? p.title.toLowerCase().includes(q) : true));
}
