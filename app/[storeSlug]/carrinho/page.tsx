"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { storeService } from "@/services/storeService";
import { StoreTemplateRenderer } from "@/templates/base/StoreTemplateRenderer";
import type { StoreResponse } from "@/types";

export default function CartPage() {
  const params = useParams();
  const storeSlug = params.storeSlug as string;

  const [store, setStore] = useState<StoreResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const storeData = await storeService.getStoreBySlug(storeSlug);
        setStore(storeData);
      } finally {
        setIsLoading(false);
      }
    }

    if (storeSlug) {
      loadData();
    }
  }, [storeSlug]);

  if (isLoading) return <div className="p-6">Carregando...</div>;
  if (!store) return <div className="p-6">Loja não encontrada.</div>;

  return <StoreTemplateRenderer type="cart" store={store} />;
}