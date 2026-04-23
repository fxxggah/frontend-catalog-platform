"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton({ href }: { href: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(href)}
      className="group flex items-center gap-2.5 py-2 pr-4 text-xs font-black uppercase tracking-[0.2em] text-slate-400 transition-all hover:text-indigo-600 active:scale-95"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-100 bg-white shadow-sm transition-all group-hover:border-indigo-100 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:shadow-md md:h-9 md:w-9">
        <ArrowLeft 
          size={16} 
          className="transition-transform group-hover:-translate-x-1" 
        />
      </div>
      <span className="hidden sm:inline-block">Voltar</span>
    </button>
  );
}