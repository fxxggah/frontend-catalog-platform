"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { productService } from "@/services/productService";
import { categoryService } from "@/services/categoryService";
import type { CategoryResponse } from "@/types";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewProductPage() {
  const params = useParams();
  const router = useRouter();

  const storeSlug = params.storeSlug as string;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      const data = await categoryService.getAdminCategories(storeSlug);
      setCategories(data);
    }

    loadCategories();
  }, [storeSlug]);

  async function handleCreate() {
    if (!name || !price || !categoryId) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      setIsLoading(true);

      await productService.createProduct(storeSlug, {
        name,
        price: Number(price),
        categoryId,
        visible: true,
      });

      router.push(`/admin/${storeSlug}/products`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-2xl font-bold">Novo Produto</h1>

      <Input
        placeholder="Nome do produto"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        placeholder="Preço"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <select
        className="w-full border p-2 rounded"
        onChange={(e) => setCategoryId(Number(e.target.value))}
      >
        <option value="">Selecione categoria</option>

        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <Button onClick={handleCreate} disabled={isLoading}>
        Criar produto
      </Button>
    </div>
  );
}