"use client"

import { Bell, Search, LogOut, ChevronRight, Command } from "lucide-react"
import { useRouter } from "next/navigation"
import { authService } from "@/services/authService"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

type BreadcrumbItemType = {
  label: string
  href?: string
}

type AdminHeaderProps = {
  breadcrumbs: BreadcrumbItemType[]
}

export function AdminHeader({ breadcrumbs }: AdminHeaderProps) {
  const router = useRouter()

  const handleLogout = () => {
    authService.logout()
    router.replace("/login")
  }

  return (
    <header className="sticky top-0 z-40 flex h-20 shrink-0 items-center justify-between gap-4 border-b border-slate-100 px-6 bg-white/80 backdrop-blur-md transition-all">
      
      {/* Esquerda: Navegação Contextual */}
      <div className="flex items-center gap-4">
        <div className="hidden lg:flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white font-black shadow-lg shadow-slate-200">
          K
        </div>
        
        <Breadcrumb>
          <BreadcrumbList className="text-[11px] font-black uppercase tracking-[0.15em]">
            <BreadcrumbItem>
              <BreadcrumbLink 
                href="/admin" 
                className="text-slate-400 hover:text-slate-900 transition-colors"
              >
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>

            {breadcrumbs.map((item, index) => (
              <BreadcrumbItem key={index} className="flex items-center gap-2">
                <BreadcrumbSeparator className="text-slate-300">
                  <ChevronRight size={12} strokeWidth={3} />
                </BreadcrumbSeparator>
                {item.href ? (
                  <BreadcrumbLink 
                    href={item.href} 
                    className="text-slate-400 hover:text-slate-900 transition-colors"
                  >
                    {item.label}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="text-slate-900">
                    {item.label}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Direita: Ações de Usuário */}
      <div className="flex items-center gap-4">
        
        {/* Busca "Comando" */}
        <div className="relative hidden lg:block group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-slate-400">
            <Search className="h-4 w-4 group-focus-within:text-indigo-600 transition-colors" />
          </div>
          <Input
            type="search"
            placeholder="Buscar funcionalidade..."
            className="w-72 pl-11 pr-12 h-11 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-slate-950 transition-all text-sm font-medium"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded border border-slate-200 bg-white text-[10px] font-bold text-slate-400 shadow-sm">
            <Command size={10} /> K
          </div>
        </div>

        {/* Notificações com Badge Vibrante */}
        <Button variant="ghost" size="icon" className="h-11 w-11 rounded-2xl bg-slate-50/50 border border-transparent hover:border-slate-100 hover:bg-white transition-all relative">
          <Bell className="h-5 w-5 text-slate-600" />
          <span className="absolute top-3 right-3 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
          </span>
        </Button>

        <div className="h-8 w-px bg-slate-100 mx-2 hidden md:block" />

        {/* Logout Refinado */}
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="h-11 px-4 flex items-center gap-2 rounded-2xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-all font-bold text-xs uppercase tracking-widest"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden md:inline">Sair</span>
        </Button>
      </div>
    </header>
  )
}