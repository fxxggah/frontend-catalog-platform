export type StoreUserRole = "OWNER" | "ADMIN"

export type StoreUserResponse = {
  userId: number
  storeId: number
  role: StoreUserRole
  name?: string
  email?: string
}