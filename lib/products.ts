export interface ProductVariant {
  size: "small" | "medium"
  stock: number
}

export interface Product {
  id: string
  title: string
  description: string
  category: "Journal Folios"
  price: number
  stock: number
  isFeatured: boolean
  isTrending?: boolean
  thumbnailImage: string
  galleryImages: string[]
  variantStock?: {
    small: number
    medium: number
  }
  createdAt: string
}

export const CATEGORIES = ["Journal Folios"] as const

// Complete product database with all items
export const products: Product[] = [
  // Journal Folios (with size variants)
  {
    id: "jf-1",
    title: "Velvet Burgundy Folio",
    description: "Premium burgundy velvet folio with gold stamping. Perfect for holding your favorite inserts.",
    category: "Journal Folios",
    price: 85,
    stock: 12,
    isFeatured: true,
    isTrending: true,
    thumbnailImage: "/images/journal-folios/velvet-burgundy-thumb.jpg",
    galleryImages: [
      "/images/journal-folios/velvet-burgundy-1.jpg",
      "/images/journal-folios/velvet-burgundy-2.jpg",
      "/images/journal-folios/velvet-burgundy-3.jpg",
      "/images/journal-folios/velvet-burgundy-4.jpg",
    ],
    variantStock: { small: 8, medium: 4 },
    createdAt: new Date("2024-01-15").toISOString(),
  },
  {
    id: "jf-2",
    title: "Rose Gold Leather Folio",
    description: "Elegant rose gold leather folio with embossed details and silk lining.",
    category: "Journal Folios",
    price: 95,
    stock: 8,
    isFeatured: true,
    isTrending: true,
    thumbnailImage: "/images/journal-folios/rose-gold-thumb.jpg",
    galleryImages: [
      "/images/journal-folios/rose-gold-1.jpg",
      "/images/journal-folios/rose-gold-2.jpg",
      "/images/journal-folios/rose-gold-3.jpg",
      "/images/journal-folios/rose-gold-4.jpg",
    ],
    variantStock: { small: 5, medium: 3 },
    createdAt: new Date("2024-01-20").toISOString(),
  },
  {
    id: "jf-3",
    title: "Midnight Classic Folio",
    description: "Timeless midnight blue leather with silver accents. A sophisticated essential.",
    category: "Journal Folios",
    price: 80,
    stock: 0,
    isFeatured: false,
    isTrending: false,
    thumbnailImage: "/images/journal-folios/midnight-thumb.jpg",
    galleryImages: [
      "/images/journal-folios/midnight-1.jpg",
      "/images/journal-folios/midnight-2.jpg",
      "/images/journal-folios/midnight-3.jpg",
    ],
    variantStock: { small: 0, medium: 0 },
    createdAt: new Date("2024-01-25").toISOString(),
  },
  {
    id: "jf-4",
    title: "Cream Deluxe Folio",
    description: "Luxurious cream faux-leather with vintage lace details.",
    category: "Journal Folios",
    price: 90,
    stock: 15,
    isFeatured: true,
    isTrending: false,
    thumbnailImage: "/images/journal-folios/cream-thumb.jpg",
    galleryImages: [
      "/images/journal-folios/cream-1.jpg",
      "/images/journal-folios/cream-2.jpg",
      "/images/journal-folios/cream-3.jpg",
      "/images/journal-folios/cream-4.jpg",
    ],
    variantStock: { small: 9, medium: 6 },
    createdAt: new Date("2024-02-01").toISOString(),
  },

]

// Helper functions
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category)
}

export function getTrendingProducts(limit = 6): Product[] {
  return products.filter((p) => p.isTrending).slice(0, limit)
}

export function getFeaturedProducts(limit = 8): Product[] {
  return products.filter((p) => p.isFeatured).slice(0, limit)
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase()
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery),
  )
}
