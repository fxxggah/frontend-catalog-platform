"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { storeService } from "@/services/storeService";
import { categoryService } from "@/services/categoryService";
import { productService } from "@/services/productService";
import { StoreTemplateRenderer } from "@/templates/base/StoreTemplateRenderer";
import type {
  CategoryResponse,
  PagedResponse,
  ProductResponse,
  StoreResponse,
} from "@/types";

export default function CategoryPage() {
  const params = useParams();
  const storeSlug = params.storeSlug as string;
  const categorySlug = params.categorySlug as string;

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
          productService.getProductsByCategory(storeSlug, categorySlug, {
            page: 0,
            size: 20,
          }),
        ]);

        setStore(storeData);
        setCategories(categoriesData);
        setProductsPage(productsData);
      } finally {
        setIsLoading(false);
      }
    }

    if (storeSlug && categorySlug) {
      loadData();
    }
  }, [storeSlug, categorySlug]);

  const currentCategory = useMemo(
    () => categories.find((item) => item.slug === categorySlug) ?? null,
    [categories, categorySlug]
  );

  if (isLoading) return <div className="p-6">Carregando...</div>;

  if (!store || !productsPage) {
    return <div className="p-6">Categoria não encontrada.</div>;
  }

  return (
    <StoreTemplateRenderer
      type="category"
      store={store}
      category={currentCategory}
      productsPage={productsPage}
    />
  );
}