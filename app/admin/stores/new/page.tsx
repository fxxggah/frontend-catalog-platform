"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { storeService } from "@/services/storeService";
import {
  Store,
  ShoppingBag,
  Instagram,
  MessageCircle,
  Palette,
  Loader2,
  Facebook,
  MapPin,
  Link as LinkIcon,
  Image as ImageIcon,
  LayoutTemplate,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { BackButton } from "@/components/admin/BackButton";

type CreateStorePayload = {
  name: string;
  logo?: string;
  whatsappNumber?: string;
  instagram?: string;
  facebook?: string;
  template?: string;
  primaryColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
  street?: string;
  number?: string;
  city?: string;
  state?: string;
  country?: string;
  googleMapsLink?: string;
};

export default function NewStorePage() {
  const router = useRouter();

  const [formData, setFormData] = useState<CreateStorePayload>({
    name: "",
    logo: "",
    whatsappNumber: "",
    instagram: "",
    facebook: "",
    template: "minimal",
    primaryColor: "#18181b",
    secondaryColor: "#52525b",
    tertiaryColor: "#fafafa",
    street: "",
    number: "",
    city: "",
    state: "",
    country: "Brasil",
    googleMapsLink: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError("Dê um nome para sua nova jornada.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await storeService.createStore(formData);
      if (response?.slug) {
        router.push(`/admin/${response.slug}`);
        return;
      }
      throw new Error("Ocorreu um erro ao processar sua solicitação.");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro interno do servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#fafafa] pb-20 pt-6 px-4">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Topo com Navegação */}
        <div className="flex items-center justify-between">
          <BackButton href="/admin/stores" />
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <Sparkles size={12} className="text-indigo-500" />
            Configuração Inicial
          </div>
        </div>

        <Card className="overflow-hidden border-none bg-white shadow-[0_32px_64px_-15px_rgba(0,0,0,0.05)] rounded-[2.5rem]">
          <CardHeader className="space-y-4 border-b border-slate-50 p-8 md:p-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-[1.25rem] bg-slate-900 text-white shadow-2xl shadow-slate-200">
              <Store size={28} />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-3xl md:text-4xl font-playfair font-black text-slate-900">
                Fundar nova loja
              </CardTitle>
              <CardDescription className="text-base text-slate-500 max-w-md leading-relaxed">
                Preencha os detalhes abaixo para dar vida à sua vitrine digital. Você poderá refinar tudo depois.
              </CardDescription>
            </div>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-12 p-8 md:p-12">
              
              {/* SEÇÃO: ESSENCIAIS */}
              <section className="grid gap-8 lg:grid-cols-3">
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <ShoppingBag size={18} className="text-indigo-600" />
                    Essenciais
                  </h3>
                  <p className="text-sm text-slate-400">A identidade básica do seu negócio.</p>
                </div>
                
                <div className="lg:col-span-2 grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-slate-500">Nome da Marca</Label>
                    <Input id="name" name="name" placeholder="Ex: Maison de Luxe" value={formData.name} onChange={handleChange} className="h-12 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all" required />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="logo" className="text-xs font-black uppercase tracking-widest text-slate-500">URL do Logotipo</Label>
                    <div className="relative">
                      <Input id="logo" name="logo" placeholder="https://..." value={formData.logo} onChange={handleChange} className="h-12 pl-11 rounded-xl border-slate-100 bg-slate-50/50" />
                      <ImageIcon className="absolute left-4 top-3.5 text-slate-400" size={18} />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <div className="grid gap-2">
  <Label 
    htmlFor="template" 
    className="text-xs font-black uppercase tracking-widest text-slate-500"
  >
    Estilo Visual
  </Label>
  <div className="relative group">
    <select 
      id="template" 
      name="template" 
      value={formData.template} 
      onChange={handleChange} 
      className="flex h-12 w-full rounded-xl border border-slate-100 bg-slate-50/50 px-11 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-950 appearance-none transition-all cursor-not-allowed"
      disabled // Se só existe uma opção, manter o select travado evita confusão
    >
      <option value="minimal">Minimalist (Padrão)</option>
    </select>
    <LayoutTemplate className="absolute left-4 top-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors" size={18} />
    
    {/* Badge de "Único" ou "Ativo" para dar um ar mais profissional */}
    <div className="absolute right-4 top-3.5">
      <span className="flex h-5 items-center rounded-full bg-indigo-50 px-2 text-[10px] font-bold text-indigo-600">
        ATIVO
      </span>
    </div>
  </div>
  <p className="text-[10px] text-slate-400 mt-1 ml-1">
    O template Minimal é otimizado para conversão e carregamento rápido.
  </p>
</div>
                  </div>
                </div>
              </section>

              <hr className="border-slate-50" />

              {/* SEÇÃO: CONEXÕES */}
              <section className="grid gap-8 lg:grid-cols-3">
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <MessageCircle size={18} className="text-emerald-600" />
                    Conexões
                  </h3>
                  <p className="text-sm text-slate-400">Onde seus clientes encontrarão você.</p>
                </div>

                <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="whatsappNumber" className="text-xs font-black uppercase tracking-widest text-slate-500">WhatsApp</Label>
                    <Input id="whatsappNumber" name="whatsappNumber" placeholder="551499999999" value={formData.whatsappNumber} onChange={handleChange} className="h-12 rounded-xl border-slate-100 bg-slate-50/50" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="instagram" className="text-xs font-black uppercase tracking-widest text-slate-500">Instagram</Label>
                    <Input id="instagram" name="instagram" placeholder="@user" value={formData.instagram} onChange={handleChange} className="h-12 rounded-xl border-slate-100 bg-slate-50/50" />
                  </div>
                </div>
              </section>

              <hr className="border-slate-50" />

              {/* SEÇÃO: DESIGN SYSTEM */}
              <section className="grid gap-8 lg:grid-cols-3">
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <Palette size={18} className="text-indigo-600" />
                    Cores
                  </h3>
                  <p className="text-sm text-slate-400">A paleta que define sua marca.</p>
                </div>

                <div className="lg:col-span-2 flex flex-wrap gap-4">
                  {[
                    { id: "primaryColor", label: "Primária" },
                    { id: "secondaryColor", label: "Secundária" },
                    { id: "tertiaryColor", label: "Fundo" },
                  ].map((color) => (
                    <div key={color.id} className="flex flex-1 min-w-[120px] items-center gap-3 p-3 rounded-2xl border border-slate-100 bg-slate-50/30">
                      <input 
                        type="color" 
                        name={color.id} 
                        id={color.id} 
                        // @ts-ignore
                        value={formData[color.id]} 
                        onChange={handleChange} 
                        className="h-10 w-10 cursor-pointer rounded-lg border-none bg-transparent" 
                      />
                      <Label htmlFor={color.id} className="text-[10px] font-black uppercase text-slate-500">{color.label}</Label>
                    </div>
                  ))}
                </div>
              </section>

              {/* ALERT ERROR */}
              {error && (
                <div className="flex items-center gap-3 rounded-2xl bg-rose-50 p-4 text-sm font-bold text-rose-600 border border-rose-100 animate-in fade-in slide-in-from-top-2">
                  <AlertCircle size={18} />
                  {error}
                </div>
              )}
            </CardContent>

            <CardFooter className="flex flex-col gap-6 border-t border-slate-50 bg-slate-50/30 p-8 md:p-12">
              <Button 
                type="submit" 
                className="group h-14 w-full rounded-2xl bg-slate-900 text-base font-bold transition-all hover:scale-[1.01] hover:shadow-xl active:scale-[0.98]" 
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <span className="flex items-center gap-2">
                    Confirmar e Inaugurar Loja
                    <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </span>
                )}
              </Button>
              <p className="text-center text-xs font-medium text-slate-400">
                Ao clicar em confirmar, sua loja será gerada instantaneamente.
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}

// Pequeno helper para o ícone de erro que faltou no import acima
function AlertCircle(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
  )
}