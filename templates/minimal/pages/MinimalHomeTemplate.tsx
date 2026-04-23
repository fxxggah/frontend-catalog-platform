import type { CategoryResponse, PagedResponse, ProductResponse, StoreResponse } from "@/types";
import { MinimalNavbar } from "../components/MinimalNavbar";
import { MinimalFooter } from "../components/MinimalFooter";
import { MinimalCategoryCard } from "../components/MinimalCategoryCard";
import { MinimalProductCard } from "../components/MinimalProductCard";

type MinimalHomeTemplateProps = {
  store: StoreResponse;
  categories: CategoryResponse[];
  productsPage: PagedResponse<ProductResponse>;
};

export function MinimalHomeTemplate({ store, categories, productsPage }: any) {
  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 selection:bg-zinc-950 selection:text-white">
      <MinimalNavbar store={store} />

      <main className="mx-auto max-w-7xl px-6">
        {/* Hero Section Re-imaginada */}
        <section className="relative flex flex-col items-center py-24 text-center md:py-40">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-zinc-50 border border-zinc-100 px-4 py-1.5 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-600"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Curadoria {new Date().getFullYear()}</span>
          </div>
          
          <h1 className="max-w-5xl text-5xl font-black leading-[1.05] tracking-tight sm:text-8xl md:text-[100px]">
            O essencial <br /> 
            <span className="bg-gradient-to-r from-zinc-900 via-zinc-500 to-zinc-900 bg-clip-text text-transparent italic font-serif font-light">elevado</span>.
          </h1>
          
          <p className="mt-10 max-w-xl text-balance text-lg text-zinc-400 leading-relaxed md:text-xl">
            Design que ignora o tempo. Qualidade que desafia o uso. <br className="hidden md:block" />
            Descubra nossa nova coleção minimalista.
          </p>
          
          <div className="mt-12 flex gap-4">
             <button className="rounded-full bg-zinc-950 px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-white transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-zinc-300">
               Ver Coleção
             </button>
          </div>
        </section>

        {/* Seção de Categorias com Grid Assimétrico */}
        <section className="py-12">
          <div className="mb-12 flex items-end justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Navegue por</span>
              <h2 className="text-3xl font-bold tracking-tight">Categorias</h2>
            </div>
            <div className="h-[1px] flex-1 bg-zinc-100 mx-8 mb-2"></div>
          </div>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c: any) => <MinimalCategoryCard key={c.id} store={store} category={c} />)}
          </div>
        </section>

        {/* Vitrine de Produtos */}
        <section className="py-24">
           <div className="mb-12 flex items-end justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Destaques</span>
              <h2 className="text-3xl font-bold tracking-tight">Coleção Atual</h2>
            </div>
          </div>
          <div className="grid gap-x-8 gap-y-16 grid-cols-2 lg:grid-cols-4">
            {productsPage.content.map((p: any) => <MinimalProductCard key={p.id} store={store} product={p} />)}
          </div>
        </section>
      </main>
      
      <MinimalFooter store={store} />
    </div>
  );
}