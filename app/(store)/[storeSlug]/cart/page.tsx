import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getStoreBySlug } from "@/services/storeService"
import { CartContent } from "@/components/cart/CartContent"

type CartPageProps = {
  params: Promise<{ storeSlug: string }>
}

export async function generateMetadata({ params }: CartPageProps): Promise<Metadata> {
  const { storeSlug } = await params
  const store = await getStoreBySlug(storeSlug)

  if (!store) {
    return {
      title: "Carrinho",
    }
  }

  return {
    title: `Carrinho | ${store.name}`,
    description: `Seu carrinho de compras na ${store.name}.`,
  }
}

export default async function CartPage({ params }: CartPageProps) {
  const { storeSlug } = await params
  const store = await getStoreBySlug(storeSlug)

  if (!store) {
    notFound()
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Carrinho</h1>
      <CartContent store={store} />
    </div>
  )
}
