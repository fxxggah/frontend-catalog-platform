"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Facebook,
  Instagram,
  LayoutTemplate,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Package,
  Palette,
  Settings,
  Store,
  Tags,
  Users,
  XCircle,
} from "lucide-react";

import { storeService } from "@/services/storeService";
import type { StoreResponse } from "@/types";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type QuickAction = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
};

export default function AdminStoreDashboardPage() {
  const params = useParams();
  const storeSlug = params.storeSlug as string;

  const [store, setStore] = useState<StoreResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadStore() {
    try {
      setIsLoading(true);
      setError(null);

      const data = await storeService.getStoreBySlug(storeSlug);
      setStore(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Erro ao carregar os dados da loja.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (storeSlug) {
      loadStore();
    }
  }, [storeSlug]);

  const addressText = useMemo(() => {
    if (!store) return "";

    return [
      store.street,
      store.number,
      store.city,
      store.state,
      store.country,
    ]
      .filter(Boolean)
      .join(", ");
  }, [store]);

  const quickActions: QuickAction[] = useMemo(() => {
    if (!store) return [];

    return [
      {
        title: "Gerenciar produtos",
        description: "Cadastre, edite e organize os produtos do catálogo.",
        href: `/admin/${store.slug}/products`,
        icon: <Package className="h-5 w-5" />,
      },
      {
        title: "Gerenciar categorias",
        description: "Organize a navegação da loja por categorias.",
        href: `/admin/${store.slug}/categories`,
        icon: <Tags className="h-5 w-5" />,
      },
      {
        title: "Gerenciar usuários",
        description: "Veja quem possui acesso administrativo à loja.",
        href: `/admin/${store.slug}/users`,
        icon: <Users className="h-5 w-5" />,
      },
      {
        title: "Gerenciar convites",
        description: "Envie e acompanhe convites pendentes.",
        href: `/admin/${store.slug}/invites`,
        icon: <Mail className="h-5 w-5" />,
      },
      {
        title: "Configurações da loja",
        description: "Edite marca, contatos, template e dados públicos.",
        href: `/admin/${store.slug}/settings`,
        icon: <Settings className="h-5 w-5" />,
      },
      {
        title: "Ver catálogo público",
        description: "Abra a vitrine online que seus clientes enxergam.",
        href: `/${store.slug}`,
        icon: <ExternalLink className="h-5 w-5" />,
      },
    ];
  }, [store]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
        <p className="text-sm text-slate-500">Carregando painel da loja...</p>
      </div>
    );
  }

  if (error || !store) {
    return (
      <div className="mx-auto max-w-3xl">
        <Card className="border-red-200 bg-white shadow-sm">
          <CardHeader>
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <AlertCircle className="h-6 w-6" />
            </div>

            <CardTitle className="text-2xl text-slate-900">
              Não foi possível carregar a loja
            </CardTitle>

            <CardDescription className="text-base text-slate-600">
              Houve um problema ao abrir o painel desta loja.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error ?? "Loja não encontrada."}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button onClick={loadStore}>Tentar novamente</Button>

              <Button variant="outline" asChild>
                <Link href="/admin/stores">Voltar para minhas lojas</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
        <CardHeader className="border-b border-slate-100">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
                <Store className="h-7 w-7" />
              </div>

              <div>
                <CardTitle className="text-3xl font-black tracking-tight text-slate-900">
                  {store.name}
                </CardTitle>

                <CardDescription className="mt-2 text-base text-slate-600">
                  Painel administrativo da loja{" "}
                  <span className="font-medium">/{store.slug}</span>
                </CardDescription>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href={`/admin/${store.slug}/products`}>
                  <Package className="mr-2 h-4 w-4" />
                  Produtos
                </Link>
              </Button>

              <Button variant="outline" asChild>
                <Link href={`/${store.slug}`}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Ver catálogo
                </Link>
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="grid gap-4 p-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Status da loja
            </p>

            <div className="mt-3 flex items-center gap-2">
              {store.active ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <span className="font-semibold text-emerald-700">
                    Loja ativa
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-600" />
                  <span className="font-semibold text-red-700">
                    Loja inativa
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Template atual
            </p>

            <div className="mt-3 flex items-center gap-2">
              <LayoutTemplate className="h-5 w-5 text-slate-700" />
              <span className="font-semibold text-slate-800">
                {store.template || "Não definido"}
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Data de criação
            </p>

            <div className="mt-3">
              <span className="font-semibold text-slate-800">
                {new Date(store.createdAt).toLocaleDateString("pt-BR")}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="space-y-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Ações rápidas</h2>
          <p className="text-sm text-slate-500">
            Principais áreas para administrar esta loja.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href}>
              <Card className="h-full border-slate-200 bg-white transition hover:-translate-y-0.5 hover:shadow-md">
                <CardContent className="flex h-full flex-col gap-4 p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    {action.icon}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900">
                      {action.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {action.description}
                    </p>
                  </div>

                  <div className="flex items-center text-sm font-medium text-slate-700">
                    Acessar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900">
              Informações da loja
            </CardTitle>
            <CardDescription>
              Dados principais usados no catálogo e na identidade visual.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Nome
              </p>
              <p className="mt-2 font-semibold text-slate-900">{store.name}</p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Slug público
              </p>
              <p className="mt-2 font-semibold text-slate-900">/{store.slug}</p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                WhatsApp
              </p>
              <div className="mt-2 flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-slate-500" />
                <p className="font-semibold text-slate-900">
                  {store.whatsappNumber || "Não informado"}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Instagram
              </p>
              <div className="mt-2 flex items-center gap-2">
                <Instagram className="h-4 w-4 text-slate-500" />
                <p className="font-semibold text-slate-900">
                  {store.instagram || "Não informado"}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4 md:col-span-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Facebook
              </p>
              <div className="mt-2 flex items-center gap-2">
                <Facebook className="h-4 w-4 text-slate-500" />
                <p className="font-semibold text-slate-900">
                  {store.facebook || "Não informado"}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4 md:col-span-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Cores da marca
              </p>

              <div className="mt-3 flex flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className="h-5 w-5 rounded-full border"
                    style={{ backgroundColor: store.primaryColor || "#000000" }}
                  />
                  <span className="text-sm font-medium text-slate-700">
                    Primária
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className="h-5 w-5 rounded-full border"
                    style={{ backgroundColor: store.secondaryColor || "#666666" }}
                  />
                  <span className="text-sm font-medium text-slate-700">
                    Secundária
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className="h-5 w-5 rounded-full border"
                    style={{ backgroundColor: store.tertiaryColor || "#dddddd" }}
                  />
                  <span className="text-sm font-medium text-slate-700">
                    Terciária
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900">Endereço</CardTitle>
            <CardDescription>
              Localização e dados físicos da loja.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Endereço completo
              </p>

              <div className="mt-2 flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-slate-500" />
                <p className="font-semibold text-slate-900">
                  {addressText || "Não informado"}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Link do Google Maps
              </p>

              {store.googleMapsLink ? (
                <div className="mt-2">
                  <Button variant="outline" asChild>
                    <a
                      href={store.googleMapsLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Abrir localização
                    </a>
                  </Button>
                </div>
              ) : (
                <p className="mt-2 font-semibold text-slate-900">
                  Não informado
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Próximo passo recomendado
              </p>

              <p className="mt-2 text-sm text-slate-600">
                Agora você pode cadastrar categorias e produtos para começar a
                montar o catálogo da loja.
              </p>

              <div className="mt-4 flex flex-col gap-3">
                <Button asChild>
                  <Link href={`/admin/${store.slug}/categories`}>
                    <Tags className="mr-2 h-4 w-4" />
                    Gerenciar categorias
                  </Link>
                </Button>

                <Button variant="outline" asChild>
                  <Link href={`/admin/${store.slug}/products`}>
                    <Package className="mr-2 h-4 w-4" />
                    Gerenciar produtos
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}