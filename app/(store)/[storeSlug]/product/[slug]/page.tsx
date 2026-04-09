import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight, Truck, Shield, RotateCcw, Star } from "lucide-react"
import { getStoreBySlug } from "@/services/storeService"
import { getProductBySlug, getRelatedProducts } from "@/services/productService"
import { getCategoryById } from "@/services/categoryService"
import { ProductGallery } from "@/components/product/ProductGallery"
import { AddToCartButton } from "@/components/product/AddToCartButton"
import { WhatsAppButton } from "@/components/product/WhatsAppButton"
import { ProductGrid } from "@/components/product/ProductGrid"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatPrice, calculateDiscount } from "@/utils/formatPrice"

type ProductPageProps = {
  params: Promise<{ storeSlug: string; slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { storeSlug, slug } = await params
  const [store, product] = await Promise.all([
    getStoreBySlug(storeSlug),
    getProductBySlug(slug),
  ])

  if (!store || !product) {
    return {
      title: "Produto nao encontrado",
    }
  }

  return {
    title: `${product.name} | ${store.name}`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} | ${store.name}`,
      description: product.description.slice(0, 160),
      type: "product",
      images: product.images[0]?.imageUrl ? [product.images[0].imageUrl] : [],
    },
  }
}

const features = [
  { icon: Truck, label: "Entrega Rapida" },
  { icon: Shield, label: "Pagamento Seguro" },
  { icon: RotateCcw, label: "Troca Facilitada" },
]

export default async function ProductPage({ params }: ProductPageProps) {
  const { storeSlug, slug } = await params

  const [store, product] = await Promise.all([
    getStoreBySlug(storeSlug),
    getProductBySlug(slug),
  ])

  if (!store || !product) {
    notFound()
  }

  const [category, relatedProducts] = await Promise.all([
    getCategoryById(product.categoryId),
    getRelatedProducts(product.id, 4),
  ])

  const hasDiscount = product.discountPrice && product.discountPrice < product.price
  const discountPercentage = hasDiscount
    ? calculateDiscount(product.price, product.discountPrice!)
    : 0

  return (
    <div className="min-h-screen">
      <div className="container py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link
            href={`/${storeSlug}`}
            className="hover:text-foreground transition-colors"
          >
            Inicio
          </Link>
          <ChevronRight className="h-4 w-4" />
          {category && (
            <>
              <Link
                href={`/${storeSlug}/category/${category.slug}`}
                className="hover:text-foreground transition-colors"
              >
                {category.name}
              </Link>
              <ChevronRight className="h-4 w-4" />
            </>
          )}
          <span className="text-foreground font-medium line-clamp-1">{product.name}</span>
        </nav>

        {/* Product */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Gallery */}
          <ProductGallery images={product.images} productName={product.name} />

          {/* Info */}
          <div className="space-y-8">
            {/* Category & Badge */}
            <div className="flex items-center gap-3">
              {category && (
                <Badge variant="secondary" className="rounded-full px-4 py-1 font-medium">
                  {category.name}
                </Badge>
              )}
              {hasDiscount && (
                <Badge className="rounded-full px-4 py-1 bg-primary text-primary-foreground font-semibold">
                  -{discountPercentage}% OFF
                </Badge>
              )}
            </div>

            {/* Name */}
            <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight">
              {product.name}
            </h1>

            {/* Rating placeholder */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i <= 4 ? "fill-amber-400 text-amber-400" : "text-muted"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(12 avaliacoes)</span>
            </div>

            {/* Price */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                {hasDiscount ? (
                  <>
                    <span className="text-4xl font-bold">
                      {formatPrice(product.discountPrice!)}
                    </span>
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPrice(product.price)}
                    </span>
                  </>
                ) : (
                  <span className="text-4xl font-bold">{formatPrice(product.price)}</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                ou em ate 3x sem juros
              </p>
            </div>

            <Separator />

            {/* Description */}
            <div className="space-y-3">
              <h3 className="font-semibold">Descricao</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 pt-4">
              <AddToCartButton product={product} size="lg" className="h-14 rounded-full text-base font-medium" />
              <WhatsAppButton
                phone={store.whatsappNumber}
                productName={product.name}
                storeName={store.name}
                size="lg"
                className="h-14 rounded-full text-base font-medium"
              />
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {features.map((feature) => (
                <div 
                  key={feature.label} 
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-secondary/50 text-center"
                >
                  <feature.icon className="h-5 w-5 text-primary" />
                  <span className="text-xs font-medium">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 md:mt-24">
            <div className="flex items-center justify-between mb-10">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Voce tambem vai gostar
                </p>
                <h2 className="font-serif text-2xl md:text-3xl font-bold">
                  Produtos Relacionados
                </h2>
              </div>
            </div>
            <ProductGrid products={relatedProducts} storeSlug={storeSlug} />
          </section>
        )}
      </div>
    </div>
  )
}
