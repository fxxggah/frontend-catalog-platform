"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Store,
  Plus,
  Settings,
  ExternalLink,
  Loader2,
  AlertCircle,
  ShoppingBag,
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
    router.push("/stores/new");
  }

  function handleOpenAdmin(storeSlug: string) {
    router.push(`/admin/${storeSlug}`);
  }

  function handleOpenCatalog(storeSlug: string) {
    router.push(`/${storeSlug}`);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
            <p className="text-sm text-slate-500">Carregando suas lojas...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <Card className="border-red-200 bg-white shadow-sm">
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <AlertCircle className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl text-slate-900">
                Não foi possível carregar suas lojas
              </CardTitle>
              <CardDescription className="text-base text-slate-600">
                Ocorreu um problema ao buscar os dados da sua conta.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button onClick={loadStores}>Tentar novamente</Button>

                <Button
                  variant="outline"
                  onClick={() => router.push("/login")}
                >
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
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Cabeçalho */}
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
              <Store className="h-6 w-6" />
            </div>

            <h1 className="text-3xl font-black tracking-tight text-slate-900">
              Minhas lojas
            </h1>

            <p className="mt-2 max-w-2xl text-slate-600">
              Aqui você pode visualizar as lojas vinculadas à sua conta e entrar
              no painel administrativo de cada uma.
            </p>
          </div>

          <div>
            <Button onClick={handleCreateStore} className="h-11">
              <Plus className="mr-2 h-4 w-4" />
              Criar nova loja
            </Button>
          </div>
        </div>

        {/* Estado vazio */}
        {!hasStores && (
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
                <ShoppingBag className="h-8 w-8" />
              </div>

              <h2 className="text-2xl font-bold text-slate-900">
                Você ainda não criou nenhuma loja
              </h2>

              <p className="mt-3 max-w-lg text-slate-600">
                Crie sua primeira loja para começar a cadastrar produtos,
                categorias e montar seu catálogo online.
              </p>

              <Button onClick={handleCreateStore} className="mt-6 h-11">
                <Plus className="mr-2 h-4 w-4" />
                Criar minha primeira loja
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Lista de lojas */}
        {hasStores && (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {stores.map((store) => (
              <Card
                key={store.id}
                className="overflow-hidden border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                      <Store className="h-6 w-6" />
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        store.active
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {store.active ? "Ativa" : "Inativa"}
                    </span>
                  </div>

                  <div>
                    <CardTitle className="line-clamp-1 text-xl text-slate-900">
                      {store.name}
                    </CardTitle>

                    <CardDescription className="mt-2 text-sm text-slate-500">
                      /{store.slug}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm text-slate-600">
                    {store.whatsappNumber && (
                      <p>
                        <span className="font-medium text-slate-700">
                          WhatsApp:
                        </span>{" "}
                        {store.whatsappNumber}
                      </p>
                    )}

                    {store.city && (
                      <p>
                        <span className="font-medium text-slate-700">
                          Cidade:
                        </span>{" "}
                        {store.city}
                        {store.state ? ` - ${store.state}` : ""}
                      </p>
                    )}

                    {store.template && (
                      <p>
                        <span className="font-medium text-slate-700">
                          Template:
                        </span>{" "}
                        {store.template}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 pt-2">
                    <Button
                      onClick={() => handleOpenAdmin(store.slug)}
                      className="w-full"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Acessar painel
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => handleOpenCatalog(store.slug)}
                      className="w-full"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Ver catálogo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Ação inferior */}
        {hasStores && (
          <div className="mt-8 flex justify-center">
            <Button variant="outline" asChild>
              <Link href="/stores/new">
                <Plus className="mr-2 h-4 w-4" />
                Criar outra loja
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}