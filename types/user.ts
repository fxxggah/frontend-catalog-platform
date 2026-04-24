export type StoreUserRole = "OWNER" | "ADMIN"

export type StoreUserResponse = {
  id: number
  userId: number
  storeId: number
  role: StoreUserRole
  name?: string
  email?: string
  createdAt?: string
}