"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Users,
  Trash2,
  ShieldCheck,
  Loader2,
  Mail,
  Crown,
} from "lucide-react";

import { userService } from "@/services/userService";
import type { StoreUserResponse } from "@/types";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function UsersPage() {
  const params = useParams();
  const storeSlug = params.storeSlug as string;

  const [users, setUsers] = useState<StoreUserResponse[]>([]);
  const [currentUser, setCurrentUser] = useState<StoreUserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function load() {
    try {
      setIsLoading(true);

      const [current, members] = await Promise.all([
        userService.getCurrentStoreUser(storeSlug),
        userService.getStoreUsers(storeSlug),
      ]);

      setCurrentUser(current);
      setUsers(members);
    } catch (error) {
      toast.error("Erro ao carregar membros da equipe.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRemove(userId: number) {
    if (currentUser?.role !== "OWNER") {
      toast.error("Apenas o proprietário pode remover membros.");
      return;
    }

    if (
      !confirm(
        "Tem certeza que deseja remover este membro? O acesso será revogado imediatamente."
      )
    ) {
      return;
    }

    try {
      await userService.removeStoreUser(storeSlug, userId);
      toast.success("Membro removido com sucesso.");
      load();
    } catch (error) {
      toast.error("Não foi possível remover o usuário.");
    }
  }

  useEffect(() => {
    if (storeSlug) load();
  }, [storeSlug]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-slate-200" />
      </div>
    );
  }

  const canRemoveMembers = currentUser?.role === "OWNER";

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-6 md:px-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-xl shadow-slate-200">
              <Users size={24} />
            </div>

            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900">
                Equipe Ativa
              </h1>
              <p className="text-sm font-medium italic text-slate-500">
                Membros com acesso direto ao painel da sua loja.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => {
          const isOwner = user.role === "OWNER";
          const safeName = user.name || "Membro sem nome";
          const initials =
            safeName
              .split(" ")
              .filter(Boolean)
              .map((name) => name[0])
              .join("")
              .slice(0, 2)
              .toUpperCase() || "??";

          return (
            <Card
              key={user.userId}
              className="group overflow-hidden rounded-[2rem] border border-slate-50 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
            >
              <CardContent className="p-8">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div
                    className={`relative flex h-20 w-20 items-center justify-center rounded-3xl text-2xl font-black shadow-inner transition-transform duration-500 group-hover:scale-105 ${
                      isOwner
                        ? "bg-amber-50 text-amber-600"
                        : "bg-slate-50 text-slate-400"
                    }`}
                  >
                    {initials}

                    {isOwner && (
                      <div className="absolute -right-2 -top-2 rounded-xl border-2 border-white bg-amber-500 p-1.5 text-white shadow-lg">
                        <Crown size={14} />
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-xl font-bold tracking-tight text-slate-900">
                      {safeName}
                    </h2>

                    <div className="flex items-center justify-center gap-1.5 text-slate-400">
                      <Mail size={12} />
                      <span className="text-sm font-medium">
                        {user.email || "Email não informado"}
                      </span>
                    </div>
                  </div>

                  <Badge
                    className={`rounded-full border-none px-4 py-1 text-[10px] font-black uppercase tracking-widest ${
                      isOwner
                        ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                        : "bg-indigo-50 text-indigo-600 hover:bg-indigo-50"
                    }`}
                  >
                    {isOwner ? "Proprietário" : "Colaborador"}
                  </Badge>

                  <div className="w-full pt-4">
                    {user.role !== "OWNER" && canRemoveMembers ? (
                      <Button
                        variant="ghost"
                        onClick={() => handleRemove(user.userId)}
                        className="h-11 w-full gap-2 rounded-xl text-xs font-bold uppercase tracking-widest text-slate-400 transition-all hover:bg-rose-50 hover:text-rose-600"
                      >
                        <Trash2 size={14} />
                        Remover da Equipe
                      </Button>
                    ) : (
                      <div className="flex h-11 items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-tight text-slate-300">
                        <ShieldCheck size={14} />
                        {isOwner
                          ? "Acesso Administrativo Total"
                          : "Acesso de Colaborador"}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-12 flex flex-col items-center gap-6 rounded-[2.5rem] bg-indigo-600 p-8 text-white shadow-2xl shadow-indigo-100 md:flex-row">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10">
          <ShieldCheck size={28} />
        </div>

        <div className="space-y-1">
          <h4 className="text-lg font-bold">Segurança da sua conta</h4>
          <p className="max-w-2xl text-sm font-medium leading-relaxed text-indigo-100">
            Membros com cargo de colaborador podem gerenciar produtos e
            categorias, mas não podem remover pessoas da equipe, convidar novos
            administradores ou alterar configurações sensíveis da loja.
          </p>
        </div>
      </div>
    </div>
  );
}