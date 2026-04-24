"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, Mail, ShieldAlert } from "lucide-react";

import { inviteService } from "@/services/inviteService";
import { authService } from "@/services/authService";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AcceptInvitePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAccepting, setIsAccepting] = useState(false);
  const [error, setError] = useState("");

  async function loadInvite() {
    if (!token) {
      setError("Token do convite não encontrado.");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const data = await inviteService.validateInvite(token);
      setEmail(data.email);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Convite inválido ou expirado."
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAcceptInvite() {
    if (!token) return;

    const isLoggedIn = authService.isAuthenticated();

    if (!isLoggedIn) {
      const redirectUrl = `/invite/accept?token=${token}`;
      router.push(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
      return;
    }

    try {
      setIsAccepting(true);
      setError("");

      await inviteService.acceptInvite(token);

      alert("Convite aceito com sucesso!");
      router.replace("/admin/stores");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao aceitar convite."
      );
    } finally {
      setIsAccepting(false);
    }
  }

  useEffect(() => {
    loadInvite();
  }, [token]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-slate-900" />
          <p className="text-sm font-medium text-slate-500">
            Validando convite...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md rounded-3xl border-slate-200 bg-white shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white">
            {error ? (
              <ShieldAlert className="h-7 w-7" />
            ) : (
              <CheckCircle2 className="h-7 w-7" />
            )}
          </div>

          <CardTitle className="text-2xl font-black text-slate-900">
            {error ? "Convite inválido" : "Convite para administrar loja"}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {error ? (
            <p className="rounded-2xl border border-red-100 bg-red-50 p-4 text-center text-sm font-medium text-red-600">
              {error}
            </p>
          ) : (
            <>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      Email convidado
                    </p>
                    <p className="font-semibold text-slate-900">{email}</p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleAcceptInvite}
                disabled={isAccepting}
                className="h-12 w-full rounded-2xl bg-slate-900 font-bold text-white"
              >
                {isAccepting ? "Aceitando..." : "Aceitar convite"}
              </Button>

              <p className="text-center text-xs text-slate-400">
                Se você ainda não estiver logado, será enviado para a tela de login.
              </p>
            </>
          )}

          <Button
            variant="ghost"
            onClick={() => router.push("/login")}
            className="w-full rounded-2xl"
          >
            Ir para login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}