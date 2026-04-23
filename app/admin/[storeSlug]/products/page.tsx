"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { productService } from "@/services/productService";
import type { ProductResponse, PagedResponse } from "@/types";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Loader2, Plus } from "lucide-react";

export default function ProductsPage() {
  const params = useParams();
  const storeSlug = params.storeSlug as string;

  const [productsPage, setProductsPage] =
    useState<PagedResponse<ProductResponse> | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true);

        const data = await productService.getAdminProducts(storeSlug);
        setProductsPage(data);
      } finally {
        setIsLoading(false);
      }
    }

    if (storeSlug) load();
  }, [storeSlug]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  const products = productsPage?.content ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Produtos</h1>

        <Button asChild>
          <Link href={`/admin/${storeSlug}/products/new`}>
            <Plus className="mr-2 h-4 w-4" />
            Novo produto
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                {product.name}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-slate-500">
                R$ {Number(product.price).toFixed(2)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-sm text-slate-500">
          Nenhum produto cadastrado.
        </p>
      )}
    </div>
  );
}