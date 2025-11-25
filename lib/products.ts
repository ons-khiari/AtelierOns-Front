export interface ProductVariant {
  size: "small" | "medium"
  stock: number
}

export interface Product {
  id: string
  title: string
  description: string
  category: "Journal Folios" | "Bookmarks" | "Stickers" | "Journal Basics"
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

export const CATEGORIES = ["Journal Folios", "Bookmarks", "Stickers", "Journal Basics"] as const

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

  // Bookmarks
  {
    id: "bm-1",
    title: "Velvet Tassel Bookmark",
    description: "Elegant bookmark with velvet ribbon and gold tassel. Add sophistication to every page.",
    category: "Bookmarks",
    price: 12,
    stock: 45,
    isFeatured: true,
    isTrending: true,
    thumbnailImage: "/images/bookmarks/tassel-thumb.jpg",
    galleryImages: [
      "/images/bookmarks/tassel-1.jpg",
      "/images/bookmarks/tassel-2.jpg",
      "/images/bookmarks/tassel-3.jpg",
    ],
    createdAt: new Date("2024-01-10").toISOString(),
  },
  {
    id: "bm-2",
    title: "Leather Cord Bookmark",
    description: "Premium leather cord bookmark with rose gold charm.",
    category: "Bookmarks",
    price: 15,
    stock: 32,
    isFeatured: true,
    isTrending: false,
    thumbnailImage: "/images/bookmarks/leather-thumb.jpg",
    galleryImages: [
      "/images/bookmarks/leather-1.jpg",
      "/images/bookmarks/leather-2.jpg",
      "/images/bookmarks/leather-3.jpg",
    ],
    createdAt: new Date("2024-01-18").toISOString(),
  },
  {
    id: "bm-3",
    title: "Silk Ribbon Bookmark Set",
    description: "Set of 3 bookmarks in complementary silk ribbon colors.",
    category: "Bookmarks",
    price: 25,
    stock: 0,
    isFeatured: false,
    isTrending: false,
    thumbnailImage: "/images/bookmarks/silk-set-thumb.jpg",
    galleryImages: [
      "/images/bookmarks/silk-set-1.jpg",
      "/images/bookmarks/silk-set-2.jpg",
      "/images/bookmarks/silk-set-3.jpg",
    ],
    createdAt: new Date("2024-02-05").toISOString(),
  },

  // Stickers
  {
    id: "st-1",
    title: "Vintage Floral Sticker Sheet",
    description: "Beautiful set of 12 vintage floral stickers for decorating journals.",
    category: "Stickers",
    price: 6,
    stock: 120,
    isFeatured: true,
    isTrending: true,
    thumbnailImage: "/images/stickers/floral-thumb.jpg",
    galleryImages: ["/images/stickers/floral-1.jpg", "/images/stickers/floral-2.jpg", "/images/stickers/floral-3.jpg"],
    createdAt: new Date("2024-01-05").toISOString(),
  },
  {
    id: "st-2",
    title: "Gold Foil Decorative Stickers",
    description: "Premium gold foil stickers for elegant page marking.",
    category: "Stickers",
    price: 8,
    stock: 89,
    isFeatured: true,
    isTrending: true,
    thumbnailImage: "/images/stickers/gold-foil-thumb.jpg",
    galleryImages: [
      "/images/stickers/gold-foil-1.jpg",
      "/images/stickers/gold-foil-2.jpg",
      "/images/stickers/gold-foil-3.jpg",
    ],
    createdAt: new Date("2024-01-12").toISOString(),
  },
  {
    id: "st-3",
    title: "Minimalist Line Art Stickers",
    description: "Contemporary line art sticker collection with 15 designs.",
    category: "Stickers",
    price: 7,
    stock: 2,
    isFeatured: false,
    isTrending: false,
    thumbnailImage: "/images/stickers/line-art-thumb.jpg",
    galleryImages: [
      "/images/stickers/line-art-1.jpg",
      "/images/stickers/line-art-2.jpg",
      "/images/stickers/line-art-3.jpg",
    ],
    createdAt: new Date("2024-02-10").toISOString(),
  },

  // Journal Basics
  {
    id: "jb-1",
    title: "Luxury Cream Insert Pages",
    description: "300-page cream paper insert perfect for any folio. Premium paper quality.",
    category: "Journal Basics",
    price: 22,
    stock: 67,
    isFeatured: true,
    isTrending: true,
    thumbnailImage: "/images/journal-basics/cream-insert-thumb.jpg",
    galleryImages: [
      "/images/journal-basics/cream-insert-1.jpg",
      "/images/journal-basics/cream-insert-2.jpg",
      "/images/journal-basics/cream-insert-3.jpg",
    ],
    createdAt: new Date("2024-01-08").toISOString(),
  },
  {
    id: "jb-2",
    title: "Dotted Grid Insert Pad",
    description: "200-page dotted grid insert for planning and sketching.",
    category: "Journal Basics",
    price: 18,
    stock: 43,
    isFeatured: true,
    isTrending: false,
    thumbnailImage: "/images/journal-basics/dotted-thumb.jpg",
    galleryImages: [
      "/images/journal-basics/dotted-1.jpg",
      "/images/journal-basics/dotted-2.jpg",
      "/images/journal-basics/dotted-3.jpg",
    ],
    createdAt: new Date("2024-01-22").toISOString(),
  },
  {
    id: "jb-3",
    title: "Silk Ribbon Sleeve",
    description: "Protective silk sleeve to keep your folio pristine.",
    category: "Journal Basics",
    price: 16,
    stock: 0,
    isFeatured: false,
    isTrending: false,
    thumbnailImage: "/images/journal-basics/sleeve-thumb.jpg",
    galleryImages: [
      "/images/journal-basics/sleeve-1.jpg",
      "/images/journal-basics/sleeve-2.jpg",
      "/images/journal-basics/sleeve-3.jpg",
    ],
    createdAt: new Date("2024-02-08").toISOString(),
  },
  {
    id: "jb-4",
    title: "Linen Pocket Set",
    description: "Set of 2 linen pockets for storing small items in your folio.",
    category: "Journal Basics",
    price: 14,
    stock: 28,
    isFeatured: true,
    isTrending: false,
    thumbnailImage: "/images/journal-basics/pockets-thumb.jpg",
    galleryImages: [
      "/images/journal-basics/pockets-1.jpg",
      "/images/journal-basics/pockets-2.jpg",
      "/images/journal-basics/pockets-3.jpg",
    ],
    createdAt: new Date("2024-02-03").toISOString(),
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
