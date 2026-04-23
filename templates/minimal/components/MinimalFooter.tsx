import type { StoreResponse } from "@/types";

type MinimalFooterProps = {
  store: StoreResponse;
};

export function MinimalFooter({ store }: { store: StoreResponse }) {
  return (
    <footer className="mt-20 sm:mt-40 border-t border-zinc-100 bg-white py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 md:grid-cols-2 md:items-end">
          <div className="text-center md:text-left">
            <p className="text-xl sm:text-2xl font-black tracking-tighter text-zinc-900">
              {store.name.toUpperCase()}.
            </p>
            <p className="mt-4 mx-auto md:mx-0 max-w-xs text-sm leading-relaxed text-zinc-400">
              Produtos selecionados para um estilo de vida consciente e minimalista.
            </p>
          </div>
          
          <div className="flex flex-col gap-6 items-center md:items-end">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">
               {store.whatsappNumber && (
                 <a href={`https://wa.me/${store.whatsappNumber}`} className="hover:text-zinc-900 transition">WhatsApp</a>
               )}
               <span className="hidden sm:inline text-zinc-300">|</span>
               <span>{store.city} • {store.state}</span>
            </div>
            <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-zinc-300 text-center">
              © {new Date().getFullYear()} {store.name}.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}