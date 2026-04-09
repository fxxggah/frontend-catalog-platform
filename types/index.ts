// Store Types
export type Store = {
  id: number
  name: string
  slug: string
  logo: string
  primaryColor: string
  secondaryColor: string
  tertiaryColor: string
  whatsappNumber: string
  instagram?: string
  facebook?: string
  address?: string
  googleMapsLink?: string
  template: "fashion" | "minimal" | "streetwear"
}

// Category Types
export type Category = {
  id: number
  name: string
  slug: string
  storeId: number
  image?: string
}

// Product Image Types
export type ProductImage = {
  id: number
  imageUrl: string
  position: number
}

// Product Types
export type Product = {
  id: number
  name: string
  slug: string
  description: string
  price: number
  discountPrice?: number
  categoryId: number
  categorySlug: string
  storeId: number
  visible: boolean
  images: ProductImage[]
}

// Cart Types
export type CartItem = {
  productId: number
  name: string
  slug: string
  price: number
  quantity: number
  image: string
}

export type Cart = {
  items: CartItem[]
  storeSlug: string
}

// Admin Form Types
export type ProductFormData = {
  name: string
  slug: string
  description: string
  price: number
  discountPrice?: number
  categoryId: number
  images: string[]
  visible: boolean
}

export type CategoryFormData = {
  name: string
  slug: string
  image?: string
}

export type StoreSettingsFormData = {
  name: string
  logo: string
  primaryColor: string
  secondaryColor: string
  tertiaryColor: string
  whatsappNumber: string
  instagram?: string
  facebook?: string
  address?: string
  googleMapsLink?: string
  template: "fashion" | "minimal" | "streetwear"
}
