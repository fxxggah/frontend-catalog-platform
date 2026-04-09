import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import type { Category } from "@/types"

type CategoryListProps = {
  categories: Category[]
  storeSlug: string
}

const categoryImages: Record<string, string> = {
  vestidos: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
  blusas: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=800&fit=crop",
  calcas: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=800&fit=crop",
  saias: "https://images.unsplash.com/photo-1583496661160-fb5886a0ebe9?w=600&h=800&fit=crop",
  acessorios: "https://images.unsplash.com/photo-1611923134239-b9be5816e23c?w=600&h=800&fit=crop",
  calcados: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=800&fit=crop",
}

export function CategoryList({ categories, storeSlug }: CategoryListProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {categories.map((category) => {
        const imageUrl = category.image || categoryImages[category.slug] || 
          "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&h=800&fit=crop"
        
        return (
          <Link
            key={category.id}
            href={`/${storeSlug}/category/${category.slug}`}
            className="group relative aspect-[3/4] rounded-2xl overflow-hidden"
          >
            <Image
              src={imageUrl}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-white">
              <h3 className="font-serif text-xl md:text-2xl font-bold text-center mb-2">
                {category.name}
              </h3>
              <div className="flex items-center gap-2 text-sm font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <span>Explorar</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
