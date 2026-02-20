"use client";

import React, { createContext, useContext, useState } from "react";

interface CartItem {
  id: number | string;
  name: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
}

interface AddToCartItem {
  id: number | string;
  name: string;
  category: string;
  price: string | number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: AddToCartItem, quantity?: number) => void;
  removeFromCart: (id: number | string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: AddToCartItem, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i,
        );
      }
      const numericPrice =
        typeof item.price === "string"
          ? parseFloat(item.price.replace(/,/g, ""))
          : item.price;
      return [...prev, { ...item, quantity, price: numericPrice }];
    });
  };

  const removeFromCart = (id: number | string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
