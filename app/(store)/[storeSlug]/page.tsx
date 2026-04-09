import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getStoreBySlug } from "@/services/storeService"
import { getProducts, getFeaturedProducts } from "@/services/productService"
import { getCategories } from "@/services/categoryService"
import { TemplateRenderer } from "@/templates/TemplateRenderer"

type StorePageProps = {
  params: Promise<{ storeSlug: string }>
  searchParams: Promise<{ search?: string }>
}

export async function generateMetadata({ params }: StorePageProps): Promise<Metadata> {
  const { storeSlug } = await params
  const store = await getStoreBySlug(storeSlug)

  if (!store) {
    return {
      title: "Loja nao encontrada",
    }
  }

  return {
    title: `${store.name} | Catalogo Online`,
    description: `Confira os melhores produtos da ${store.name}. Catalogo online com as melhores ofertas.`,
    openGraph: {
      title: `${store.name} | Catalogo Online`,
      description: `Confira os melhores produtos da ${store.name}. Catalogo online com as melhores ofertas.`,
      type: "website",
    },
  }
}

export default async function StorePage({ params, searchParams }: StorePageProps) {
  const { storeSlug } = await params
  const { search } = await searchParams

  const store = await getStoreBySlug(storeSlug)

  if (!store) {
    notFound()
  }

  const [{ products }, featuredProducts, categories] = await Promise.all([
    getProducts({ storeId: store.id, visible: true, search }),
    getFeaturedProducts(store.id),
    getCategories(store.id),
  ])

  return (
    <TemplateRenderer
      store={store}
      products={products}
      featuredProducts={featuredProducts}
      categories={categories}
    />
  )
}
