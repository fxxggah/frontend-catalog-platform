import { notFound } from "next/navigation"
import { getStoreBySlug } from "@/services/storeService"
import { getCategories } from "@/services/categoryService"
import { StoreHeader } from "@/components/layout/StoreHeader"
import { StoreFooter } from "@/components/layout/StoreFooter"
import { CartProvider } from "@/contexts/CartContext"

type StoreLayoutProps = {
  children: React.ReactNode
  params: Promise<{ storeSlug: string }>
}

export default async function StoreLayout({ children, params }: StoreLayoutProps) {
  const { storeSlug } = await params
  const store = await getStoreBySlug(storeSlug)

  if (!store) {
    notFound()
  }

  const categories = await getCategories(store.id)

  return (
    <CartProvider>
      <div
        className="min-h-screen flex flex-col"
        style={
          {
            "--color-store-primary": store.primaryColor,
            "--color-store-secondary": store.secondaryColor,
            "--color-store-tertiary": store.tertiaryColor,
          } as React.CSSProperties
        }
      >
        <StoreHeader store={store} categories={categories} />
        <main className="flex-1">{children}</main>
        <StoreFooter store={store} categories={categories} />
      </div>
    </CartProvider>
  )
}
