export type StoreRequest = {
  name: string
  logo?: string
  primaryColor?: string
  secondaryColor?: string
  tertiaryColor?: string
  whatsappNumber?: string
  instagram?: string
  facebook?: string
  template?: string
  street?: string
  number?: string
  city?: string
  state?: string
  country?: string
  googleMapsLink?: string
}

export type StoreResponse = {
  id: number
  name: string
  slug: string
  logo?: string
  primaryColor?: string
  secondaryColor?: string
  tertiaryColor?: string
  whatsappNumber?: string
  instagram?: string
  facebook?: string
  template?: string
  active: boolean
  street?: string
  number?: string
  city?: string
  state?: string
  country?: string
  googleMapsLink?: string
  createdAt: string
}