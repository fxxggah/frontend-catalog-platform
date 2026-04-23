"use client";

import Link from "next/link";
import type { StoreResponse } from "@/types";
import { MinimalNavbar } from "../components/MinimalNavbar";
import { MinimalFooter } from "../components/MinimalFooter";
import { useCartContext } from "@/contexts/CartContext";
import { formatPrice } from "@/utils/formatPrice";
import { buildWhatsAppLink } from "@/utils/buildWhatsAppLink";

type MinimalCartTemplateProps = {
  store: StoreResponse;
};

export function MinimalCartTemplate({ store }: MinimalCartTemplateProps) {
  const { items, totalPrice, updateQuantity, removeFromCart, clearCart } = useCartContext();
  const whatsappLink = buildWhatsAppLink({ whatsappNumber: store.whatsappNumber ?? "", items });

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <MinimalNavbar store={store} />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Seu Carrinho</h1>

        {items.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-dashed border-zinc-200 bg-white p-12 text-center">
            <p className="text-zinc-500">Seu carrinho está vazio.</p>
            <Link href={`/${store.slug}`} className="mt-6 inline-block rounded-xl bg-zinc-900 px-8 py-3 text-sm font-bold uppercase tracking-widest text-white">
              Voltar para a loja
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_350px]">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.productId} className="flex flex-col gap-4 rounded-2xl border bg-white p-4 sm:flex-row sm:items-center">
                  <div className="flex-1">
                    <h2 className="font-bold text-zinc-900">{item.name}</h2>
                    <p className="text-sm text-zinc-500">{formatPrice(item.price)} / un</p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 border-t pt-4 sm:border-none sm:pt-0">
                    <div className="flex items-center gap-1">
                      <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="h-10 w-10 rounded-lg border bg-zinc-50 flex items-center justify-center">-</button>
                      <span className="w-10 text-center font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="h-10 w-10 rounded-lg border bg-zinc-50 flex items-center justify-center">+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.productId)} className="text-xs font-bold uppercase tracking-wider text-red-500 hover:text-red-700">
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <aside className="h-fit space-y-4 rounded-3xl border bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-black uppercase tracking-widest">Resumo</h2>
              <div className="flex items-center justify-between border-t border-zinc-100 pt-4">
                <span className="text-zinc-500">Total</span>
                <strong className="text-2xl font-black">{formatPrice(totalPrice)}</strong>
              </div>
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="block w-full rounded-xl bg-green-600 px-5 py-4 text-center text-sm font-bold uppercase tracking-widest text-white transition hover:bg-green-700">
                Finalizar WhatsApp
              </a>
              <button onClick={clearCart} className="w-full text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition">
                Limpar carrinho
              </button>
            </aside>
          </div>
        )}
      </main>
      <MinimalFooter store={store} />
    </div>
  );
}