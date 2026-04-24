import { api, unwrap } from "./api"
import type { StoreUserResponse } from "@/types"

export const userService = {
  async getCurrentStoreUser(storeSlug: string): Promise<StoreUserResponse> {
    return unwrap(
      await api.get<StoreUserResponse>(`/admin/stores/${storeSlug}/users/me`)
    )
  },

  async getStoreUsers(storeSlug: string): Promise<StoreUserResponse[]> {
    return unwrap(
      await api.get<StoreUserResponse[]>(`/admin/stores/${storeSlug}/users`)
    )
  },

  async removeStoreUser(
    storeSlug: string,
    userIdToRemove: number
  ): Promise<void> {
    await api.delete(`/admin/stores/${storeSlug}/users/${userIdToRemove}`)
  },
}