"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { storeService } from "@/services/storeService";
import { productService } from "@/services/productService";
import { StoreTemplateRenderer } from "@/components/template/StoreTemplateRenderer";
import type { ProductResponse, StoreResponse } from "@/types";

export default function ProductPage() {
  const params = useParams();
  const storeSlug = params.storeSlug as string;
  const productSlug = params.productSlug as string;

  const [store, setStore] = useState<StoreResponse | null>(null);
  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);

        const [storeData, productData] = await Promise.all([
          storeService.getStoreBySlug(storeSlug),
          productService.getProductBySlug(storeSlug, productSlug),
        ]);

        setStore(storeData);
        setProduct(productData);
      } finally {
        setIsLoading(false);
      }
    }

    if (storeSlug && productSlug) {
      loadData();
    }
  }, [storeSlug, productSlug]);

  if (isLoading) return <div className="p-6">Carregando...</div>;
  if (!store || !product) return <div className="p-6">Produto não encontrado.</div>;

  return (
    <StoreTemplateRenderer
      template={store.template}
      page="product"
      store={store}
      product={product}
    />
  );
}