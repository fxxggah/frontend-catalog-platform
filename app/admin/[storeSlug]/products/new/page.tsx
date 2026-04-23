"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Package, Tag, DollarSign, Layers, Loader2, Sparkles } from "lucide-react";

import { productService } from "@/services/productService";
import { categoryService } from "@/services/categoryService";
import type { CategoryResponse } from "@/types";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BackButton } from "@/components/admin/BackButton";

export default function NewProductPage() {
  const params = useParams();
  const router = useRouter();
  const storeSlug = params.storeSlug as string;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");

  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await categoryService.getAdminCategories(storeSlug);
        setCategories(data);
      } catch (error) {
        console.error("Erro ao carregar categorias", error);
      }
    }
    loadCategories();
  }, [storeSlug]);

  async function handleCreate() {
    if (!name || !price || !categoryId) {
      return; // O HTML5 'required' lidará com o aviso visual
    }

    try {
      setIsLoading(true);
      await productService.createProduct(storeSlug, {
        name,
        price: Number(price),
        categoryId: Number(categoryId),
        visible: true,
      });
      router.push(`/admin/${storeSlug}/products`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 px-4 py-8">
      {/* Navegação Superior */}
      <div className="flex items-center justify-between">
        <BackButton href={`/admin/${storeSlug}/products`} />
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <Sparkles size={12} className="text-amber-500" />
          Novo Item
        </div>
      </div>

      <Card className="border-none bg-white shadow-[0_32px_64px_-15px_rgba(0,0,0,0.05)] rounded-[2.5rem] overflow-hidden">
        <CardHeader className="p-8 md:p-12 border-b border-slate-50">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-xl mb-6">
            <Package size={24} />
          </div>
          <CardTitle className="text-3xl font-playfair font-black text-slate-900">
            Cadastrar Produto
          </CardTitle>
          <CardDescription className="text-slate-500 italic text-base">
            Adicione os detalhes essenciais para exibir seu produto no catálogo.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-8 md:p-12 space-y-8">
          {/* Grid de Inputs Principais */}
          <div className="grid gap-8">
            
            {/* NOME DO PRODUTO */}
            <div className="grid gap-3">
              <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <Tag size={14} className="text-indigo-500" />
                Nome do Produto
              </Label>
              <Input
                id="name"
                placeholder="Ex: Camiseta Oversized Minimal"
                className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white text-lg transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* PREÇO */}
              <div className="grid gap-3">
                <Label htmlFor="price" className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <DollarSign size={14} className="text-emerald-500" />
                  Preço de Venda
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">R$</span>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="0,00"
                    className="h-14 pl-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white text-lg transition-all"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* CATEGORIA */}
              <div className="grid gap-3">
                <Label htmlFor="category" className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <Layers size={14} className="text-amber-500" />
                  Categoria
                </Label>
                <div className="relative">
                  <select
                    id="category"
                    className="flex h-14 w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-4 py-2 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all appearance-none cursor-pointer"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value === "" ? "" : Number(e.target.value))}
                    required
                  >
                    <option value="">Selecione...</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <Button 
              onClick={handleCreate} 
              disabled={isLoading || !name || !price || !categoryId}
              className="w-full h-14 rounded-2xl bg-slate-900 text-base font-bold shadow-2xl shadow-slate-200 transition-all hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={20} />
                  Processando...
                </div>
              ) : (
                "Finalizar e Criar Produto"
              )}
            </Button>
            <p className="text-center text-[11px] text-slate-400 mt-4 uppercase tracking-[0.15em] font-medium">
              O produto ficará visível imediatamente após a criação.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}