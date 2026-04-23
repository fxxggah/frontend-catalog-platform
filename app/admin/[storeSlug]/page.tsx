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
  Globe,
  CalendarDays,
  Sparkles,
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
  color: string;
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
      const message = err instanceof Error ? err.message : "Erro ao carregar os dados da loja.";
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
    return [
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
      },
      {
        title: "Ver Vitrine",
        description: "Visualizar como cliente.",
        href: `/${store.slug}`,
        icon: <ExternalLink className="h-5 w-5" />,
        color: "bg-emerald-50 text-emerald-600",
      },
    ];
  }, [store]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6">
        <div className="relative">
          <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
          <Store className="absolute inset-0 m-auto h-5 w-5 text-slate-400" />
        </div>
        <p className="text-sm font-bold uppercase tracking-widest text-slate-500 animate-pulse">
          Preparando seu ecossistema...
        </p>
      </div>
    );
  }

  if (error || !store) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <Card className="border-red-100 bg-white shadow-2xl shadow-red-500/5 rounded-[2rem] overflow-hidden text-center p-8">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <AlertCircle className="h-8 w-8" />
          </div>
          <CardTitle className="text-3xl font-playfair font-black text-slate-900 mb-2">Ops! Falha na conexão</CardTitle>
          <CardDescription className="text-slate-500 mb-8">{error ?? "Não encontramos essa unidade no banco de dados."}</CardDescription>
          <div className="flex flex-col gap-3 sm:flex-row justify-center">
            <Button onClick={loadStore} className="rounded-xl px-8 h-12 bg-slate-900">Tentar novamente</Button>
            <Button variant="outline" asChild className="rounded-xl px-8 h-12 border-slate-200">
              <Link href="/admin/stores">Voltar para Dashboard</Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10 px-4 py-8 md:px-6">
      
      {/* Header com Glassmorphism e Branding */}
      <header className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full -mr-16 -mt-16 blur-3xl" />
        
        <div className="flex items-center gap-5 relative z-10">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-2xl shadow-slate-200 rotate-2">
            <Store className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-playfair font-black tracking-tight text-slate-900">
              {store.name}
            </h1>
            <div className="flex items-center gap-2 mt-1 text-indigo-600 font-bold text-sm tracking-tight">
              <Globe size={14} />
              katallo.com.br/{store.slug}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 relative z-10">
          <Button asChild className="rounded-xl h-12 px-6 bg-slate-900 hover:scale-105 transition-transform">
            <Link href={`/admin/${store.slug}/products`}>
              <Package className="mr-2 h-4 w-4" />
              Gestão de Produtos
            </Link>
          </Button>
          <Button variant="outline" asChild className="rounded-xl h-12 px-6 border-slate-200 bg-white/50 backdrop-blur-sm">
            <Link href={`/${store.slug}`} target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" />
              Ver Catálogo
            </Link>
          </Button>
        </div>
      </header>

      {/* KPI Section */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="group rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-xl hover:shadow-indigo-500/5">
          <div className="flex items-center gap-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${store.active ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
              {store.active ? <CheckCircle2 /> : <XCircle />}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Disponibilidade</p>
              <p className="text-lg font-bold text-slate-900">{store.active ? "Loja Online" : "Manutenção"}</p>
            </div>
          </div>
        </div>

        <div className="group rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-xl hover:shadow-indigo-500/5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <LayoutTemplate />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Design System</p>
              <p className="text-lg font-bold text-slate-900 truncate">{store.template || "Standard"}</p>
            </div>
          </div>
        </div>

        <div className="group rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-xl hover:shadow-indigo-500/5 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
              <CalendarDays />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Membro desde</p>
              <p className="text-lg font-bold text-slate-900">
                {new Date(store.createdAt).toLocaleDateString("pt-BR", { month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de Ações Rápidas */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <div className="h-6 w-1 bg-indigo-600 rounded-full" />
          <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase text-xs tracking-widest">Ações Operacionais</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href} className="group">
              <Card className="h-full border-slate-100 bg-white transition-all duration-300 group-hover:border-indigo-200 group-hover:shadow-2xl group-hover:shadow-indigo-500/10 rounded-[1.8rem]">
                <CardContent className="flex flex-col gap-4 p-6">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 group-hover:-rotate-3 ${action.color}`}>
                    {action.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 leading-tight">
                      {action.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Info Sections - Split Layout */}
      <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-[1fr_400px]">
        
        {/* Dados da Marca */}
        <Card className="border-slate-100 bg-white shadow-sm rounded-[2.5rem] overflow-hidden">
          <CardHeader className="p-8 border-b border-slate-50">
            <div className="flex items-center gap-3">
              <Sparkles className="text-indigo-600 h-5 w-5" />
              <CardTitle className="text-xl font-playfair font-black">Identidade & Contato</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="p-8 grid gap-6 sm:grid-cols-2">
            <div className="p-5 rounded-2xl bg-slate-50/50 border border-slate-100">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">WhatsApp Business</p>
              <div className="flex items-center gap-3 text-slate-900 font-bold">
                <MessageCircle className="h-5 w-5 text-emerald-500" />
                {store.whatsappNumber || "Não configurado"}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50/50 border border-slate-100">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Instagram</p>
              <div className="flex items-center gap-3 text-slate-900 font-bold">
                <Instagram className="h-5 w-5 text-rose-500" />
                {store.instagram ? `@${store.instagram}` : "Não configurado"}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50/50 border border-slate-100 sm:col-span-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Cores da Vitrine</p>
              <div className="flex flex-wrap gap-6">
                {[
                  { label: "Primária", color: store.primaryColor || "#000000" },
                  { label: "Secundária", color: store.secondaryColor || "#666" },
                  { label: "Terciária", color: store.tertiaryColor || "#DDD" },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl border-4 border-white shadow-lg" style={{ backgroundColor: c.color }} />
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-tighter">{c.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Localização e Growth */}
        <Card className="border-slate-100 bg-white shadow-sm rounded-[2.5rem] overflow-hidden flex flex-col">
          <CardHeader className="p-8 border-b border-slate-50">
            <div className="flex items-center gap-3">
              <MapPin className="text-indigo-600 h-5 w-5" />
              <CardTitle className="text-xl font-playfair font-black">Presença Física</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="p-8 flex-1 space-y-6">
            <div className="p-5 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Endereço de Entrega/Retirada</p>
              <p className="text-sm font-bold text-slate-900 leading-relaxed italic">
                {addressText || "Operação 100% Digital"}
              </p>
              {store.googleMapsLink && (
                <Button variant="link" asChild className="p-0 h-auto mt-3 text-indigo-600 font-bold">
                  <a href={store.googleMapsLink} target="_blank">Ver no Google Maps →</a>
                </Button>
              )}
            </div>

            <div className="p-6 rounded-3xl bg-indigo-600 text-white shadow-xl shadow-indigo-100">
              <h4 className="font-bold mb-2">Dica de Crescimento</h4>
              <p className="text-xs text-indigo-100 leading-relaxed mb-4">
                Lojas com categorias bem definidas vendem até 40% mais. Comece organizando seus produtos agora.
              </p>
              <Button asChild variant="secondary" className="w-full rounded-xl bg-white text-indigo-600 font-bold hover:bg-indigo-50">
                <Link href={`/admin/${store.slug}/categories`}>Organizar Agora</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}