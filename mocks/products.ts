import type { Product } from "@/types"

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Vestido Floral Azul",
    slug: "vestido-floral-azul",
    description:
      "Vestido floral leve e confortavel, perfeito para dias quentes. Tecido de alta qualidade com estampa exclusiva. Modelagem solta que valoriza todos os tipos de corpo.",
    price: 189.9,
    discountPrice: 149.9,
    categoryId: 1,
    categorySlug: "vestidos",
    storeId: 1,
    visible: true,
    images: [
      {
        id: 1,
        imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
        position: 1,
      },
      {
        id: 2,
        imageUrl: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop",
        position: 2,
      },
      {
        id: 3,
        imageUrl: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop",
        position: 3,
      },
    ],
  },
  {
    id: 2,
    name: "Vestido Midi Preto",
    slug: "vestido-midi-preto",
    description:
      "Vestido midi elegante na cor preta. Ideal para ocasioes especiais ou uso no dia a dia. Tecido com otimo caimento.",
    price: 229.9,
    categoryId: 1,
    categorySlug: "vestidos",
    storeId: 1,
    visible: true,
    images: [
      {
        id: 4,
        imageUrl: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&h=800&fit=crop",
        position: 1,
      },
    ],
  },
  {
    id: 3,
    name: "Blusa Branca Basica",
    slug: "blusa-branca-basica",
    description: "Blusa branca basica de algodao. Peca essencial para compor diversos looks. Confortavel e versatil.",
    price: 79.9,
    discountPrice: 59.9,
    categoryId: 2,
    categorySlug: "blusas",
    storeId: 1,
    visible: true,
    images: [
      {
        id: 5,
        imageUrl: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&h=800&fit=crop",
        position: 1,
      },
    ],
  },
  {
    id: 4,
    name: "Blusa Cropped Rosa",
    slug: "blusa-cropped-rosa",
    description:
      "Blusa cropped na cor rosa, perfeita para o verao. Tecido leve e confortavel. Combine com calca de cintura alta ou saia.",
    price: 69.9,
    categoryId: 2,
    categorySlug: "blusas",
    storeId: 1,
    visible: true,
    images: [
      {
        id: 6,
        imageUrl: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=800&fit=crop",
        position: 1,
      },
    ],
  },
  {
    id: 5,
    name: "Calca Jeans Skinny",
    slug: "calca-jeans-skinny",
    description:
      "Calca jeans skinny de alta qualidade. Modelagem que valoriza a silhueta. Jeans com elastano para maior conforto.",
    price: 159.9,
    discountPrice: 129.9,
    categoryId: 3,
    categorySlug: "calcas",
    storeId: 1,
    visible: true,
    images: [
      {
        id: 7,
        imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=800&fit=crop",
        position: 1,
      },
    ],
  },
  {
    id: 6,
    name: "Calca Pantalona Bege",
    slug: "calca-pantalona-bege",
    description:
      "Calca pantalona elegante na cor bege. Perfeita para ambientes formais ou casuais. Tecido fluido e confortavel.",
    price: 179.9,
    categoryId: 3,
    categorySlug: "calcas",
    storeId: 1,
    visible: true,
    images: [
      {
        id: 8,
        imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop",
        position: 1,
      },
    ],
  },
  {
    id: 7,
    name: "Saia Midi Plissada",
    slug: "saia-midi-plissada",
    description: "Saia midi plissada sofisticada. Ideal para looks elegantes. Tecido leve com movimento fluido.",
    price: 139.9,
    categoryId: 4,
    categorySlug: "saias",
    storeId: 1,
    visible: true,
    images: [
      {
        id: 9,
        imageUrl: "https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=600&h=800&fit=crop",
        position: 1,
      },
    ],
  },
  {
    id: 8,
    name: "Colar Dourado Delicado",
    slug: "colar-dourado-delicado",
    description: "Colar dourado delicado, perfeito para complementar qualquer look. Banho de ouro 18k. Antialergico.",
    price: 89.9,
    discountPrice: 69.9,
    categoryId: 5,
    categorySlug: "acessorios",
    storeId: 1,
    visible: true,
    images: [
      {
        id: 10,
        imageUrl: "https://images.unsplash.com/photo-1611923134239-b9be5816e23c?w=600&h=800&fit=crop",
        position: 1,
      },
    ],
  },
  {
    id: 9,
    name: "Conjunto Moletom Cinza",
    slug: "conjunto-moletom-cinza",
    description:
      "Conjunto de moletom cinza composto por calca e blusa. Perfeito para dias frios ou looks casuais. Tecido macio e confortavel.",
    price: 249.9,
    discountPrice: 199.9,
    categoryId: 6,
    categorySlug: "conjuntos",
    storeId: 1,
    visible: true,
    images: [
      {
        id: 11,
        imageUrl: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop",
        position: 1,
      },
    ],
  },
  {
    id: 10,
    name: "Vestido Longo Estampado",
    slug: "vestido-longo-estampado",
    description:
      "Vestido longo com estampa exclusiva. Perfeito para festas e eventos especiais. Tecido leve e fluido.",
    price: 299.9,
    categoryId: 1,
    categorySlug: "vestidos",
    storeId: 1,
    visible: true,
    images: [
      {
        id: 12,
        imageUrl: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop",
        position: 1,
      },
    ],
  },
  {
    id: 11,
    name: "Blusa Listrada Navy",
    slug: "blusa-listrada-navy",
    description:
      "Blusa listrada estilo navy, classica e elegante. Tecido de algodao de alta qualidade. Perfeita para looks casuais.",
    price: 99.9,
    categoryId: 2,
    categorySlug: "blusas",
    storeId: 1,
    visible: true,
    images: [
      {
        id: 13,
        imageUrl: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=800&fit=crop",
        position: 1,
      },
    ],
  },
  {
    id: 12,
    name: "Calca Alfaiataria Preta",
    slug: "calca-alfaiataria-preta",
    description:
      "Calca de alfaiataria preta, essencial para looks formais. Corte reto e elegante. Tecido de alta qualidade.",
    price: 199.9,
    discountPrice: 169.9,
    categoryId: 3,
    categorySlug: "calcas",
    storeId: 1,
    visible: true,
    images: [
      {
        id: 14,
        imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop",
        position: 1,
      },
    ],
  },
]
