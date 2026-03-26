import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useSafeLocalStorage } from '@/hooks/useSafeLocalStorage';

type CartItem = {
  productId: string;
  quantity: number;
};

type Toast = {
  id: string;
  message: string;
};

type StoreContextValue = {
  cart: CartItem[];
  wishlist: string[];
  searchTerm: string;
  searchOpen: boolean;
  toasts: Toast[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleWishlist: (productId: string) => void;
  setSearchTerm: (value: string) => void;
  setSearchOpen: (value: boolean) => void;
  removeToast: (id: string) => void;
};

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const { getItem, setItem } = useSafeLocalStorage();
  const toastCounter = useRef(0);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const persistedCart = getItem<CartItem[]>('mb-cart', []);
    const persistedWishlist = getItem<string[]>('mb-wishlist', []);
    const persistedSearch = getItem<string>('mb-search', '');
    if (Array.isArray(persistedCart)) {
      setCart(persistedCart);
    }
    if (Array.isArray(persistedWishlist)) {
      setWishlist(persistedWishlist);
    }
    if (typeof persistedSearch === 'string') {
      setSearchTerm(persistedSearch);
    }
  }, [getItem]);

  useEffect(() => {
    setItem('mb-cart', cart);
  }, [cart, setItem]);

  useEffect(() => {
    setItem('mb-wishlist', wishlist);
  }, [setItem, wishlist]);

  useEffect(() => {
    setItem('mb-search', searchTerm);
  }, [searchTerm, setItem]);

  const pushToast = useCallback((message: string) => {
    toastCounter.current += 1;
    const id = `toast-${toastCounter.current}`;
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  const addToCart = useCallback(
    (productId: string) => {
      setCart((prev) => {
        const existing = prev.find((item) => item.productId === productId);
        if (existing) {
          return prev.map((item) =>
            item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...prev, { productId, quantity: 1 }];
      });
      pushToast('Added to cart');
    },
    [pushToast]
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      setCart((prev) => prev.filter((item) => item.productId !== productId));
      pushToast('Removed from cart');
    },
    [pushToast]
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      setCart((prev) =>
        prev.map((item) =>
          item.productId === productId ? { ...item, quantity: Math.max(1, quantity) } : item
        )
      );
      pushToast('Cart updated');
    },
    [pushToast]
  );

  const toggleWishlist = useCallback(
    (productId: string) => {
      setWishlist((prev) => {
        const found = prev.includes(productId);
        return found ? prev.filter((id) => id !== productId) : [...prev, productId];
      });
      pushToast('Wishlist updated');
    },
    [pushToast]
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      searchTerm,
      searchOpen,
      toasts,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleWishlist,
      setSearchTerm,
      setSearchOpen,
      removeToast
    }),
    [
      cart,
      wishlist,
      searchTerm,
      searchOpen,
      toasts,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleWishlist,
      removeToast
    ]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
}
