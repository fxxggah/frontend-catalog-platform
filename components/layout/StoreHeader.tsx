"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, Search, ShoppingBag, X, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useCart } from "@/contexts/CartContext"
import type { Store, Category } from "@/types"

type StoreHeaderProps = {
  store: Store
  categories: Category[]
}

export function StoreHeader({ store, categories }: StoreHeaderProps) {
  const { getItemsCount } = useCart()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const itemsCount = getItemsCount()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/${store.slug}?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "glass border-b shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-20 items-center justify-between gap-4">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden rounded-full">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle className="text-left font-serif text-xl">{store.name}</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 mt-8">
              <Link
                href={`/${store.slug}`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-secondary transition-colors"
              >
                Inicio
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/${store.slug}/category/${category.slug}`}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-secondary transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href={`/${store.slug}`} className="flex items-center gap-2">
          <span className="font-serif text-2xl font-bold tracking-tight">
            {store.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {categories.slice(0, 5).map((category) => (
            <Link
              key={category.id}
              href={`/${store.slug}/category/${category.slug}`}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-secondary"
            >
              {category.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {/* Search */}
          {isSearchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 md:w-72 pl-10 rounded-full border-2 focus-visible:ring-0 focus-visible:border-primary"
                  autoFocus
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </form>
          ) : (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSearchOpen(true)}
                className="rounded-full"
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Buscar</span>
              </Button>

              <Button 
                variant="ghost" 
                size="icon"
                className="rounded-full hidden md:flex"
              >
                <User className="h-5 w-5" />
                <span className="sr-only">Conta</span>
              </Button>

              {/* Cart */}
              <Link href={`/${store.slug}/cart`}>
                <Button variant="ghost" size="icon" className="relative rounded-full">
                  <ShoppingBag className="h-5 w-5" />
                  {itemsCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                      {itemsCount}
                    </span>
                  )}
                  <span className="sr-only">Carrinho ({itemsCount} itens)</span>
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
