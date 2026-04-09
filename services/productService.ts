import { mockProducts } from "@/mocks/products"
import type { Product, ProductFormData } from "@/types"

// Simula delay de API
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export type GetProductsParams = {
  storeId?: number
  categorySlug?: string
  search?: string
  page?: number
  limit?: number
  visible?: boolean
}

export type PaginatedProducts = {
  products: Product[]
  total: number
  page: number
  totalPages: number
}

export async function getProducts(params: GetProductsParams = {}): Promise<PaginatedProducts> {
  await delay(100)

  let filtered = [...mockProducts]

  if (params.storeId) {
    filtered = filtered.filter((p) => p.storeId === params.storeId)
  }

  if (params.categorySlug) {
    filtered = filtered.filter((p) => p.categorySlug === params.categorySlug)
  }

  if (params.search) {
    const searchLower = params.search.toLowerCase()
    filtered = filtered.filter(
      (p) => p.name.toLowerCase().includes(searchLower) || p.description.toLowerCase().includes(searchLower)
    )
  }

  if (params.visible !== undefined) {
    filtered = filtered.filter((p) => p.visible === params.visible)
  }

  const total = filtered.length
  const page = params.page || 1
  const limit = params.limit || 12
  const totalPages = Math.ceil(total / limit)

  const start = (page - 1) * limit
  const products = filtered.slice(start, start + limit)

  return {
    products,
    total,
    page,
    totalPages,
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await delay(100)
  const product = mockProducts.find((p) => p.slug === slug)
  return product || null
}

export async function getProductById(id: number): Promise<Product | null> {
  await delay(100)
  const product = mockProducts.find((p) => p.id === id)
  return product || null
}

export async function getRelatedProducts(productId: number, limit: number = 4): Promise<Product[]> {
  await delay(100)
  const product = mockProducts.find((p) => p.id === productId)
  if (!product) return []

  return mockProducts.filter((p) => p.categorySlug === product.categorySlug && p.id !== productId).slice(0, limit)
}

export async function getFeaturedProducts(storeId: number, limit: number = 8): Promise<Product[]> {
  await delay(100)
  return mockProducts.filter((p) => p.storeId === storeId && p.visible && p.discountPrice).slice(0, limit)
}

export async function createProduct(data: ProductFormData, storeId: number): Promise<Product> {
  await delay(300)
  // Em producao, isso faria uma chamada POST para a API
  const newProduct: Product = {
    id: mockProducts.length + 1,
    ...data,
    categorySlug: "", // Seria preenchido baseado no categoryId
    storeId,
    images: data.images.map((url, index) => ({
      id: index + 1,
      imageUrl: url,
      position: index + 1,
    })),
  }
  return newProduct
}

export async function updateProduct(id: number, data: Partial<ProductFormData>): Promise<Product> {
  await delay(300)
  const product = mockProducts.find((p) => p.id === id)
  if (!product) {
    throw new Error("Produto nao encontrado")
  }
  return {
    ...product,
    ...data,
    images: data.images
      ? data.images.map((url, index) => ({
          id: index + 1,
          imageUrl: url,
          position: index + 1,
        }))
      : product.images,
  }
}

export async function deleteProduct(id: number): Promise<void> {
  await delay(300)
  // Em producao, isso faria uma chamada DELETE para a API
}
