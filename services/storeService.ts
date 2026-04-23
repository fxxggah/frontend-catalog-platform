import { api, unwrap } from "./api";
import type { StoreRequest, StoreResponse } from "@/types";

export const storeService = {
  async getStoreBySlug(slug: string): Promise<StoreResponse> {
    return unwrap(await api.get<StoreResponse>(`/stores/${slug}`));
  },

  async createStore(payload: StoreRequest): Promise<StoreResponse> {
    return unwrap(await api.post<StoreResponse>("/stores", payload));
  },

  async getMyStores(): Promise<StoreResponse[]> {
    return unwrap(await api.get<StoreResponse[]>("/stores/my"));
  },

  async updateStore(
    storeSlug: string,
    payload: StoreRequest
  ): Promise<StoreResponse> {
    return unwrap(
      await api.put<StoreResponse>(`/admin/stores/${storeSlug}`, payload)
    );
  },

  async deactivateStore(storeSlug: string): Promise<void> {
    await api.delete(`/admin/stores/${storeSlug}`);
  },
};