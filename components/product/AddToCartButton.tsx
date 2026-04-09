"use client"

import { useState } from "react"
import { ShoppingBag, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/CartContext"
import type { Product } from "@/types"

type AddToCartButtonProps = {
  product: Product
  className?: string
  size?: "default" | "lg"
}

export function AddToCartButton({ product, className, size = "default" }: AddToCartButtonProps) {
  const { addItem, isInCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const inCart = isInCart(product.id)

  const handleClick = async () => {
    setIsAdding(true)
    // Simulate a brief loading state for better UX
    await new Promise((resolve) => setTimeout(resolve, 300))
    addItem(product)
    setIsAdding(false)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <Button
      onClick={handleClick}
      className={className}
      size={size}
      disabled={isAdding}
    >
      {isAdding ? (
        <>
          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
          Adicionando...
        </>
      ) : isAdded || inCart ? (
        <>
          <Check className="h-5 w-5 mr-2" />
          {isAdded ? "Adicionado!" : "No Carrinho"}
        </>
      ) : (
        <>
          <ShoppingBag className="h-5 w-5 mr-2" />
          Adicionar ao Carrinho
        </>
      )}
    </Button>
  )
}
