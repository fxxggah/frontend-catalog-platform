"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { inviteService } from "@/services/inviteService";
import type { StoreInviteResponse } from "@/types";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Mail, Trash } from "lucide-react";
import { BackButton } from "@/components/admin/BackButton";

export default function InvitesPage() {
  const params = useParams();
  const storeSlug = params.storeSlug as string;

  const [invites, setInvites] = useState<StoreInviteResponse[]>([]);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function load() {
    const data = await inviteService.getStoreInvites(storeSlug);
    setInvites(data);
  }

  async function handleCreate() {
    if (!email) return;

    setIsLoading(true);
    await inviteService.createInvite(storeSlug, { email });
    setEmail("");
    await load();
    setIsLoading(false);
  }

  async function handleDelete(id: number) {
    if (!confirm("Cancelar convite?")) return;

    await inviteService.cancelInvite(storeSlug, id);
    load();
  }

  useEffect(() => {
    if (storeSlug) load();
  }, [storeSlug]);

  return (
    <div className="space-y-6">
      <BackButton href={`/admin/${storeSlug}`} />

      <h1 className="text-2xl font-bold">Convites</h1>

      <div className="flex gap-2">
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button onClick={handleCreate} disabled={isLoading}>
          {isLoading ? "Enviando..." : "Enviar"}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {invites.map((invite) => (
          <Card key={invite.id}>
            <CardContent>
              <h2 className="font-semibold">{invite.email}</h2>

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
    </div>
  );
}