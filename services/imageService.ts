import { api, unwrap } from "./api";
import type {
  ProductImageReorderRequest,
  ProductImageResponse,
} from "@/types";

export const imageService = {
  async getProductImages(
    storeSlug: string,
    productId: number
  ): Promise<ProductImageResponse[]> {
    return unwrap(
      await api.get<ProductImageResponse[]>(
        `/admin/stores/${storeSlug}/products/${productId}/images`
      )
    );
  },

  async uploadProductImage(
    storeSlug: string,
    productId: number,
    file: File
  ): Promise<ProductImageResponse> {
    const formData = new FormData();
    formData.append("file", file);

    return unwrap(
      await api.post<ProductImageResponse>(
        `/admin/stores/${storeSlug}/products/${productId}/images`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
    );
  },

  async reorderProductImages(
    storeSlug: string,
    productId: number,
    payload: ProductImageReorderRequest
  ): Promise<ProductImageResponse[]> {
    return unwrap(
      await api.put<ProductImageResponse[]>(
        `/admin/stores/${storeSlug}/products/${productId}/images/reorder`,
        payload
      )
    );
  },

  async deleteProductImage(
    storeSlug: string,
    productId: number,
    imageId: number
  ): Promise<void> {
    await api.delete(
      `/admin/stores/${storeSlug}/products/${productId}/images/${imageId}`
    );
  },
};