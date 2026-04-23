"use client";

import { useMemo, useState } from "react";
import type { ProductResponse, StoreResponse } from "@/types";
import { MinimalNavbar } from "../components/MinimalNavbar";
import { MinimalFooter } from "../components/MinimalFooter";
import { formatPrice } from "@/utils/formatPrice";
import { useCartContext } from "@/contexts/CartContext";
import { Plus } from "lucide-react";

type MinimalProductTemplateProps = {
  store: StoreResponse;
  product: ProductResponse;
};

export function MinimalProductTemplate({ store, product }: MinimalProductTemplateProps) {
  const { addToCart } = useCartContext();
  const images = product.images ?? [];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const selectedImage = useMemo(() => {
    return images[selectedImageIndex]?.imageUrl ?? null;
  }, [images, selectedImageIndex]);

  const optimizedSelectedImage = selectedImage
    ? selectedImage.replace("/upload/", "/upload/w_1000,q_auto,f_auto/")
    : null;

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900">
      <MinimalNavbar store={store} />

      <main className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-2 lg:items-start">
        {/* Galeria de Fotos */}
        <div className="space-y-6">
          <div className="aspect-square overflow-hidden rounded-[40px] border border-zinc-100 bg-white shadow-sm">
            {optimizedSelectedImage ? (
              <img
                src={optimizedSelectedImage}
                alt={product.name}
                className="h-full w-full object-contain p-8 transition-transform duration-700 hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xs font-bold uppercase tracking-widest text-zinc-300">
                Sem imagem
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex flex-wrap gap-3">
              {images.map((img, index) => {
                const isActive = index === selectedImageIndex;
                return (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`h-20 w-20 overflow-hidden rounded-2xl border bg-white transition-all ${
                      isActive ? "border-zinc-900 ring-4 ring-zinc-900/5 shadow-md" : "border-zinc-100 hover:border-zinc-300"
                    }`}
                  >
                    <img 
                      src={img.imageUrl.replace("/upload/", "/upload/w_200,q_auto,f_auto/")} 
                      className="h-full w-full object-cover" 
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Informações e Compra */}
        <div className="flex flex-col justify-center rounded-[40px] border border-white bg-white p-8 shadow-2xl shadow-zinc-200/50 sm:p-12 lg:sticky lg:top-32">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600">Premium Choice</span>
          
          <h1 className="mt-4 text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">
            {product.name}
          </h1>

          {product.description && (
            <p className="mt-6 text-base leading-relaxed text-zinc-500">
              {product.description}
            </p>
          )}

          <div className="mt-10 flex items-center gap-4">
            {product.promotionalPrice ? (
              <>
                <span className="text-4xl font-black text-zinc-950">{formatPrice(product.promotionalPrice)}</span>
                <span className="text-lg text-zinc-300 line-through decoration-zinc-200">{formatPrice(product.price)}</span>
              </>
            ) : (
              <span className="text-4xl font-black text-zinc-950">{formatPrice(product.price)}</span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="group mt-10 flex w-full items-center justify-center gap-3 rounded-2xl bg-zinc-900 py-5 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-zinc-800 hover:shadow-xl active:scale-95"
          >
            <Plus size={16} />
            Adicionar ao carrinho
          </button>
        </div>
      </main>

      <MinimalFooter store={store} />
    </div>
  );
}