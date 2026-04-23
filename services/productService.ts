import { api, unwrap } from "./api";
import type {
  PagedResponse,
  ProductRequest,
  ProductResponse,
  SortOrder,
} from "@/types";

type GetProductsParams = {
  search?: string;
  page?: number;
  size?: number;
  sortField?: string;
  sortOrder?: SortOrder;
};

function buildProductParams(params: GetProductsParams = {}) {
  const query: Record<string, string | number> = {};

  if (params.search) query.search = params.search;
  if (params.page !== undefined) query.page = params.page;
  if (params.size !== undefined) query.size = params.size;

  if (params.sortField) {
    query.sort = `${params.sortField},${params.sortOrder ?? "asc"}`;
  }

  return query;
}

export const productService = {
  async getPublicProducts(
    storeSlug: string,
    params: GetProductsParams = {}
  ): Promise<PagedResponse<ProductResponse>> {
    return unwrap(
      await api.get<PagedResponse<ProductResponse>>(
        `/stores/${storeSlug}/products`,
        {
          params: buildProductParams(params),
        }
      )
    );
  },

  async getAdminProducts(
    storeSlug: string,
    params: GetProductsParams = {}
  ): Promise<PagedResponse<ProductResponse>> {
    return unwrap(
      await api.get<PagedResponse<ProductResponse>>(
        `/admin/stores/${storeSlug}/products`,
        {
          params: buildProductParams(params),
        }
      )
    );
  },

  async getProductBySlug(
    storeSlug: string,
    productSlug: string
  ): Promise<ProductResponse> {
    return unwrap(
      await api.get<ProductResponse>(
        `/stores/${storeSlug}/products/slug/${productSlug}`
      )
    );
  },

  async getProductsByCategory(
    storeSlug: string,
    categorySlug: string,
    params: Omit<GetProductsParams, "search"> = {}
  ): Promise<PagedResponse<ProductResponse>> {
    return unwrap(
      await api.get<PagedResponse<ProductResponse>>(
        `/stores/${storeSlug}/categories/${categorySlug}/products`,
        {
          params: buildProductParams(params),
        }
      )
    );
  },

  async createProduct(
    storeSlug: string,
    payload: ProductRequest
  ): Promise<ProductResponse> {
    return unwrap(
      await api.post<ProductResponse>(
        `/admin/stores/${storeSlug}/products`,
        payload
      )
    );
  },

  async updateProduct(
    storeSlug: string,
    productId: number,
    payload: ProductRequest
  ): Promise<ProductResponse> {
    return unwrap(
      await api.put<ProductResponse>(
        `/admin/stores/${storeSlug}/products/${productId}`,
        payload
      )
    );
  },

  async deleteProduct(storeSlug: string, productId: number): Promise<void> {
    await api.delete(`/admin/stores/${storeSlug}/products/${productId}`);
  },

  async getProductById(
    storeSlug: string,
    id: number
  ): Promise<ProductResponse> {
    return unwrap(
      await api.get<ProductResponse>(
        `/admin/stores/${storeSlug}/products/${id}`
      )
    );
  },
};