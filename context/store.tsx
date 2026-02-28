import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

import { safeJSONParse, getStorageItem, setStorageItem } from "../lib/safe";
import { getProductById } from "../lib/products";

export type CookiePrefs = { analytics: boolean; marketing: boolean; necessary: true; acceptedAll: boolean };

type CartLine = { productId: string; qty: number };
type OrderStatus = "PAID" | "FAILED";
type Order = { id: string; status: OrderStatus; date: string; items: CartLine[]; subtotal: number };
type Account = { email: string; signedIn: boolean };
type Notice = { id: string; message: string };

interface State {
  cart: CartLine[];
  wishlist: string[];
  compare: string[];
  orders: Order[];
  account: Account;
  cookiePrefs: CookiePrefs;
  notifications: Notice[];
}

const initialState: State = {
  cart: [], wishlist: [], compare: [], orders: [],
  account: { email: "", signedIn: false },
  cookiePrefs: { analytics: false, marketing: false, necessary: true, acceptedAll: false },
  notifications: [],
};

type Action =
  | { type: "hydrate"; payload: State }
  | { type: "addCart"; productId: string }
  | { type: "removeCart"; productId: string }
  | { type: "setQty"; productId: string; qty: number }
  | { type: "toggleWishlist"; productId: string }
  | { type: "toggleCompare"; productId: string }
  | { type: "pushOrder"; order: Order }
  | { type: "clearCart" }
  | { type: "signIn"; email: string }
  | { type: "signOut" }
  | { type: "setCookie"; prefs: CookiePrefs }
  | { type: "notify"; notice: Notice }
  | { type: "dismiss"; id: string };

function clampQty(qty: number): number {
  return Math.max(1, Math.min(99, qty));
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate": return action.payload;
    case "addCart": {
      const found = state.cart.find((line) => line.productId === action.productId);
      if (found) {
        return { ...state, cart: state.cart.map((line) => line.productId === action.productId ? { ...line, qty: clampQty(line.qty + 1) } : line) };
      }
      return { ...state, cart: [...state.cart, { productId: action.productId, qty: 1 }] };
    }
    case "removeCart": return { ...state, cart: state.cart.filter((line) => line.productId !== action.productId) };
    case "setQty": return { ...state, cart: state.cart.map((line) => line.productId === action.productId ? { ...line, qty: clampQty(action.qty) } : line) };
    case "toggleWishlist": return { ...state, wishlist: state.wishlist.includes(action.productId) ? state.wishlist.filter((id) => id !== action.productId) : [...state.wishlist, action.productId] };
    case "toggleCompare": {
      if (state.compare.includes(action.productId)) {
        return { ...state, compare: state.compare.filter((id) => id !== action.productId) };
      }
      if (state.compare.length >= 4) return state;
      return { ...state, compare: [...state.compare, action.productId] };
    }
    case "pushOrder": return { ...state, orders: [action.order, ...state.orders] };
    case "clearCart": return { ...state, cart: [] };
    case "signIn": return { ...state, account: { email: action.email, signedIn: true } };
    case "signOut": return { ...state, account: { email: "", signedIn: false } };
    case "setCookie": return { ...state, cookiePrefs: action.prefs };
    case "notify": return { ...state, notifications: [action.notice, ...state.notifications] };
    case "dismiss": return { ...state, notifications: state.notifications.filter((n) => n.id !== action.id) };
    default: return state;
  }
}

interface StoreContextValue extends State {
  cartSubtotal: number;
  cartCount: number;
  wishlistCount: number;
  compareCount: number;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  toggleWishlist: (id: string) => void;
  toggleCompare: (id: string) => void;
  createOrder: (status: OrderStatus) => string;
  clearCart: () => void;
  signIn: (email: string) => void;
  signOut: () => void;
  setCookiePrefs: (prefs: CookiePrefs) => void;
  notify: (message: string) => void;
  dismiss: (id: string) => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const raw = getStorageItem("mb-store");
    const parsed = safeJSONParse<State>(raw, initialState);
    dispatch({ type: "hydrate", payload: { ...initialState, ...parsed, notifications: [] } });
  }, []);

  useEffect(() => {
    setStorageItem("mb-store", JSON.stringify({ ...state, notifications: [] }));
  }, [state.cart, state.wishlist, state.compare, state.orders, state.account, state.cookiePrefs]);

  const notify = (message: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    dispatch({ type: "notify", notice: { id, message } });
    setTimeout(() => dispatch({ type: "dismiss", id }), 3500);
  };

  const value = useMemo<StoreContextValue>(() => {
    const cartSubtotal = state.cart.reduce((sum, line) => {
      const p = getProductById(line.productId);
      return sum + (p ? p.price * line.qty : 0);
    }, 0);

    return {
      ...state,
      cartSubtotal,
      cartCount: state.cart.reduce((s, i) => s + i.qty, 0),
      wishlistCount: state.wishlist.length,
      compareCount: state.compare.length,
      addToCart: (id) => { dispatch({ type: "addCart", productId: id }); notify("Added to cart"); },
      removeFromCart: (id) => { dispatch({ type: "removeCart", productId: id }); notify("Removed from cart"); },
      setQty: (id, qty) => dispatch({ type: "setQty", productId: id, qty }),
      toggleWishlist: (id) => { dispatch({ type: "toggleWishlist", productId: id }); notify("Wishlist updated"); },
      toggleCompare: (id) => {
        if (!state.compare.includes(id) && state.compare.length >= 4) {
          notify("Compare limit is 4 items");
          return;
        }
        dispatch({ type: "toggleCompare", productId: id });
        notify("Compare updated");
      },
      createOrder: (status) => {
        const id = `ORD-${Date.now()}`;
        dispatch({ type: "pushOrder", order: { id, status, date: new Date().toISOString(), items: state.cart, subtotal: cartSubtotal } });
        return id;
      },
      clearCart: () => dispatch({ type: "clearCart" }),
      signIn: (email) => dispatch({ type: "signIn", email }),
      signOut: () => dispatch({ type: "signOut" }),
      setCookiePrefs: (prefs) => dispatch({ type: "setCookie", prefs }),
      notify,
      dismiss: (id) => dispatch({ type: "dismiss", id }),
    };
  }, [state, state.compare.length]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreContextValue {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
}
