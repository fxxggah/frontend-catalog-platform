"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { userService } from "@/services/userService";
import type { StoreUserResponse } from "@/types";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Users, Trash } from "lucide-react";
import { BackButton } from "@/components/admin/BackButton";

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
    if (!confirm("Remover usuário?")) return;

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
      <BackButton href={`/admin/${storeSlug}`} />

      <h1 className="text-2xl font-bold">Usuários</h1>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {users.map((user) => (
          <Card key={user.userId}>
            <CardContent className="space-y-2">
              <h2 className="font-semibold">{user.name}</h2>

              <p className="text-sm text-slate-500">{user.email}</p>

              <p className="text-xs text-slate-400">
                {user.role}
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
    </div>
  );
}