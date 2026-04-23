export type ProductImageResponse = {
  id: number
  imageUrl: string
  position: number
}

export type ProductImageReorderRequest = {
  imageIds: number[]
}

export type ProductRequest = {
  name: string
  description?: string
  price: number
  promotionalPrice?: number
  categoryId: number
  visible?: boolean
}

export type ProductResponse = {
  id: number
  name: string
  slug: string
  description?: string
  price: number
  promotionalPrice?: number
  visible: boolean
  createdAt: string
  categoryId: number
  images?: ProductImageResponse[]
}

export type CartItem = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  storeSlug: string;
};

export type Cart = {
  storeSlug: string;
  items: CartItem[];
};