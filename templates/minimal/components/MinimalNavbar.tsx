"use client";

import Link from "next/link";
import type { StoreResponse } from "@/types";
import { ShoppingBag } from "lucide-react";

export function MinimalNavbar({ store }: { store: StoreResponse }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-100/50 bg-white/60 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href={`/${store.slug}`} className="group flex items-center gap-1">
          <span className="text-xl font-black tracking-tight text-zinc-900">
            {store.name.toUpperCase()}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 transition-transform group-hover:scale-150" />
        </Link>

        <nav className="flex items-center gap-8">
          <Link href={`/${store.slug}`} className="hidden text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-400 transition-colors hover:text-zinc-900 md:block">
            Início
          </Link>
          <Link 
            href={`/${store.slug}/carrinho`} 
            className="group relative flex items-center gap-2.5 rounded-full bg-zinc-950 px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white shadow-xl shadow-zinc-200 transition-all hover:bg-zinc-800 hover:shadow-zinc-300 active:scale-95"
          >
            <ShoppingBag size={14} className="transition-transform group-hover:-rotate-12" />
            <span>Carrinho</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}