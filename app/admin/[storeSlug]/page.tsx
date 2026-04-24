"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Instagram,
  LayoutTemplate,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Package,
  Palette,
  Store,
  Tags,
  Users,
  XCircle,
  Globe,
  CalendarDays,
  Sparkles,
} from "lucide-react";

import { storeService } from "@/services/storeService";
import { userService } from "@/services/userService";
import type { StoreResponse, StoreUserRole } from "@/types";

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
  color: string;
};

export default function AdminStoreDashboardPage() {
  const params = useParams();
  const storeSlug = params.storeSlug as string;

  const [store, setStore] = useState<StoreResponse | null>(null);
  const [role, setRole] = useState<StoreUserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadStore() {
    try {
      setIsLoading(true);
      setError(null);

      const [storeData, currentUserData] = await Promise.all([
        storeService.getStoreBySlug(storeSlug),
        userService.getCurrentStoreUser(storeSlug),
      ]);

      setStore(storeData);
      setRole(currentUserData.role);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Erro ao carregar os dados da loja.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (storeSlug) loadStore();
  }, [storeSlug]);

  const addressText = useMemo(() => {
    if (!store) return "";

    return [store.street, store.number, store.city, store.state, store.country]
      .filter(Boolean)
      .join(", ");
  }, [store]);

  const quickActions: QuickAction[] = useMemo(() => {
    if (!store) return [];

    const actions: QuickAction[] = [
      {
        title: "Produtos",
        description: "Gestão de estoque e vitrine.",
        href: `/admin/${store.slug}/products`,
        icon: <Package className="h-5 w-5" />,
        color: "bg-blue-50 text-blue-600",
      },
      {
        title: "Categorias",
        description: "Organize a navegação.",
        href: `/admin/${store.slug}/categories`,
        icon: <Tags className="h-5 w-5" />,
        color: "bg-purple-50 text-purple-600",
      },
      {
        title: "Equipe",
        description: "Acessos administrativos.",
        href: `/admin/${store.slug}/users`,
        icon: <Users className="h-5 w-5" />,
        color: "bg-amber-50 text-amber-600",
      },
    ];

    if (role === "OWNER") {
      actions.push(
        {
          title: "Convites",
          description: "Colaboradores pendentes.",
          href: `/admin/${store.slug}/invites`,
          icon: <Mail className="h-5 w-5" />,
          color: "bg-rose-50 text-rose-600",
        },
        {
          title: "Aparência",
          description: "Branding e Templates.",
          href: `/admin/${store.slug}/settings`,
          icon: <Palette className="h-5 w-5" />,
          color: "bg-indigo-50 text-indigo-600",
        }
      );
    }

    actions.push({
      title: "Ver Vitrine",
      description: "Visualizar como cliente.",
      href: `/${store.slug}`,
      icon: <ExternalLink className="h-5 w-5" />,
      color: "bg-emerald-50 text-emerald-600",
    });

    return actions;
  }, [store, role]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6">
        <div className="relative">
          <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
          <Store className="absolute inset-0 m-auto h-5 w-5 text-slate-400" />
        </div>
        <p className="animate-pulse text-sm font-bold uppercase tracking-widest text-slate-500">
          Preparando seu ecossistema...
        </p>
      </div>
    );
  }

  if (error || !store) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <Card className="overflow-hidden rounded-[2rem] border-red-100 bg-white p-8 text-center shadow-2xl shadow-red-500/5">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <AlertCircle className="h-8 w-8" />
          </div>

          <CardTitle className="mb-2 text-3xl font-black text-slate-900">
            Ops! Falha na conexão
          </CardTitle>

          <CardDescription className="mb-8 text-slate-500">
            {error ?? "Não encontramos essa unidade no banco de dados."}
          </CardDescription>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              onClick={loadStore}
              className="h-12 rounded-xl bg-slate-900 px-8"
            >
              Tentar novamente
            </Button>

            <Button
              variant="outline"
              asChild
              className="h-12 rounded-xl border-slate-200 px-8"
            >
              <Link href="/admin/stores">Voltar para Dashboard</Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-8 md:px-6">
      <header className="relative flex flex-col gap-6 overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.02)] lg:flex-row lg:items-center lg:justify-between">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-32 w-32 rounded-full bg-indigo-50/50 blur-3xl" />

        <div className="relative z-10 flex items-center gap-5">
          <div className="flex h-16 w-16 shrink-0 rotate-2 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-2xl shadow-slate-200">
            <Store className="h-8 w-8" />
          </div>

          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
              {store.name}
            </h1>

            <div className="mt-1 flex items-center gap-2 text-sm font-bold tracking-tight text-indigo-600">
              <Globe size={14} />
              katallo.com.br/{store.slug}
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-wrap gap-3">
          <Button
            asChild
            className="h-12 rounded-xl bg-slate-900 px-6 transition-transform hover:scale-105"
          >
            <Link href={`/admin/${store.slug}/products`}>
              <Package className="mr-2 h-4 w-4" />
              Gestão de Produtos
            </Link>
          </Button>

          <Button
            variant="outline"
            asChild
            className="h-12 rounded-xl border-slate-200 bg-white/50 px-6 backdrop-blur-sm"
          >
            <Link href={`/${store.slug}`} target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" />
              Ver Catálogo
            </Link>
          </Button>
        </div>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="group rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-xl hover:shadow-indigo-500/5">
          <div className="flex items-center gap-4">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                store.active
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-rose-50 text-rose-600"
              }`}
            >
              {store.active ? <CheckCircle2 /> : <XCircle />}
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Disponibilidade
              </p>
              <p className="text-lg font-bold text-slate-900">
                {store.active ? "Loja Online" : "Manutenção"}
              </p>
            </div>
          </div>
        </div>

        <div className="group rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-xl hover:shadow-indigo-500/5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <LayoutTemplate />
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Design System
              </p>
              <p className="truncate text-lg font-bold text-slate-900">
                {store.template || "Standard"}
              </p>
            </div>
          </div>
        </div>

        <div className="group rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-xl hover:shadow-indigo-500/5 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
              <CalendarDays />
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Membro desde
              </p>
              <p className="text-lg font-bold text-slate-900">
                {new Date(store.createdAt).toLocaleDateString("pt-BR", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <div className="h-6 w-1 rounded-full bg-indigo-600" />
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-900">
            Ações Operacionais
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href} className="group">
              <Card className="h-full rounded-[1.8rem] border-slate-100 bg-white transition-all duration-300 group-hover:border-indigo-200 group-hover:shadow-2xl group-hover:shadow-indigo-500/10">
                <CardContent className="flex flex-col gap-4 p-6">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:-rotate-3 group-hover:scale-110 ${action.color}`}
                  >
                    {action.icon}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 transition-colors group-hover:text-indigo-600">
                      {action.title}
                    </h3>
                    <p className="mt-1 text-xs leading-tight text-slate-500">
                      {action.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-[1fr_400px]">
        <Card className="overflow-hidden rounded-[2.5rem] border-slate-100 bg-white shadow-sm">
          <CardHeader className="border-b border-slate-50 p-8">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-indigo-600" />
              <CardTitle className="text-xl font-black">
                Identidade & Contato
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="grid gap-6 p-8 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5">
              <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                WhatsApp Business
              </p>
              <div className="flex items-center gap-3 font-bold text-slate-900">
                <MessageCircle className="h-5 w-5 text-emerald-500" />
                {store.whatsappNumber || "Não configurado"}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5">
              <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                Instagram
              </p>
              <div className="flex items-center gap-3 font-bold text-slate-900">
                <Instagram className="h-5 w-5 text-rose-500" />
                {store.instagram ? `@${store.instagram}` : "Não configurado"}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5 sm:col-span-2">
              <p className="mb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                Cores da Vitrine
              </p>

              <div className="flex flex-wrap gap-6">
                {[
                  { label: "Primária", color: store.primaryColor || "#000000" },
                  {
                    label: "Secundária",
                    color: store.secondaryColor || "#666",
                  },
                  { label: "Terciária", color: store.tertiaryColor || "#DDD" },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-3">
                    <div
                      className="h-10 w-10 rounded-xl border-4 border-white shadow-lg"
                      style={{ backgroundColor: c.color }}
                    />
                    <span className="text-xs font-bold uppercase tracking-tighter text-slate-600">
                      {c.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col overflow-hidden rounded-[2.5rem] border-slate-100 bg-white shadow-sm">
          <CardHeader className="border-b border-slate-50 p-8">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-indigo-600" />
              <CardTitle className="text-xl font-black">
                Presença Física
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="flex-1 space-y-6 p-8">
            <div className="rounded-2xl border border-slate-100 p-5">
              <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                Endereço de Entrega/Retirada
              </p>
              <p className="text-sm font-bold italic leading-relaxed text-slate-900">
                {addressText || "Operação 100% Digital"}
              </p>

              {store.googleMapsLink && (
                <Button
                  variant="link"
                  asChild
                  className="mt-3 h-auto p-0 font-bold text-indigo-600"
                >
                  <a href={store.googleMapsLink} target="_blank">
                    Ver no Google Maps →
                  </a>
                </Button>
              )}
            </div>

            <div className="rounded-3xl bg-indigo-600 p-6 text-white shadow-xl shadow-indigo-100">
              <h4 className="mb-2 font-bold">Dica de Crescimento</h4>
              <p className="mb-4 text-xs leading-relaxed text-indigo-100">
                Lojas com categorias bem definidas vendem até 40% mais. Comece
                organizando seus produtos agora.
              </p>

              <Button
                asChild
                variant="secondary"
                className="w-full rounded-xl bg-white font-bold text-indigo-600 hover:bg-indigo-50"
              >
                <Link href={`/admin/${store.slug}/categories`}>
                  Organizar Agora
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}