"use client";

import axios from "axios";
import { LogIn, ArrowLeft, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authService } from "@/services/authService";

const googleClientId =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim() ||
  "711004756306-c1qb90c3ogkkjnsvcov86of25mmrhhjp.apps.googleusercontent.com";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect");

  const [status, setStatus] = useState<
    "idle" | "loading-script" | "ready" | "submitting"
  >("loading-script");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    const handleLogin = async (response: { credential?: string }) => {
      if (!response?.credential) {
        setErrorMessage("Não foi possível obter a credencial do Google.");
        return;
      }

      try {
        setStatus("submitting");
        setErrorMessage("");

        await authService.loginWithGoogle({
          token: response.credential,
        });

        router.push(redirect || "/admin/stores");
      } catch (err) {
        console.error(err);

        if (axios.isAxiosError(err) && !err.response) {
          setErrorMessage(
            "Não foi possível conectar ao backend. Verifique se a API está ativa."
          );
        } else {
          setErrorMessage("Não foi possível concluir o login.");
        }

        setStatus("ready");
      }
    };

    const initGoogle = () => {
      if (cancelled || !window.google?.accounts?.id) return;

      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: handleLogin,
      });

      const buttonElement = document.getElementById("googleButton");
      if (!buttonElement) return;

      buttonElement.innerHTML = "";

      window.google.accounts.id.renderButton(buttonElement, {
        theme: "outline",
        size: "large",
        width: 320,
        shape: "pill",
      });

      setStatus("ready");
    };

    const ensureGoogleScript = () => {
      const existingScript = document.querySelector<HTMLScriptElement>(
        'script[src="https://accounts.google.com/gsi/client"]'
      );

      if (existingScript) {
        if (window.google?.accounts?.id) {
          initGoogle();
          return;
        }

        existingScript.addEventListener("load", initGoogle, { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initGoogle;
      script.onerror = () => {
        if (!cancelled) {
          setErrorMessage("Falha ao carregar o script de login do Google.");
          setStatus("idle");
        }
      };

      document.body.appendChild(script);
    };

    ensureGoogleScript();

    return () => {
      cancelled = true;
    };
  }, [router, redirect]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-50 via-white to-slate-50 px-4">
      <div className="absolute top-8 left-8">
        <Link
          href="/"
          className="group flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Voltar para o site
        </Link>
      </div>

      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-200/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-200/20 rounded-full blur-[120px]" />

      <Card className="relative z-10 w-full max-w-[440px] border-slate-200/60 bg-white/80 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] backdrop-blur-xl rounded-[2.5rem] overflow-hidden">
        <CardHeader className="pt-12 pb-8 px-8 text-center space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[20px] bg-slate-900 text-white shadow-xl shadow-slate-200 group transition-all duration-500 hover:bg-indigo-600">
            <LogIn className="h-7 w-7 group-hover:scale-110 transition-transform" />
          </div>

          <div className="space-y-2">
            <CardTitle className="text-4xl font-playfair font-black tracking-tight text-slate-900">
              Bem-vindo!
            </CardTitle>

            <p className="text-slate-500 font-medium px-4">
              Acesse o seu painel administrativo para gerenciar sua vitrine
              digital.
            </p>
          </div>
        </CardHeader>

        <CardContent className="pb-12 px-10 space-y-8">
          <div className="relative flex flex-col items-center justify-center gap-6 py-6 px-4 rounded-3xl border border-slate-100 bg-slate-50/50">
            <div
              id="googleButton"
              className="transition-all hover:scale-[1.02] active:scale-[0.98]"
            />

            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              <ShieldCheck size={14} className="text-indigo-500" />
              Conexão Segura via Google
            </div>
          </div>

          {(status === "loading-script" || status === "submitting") && (
            <div className="flex flex-col gap-3">
              <Button
                className="w-full h-12 rounded-2xl bg-slate-900 text-white font-bold"
                disabled
              >
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  {status === "loading-script"
                    ? "Preparando ambiente..."
                    : "Autenticando..."}
                </div>
              </Button>
            </div>
          )}

          {errorMessage && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <p className="rounded-2xl border border-red-100 bg-red-50/50 px-4 py-3 text-sm text-red-600 font-medium text-center">
                {errorMessage}
              </p>
            </div>
          )}

          <p className="text-center text-[11px] text-slate-400 font-medium leading-relaxed">
            Ao entrar, você concorda com nossos <br />
            <a href="#" className="underline hover:text-slate-900">
              Termos de Uso
            </a>{" "}
            e{" "}
            <a href="#" className="underline hover:text-slate-900">
              Política de Privacidade
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}