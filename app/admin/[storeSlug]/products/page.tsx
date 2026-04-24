"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { 
  Loader2, 
  Plus, 
  MoreVertical, 
  Package, 
  Edit3, 
  Trash2, 
  ImageOff,
  Search,
  Filter
} from "lucide-react";

import { productService } from "@/services/productService";
import type { ProductResponse, PagedResponse } from "@/types";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ProductsPage() {
  const params = useParams();
  const storeSlug = params.storeSlug as string;

  const [productsPage, setProductsPage] = useState<PagedResponse<ProductResponse> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function load() {
    try {
      setIsLoading(true);
      const data = await productService.getAdminProducts(storeSlug);
      setProductsPage(data);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(productId: number) {
    if (!confirm("Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.")) return;
    
    try {
      await productService.deleteProduct(storeSlug, productId);
      load();
    } catch (error) {
      alert("Erro ao excluir produto.");
    }
  }

  useEffect(() => {
    if (storeSlug) load();
  }, [storeSlug]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
        <p className="text-xs font-black uppercase tracking-widest text-slate-400">Sincronizando estoque...</p>
      </div>
    );
  }

  const products = productsPage?.content ?? [];

  return (
    <div className="max-w-7xl mx-auto space-y-8 px-4 py-6 md:px-6">
      
      {/* Header Area */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-playfair font-black text-slate-900">Produtos</h1>
            <p className="text-sm text-slate-500 italic">Gerencie sua vitrine e disponibilidade de estoque.</p>
          </div>
        </div>

        <Button asChild className="rounded-xl h-12 px-6 bg-slate-900 shadow-lg shadow-slate-200 hover:scale-105 transition-all">
          <Link href={`/admin/${storeSlug}/products/new`}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Produto
          </Link>
        </Button>
      </div>

      {/* Grid de Produtos */}
      {products.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <Card key={product.id} className="group overflow-hidden border-none bg-white shadow-sm transition-all hover:shadow-xl hover:shadow-slate-200/50 rounded-[2rem]">
              
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden bg-slate-50">
                {product.images?.[0]?.imageUrl ? (
                  <img
                    src={product.images[0].imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center text-slate-300">
                    <ImageOff size={40} strokeWidth={1} />
                    <span className="mt-2 text-[10px] font-bold uppercase tracking-tighter">Sem imagem</span>
                  </div>
                )}

                {/* Badge de Preço Flutuante */}
                <div className="absolute bottom-4 left-4 rounded-xl bg-white/90 backdrop-blur-md px-3 py-1.5 shadow-sm border border-white">
                  <p className="text-xs font-black text-slate-900">
                    R$ {Number(product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>

                {/* Dropdown Menu (Substituindo o details nativo) */}
                <div className="absolute right-4 top-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-md hover:bg-white shadow-sm">
                        <MoreVertical size={16} className="text-slate-600" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl border-slate-100 p-2 shadow-xl">
                      <DropdownMenuItem asChild>
                        <Link 
                          href={`/admin/${storeSlug}/products/${product.id}/edit`}
                          className="flex cursor-pointer items-center gap-2 rounded-lg py-2 text-slate-700 focus:bg-indigo-50 focus:text-indigo-600"
                        >
                          <Edit3 size={14} /> Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDelete(product.id)}
                        className="flex cursor-pointer items-center gap-2 rounded-lg py-2 text-rose-600 focus:bg-rose-50 focus:text-rose-700"
                      >
                        <Trash2 size={14} /> Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-1">
                  <h2 className="line-clamp-1 font-bold text-slate-900 transition-colors group-hover:text-indigo-600">
                    {product.name}
                  </h2>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Em estoque</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-[3rem] border-2 border-dashed border-slate-100 bg-white p-12 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-50 text-slate-300">
            <Package size={40} />
          </div>
          <h3 className="mt-6 text-xl font-bold text-slate-900">Sua vitrine está vazia</h3>
          <p className="mt-2 max-w-xs text-sm text-slate-500">
            Comece cadastrando seu primeiro produto para que ele apareça no seu catálogo público.
          </p>
          <Button asChild className="mt-8 rounded-xl bg-indigo-600 hover:bg-indigo-700">
            <Link href={`/admin/${storeSlug}/products/new`}>
              <Plus className="mr-2 h-4 w-4" /> Cadastrar meu primeiro produto
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}