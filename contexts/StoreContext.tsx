"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { storeService } from "@/services/storeService";
import type { StoreResponse } from "@/types";

type StoreContextValue = {
  store: StoreResponse | null;
  isLoading: boolean;
  error: string | null;
  loadStore: (storeSlug: string) => Promise<void>;
  clearStore: () => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

type StoreProviderProps = {
  children: ReactNode;
};

export function StoreProvider({ children }: StoreProviderProps) {
  const [store, setStore] = useState<StoreResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadStore(storeSlug: string): Promise<void> {
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
  }

  function clearStore(): void {
    setStore(null);
    setError(null);
    setIsLoading(false);
  }

  const value = useMemo<StoreContextValue>(
    () => ({
      store,
      isLoading,
      error,
      loadStore,
      clearStore,
    }),
    [store, isLoading, error]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStoreContext(): StoreContextValue {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStoreContext deve ser usado dentro de StoreProvider");
  }

  return context;
}