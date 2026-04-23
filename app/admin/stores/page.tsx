"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Store,
  Plus,
  Settings,
  ExternalLink,
  Loader2,
  AlertCircle,
  ShoppingBag,
  ArrowRight,
  Globe,
  MessageCircle,
} from "lucide-react";

import { storeService } from "@/services/storeService";
import { authService } from "@/services/authService";
import type { StoreResponse } from "@/types";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function StoresPage() {
  const router = useRouter();

  const [stores, setStores] = useState<StoreResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadStores() {
    try {
      setIsLoading(true);
      setError(null);

      const token = authService.getToken();

      if (!token) {
        router.replace("/login");
        return;
      }

      const data = await storeService.getMyStores();
      setStores(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Erro ao carregar suas lojas.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadStores();
  }, []);

  function handleCreateStore() {
    router.push("/admin/stores/new");
  }

  function handleOpenAdmin(storeSlug: string) {
    router.push(`/admin/${storeSlug}`);
  }

  function handleOpenCatalog(storeSlug: string) {
    router.push(`/${storeSlug}`);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[slate-50] flex flex-col items-center justify-center p-6">
        <div className="relative">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Store className="h-6 w-6 text-slate-400" />
          </div>
        </div>
        <p className="mt-4 font-bold text-slate-500 animate-pulse tracking-tight text-sm uppercase">
          Sincronizando seu ecossistema...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white px-4 py-20 flex items-center justify-center">
        <div className="mx-auto max-w-md w-full">
          <Card className="border-red-100 bg-white shadow-2xl shadow-red-500/5 rounded-[2.5rem] overflow-hidden">
            <div className="h-2 bg-red-500 w-full" />
            <CardHeader className="pt-10 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                <AlertCircle className="h-7 w-7" />
              </div>
              <CardTitle className="text-2xl font-playfair font-black text-slate-900">
                Algo deu errado
              </CardTitle>
              <CardDescription className="text-slate-500 font-medium">
                Não conseguimos conectar à sua infraestrutura.
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-10 px-8 space-y-6">
              <p className="rounded-2xl border border-red-50 bg-red-50/30 px-4 py-3 text-sm text-red-700 font-medium text-center">
                {error}
              </p>
              <div className="flex flex-col gap-3">
                <Button onClick={loadStores} className="rounded-xl h-12 bg-slate-900 font-bold shadow-xl shadow-slate-200">
                  Tentar novamente
                </Button>
                <Button variant="ghost" className="rounded-xl font-bold text-slate-500" onClick={() => router.push("/login")}>
                  Voltar para login
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const hasStores = stores.length > 0;

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,rgba(79,70,229,0.05),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(79,70,229,0.05),transparent_50%)] bg-white px-6 py-12">
      <div className="mx-auto max-w-7xl">
        
        {/* Cabeçalho Premium */}
        <header className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-2xl shadow-slate-200">
              <Store className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-4xl font-playfair font-black tracking-tight text-slate-900">
                Suas <span className="italic font-light">Vitrines</span>
              </h1>
              <p className="mt-2 text-slate-500 font-medium max-w-md">
                Gerencie suas operações digitais e acesse o controle de cada unidade.
              </p>
            </div>
          </div>

          <Button 
            onClick={handleCreateStore} 
            className="h-14 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-700 font-bold shadow-2xl shadow-indigo-200 transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="mr-2 h-5 w-5" />
            Criar nova loja
          </Button>
        </header>

        {/* Estado vazio - Design de Impacto */}
        {!hasStores && (
          <div className="mt-20 flex flex-col items-center justify-center text-center">
            <div className="relative mb-10">
              <div className="absolute inset-0 bg-indigo-100 blur-[80px] rounded-full" />
              <div className="relative flex h-32 w-32 items-center justify-center rounded-[3rem] bg-white border border-slate-100 shadow-xl">
                <ShoppingBag className="h-12 w-12 text-indigo-600" />
              </div>
              <div className="absolute -bottom-2 -right-2 h-10 w-10 bg-white rounded-full border border-slate-100 flex items-center justify-center shadow-lg animate-bounce">
                 <Plus className="h-5 w-5 text-indigo-600" />
              </div>
            </div>

            <h2 className="text-3xl font-playfair font-black text-slate-900">
              Sua jornada começa aqui
            </h2>
            <p className="mt-4 max-w-sm text-slate-500 font-medium leading-relaxed">
              Você ainda não possui vitrines ativas. Vamos criar sua primeira experiência premium?
            </p>

            <Button onClick={handleCreateStore} className="mt-10 h-14 px-10 rounded-2xl bg-slate-900 font-bold shadow-2xl shadow-slate-200 transition-all hover:scale-105">
              Configurar minha primeira loja
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}

        {/* Lista de lojas - Grid Moderno */}
        {hasStores && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {stores.map((store) => (
              <Card
                key={store.id}
                className="group relative overflow-hidden border-slate-100 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_30px_70px_rgba(79,70,229,0.1)] rounded-[2.5rem] border-t-4 border-t-transparent hover:border-t-indigo-600"
              >
                <CardHeader className="pt-10 px-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors duration-500">
                      <Store className="h-7 w-7" />
                    </div>

                    <div className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest ${
                      store.active
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-red-50 text-red-600"
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${store.active ? "bg-emerald-500" : "bg-red-500"}`} />
                      {store.active ? "Online" : "Pausada"}
                    </div>
                  </div>

                  <div>
                    <CardTitle className="line-clamp-1 text-2xl font-playfair font-black text-slate-900">
                      {store.name}
                    </CardTitle>
                    <div className="flex items-center gap-1 text-indigo-600/60 font-bold text-xs mt-1 uppercase tracking-tighter">
                      <Globe size={12} />
                      katallo.com.br/{store.slug}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="px-8 pb-10 space-y-6">
                  <div className="grid grid-cols-2 gap-4 border-y border-slate-50 py-6">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Canal</p>
                      <p className="text-xs font-bold text-slate-700 flex items-center gap-1 truncate">
                        <MessageCircle size={12} className="text-emerald-500" />
                        {store.whatsappNumber || "Não definido"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Local</p>
                      <p className="text-xs font-bold text-slate-700 truncate">
                        {store.city || "Digital"} {store.state ? `• ${store.state}` : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Button
                      onClick={() => handleOpenAdmin(store.slug)}
                      className="w-full h-12 rounded-xl bg-slate-900 font-bold shadow-lg shadow-slate-100 group-hover:bg-indigo-600 transition-all"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Painel de Controle
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => handleOpenCatalog(store.slug)}
                      className="w-full h-12 rounded-xl border-slate-100 text-slate-600 font-bold hover:bg-slate-50"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visualizar Vitrine
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Card para adicionar nova (estilo ghost) */}
            <button
              onClick={handleCreateStore}
              className="flex min-h-[350px] flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-slate-50/50 p-10 transition-all hover:border-indigo-300 hover:bg-white group"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white border border-slate-100 text-slate-400 shadow-sm group-hover:scale-110 group-hover:text-indigo-600 transition-all duration-500">
                <Plus className="h-8 w-8" />
              </div>
              <p className="text-lg font-playfair font-black text-slate-900">Adicionar Unidade</p>
              <p className="text-sm font-medium text-slate-400 mt-1">Expanda seu império digital</p>
            </button>
          </div>
        )}

        {/* Footer Discreto */}
        <div className="mt-20 text-center">
           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
             Katallo Cloud Infrastructure • Autenticação Segura
           </p>
        </div>
      </div>
    </div>
  );
}