"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminHeader } from "@/components/admin/AdminHeader"
import { mockStore } from "@/mocks/store"
import type { Store } from "@/types"

const settingsSchema = z.object({
  name: z.string().min(1, "Nome e obrigatorio"),
  logo: z.string().optional(),
  primaryColor: z.string().min(1, "Cor primaria e obrigatoria"),
  secondaryColor: z.string().min(1, "Cor secundaria e obrigatoria"),
  tertiaryColor: z.string().min(1, "Cor terciaria e obrigatoria"),
  whatsappNumber: z.string().min(1, "WhatsApp e obrigatorio"),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  address: z.string().optional(),
  googleMapsLink: z.string().optional(),
  template: z.enum(["fashion", "minimal", "streetwear"]),
})

type SettingsFormValues = z.infer<typeof settingsSchema>

export default function AdminSettingsPage() {
  const [store, setStore] = useState<Store | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: "",
      logo: "",
      primaryColor: "#000000",
      secondaryColor: "#000000",
      tertiaryColor: "#ffffff",
      whatsappNumber: "",
      instagram: "",
      facebook: "",
      address: "",
      googleMapsLink: "",
      template: "fashion",
    },
  })

  useEffect(() => {
    setStore(mockStore)
    form.reset({
      name: mockStore.name,
      logo: mockStore.logo,
      primaryColor: mockStore.primaryColor,
      secondaryColor: mockStore.secondaryColor,
      tertiaryColor: mockStore.tertiaryColor,
      whatsappNumber: mockStore.whatsappNumber,
      instagram: mockStore.instagram || "",
      facebook: mockStore.facebook || "",
      address: mockStore.address || "",
      googleMapsLink: mockStore.googleMapsLink || "",
      template: mockStore.template,
    })
  }, [form])

  const onSubmit = async (data: SettingsFormValues) => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Configuracoes salvas:", data)
      setStore((prev) => (prev ? { ...prev, ...data } : null))
    } catch (error) {
      console.error("Erro ao salvar:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!store) {
    return null
  }

  return (
    <>
      <AdminHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Configuracoes" },
        ]}
      />

      <div className="flex flex-1 flex-col gap-6 p-6">
        <div>
          <h1 className="text-2xl font-bold">Configuracoes da Loja</h1>
          <p className="text-muted-foreground">
            Configure os dados e aparencia da sua loja
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Basic Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Informacoes Basicas</CardTitle>
                  <CardDescription>
                    Dados principais da loja
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome da Loja</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Minha Loja" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="logo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL do Logo</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="template"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Template</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um template" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="fashion">Fashion</SelectItem>
                            <SelectItem value="minimal">Minimal</SelectItem>
                            <SelectItem value="streetwear">Streetwear</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Estilo visual da sua loja
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Colors */}
              <Card>
                <CardHeader>
                  <CardTitle>Cores</CardTitle>
                  <CardDescription>
                    Personalize as cores da sua loja
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="primaryColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cor Primaria</FormLabel>
                        <div className="flex gap-2">
                          <FormControl>
                            <Input {...field} placeholder="#000000" />
                          </FormControl>
                          <Input
                            type="color"
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="w-12 p-1 h-10"
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="secondaryColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cor Secundaria</FormLabel>
                        <div className="flex gap-2">
                          <FormControl>
                            <Input {...field} placeholder="#000000" />
                          </FormControl>
                          <Input
                            type="color"
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="w-12 p-1 h-10"
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tertiaryColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cor Terciaria</FormLabel>
                        <div className="flex gap-2">
                          <FormControl>
                            <Input {...field} placeholder="#ffffff" />
                          </FormControl>
                          <Input
                            type="color"
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="w-12 p-1 h-10"
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Contact */}
              <Card>
                <CardHeader>
                  <CardTitle>Contato</CardTitle>
                  <CardDescription>
                    Informacoes de contato e redes sociais
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="whatsappNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WhatsApp</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="5511999999999" />
                        </FormControl>
                        <FormDescription>
                          Numero com codigo do pais (sem espacos ou caracteres especiais)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="instagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="@minhaloja" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="facebook"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facebook</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="minhaloja" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Address */}
              <Card>
                <CardHeader>
                  <CardTitle>Endereco</CardTitle>
                  <CardDescription>
                    Localizacao da loja (opcional)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endereco</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Rua, numero - Cidade" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="googleMapsLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Link do Google Maps</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://maps.google.com/..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Salvar Configuracoes
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}
