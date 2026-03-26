import { useCallback } from 'react';

export function useSafeLocalStorage() {
  const getItem = useCallback(<T,>(key: string, fallback: T): T => {
    if (typeof window === 'undefined') {
      return fallback;
    }

    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) {
        return fallback;
      }
      const parsed = JSON.parse(raw) as unknown;
      return parsed as T;
    } catch {
      return fallback;
    }
  }, []);

  const setItem = useCallback((key: string, value: unknown) => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      return;
    }
  }, []);

  return { getItem, setItem };
}
