import { AdminHeader } from "@/components/admin/AdminHeader"
import { ProductForm } from "@/components/admin/ProductForm"
import { getCategories } from "@/services/categoryService"

export default async function NewProductPage() {
  const categories = await getCategories()

  return (
    <>
      <AdminHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Produtos", href: "/admin/products" },
          { label: "Novo Produto" },
        ]}
      />

      <div className="flex flex-1 flex-col gap-6 p-6">
        <div>
          <h1 className="text-2xl font-bold">Novo Produto</h1>
          <p className="text-muted-foreground">
            Preencha os dados para criar um novo produto
          </p>
        </div>

        <ProductForm categories={categories} />
      </div>
    </>
  )
}
