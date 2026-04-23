"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { categoryService } from "@/services/categoryService";
import type { CategoryResponse } from "@/types";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tags, Loader2, Plus } from "lucide-react";

export default function CategoriesPage() {
  const params = useParams();
  const storeSlug = params.storeSlug as string;

  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true);
        const data = await categoryService.getAdminCategories(storeSlug);
        setCategories(data);
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categorias</h1>

        <Button
          onClick={async () => {
            const name = prompt("Nome da categoria:");
            if (!name) return;

            await categoryService.createCategory(storeSlug, { name });
            location.reload();
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Nova categoria
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tags className="h-4 w-4" />
                {category.name}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-slate-500">
                /{category.slug}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {categories.length === 0 && (
        <p className="text-sm text-slate-500">
          Nenhuma categoria cadastrada.
        </p>
      )}
    </div>
  );
}