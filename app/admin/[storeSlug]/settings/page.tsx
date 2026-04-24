"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { storeService } from "@/services/storeService";
import type { StoreResponse } from "@/types";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";


export default function SettingsPage() {
  const params = useParams();
  const storeSlug = params.storeSlug as string;

  const [store, setStore] = useState<StoreResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");

  async function load() {
    const data = await storeService.getStoreBySlug(storeSlug);
    setStore(data);

    setName(data.name);
    setWhatsapp(data.whatsappNumber || "");
    setInstagram(data.instagram || "");

    setIsLoading(false);
  }

  useEffect(() => {
    if (storeSlug) load();
  }, [storeSlug]);

  async function handleSave() {
    if (!store) return;

    await storeService.updateStore(store.slug, {
      name,
      whatsappNumber: whatsapp,
      instagram,
    });

    alert("Salvo!");
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-xl">

      <h1 className="text-2xl font-bold">Configurações</h1>

      <Card>
        <CardContent className="space-y-4">
          <Input value={name} onChange={(e) => setName(e.target.value)} />

          <Input
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="WhatsApp"
          />

          <Input
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            placeholder="Instagram"
          />

          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Salvar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}