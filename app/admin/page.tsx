import Link from "next/link"
import { Package, FolderOpen, TrendingUp, Eye, Plus, ExternalLink, ArrowUpRight, ShoppingBag } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AdminHeader } from "@/components/admin/AdminHeader"
import { getProducts } from "@/services/productService"
import { getCategories } from "@/services/categoryService"
import { getDefaultStore } from "@/services/storeService"
import { formatPrice } from "@/utils/formatPrice"

export default async function AdminDashboardPage() {
  const [{ products, total: totalProducts }, categories, store] = await Promise.all([
    getProducts({ limit: 5 }),
    getCategories(),
    getDefaultStore(),
  ])

  const stats = [
    {
      title: "Total de Produtos",
      value: totalProducts,
      icon: Package,
      description: "+12% este mes",
      trend: "up",
    },
    {
      title: "Categorias",
      value: categories.length,
      icon: FolderOpen,
      description: "Categorias ativas",
      trend: "neutral",
    },
    {
      title: "Em Promocao",
      value: products.filter((p) => p.discountPrice).length,
      icon: TrendingUp,
      description: "Produtos com desconto",
      trend: "up",
    },
    {
      title: "Visiveis",
      value: products.filter((p) => p.visible).length,
      icon: Eye,
      description: "No catalogo",
      trend: "neutral",
    },
  ]

  return (
    <>
      <AdminHeader breadcrumbs={[{ label: "Dashboard" }]} />

      <div className="flex flex-1 flex-col gap-8 p-6 md:p-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Bem-vindo de volta
            </h1>
            <p className="text-muted-foreground">
              Aqui esta um resumo da sua loja {store.name}.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild variant="outline" className="rounded-full">
              <Link href={`/${store.slug}`} target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" />
                Ver Loja
              </Link>
            </Button>
            <Button asChild className="rounded-full">
              <Link href="/admin/products/new">
                <Plus className="mr-2 h-4 w-4" />
                Novo Produto
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-secondary">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1 mt-1">
                  {stat.trend === "up" && (
                    <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                  )}
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </div>
              </CardContent>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
            </Card>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Acoes Rapidas</CardTitle>
              <CardDescription>Atalhos para as tarefas mais comuns</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2 rounded-xl">
                <Link href="/admin/products/new">
                  <Package className="h-5 w-5" />
                  <span>Novo Produto</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2 rounded-xl">
                <Link href="/admin/categories">
                  <FolderOpen className="h-5 w-5" />
                  <span>Categorias</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2 rounded-xl">
                <Link href="/admin/settings">
                  <ShoppingBag className="h-5 w-5" />
                  <span>Configuracoes</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2 rounded-xl">
                <Link href={`/${store.slug}`} target="_blank">
                  <ExternalLink className="h-5 w-5" />
                  <span>Ver Loja</span>
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Products */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Produtos Recentes</CardTitle>
                <CardDescription>Ultimos produtos adicionados</CardDescription>
              </div>
              <Button asChild variant="ghost" size="sm" className="rounded-full">
                <Link href="/admin/products">Ver todos</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products.slice(0, 5).map((product) => (
                  <div 
                    key={product.id} 
                    className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg bg-secondary overflow-hidden flex-shrink-0">
                      {product.images[0] && (
                        <img 
                          src={product.images[0].imageUrl} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(product.discountPrice || product.price)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {product.discountPrice && (
                        <Badge variant="secondary" className="text-xs">
                          Promocao
                        </Badge>
                      )}
                      <Button asChild variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0">
                        <Link href={`/admin/products/${product.id}/edit`}>
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
