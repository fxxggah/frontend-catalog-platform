"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { useCart } from "@/hooks/useCart";
import type { ProductResponse } from "@/types";

type CartContextValue = {
  items: ReturnType<typeof useCart>["items"];
  cart: ReturnType<typeof useCart>["cart"];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: ProductResponse, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

type CartProviderProps = {
  children: ReactNode;
  storeSlug: string;
};

export function CartProvider({ children, storeSlug }: CartProviderProps) {
  const { cart, items, totalItems, totalPrice, addToCart, removeFromCart, updateQuantity, clearCart } =
    useCart(storeSlug);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      items,
      totalItems,
      totalPrice,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [cart, items, totalItems, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext(): CartContextValue {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCartContext deve ser usado dentro de CartProvider");
  }

  return context;
}