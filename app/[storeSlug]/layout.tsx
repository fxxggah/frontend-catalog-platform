"use client";

import type { ReactNode } from "react";
import { useParams } from "next/navigation";
import { CartProvider } from "@/contexts/CartContext";

type StoreLayoutProps = {
  children: ReactNode;
};

export default function StoreLayout({ children }: StoreLayoutProps) {
  const params = useParams();

  // Next retorna params como string | string[]
  const storeSlug = Array.isArray(params.storeSlug)
    ? params.storeSlug[0]
    : params.storeSlug;

  // fallback de segurança (evita crash)
  if (!storeSlug) {
    return <>{children}</>;
  }

  return (
    <CartProvider storeSlug={storeSlug}>
      {children}
    </CartProvider>
  );
}