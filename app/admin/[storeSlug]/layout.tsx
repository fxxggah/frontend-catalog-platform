"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function AdminStoreLayout({
  children,
}: {
  children: ReactNode;
}) {
  const params = useParams();
  const router = useRouter();

  const storeSlug = params.storeSlug as string;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b pb-4">
        <button
          onClick={() => router.push("/admin/stores")}
          className="flex items-center gap-2 text-sm text-slate-600 hover:text-black"
        >
          <ArrowLeft size={16} />
          Voltar
        </button>

        <a
          href={`/${storeSlug}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-sm font-medium"
        >
          Ver catálogo
          <ExternalLink size={16} />
        </a>
      </div>

      {children}
    </div>
  );
}