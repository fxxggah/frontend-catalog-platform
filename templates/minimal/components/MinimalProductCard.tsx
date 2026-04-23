"use client";

import Link from "next/link";
import type { ProductResponse, StoreResponse } from "@/types";
import { formatPrice } from "@/utils/formatPrice";

export function MinimalProductCard({ store, product }: any) {
  const image = product.images?.[0]?.imageUrl;

  return (
    <Link href={`/${store.slug}/produto/${product.slug}`} className="group flex flex-col">
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-zinc-100">
        {image ? (
          <img
            src={image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[10px] uppercase tracking-widest text-zinc-400">No Image</div>
        )}
        {product.promotionalPrice && (
          <div className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-900 shadow-sm">
            Oferta
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-1 px-1">
        <h3 className="text-[15px] font-medium text-zinc-800 transition-colors group-hover:text-zinc-500">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="text-[16px] font-bold text-zinc-900">
            {formatPrice(product.promotionalPrice ?? product.price)}
          </span>
          {product.promotionalPrice && (
            <span className="text-[12px] text-zinc-400 line-through decoration-zinc-300">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}