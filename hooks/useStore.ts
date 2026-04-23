"use client";

import { useCallback, useEffect, useState } from "react";
import { storeService } from "@/services/storeService";
import type { StoreResponse } from "@/types";

type UseStoreReturn = {
  store: StoreResponse | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export function useStore(storeSlug: string): UseStoreReturn {
  const [store, setStore] = useState<StoreResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStore = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await storeService.getStoreBySlug(storeSlug);
      setStore(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Erro ao carregar loja.";
      setError(message);
      setStore(null);
    } finally {
      setIsLoading(false);
    }
  }, [storeSlug]);

  useEffect(() => {
    if (!storeSlug) return;
    fetchStore();
  }, [storeSlug, fetchStore]);

  return {
    store,
    isLoading,
    error,
    refetch: fetchStore,
  };
}