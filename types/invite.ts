export type InviteValidationResponse = {
  storeName: string
  email: string
}

export type StoreInviteRequest = {
  email: string
}

export type StoreInviteResponse = {
  id: number
  email: string
  expiresAt: string
}