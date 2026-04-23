import type { Cart } from "@/types";

export function getCartStorageKey(storeSlug: string): string {
  return `cart:${storeSlug}`;
}

export function getStoredCart(storeSlug: string): Cart | null {
  if (typeof window === "undefined") return null;

  const storageKey = getCartStorageKey(storeSlug);
  const storedCart = localStorage.getItem(storageKey);

  if (!storedCart) return null;

  try {
    return JSON.parse(storedCart) as Cart;
  } catch {
    return null;
  }
}

export function saveCart(storeSlug: string, cart: Cart): void {
  if (typeof window === "undefined") return;

  const storageKey = getCartStorageKey(storeSlug);
  localStorage.setItem(storageKey, JSON.stringify(cart));
}

export function clearStoredCart(storeSlug: string): void {
  if (typeof window === "undefined") return;

  const storageKey = getCartStorageKey(storeSlug);
  localStorage.removeItem(storageKey);
}