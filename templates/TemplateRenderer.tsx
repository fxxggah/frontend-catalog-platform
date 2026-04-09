import { FashionTemplate } from "./fashion/FashionTemplate"
import type { Store, Product, Category } from "@/types"

type TemplateRendererProps = {
  store: Store
  products: Product[]
  featuredProducts: Product[]
  categories: Category[]
}

export function TemplateRenderer({
  store,
  products,
  featuredProducts,
  categories,
}: TemplateRendererProps) {
  switch (store.template) {
    case "fashion":
      return (
        <FashionTemplate
          store={store}
          products={products}
          featuredProducts={featuredProducts}
          categories={categories}
        />
      )
    case "minimal":
      // TODO: Implementar MinimalTemplate
      return (
        <FashionTemplate
          store={store}
          products={products}
          featuredProducts={featuredProducts}
          categories={categories}
        />
      )
    case "streetwear":
      // TODO: Implementar StreetwearTemplate
      return (
        <FashionTemplate
          store={store}
          products={products}
          featuredProducts={featuredProducts}
          categories={categories}
        />
      )
    default:
      return (
        <FashionTemplate
          store={store}
          products={products}
          featuredProducts={featuredProducts}
          categories={categories}
        />
      )
  }
}
