"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag, MessageCircle, ArrowRight, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/CartContext"
import { formatPrice, generateWhatsAppLink } from "@/utils/formatPrice"
import type { Store } from "@/types"

type CartContentProps = {
  store: Store
}

export function CartContent({ store }: CartContentProps) {
  const { items, removeItem, updateQuantity, getSubtotal, getTotal, clearCart } = useCart()

  const generateOrderMessage = () => {
    if (items.length === 0) return ""

    const itemsList = items
      .map((item) => `${item.quantity}x ${item.name} - ${formatPrice(item.price * item.quantity)}`)
      .join("\n")

    const total = formatPrice(getTotal())

    return `Ola! Gostaria de comprar:\n\n${itemsList}\n\nTotal: ${total}`
  }

  const whatsappLink = generateWhatsAppLink(store.whatsappNumber, generateOrderMessage())

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="font-serif text-2xl font-bold mb-2">Seu carrinho esta vazio</h2>
        <p className="text-muted-foreground mb-8 max-w-sm">
          Parece que voce ainda nao adicionou nenhum produto ao seu carrinho.
        </p>
        <Button asChild size="lg" className="rounded-full h-12 px-8">
          <Link href={`/${store.slug}`}>
            Explorar Produtos
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Items List */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-xl font-bold">
            Itens no Carrinho ({items.length})
          </h2>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-destructive hover:text-destructive rounded-full"
            onClick={clearCart}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Limpar
          </Button>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <Card key={item.productId} className="overflow-hidden border-0 shadow-sm">
              <CardContent className="p-4 md:p-6">
                <div className="flex gap-4 md:gap-6">
                  {/* Image */}
                  <Link
                    href={`/${store.slug}/product/${item.slug}`}
                    className="relative w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-xl overflow-hidden bg-secondary"
                  >
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col">
                    <Link
                      href={`/${store.slug}/product/${item.slug}`}
                      className="font-medium text-base md:text-lg hover:text-primary transition-colors line-clamp-2"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xl font-bold mt-2">
                      {formatPrice(item.price)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-auto pt-4">
                      <div className="flex items-center gap-1 bg-secondary rounded-full p-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-10 text-center font-semibold">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 text-muted-foreground hover:text-destructive rounded-full"
                        onClick={() => removeItem(item.productId)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="lg:col-span-1">
        <Card className="sticky top-24 border-0 shadow-lg">
          <CardContent className="p-6">
            <h2 className="font-serif text-xl font-bold mb-6">Resumo</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatPrice(getSubtotal())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frete</span>
                <span className="text-sm text-muted-foreground">A combinar</span>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="flex justify-between items-baseline">
              <span className="font-semibold">Total</span>
              <span className="text-2xl font-bold">
                {formatPrice(getTotal())}
              </span>
            </div>

            <div className="mt-8 space-y-3">
              <Button
                asChild
                size="lg"
                className="w-full h-14 rounded-full text-base font-medium bg-[#25D366] hover:bg-[#20BD5A]"
              >
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Finalizar pelo WhatsApp
                </a>
              </Button>

              <Button asChild variant="outline" size="lg" className="w-full h-12 rounded-full">
                <Link href={`/${store.slug}`}>
                  Continuar Comprando
                </Link>
              </Button>
            </div>

            {/* Trust Badge */}
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Compra 100% segura</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
