import Link from "next/link";
import type { CategoryResponse, StoreResponse } from "@/types";

type MinimalCategoryCardProps = {
  store: StoreResponse;
  category: CategoryResponse;
};

export function MinimalCategoryCard({ store, category }: MinimalCategoryCardProps) {
  return (
    <Link
      href={`/${store.slug}/categoria/${category.slug}`}
      className="group flex items-center justify-between rounded-xl border border-zinc-100 bg-white p-5 transition-all hover:border-zinc-300 hover:shadow-md"
    >
      <div>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Explorar</span>
        <h3 className="text-base font-semibold text-zinc-900">{category.name}</h3>
      </div>
      <div className="h-8 w-8 rounded-full bg-zinc-50 flex items-center justify-center transition-colors group-hover:bg-zinc-900 group-hover:text-white">
        →
      </div>
    </Link>
  );
}