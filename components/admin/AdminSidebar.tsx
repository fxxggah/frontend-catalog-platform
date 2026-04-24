"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  Settings,
  Store,
  ChevronUp,
  ExternalLink,
  LogOut,
  Sparkles,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { authService } from "@/services/authService"
import { userService } from "@/services/userService"
import type { StoreUserRole } from "@/types"

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const params = useParams()

  const storeSlug = params.storeSlug as string | undefined

  const [role, setRole] = useState<StoreUserRole | null>(null)

  useEffect(() => {
    async function loadRole() {
      if (!storeSlug) return

      try {
        const data = await userService.getCurrentStoreUser(storeSlug)
        setRole(data.role)
      } catch (error) {
        console.error("Erro ao carregar role do usuário:", error)
      }
    }

    loadRole()
  }, [storeSlug])

  const handleLogout = () => {
    authService.logout()
    router.replace("/login")
  }

  const menuItems = storeSlug
    ? [
        {
          title: "Dashboard",
          href: `/admin/${storeSlug}`,
          icon: LayoutDashboard,
          ownerOnly: false,
        },
        {
          title: "Produtos",
          href: `/admin/${storeSlug}/products`,
          icon: Package,
          ownerOnly: false,
        },
        {
          title: "Categorias",
          href: `/admin/${storeSlug}/categories`,
          icon: FolderOpen,
          ownerOnly: false,
        },
        {
          title: "Configurações",
          href: `/admin/${storeSlug}/settings`,
          icon: Settings,
          ownerOnly: true,
        },
      ]
    : []

  const visibleMenuItems = menuItems.filter((item) => {
    if (!item.ownerOnly) return true
    return role === "OWNER"
  })

  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="hover:bg-transparent">
              <Link href={storeSlug ? `/admin/${storeSlug}` : "/admin"} className="flex items-center gap-3">
                <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                  <Store className="size-5" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold text-base">Catalogo</span>
                  <span className="text-xs text-muted-foreground">Painel Admin</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-2">
            Menu Principal
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {visibleMenuItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`)

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="h-11 rounded-xl data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
                    >
                      <Link href={item.href}>
                        <item.icon className="size-5" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {storeSlug && (
          <SidebarGroup className="mt-auto">
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-2">
              Ações Rápidas
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="h-11 rounded-xl">
                    <Link href={`/${storeSlug}`} target="_blank">
                      <ExternalLink className="size-5" />
                      <span className="font-medium">Ver Loja</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <div className="mx-2 mt-4 p-4 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="size-4 text-primary" />
            <span className="font-semibold text-sm">Plano Pro</span>
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
              Em breve
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Desbloqueie recursos avançados como analytics, domínio personalizado e mais.
          </p>
        </div>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-14 rounded-xl">
                  <Avatar className="size-9 rounded-xl">
                    <AvatarFallback className="rounded-xl bg-secondary text-sm font-semibold">
                      AD
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col items-start gap-0.5">
                    <span className="font-medium text-sm">Administrador</span>
                    <span className="text-xs text-muted-foreground">
                      {role ?? "Carregando..."}
                    </span>
                  </div>

                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width] rounded-xl"
              >
                {storeSlug && (
                  <>
                    <DropdownMenuItem asChild className="rounded-lg">
                      <Link href={`/${storeSlug}`} className="flex items-center gap-2">
                        <ExternalLink className="size-4" />
                        Ver Loja
                      </Link>
                    </DropdownMenuItem>

                    {role === "OWNER" && (
                      <DropdownMenuItem asChild className="rounded-lg">
                        <Link href={`/admin/${storeSlug}/settings`} className="flex items-center gap-2">
                          <Settings className="size-4" />
                          Configurações
                        </Link>
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator />
                  </>
                )}

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="rounded-lg text-destructive focus:text-destructive cursor-pointer"
                >
                  <LogOut className="size-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}