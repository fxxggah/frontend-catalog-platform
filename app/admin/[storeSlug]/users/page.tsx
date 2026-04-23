"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { userService } from "@/services/userService";
import type { StoreUserResponse } from "@/types";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Users, Trash } from "lucide-react";

export default function UsersPage() {
  const params = useParams();
  const storeSlug = params.storeSlug as string;

  const [users, setUsers] = useState<StoreUserResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function load() {
    try {
      setIsLoading(true);
      const data = await userService.getStoreUsers(storeSlug);
      setUsers(data);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRemove(userId: number) {
    const confirmRemove = confirm("Remover esse usuário?");
    if (!confirmRemove) return;

    await userService.removeStoreUser(storeSlug, userId);
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
      <h1 className="text-2xl font-bold">Usuários da loja</h1>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {users.map((user) => (
          <Card key={user.userId}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                {user.name ?? "Usuário"}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              <p className="text-sm text-slate-500">
                {user.email ?? "Sem email"}
              </p>

              <p className="text-xs text-slate-400">
                Role: {user.role}
              </p>

              {user.role !== "OWNER" && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemove(user.userId)}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Remover
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {users.length === 0 && (
        <p className="text-sm text-slate-500">
          Nenhum usuário encontrado.
        </p>
      )}
    </div>
  );
}