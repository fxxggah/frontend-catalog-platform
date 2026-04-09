import { notFound } from "next/navigation"
import { AdminHeader } from "@/components/admin/AdminHeader"
import { ProductForm } from "@/components/admin/ProductForm"
import { getProductById } from "@/services/productService"
import { getCategories } from "@/services/categoryService"

type EditProductPageProps = {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params
  const productId = parseInt(id, 10)

  const [product, categories] = await Promise.all([
    getProductById(productId),
    getCategories(),
  ])

  if (!product) {
    notFound()
  }

  return (
    <>
      <AdminHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Produtos", href: "/admin/products" },
          { label: product.name },
        ]}
      />

      <div className="flex flex-1 flex-col gap-6 p-6">
        <div>
          <h1 className="text-2xl font-bold">Editar Produto</h1>
          <p className="text-muted-foreground">
            Atualize os dados do produto
          </p>
        </div>

        <ProductForm product={product} categories={categories} />
      </div>
    </>
  )
}
