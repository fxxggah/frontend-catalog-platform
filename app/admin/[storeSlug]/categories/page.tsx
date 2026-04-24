"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { 
  Loader2, 
  Plus, 
  MoreVertical, 
  Layers, 
  Edit3, 
  Trash2, 
  Hash,
  Search
} from "lucide-react";

import { categoryService } from "@/services/categoryService";
import type { CategoryResponse } from "@/types";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  async function handleCreate() {
    const name = window.prompt("Nome da nova categoria:");
    if (!name) return;

    try {
      await categoryService.createCategory(storeSlug, { name });
      load();
    } catch (error) {
      alert("Erro ao criar categoria");
    }
  }

  async function handleEdit(cat: CategoryResponse) {
    const name = window.prompt("Editar nome da categoria:", cat.name);
    if (!name || name === cat.name) return;

    try {
      await categoryService.updateCategory(storeSlug, cat.id, { name });
      load();
    } catch (error) {
      alert("Erro ao atualizar categoria");
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Excluir esta categoria? Os produtos associados ficarão sem categoria.")) return;

    try {
      await categoryService.deleteCategory(storeSlug, id);
      load();
    } catch (error) {
      alert("Erro ao excluir categoria");
    }
  }

  useEffect(() => {
    if (storeSlug) load();
  }, [storeSlug]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Organizando prateleiras...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 px-4 py-6 md:px-6">
      
      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-playfair font-black text-slate-900">Categorias</h1>
            <p className="text-sm text-slate-500 italic font-medium">Estruture seu catálogo para facilitar a navegação do cliente.</p>
          </div>
        </div>

        <Button 
          onClick={handleCreate}
          className="rounded-xl h-12 px-6 bg-slate-900 shadow-lg shadow-slate-200 hover:scale-105 transition-all"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nova Categoria
        </Button>
      </div>

      {/* Grid de Categorias */}
      {categories.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Card key={cat.id} className="group relative overflow-hidden border-none bg-white shadow-sm transition-all hover:shadow-md rounded-3xl border border-slate-50">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                    <Layers size={20} />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {cat.name}
                    </h2>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                      <Hash size={10} />
                      <span>{cat.slug}</span>
                    </div>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-slate-100">
                      <MoreVertical size={16} className="text-slate-400" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-xl border-slate-100 p-2 shadow-xl">
                    <DropdownMenuItem 
                      onClick={() => handleEdit(cat)}
                      className="flex cursor-pointer items-center gap-2 rounded-lg py-2 text-slate-700 focus:bg-indigo-50 focus:text-indigo-600"
                    >
                      <Edit3 size={14} /> Editar Nome
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDelete(cat.id)}
                      className="flex cursor-pointer items-center gap-2 rounded-lg py-2 text-rose-600 focus:bg-rose-50 focus:text-rose-700"
                    >
                      <Trash2 size={14} /> Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-[3rem] border-2 border-dashed border-slate-100 bg-white p-12 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-50 text-slate-300">
            <Search size={40} />
          </div>
          <h3 className="mt-6 text-xl font-bold text-slate-900">Nenhuma categoria ainda</h3>
          <p className="mt-2 max-w-xs text-sm text-slate-500">
            Crie categorias como "Lançamentos", "Masculino" ou "Promoções" para organizar seus produtos.
          </p>
          <Button onClick={handleCreate} className="mt-8 rounded-xl bg-indigo-600 hover:bg-indigo-700">
            <Plus className="mr-2 h-4 w-4" /> Criar minha primeira categoria
          </Button>
        </div>
      )}
    </div>
  );
}