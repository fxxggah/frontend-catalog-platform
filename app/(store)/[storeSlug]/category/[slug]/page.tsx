import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { getStoreBySlug } from "@/services/storeService"
import { getProducts } from "@/services/productService"
import { getCategoryBySlug } from "@/services/categoryService"
import { ProductGrid } from "@/components/product/ProductGrid"

type CategoryPageProps = {
  params: Promise<{ storeSlug: string; slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { storeSlug, slug } = await params
  const [store, category] = await Promise.all([
    getStoreBySlug(storeSlug),
    getCategoryBySlug(slug),
  ])

  if (!store || !category) {
    return {
      title: "Categoria nao encontrada",
    }
  }

  return {
    title: `${category.name} | ${store.name}`,
    description: `Confira os melhores produtos de ${category.name} na ${store.name}.`,
    openGraph: {
      title: `${category.name} | ${store.name}`,
      description: `Confira os melhores produtos de ${category.name} na ${store.name}.`,
      type: "website",
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { storeSlug, slug } = await params

  const [store, category] = await Promise.all([
    getStoreBySlug(storeSlug),
    getCategoryBySlug(slug),
  ])

  if (!store || !category) {
    notFound()
  }

  const { products } = await getProducts({
    storeId: store.id,
    categorySlug: slug,
    visible: true,
  })

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link
          href={`/${storeSlug}`}
          className="hover:text-[var(--color-store-primary)] transition-colors"
        >
          Inicio
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">{category.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
        <p className="text-muted-foreground">
          {products.length} {products.length === 1 ? "produto encontrado" : "produtos encontrados"}
        </p>
      </div>

      {/* Products */}
      <ProductGrid products={products} storeSlug={storeSlug} />
    </div>
  )
}
