import type { CategoryResponse, PagedResponse, ProductResponse, StoreResponse } from "@/types";
import { MinimalNavbar } from "../components/MinimalNavbar";
import { MinimalFooter } from "../components/MinimalFooter";
import { MinimalProductCard } from "../components/MinimalProductCard";

type MinimalCategoryTemplateProps = {
  store: StoreResponse;
  category: CategoryResponse | null;
  productsPage: PagedResponse<ProductResponse>;
};

export function MinimalCategoryTemplate({
  store,
  category,
  productsPage,
}: MinimalCategoryTemplateProps) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <MinimalNavbar store={store} />

      <main className="mx-auto max-w-6xl px-4 py-8">
        <section>
          <p className="text-sm text-zinc-500">Categoria</p>
          <h1 className="mt-2 text-3xl font-bold">
            {category?.name ?? "Produtos"}
          </h1>
          <p className="mt-2 text-zinc-600">
            {productsPage.totalElements} produtos encontrados.
          </p>
        </section>

        <section className="mt-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {productsPage.content.map((product) => (
              <MinimalProductCard
                key={product.id}
                store={store}
                product={product}
              />
            ))}
          </div>
        </section>
      </main>

      <MinimalFooter store={store} />
    </div>
  );
}