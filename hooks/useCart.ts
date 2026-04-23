"use client";

import { useEffect, useMemo, useState } from "react";
import type { Cart, CartItem, ProductResponse } from "@/types";

type UseCartReturn = {
  cart: Cart;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: ProductResponse, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
};

function getCartStorageKey(storeSlug: string): string {
  return `cart:${storeSlug}`;
}

function getProductImage(product: ProductResponse): string | undefined {
  return product.images?.[0]?.imageUrl;
}

export function useCart(storeSlug: string): UseCartReturn {
  const [cart, setCart] = useState<Cart>({
    storeSlug,
    items: [],
  });

  useEffect(() => {
    if (!storeSlug) return;

    const storageKey = getCartStorageKey(storeSlug);
    const storedCart = localStorage.getItem(storageKey);

    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart) as Cart;
        setCart(parsedCart);
      } catch {
        setCart({ storeSlug, items: [] });
      }
    } else {
      setCart({ storeSlug, items: [] });
    }
  }, [storeSlug]);

  useEffect(() => {
    if (!storeSlug) return;

    const storageKey = getCartStorageKey(storeSlug);
    localStorage.setItem(storageKey, JSON.stringify(cart));
  }, [cart, storeSlug]);

  function addToCart(product: ProductResponse, quantity = 1): void {
    setCart((prev) => {
      const existingItem = prev.items.find(
        (item) => item.productId === product.id
      );

      if (existingItem) {
        return {
          ...prev,
          items: prev.items.map((item) =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      const priceToUse = product.promotionalPrice ?? product.price;

      const newItem: CartItem = {
        productId: product.id,
        name: product.name,
        price: priceToUse,
        quantity,
        image: getProductImage(product),
        storeSlug,
      };

      return {
        ...prev,
        items: [...prev.items, newItem],
      };
    });
  }

  function removeFromCart(productId: number): void {
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.productId !== productId),
    }));
  }

  function updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      ),
    }));
  }

  function clearCart(): void {
    setCart({
      storeSlug,
      items: [],
    });
  }

  const totalItems = useMemo(
    () => cart.items.reduce((acc, item) => acc + item.quantity, 0),
    [cart.items]
  );

  const totalPrice = useMemo(
    () => cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart.items]
  );

  return {
    cart,
    items: cart.items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
}