"use client";

import axios from "axios";
import { LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authService } from "@/services/authService";

// Configurações do Google
const googleClientId =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim() ||
  "711004756306-c1qb90c3ogkkjnsvcov86of25mmrhhjp.apps.googleusercontent.com";

export default function LoginPage() {
  const router = useRouter();
  const [status, setStatus] = useState<
    "idle" | "loading-script" | "ready" | "submitting"
  >("loading-script");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    // Função que lida com a resposta do Google One Tap / Button
    const handleLogin = async (response: { credential?: string }) => {
      if (!response?.credential) {
        setErrorMessage("Não foi possível obter a credencial do Google.");
        return;
      }

      try {
        setStatus("submitting");
        setErrorMessage("");

        // Envia o token para o seu backend
        await authService.loginWithGoogle({
          token: response.credential,
        });
        router.push("/admin/stores");
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
      if (cancelled || !window.google?.accounts?.id) {
        return;
      }

      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: handleLogin,
      });

      const buttonElement = document.getElementById("googleButton");

      if (!buttonElement) {
        setErrorMessage("Não foi possível renderizar o botão do Google.");
        return;
      }

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
      // Verifica se o script já existe no DOM
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

      // Cria e injeta o script caso não exista
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
  }, [router]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#f7efe5_0%,#f0f7f4_45%,#eef4ff_100%)] px-4 py-10">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(214,140,69,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(76,127,106,0.18),transparent_30%)]" />

      <Card className="relative z-10 w-full max-w-md border-white/60 bg-white/90 shadow-2xl backdrop-blur">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1f4f46] text-white shadow-lg">
            <LogIn className="h-6 w-6" />
          </div>

          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold tracking-tight text-slate-900">
              Entrar no painel
            </CardTitle>
            <p className="text-sm leading-6 text-slate-600">
              Use sua conta Google para acessar a administração da loja.
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="flex min-h-12 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-3">
            {/* O Google renderiza o botão aqui dentro */}
            <div id="googleButton" />
          </div>

          {(status === "loading-script" || status === "submitting") && (
            <Button className="w-full rounded-full" disabled>
              {status === "loading-script"
                ? "Carregando login do Google..."
                : "Entrando..."}
            </Button>
          )}

          {errorMessage && (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}