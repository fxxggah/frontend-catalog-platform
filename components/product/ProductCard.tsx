"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingBag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Product } from "@/types"
import { formatPrice, calculateDiscount } from "@/utils/formatPrice"

type ProductCardProps = {
  product: Product
  storeSlug: string
}

export function ProductCard({ product, storeSlug }: ProductCardProps) {
  const hasDiscount = product.discountPrice && product.discountPrice < product.price
  const discountPercentage = hasDiscount
    ? calculateDiscount(product.price, product.discountPrice!)
    : 0

  return (
    <Link href={`/${storeSlug}/product/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-secondary mb-4">
        {product.images[0] && (
          <Image
            src={product.images[0].imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        )}
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        
        {/* Discount Badge */}
        {hasDiscount && (
          <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground font-semibold rounded-full px-3 py-1">
            -{discountPercentage}%
          </Badge>
        )}
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <Button
            size="icon"
            variant="secondary"
            className="h-10 w-10 rounded-full shadow-lg bg-card hover:bg-card"
            onClick={(e) => {
              e.preventDefault()
              // TODO: Add to wishlist
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-10 w-10 rounded-full shadow-lg bg-card hover:bg-card"
            onClick={(e) => {
              e.preventDefault()
              // TODO: Quick add to cart
            }}
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Quick View */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button 
            className="w-full rounded-full font-medium"
            variant="secondary"
          >
            Ver Detalhes
          </Button>
        </div>
      </div>
      
      <div className="space-y-2 px-1">
        <h3 className="font-medium text-base line-clamp-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          {hasDiscount ? (
            <>
              <span className="font-bold text-lg">
                {formatPrice(product.discountPrice!)}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="font-bold text-lg">{formatPrice(product.price)}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
