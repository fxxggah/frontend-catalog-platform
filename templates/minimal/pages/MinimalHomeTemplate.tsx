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
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white">
      <MinimalNavbar store={store} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6">
        <section className="flex flex-col items-center py-16 text-center md:py-32">
          <div className="mb-6 inline-block rounded-full border border-zinc-100 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
            Premium Selection
          </div>
          <h1 className="max-w-4xl text-4xl font-black leading-[1.1] tracking-tighter sm:text-7xl md:text-8xl">
            O essencial elevado ao <span className="text-zinc-300 italic font-serif">máximo</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-zinc-500 leading-relaxed md:text-xl">
            Design minimalista, qualidade excepcional. Descubra nossa curadoria feita para durar.
          </p>
        </section>

        <section className="py-8 sm:py-12">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] text-zinc-900 whitespace-nowrap">Categorias</h2>
            <div className="h-px flex-1 bg-zinc-100 ml-4 sm:ml-6"></div>
          </div>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 xs:grid-cols-2 lg:grid-cols-4">
            {categories.map((c: any) => <MinimalCategoryCard key={c.id} store={store} category={c} />)}
          </div>
        </section>

        <section className="py-12 sm:py-20">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] text-zinc-900 whitespace-nowrap">Coleção Atual</h2>
            <div className="h-px flex-1 bg-zinc-100 ml-4 sm:ml-6"></div>
          </div>
          <div className="grid gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-16 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {productsPage.content.map((p: any) => <MinimalProductCard key={p.id} store={store} product={p} />)}
          </div>
        </section>
      </main>
      
      <MinimalFooter store={store} />
    </div>
  );
}