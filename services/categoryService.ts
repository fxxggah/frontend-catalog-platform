import { api, unwrap } from "./api";
import type { CategoryRequest, CategoryResponse } from "@/types";

export const categoryService = {
  async getPublicCategories(storeSlug: string): Promise<CategoryResponse[]> {
    return unwrap(
      await api.get<CategoryResponse[]>(`/stores/${storeSlug}/categories`)
    );
  },

  async getAdminCategories(storeSlug: string): Promise<CategoryResponse[]> {
    return unwrap(
      await api.get<CategoryResponse[]>(
        `/admin/stores/${storeSlug}/categories`
      )
    );
  },

  async createCategory(
    storeSlug: string,
    payload: CategoryRequest
  ): Promise<CategoryResponse> {
    return unwrap(
      await api.post<CategoryResponse>(
        `/admin/stores/${storeSlug}/categories`,
        payload
      )
    );
  },

  async updateCategory(
    storeSlug: string,
    categoryId: number,
    payload: CategoryRequest
  ): Promise<CategoryResponse> {
    return unwrap(
      await api.put<CategoryResponse>(
        `/admin/stores/${storeSlug}/categories/${categoryId}`,
        payload
      )
    );
  },

  async deleteCategory(storeSlug: string, categoryId: number): Promise<void> {
    await api.delete(`/admin/stores/${storeSlug}/categories/${categoryId}`);
  },
};