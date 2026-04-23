"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { inviteService } from "@/services/inviteService";
import type { StoreInviteResponse } from "@/types";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Mail, Trash } from "lucide-react";

export default function InvitesPage() {
  const params = useParams();
  const storeSlug = params.storeSlug as string;

  const [invites, setInvites] = useState<StoreInviteResponse[]>([]);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  async function load() {
    try {
      setIsLoading(true);
      const data = await inviteService.getStoreInvites(storeSlug);
      setInvites(data);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreate() {
    if (!email) {
      alert("Digite um email");
      return;
    }

    await inviteService.createInvite(storeSlug, { email });
    setEmail("");
    load();
  }

  async function handleDelete(inviteId: number) {
    const confirmDelete = confirm("Cancelar convite?");
    if (!confirmDelete) return;

    await inviteService.cancelInvite(storeSlug, inviteId);
    load();
  }

  useEffect(() => {
    if (storeSlug) load();
  }, [storeSlug]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Convites</h1>

      {/* Criar convite */}
      <div className="flex gap-2">
        <Input
          placeholder="Email do usuário"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button onClick={handleCreate}>
          Enviar convite
        </Button>
      </div>

      {/* Lista */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {invites.map((invite) => (
          <Card key={invite.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {invite.email}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              <p className="text-xs text-slate-400">
                Expira em:{" "}
                {new Date(invite.expiresAt).toLocaleDateString()}
              </p>

              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(invite.id)}
              >
                <Trash className="mr-2 h-4 w-4" />
                Cancelar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {invites.length === 0 && (
        <p className="text-sm text-slate-500">
          Nenhum convite enviado.
        </p>
      )}
    </div>
  );
}