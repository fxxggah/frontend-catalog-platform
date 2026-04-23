"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { storeService } from "@/services/storeService";
import { categoryService } from "@/services/categoryService";
import { productService } from "@/services/productService";
import type {
  CategoryResponse,
  PagedResponse,
  ProductResponse,
  StoreResponse,
} from "@/types";
import { StoreTemplateRenderer } from "@/templates/base/StoreTemplateRenderer";

export default function StoreHomePage() {
  const params = useParams();
  const storeSlug = params.storeSlug as string;

  const [store, setStore] = useState<StoreResponse | null>(null);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [productsPage, setProductsPage] =
    useState<PagedResponse<ProductResponse> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);

        const [storeData, categoriesData, productsData] = await Promise.all([
          storeService.getStoreBySlug(storeSlug),
          categoryService.getPublicCategories(storeSlug),
          productService.getPublicProducts(storeSlug, { page: 0, size: 12 }),
        ]);

        setStore(storeData);
        setCategories(categoriesData);
        setProductsPage(productsData);
      } finally {
        setIsLoading(false);
      }
    }

    if (storeSlug) {
      loadData();
    }
  }, [storeSlug]);

  if (isLoading) return <div className="p-6">Carregando...</div>;
  if (!store || !productsPage) {
    return <div className="p-6">Loja não encontrada.</div>;
  }

  return (
    <StoreTemplateRenderer
      type="home"
      store={store}
      categories={categories}
      productsPage={productsPage}
    />
  );
}