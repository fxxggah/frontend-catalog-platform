"use client";

import Link from "next/link";
import type { StoreResponse } from "@/types";
import { ShoppingBag } from "lucide-react";

export function MinimalNavbar({ store }: { store: StoreResponse }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-4 sm:py-5">
        <Link href={`/${store.slug}`} className="text-lg sm:text-xl font-black tracking-tighter text-zinc-900">
          {store.name.toUpperCase()}<span className="text-zinc-400">.</span>
        </Link>

        <nav className="flex items-center gap-4 sm:gap-10">
          <Link href={`/${store.slug}`} className="hidden text-[12px] font-bold uppercase tracking-widest text-zinc-500 transition hover:text-zinc-900 md:block">
            Início
          </Link>
          <Link 
            href={`/${store.slug}/carrinho`} 
            className="flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-[12px] font-bold uppercase tracking-widest text-white transition-all hover:bg-zinc-800 active:scale-95"
          >
            <ShoppingBag size={14} />
            <span>Carrinho</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}