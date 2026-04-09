import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MessageCircle, Sparkles, Truck, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductGrid } from "@/components/product/ProductGrid"
import { CategoryList } from "@/components/category/CategoryList"
import { generateWhatsAppLink } from "@/utils/formatPrice"
import type { Store, Product, Category } from "@/types"

type FashionTemplateProps = {
  store: Store
  products: Product[]
  featuredProducts: Product[]
  categories: Category[]
}

const features = [
  {
    icon: Truck,
    title: "Entrega Rapida",
    description: "Envio para todo Brasil"
  },
  {
    icon: Shield,
    title: "Compra Segura",
    description: "Pagamento protegido"
  },
  {
    icon: Clock,
    title: "Atendimento",
    description: "Suporte via WhatsApp"
  },
  {
    icon: Sparkles,
    title: "Qualidade",
    description: "Produtos selecionados"
  },
]

export function FashionTemplate({
  store,
  products,
  featuredProducts,
  categories,
}: FashionTemplateProps) {
  const whatsappLink = generateWhatsAppLink(
    store.whatsappNumber,
    `Ola! Vim pelo site ${store.name} e gostaria de mais informacoes.`
  )

  return (
    <div className="flex flex-col">
      {/* Hero Section - Modern Split Layout */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-secondary/30">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Nova Colecao Disponivel</span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-balance">
                {store.name}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
                Descubra pecas exclusivas selecionadas com cuidado para transformar seu estilo com elegancia e sofisticacao.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="h-14 px-8 text-base font-medium rounded-full"
                >
                  <Link href={`/${store.slug}#products`}>
                    Explorar Colecao
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline"
                  className="h-14 px-8 text-base font-medium rounded-full border-2"
                >
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Fale Conosco
                  </a>
                </Button>
              </div>
            </div>
            <div className="relative aspect-[4/5] lg:aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=1200&fit=crop"
                alt="Colecao em destaque"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </div>
        </div>
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      </section>

      {/* Features Bar */}
      <section className="py-8 border-y bg-card">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-secondary">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">{feature.title}</p>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 md:py-24">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Navegue por</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold">Categorias</h2>
            </div>
          </div>
          <CategoryList categories={categories} storeSlug={store.slug} />
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-20 md:py-24 bg-secondary/30">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Ofertas especiais</p>
                <h2 className="font-serif text-3xl md:text-4xl font-bold">Em Promocao</h2>
              </div>
              <Link
                href={`/${store.slug}#products`}
                className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors group"
              >
                Ver todas as ofertas
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <ProductGrid products={featuredProducts} storeSlug={store.slug} />
          </div>
        </section>
      )}

      {/* All Products */}
      <section id="products" className="py-20 md:py-24">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Nosso catalogo</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold">Todos os Produtos</h2>
            </div>
          </div>
          <ProductGrid products={products} storeSlug={store.slug} />
        </div>
      </section>

      {/* About Section - Modern Design */}
      <section className="py-20 md:py-24 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=1000&fit=crop"
                  alt="Sobre nos"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm hidden lg:block" />
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-sm font-medium text-primary-foreground/70 uppercase tracking-wider">Nossa Historia</p>
                <h2 className="font-serif text-3xl md:text-4xl font-bold">Sobre a {store.name}</h2>
              </div>
              <div className="space-y-4 text-primary-foreground/80 leading-relaxed">
                <p>
                  Somos uma loja apaixonada por moda e comprometida em trazer as melhores pecas para nossos clientes. Cada produto e cuidadosamente selecionado pensando em qualidade, estilo e conforto.
                </p>
                <p>
                  Nossa missao e ajudar voce a se expressar atraves da moda, oferecendo pecas unicas que combinam com seu estilo de vida e personalidade.
                </p>
              </div>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="h-14 px-8 text-base font-medium rounded-full"
              >
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Iniciar Conversa
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Float Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 transition-transform duration-300"
        aria-label="Falar pelo WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  )
}
