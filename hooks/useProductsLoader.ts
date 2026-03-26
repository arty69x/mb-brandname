import { useEffect, useState } from 'react';
import { products, type Product } from '@/data/products';

type LoaderState = {
  loading: boolean;
  error: string;
  data: Product[];
};

export function useProductsLoader(filter?: (item: Product) => boolean) {
  const [state, setState] = useState<LoaderState>({ loading: true, error: '', data: [] });

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setState({ loading: true, error: '', data: [] });
      try {
        await new Promise((resolve) => setTimeout(resolve, 120));
        const safeData = Array.isArray(products) ? products : [];
        const nextData = filter ? safeData.filter(filter) : safeData;
        if (mounted) {
          setState({ loading: false, error: '', data: nextData });
        }
      } catch {
        if (mounted) {
          setState({ loading: false, error: 'Failed to load data', data: [] });
        }
      }
    };

    load().catch(() => {
      if (mounted) {
        setState({ loading: false, error: 'Failed to load data', data: [] });
      }
    });

    return () => {
      mounted = false;
    };
  }, [filter]);

  return state;
}
