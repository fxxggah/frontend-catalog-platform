import { mockCategories } from "@/mocks/categories"
import type { Category, CategoryFormData } from "@/types"

// Simula delay de API
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getCategories(storeId?: number): Promise<Category[]> {
  await delay(100)
  if (storeId) {
    return mockCategories.filter((c) => c.storeId === storeId)
  }
  return mockCategories
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  await delay(100)
  const category = mockCategories.find((c) => c.slug === slug)
  return category || null
}

export async function getCategoryById(id: number): Promise<Category | null> {
  await delay(100)
  const category = mockCategories.find((c) => c.id === id)
  return category || null
}

export async function createCategory(data: CategoryFormData, storeId: number): Promise<Category> {
  await delay(300)
  // Em producao, isso faria uma chamada POST para a API
  const newCategory: Category = {
    id: mockCategories.length + 1,
    ...data,
    storeId,
  }
  return newCategory
}

export async function updateCategory(id: number, data: Partial<CategoryFormData>): Promise<Category> {
  await delay(300)
  const category = mockCategories.find((c) => c.id === id)
  if (!category) {
    throw new Error("Categoria nao encontrada")
  }
  return { ...category, ...data }
}

export async function deleteCategory(id: number): Promise<void> {
  await delay(300)
  // Em producao, isso faria uma chamada DELETE para a API
}
