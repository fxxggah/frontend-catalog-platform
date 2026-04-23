import Link from "next/link";
import type { CategoryResponse, StoreResponse } from "@/types";
import { ArrowRight } from "lucide-react";

type MinimalCategoryCardProps = {
  store: StoreResponse;
  category: CategoryResponse;
};

export function MinimalCategoryCard({ store, category }: MinimalCategoryCardProps) {
  return (
    <Link
      href={`/${store.slug}/categoria/${category.slug}`}
      className="group relative flex items-center justify-between overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50/50 p-6 transition-all duration-300 hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
    >
      <div className="z-10">
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-indigo-600/70">Coleção</span>
        <h3 className="mt-1 text-lg font-bold text-zinc-900">{category.name}</h3>
      </div>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-400 shadow-sm transition-all duration-300 group-hover:bg-zinc-950 group-hover:text-white group-hover:scale-110">
        <ArrowRight size={18} />
      </div>
    </Link>
  );
}