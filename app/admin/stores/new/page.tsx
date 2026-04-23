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
} from "lucide-react";

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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("O nome da loja é obrigatório.");
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

      throw new Error("Resposta inesperada do servidor.");
    } catch (err: unknown) {
      console.error("Erro ao criar loja:", err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocorreu um erro ao criar sua loja. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto w-full max-w-4xl">
        <Card className="overflow-hidden border-slate-200/70 shadow-xl">
          <CardHeader className="border-b border-slate-100 bg-white">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
              <Store size={22} />
            </div>

            <CardTitle className="text-3xl font-black tracking-tight text-slate-900">
              Criar sua loja
            </CardTitle>

            <CardDescription className="text-base text-slate-600">
              Configure os dados iniciais da sua loja para começar com uma base
              bem estruturada.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="grid gap-8 bg-white px-6 py-8">
              {/* DADOS PRINCIPAIS */}
              <section className="grid gap-5">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={18} className="text-slate-500" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                    Dados principais
                  </h2>
                </div>

                <div className="grid gap-2">
                  <Label
                    htmlFor="name"
                    className="font-semibold text-slate-700"
                  >
                    Nome da loja <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Ex: Boutique da Tia"
                    value={formData.name}
                    onChange={handleChange}
                    className="h-12"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label
                    htmlFor="logo"
                    className="flex items-center gap-2 font-semibold text-slate-700"
                  >
                    <ImageIcon size={16} className="text-slate-500" />
                    URL da logo
                  </Label>
                  <Input
                    id="logo"
                    name="logo"
                    placeholder="https://..."
                    value={formData.logo}
                    onChange={handleChange}
                    className="h-12"
                  />
                </div>

                <div className="grid gap-2">
                  <Label
                    htmlFor="template"
                    className="flex items-center gap-2 font-semibold text-slate-700"
                  >
                    <LayoutTemplate size={16} className="text-slate-500" />
                    Template inicial
                  </Label>
                  <select
                    id="template"
                    name="template"
                    value={formData.template}
                    onChange={handleChange}
                    className="h-12 rounded-md border border-input bg-background px-3 text-sm"
                  >
                    <option value="minimal">Minimal</option>
                  </select>
                </div>
              </section>

              {/* CONTATO E REDES */}
              <section className="grid gap-5">
                <div className="flex items-center gap-2">
                  <MessageCircle size={18} className="text-slate-500" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                    Contato e redes sociais
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label
                      htmlFor="whatsappNumber"
                      className="font-semibold text-slate-700"
                    >
                      WhatsApp
                    </Label>
                    <Input
                      id="whatsappNumber"
                      name="whatsappNumber"
                      placeholder="5514999999999"
                      value={formData.whatsappNumber}
                      onChange={handleChange}
                      className="h-12"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label
                      htmlFor="instagram"
                      className="flex items-center gap-2 font-semibold text-slate-700"
                    >
                      <Instagram size={16} className="text-pink-500" />
                      Instagram
                    </Label>
                    <Input
                      id="instagram"
                      name="instagram"
                      placeholder="@minhaloja"
                      value={formData.instagram}
                      onChange={handleChange}
                      className="h-12"
                    />
                  </div>

                  <div className="grid gap-2 md:col-span-2">
                    <Label
                      htmlFor="facebook"
                      className="flex items-center gap-2 font-semibold text-slate-700"
                    >
                      <Facebook size={16} className="text-blue-600" />
                      Facebook
                    </Label>
                    <Input
                      id="facebook"
                      name="facebook"
                      placeholder="facebook.com/minhaloja"
                      value={formData.facebook}
                      onChange={handleChange}
                      className="h-12"
                    />
                  </div>
                </div>
              </section>

              {/* IDENTIDADE VISUAL */}
              <section className="grid gap-5">
                <div className="flex items-center gap-2">
                  <Palette size={18} className="text-slate-500" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                    Identidade visual
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                  <div className="rounded-xl border border-slate-200 p-4">
                    <div
                      className="mb-3 h-10 w-10 rounded-full border"
                      style={{ backgroundColor: formData.primaryColor }}
                    />
                    <Label
                      htmlFor="primaryColor"
                      className="text-xs font-bold uppercase text-slate-500"
                    >
                      Cor principal
                    </Label>
                    <input
                      id="primaryColor"
                      type="color"
                      name="primaryColor"
                      value={formData.primaryColor}
                      onChange={handleChange}
                      className="mt-2 h-10 w-full cursor-pointer"
                    />
                  </div>

                  <div className="rounded-xl border border-slate-200 p-4">
                    <div
                      className="mb-3 h-10 w-10 rounded-full border"
                      style={{ backgroundColor: formData.secondaryColor }}
                    />
                    <Label
                      htmlFor="secondaryColor"
                      className="text-xs font-bold uppercase text-slate-500"
                    >
                      Cor secundária
                    </Label>
                    <input
                      id="secondaryColor"
                      type="color"
                      name="secondaryColor"
                      value={formData.secondaryColor}
                      onChange={handleChange}
                      className="mt-2 h-10 w-full cursor-pointer"
                    />
                  </div>

                  <div className="rounded-xl border border-slate-200 p-4">
                    <div
                      className="mb-3 h-10 w-10 rounded-full border"
                      style={{ backgroundColor: formData.tertiaryColor }}
                    />
                    <Label
                      htmlFor="tertiaryColor"
                      className="text-xs font-bold uppercase text-slate-500"
                    >
                      Cor terciária
                    </Label>
                    <input
                      id="tertiaryColor"
                      type="color"
                      name="tertiaryColor"
                      value={formData.tertiaryColor}
                      onChange={handleChange}
                      className="mt-2 h-10 w-full cursor-pointer"
                    />
                  </div>
                </div>
              </section>

              {/* ENDEREÇO */}
              <section className="grid gap-5">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-slate-500" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                    Endereço
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="grid gap-2 md:col-span-2">
                    <Label
                      htmlFor="street"
                      className="font-semibold text-slate-700"
                    >
                      Rua
                    </Label>
                    <Input
                      id="street"
                      name="street"
                      placeholder="Rua Exemplo"
                      value={formData.street}
                      onChange={handleChange}
                      className="h-12"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label
                      htmlFor="number"
                      className="font-semibold text-slate-700"
                    >
                      Número
                    </Label>
                    <Input
                      id="number"
                      name="number"
                      placeholder="123"
                      value={formData.number}
                      onChange={handleChange}
                      className="h-12"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label
                      htmlFor="city"
                      className="font-semibold text-slate-700"
                    >
                      Cidade
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="Botucatu"
                      value={formData.city}
                      onChange={handleChange}
                      className="h-12"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label
                      htmlFor="state"
                      className="font-semibold text-slate-700"
                    >
                      Estado
                    </Label>
                    <Input
                      id="state"
                      name="state"
                      placeholder="SP"
                      value={formData.state}
                      onChange={handleChange}
                      className="h-12"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label
                      htmlFor="country"
                      className="font-semibold text-slate-700"
                    >
                      País
                    </Label>
                    <Input
                      id="country"
                      name="country"
                      placeholder="Brasil"
                      value={formData.country}
                      onChange={handleChange}
                      className="h-12"
                    />
                  </div>

                  <div className="grid gap-2 md:col-span-3">
                    <Label
                      htmlFor="googleMapsLink"
                      className="flex items-center gap-2 font-semibold text-slate-700"
                    >
                      <LinkIcon size={16} className="text-slate-500" />
                      Link do Google Maps
                    </Label>
                    <Input
                      id="googleMapsLink"
                      name="googleMapsLink"
                      placeholder="https://maps.google.com/..."
                      value={formData.googleMapsLink}
                      onChange={handleChange}
                      className="h-12"
                    />
                  </div>
                </div>
              </section>

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </div>
              )}
            </CardContent>

            <CardFooter className="flex flex-col gap-4 border-t border-slate-100 bg-white px-6 py-6">
              <Button type="submit" className="h-12 w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Criando loja...
                  </>
                ) : (
                  "Criar loja"
                )}
              </Button>

              <p className="text-center text-xs text-slate-400">
                Você poderá editar esses dados depois em configurações da loja.
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}