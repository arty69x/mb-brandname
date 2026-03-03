import { Product } from '@/data/types';
import { stableSort } from './stableSort';

export function sortProducts(products: Product[], sort: string): Product[] {
  return stableSort(products, (a, b) => {
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    return 0;
  });
}
