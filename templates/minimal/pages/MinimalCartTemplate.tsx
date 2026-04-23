"use client";

import Link from "next/link";
import type { StoreResponse } from "@/types";
import { MinimalNavbar } from "../components/MinimalNavbar";
import { MinimalFooter } from "../components/MinimalFooter";
import { useCartContext } from "@/contexts/CartContext";
import { formatPrice } from "@/utils/formatPrice";
import { buildWhatsAppLink } from "@/utils/buildWhatsAppLink";
import { Trash2, Plus, Minus } from "lucide-react"; // Adicionei ícones para o look premium

type MinimalCartTemplateProps = {
  store: StoreResponse;
};

export function MinimalCartTemplate({ store }: MinimalCartTemplateProps) {
  const { items, totalPrice, updateQuantity, removeFromCart, clearCart } = useCartContext();
  const whatsappLink = buildWhatsAppLink({ whatsappNumber: store.whatsappNumber ?? "", items });

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900">
      <MinimalNavbar store={store} />
      
      <main className="mx-auto max-w-6xl px-6 py-12">
        <header className="mb-10">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Checkout</span>
          <h1 className="mt-2 text-4xl font-black tracking-tight">Seu Carrinho</h1>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-[32px] border border-dashed border-zinc-200 bg-white p-20 text-center">
            <div className="mb-4 h-12 w-12 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-300">
               <Trash2 size={24} />
            </div>
            <p className="text-lg font-medium text-zinc-500">O carrinho parece solitário.</p>
            <Link href={`/${store.slug}`} className="mt-8 rounded-full bg-zinc-900 px-10 py-4 text-[11px] font-bold uppercase tracking-widest text-white transition-all hover:scale-105 active:scale-95">
              Explorar Produtos
            </Link>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
            {/* Lista de Itens */}
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.productId} className="group relative flex flex-col gap-5 rounded-[24px] border border-zinc-100 bg-white p-5 transition-all hover:shadow-xl hover:shadow-zinc-200/50 sm:flex-row sm:items-center">
                  <div className="flex flex-1 items-center gap-5">
                    {/* Placeholder para imagem se houver no item, ou apenas info */}
                    <div className="flex-1">
                      <h2 className="text-lg font-bold tracking-tight text-zinc-900">{item.name}</h2>
                      <p className="text-sm font-medium text-zinc-400">{formatPrice(item.price)} / unidade</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-6 border-t border-zinc-50 pt-4 sm:border-none sm:pt-0">
                    <div className="flex items-center gap-2 rounded-full border border-zinc-100 bg-zinc-50 p-1">
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)} 
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-zinc-600 shadow-sm transition-hover hover:bg-zinc-900 hover:text-white"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)} 
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-zinc-600 shadow-sm transition-hover hover:bg-zinc-900 hover:text-white"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.productId)} 
                      className="rounded-full p-2 text-zinc-300 transition-colors hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Sumário */}
            <aside className="h-fit sticky top-28 space-y-6 rounded-[32px] border border-white bg-white p-8 shadow-2xl shadow-zinc-200/60">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Resumo do Pedido</h2>
              
              <div className="flex items-center justify-between border-t border-zinc-100 pt-6">
                <span className="text-zinc-500 font-medium">Subtotal</span>
                <strong className="text-3xl font-black tracking-tighter text-zinc-950">
                  {formatPrice(totalPrice)}
                </strong>
              </div>

              <div className="space-y-3 pt-4">
                <a 
                  href={whatsappLink} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex w-full items-center justify-center rounded-2xl bg-green-600 py-5 text-[11px] font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-green-700 hover:shadow-lg hover:shadow-green-200 active:scale-[0.98]"
                >
                  Finalizar no WhatsApp
                </a>
                
                <button 
                  onClick={clearCart} 
                  className="w-full py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-300 transition hover:text-red-500"
                >
                  Esvaziar Carrinho
                </button>
              </div>
            </aside>
          </div>
        )}
      </main>

      <MinimalFooter store={store} />
    </div>
  );
}