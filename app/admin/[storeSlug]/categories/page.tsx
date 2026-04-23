"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { categoryService } from "@/services/categoryService";
import type { CategoryResponse } from "@/types";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, MoreVertical } from "lucide-react";

export default function CategoriesPage() {
  const params = useParams();
  const storeSlug = params.storeSlug as string;

  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function load() {
    try {
      setIsLoading(true);
      const data = await categoryService.getAdminCategories(storeSlug);
      setCategories(data);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id: number) {
    const confirmDelete = confirm("Excluir categoria?");
    if (!confirmDelete) return;

    await categoryService.deleteCategory(storeSlug, id);
    load();
  }

  async function handleEdit(cat: CategoryResponse) {
    const name = prompt("Novo nome:", cat.name);
    if (!name) return;

    await categoryService.updateCategory(storeSlug, cat.id, { name });
    load();
  }

  useEffect(() => {
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
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Categorias</h1>

        <Button
          onClick={async () => {
            const name = prompt("Nome:");
            if (!name) return;

            await categoryService.createCategory(storeSlug, { name });
            load();
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Nova categoria
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((cat) => (
          <Card key={cat.id} className="relative">
            <div className="absolute right-2 top-2">
              <details>
                <summary>
                  <MoreVertical size={18} />
                </summary>

                <div className="absolute right-0 bg-white border shadow rounded">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="block px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="block px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Excluir
                  </button>
                </div>
              </details>
            </div>

            <CardContent>
              <h2 className="font-semibold">{cat.name}</h2>
              <p className="text-sm text-slate-500">/{cat.slug}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}