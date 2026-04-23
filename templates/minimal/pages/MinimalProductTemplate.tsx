"use client";

import type { ProductResponse, StoreResponse } from "@/types";
import { MinimalNavbar } from "../components/MinimalNavbar";
import { MinimalFooter } from "../components/MinimalFooter";
import { formatPrice } from "@/utils/formatPrice";
import { useCartContext } from "@/contexts/CartContext";

type MinimalProductTemplateProps = {
  store: StoreResponse;
  product: ProductResponse;
};

export function MinimalProductTemplate({ store, product }: MinimalProductTemplateProps) {
  const { addToCart } = useCartContext();
  const image = product.images?.[0]?.imageUrl;

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <MinimalNavbar store={store} />
      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:py-8 lg:grid-cols-2 lg:gap-12">
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl border bg-white">
          <div className="aspect-square bg-zinc-100">
            {image ? (
              <img src={image} alt={product.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-zinc-400">Sem imagem</div>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center rounded-2xl sm:rounded-3xl border bg-white p-6 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Produto</p>
          <h1 className="mt-2 text-2xl sm:text-4xl font-bold tracking-tight">{product.name}</h1>
          {product.description && <p className="mt-4 text-sm sm:text-base text-zinc-600 leading-relaxed">{product.description}</p>}

          <div className="mt-8">
            {product.promotionalPrice ? (
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-zinc-900">{formatPrice(product.promotionalPrice)}</span>
                <span className="text-lg text-zinc-400 line-through">{formatPrice(product.price)}</span>
              </div>
            ) : (
              <span className="text-3xl font-black text-zinc-900">{formatPrice(product.price)}</span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="mt-8 w-full rounded-xl bg-zinc-900 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-zinc-800 active:scale-[0.98]"
          >
            Adicionar ao carrinho
          </button>
        </div>
      </main>
      <MinimalFooter store={store} />
    </div>
  );
}