import Link from "next/link"
import { Instagram, Facebook, MapPin, MessageCircle, Mail, Phone, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Store, Category } from "@/types"
import { generateWhatsAppLink } from "@/utils/formatPrice"

type StoreFooterProps = {
  store: Store
  categories: Category[]
}

export function StoreFooter({ store, categories }: StoreFooterProps) {
  const whatsappLink = generateWhatsAppLink(
    store.whatsappNumber,
    `Ola! Vim pelo site ${store.name} e gostaria de mais informacoes.`
  )

  return (
    <footer className="bg-secondary/50">
      {/* Newsletter Section */}
      <div className="border-b">
        <div className="container py-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="space-y-2 max-w-md">
              <h3 className="font-serif text-2xl md:text-3xl font-bold">
                Fique por dentro das novidades
              </h3>
              <p className="text-muted-foreground">
                Receba ofertas exclusivas e lancamentos em primeira mao.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Input
                type="email"
                placeholder="Seu melhor e-mail"
                className="h-12 px-5 rounded-full bg-card border-2 focus-visible:ring-0 focus-visible:border-primary sm:w-72"
              />
              <Button type="submit" className="h-12 px-8 rounded-full font-medium">
                Inscrever
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-6">
            <Link href={`/${store.slug}`} className="inline-block">
              <span className="font-serif text-2xl font-bold">{store.name}</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Moda com estilo e qualidade. Pecas selecionadas para transformar seu guarda-roupa.
            </p>
            <div className="flex gap-3">
              {store.instagram && (
                <a
                  href={`https://instagram.com/${store.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-card hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </a>
              )}
              {store.facebook && (
                <a
                  href={`https://facebook.com/${store.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-card hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </a>
              )}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-card hover:bg-[#25D366] hover:text-white transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="sr-only">WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              Categorias
            </h4>
            <nav className="flex flex-col gap-3">
              {categories.slice(0, 6).map((category) => (
                <Link
                  key={category.id}
                  href={`/${store.slug}/category/${category.slug}`}
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Links */}
          <div className="space-y-6">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              Links Uteis
            </h4>
            <nav className="flex flex-col gap-3">
              <Link
                href={`/${store.slug}`}
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                Inicio
              </Link>
              <Link
                href={`/${store.slug}#products`}
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                Produtos
              </Link>
              <Link
                href={`/${store.slug}/cart`}
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                Carrinho
              </Link>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                Atendimento
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              Contato
            </h4>
            <div className="space-y-4">
              {store.address && (
                <div className="flex gap-3 text-foreground/80">
                  <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                  <span>{store.address}</span>
                </div>
              )}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 text-foreground/80 hover:text-primary transition-colors"
              >
                <Phone className="h-5 w-5 shrink-0" />
                <span>WhatsApp</span>
              </a>
              <a
                href="mailto:contato@loja.com"
                className="flex gap-3 text-foreground/80 hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5 shrink-0" />
                <span>contato@loja.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} {store.name}. Todos os direitos reservados.</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="hover:text-foreground transition-colors">
                Politica de Privacidade
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
