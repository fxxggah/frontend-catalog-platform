import { ProductCard } from "./ProductCard"
import type { Product } from "@/types"

type ProductGridProps = {
  products: Product[]
  storeSlug: string
}

export function ProductGrid({ products, storeSlug }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-lg text-muted-foreground">Nenhum produto encontrado</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} storeSlug={storeSlug} />
      ))}
    </div>
  )
}
