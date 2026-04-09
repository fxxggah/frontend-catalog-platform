import { mockStore, mockStores } from "@/mocks/store"
import type { Store } from "@/types"

// Simula delay de API
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getStoreBySlug(slug: string): Promise<Store | null> {
  await delay(100)
  const store = mockStores.find((s) => s.slug === slug)
  return store || null
}

export async function getDefaultStore(): Promise<Store> {
  await delay(100)
  return mockStore
}

export async function updateStore(storeId: number, data: Partial<Store>): Promise<Store> {
  await delay(300)
  // Em producao, isso faria uma chamada PUT para a API
  return { ...mockStore, ...data }
}
