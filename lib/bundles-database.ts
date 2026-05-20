// Product bundles with special pricing
export interface Bundle {
  id: string
  name: string
  description: string
  products: string[] // Product IDs
  bundlePrice: number
  discount: number // percentage discount
  image: string
  category: string
}

export const bundlesDatabase: Bundle[] = [
  {
    id: "bundle-1",
    name: "Folio Starter Pack",
    description: "Everything you need to start your journaling journey",
    products: ["1", "3", "4"], // Velvet Burgundy, Insert, Sticker
    bundlePrice: 110,
    discount: 10,
    image: "/luxury-burgundy-velvet-journal.jpg",
    category: "Journal Folios",
  },
  {
    id: "bundle-4",
    name: "Complete Planner Set",
    description: "Full journal with inserts and accessories",
    products: ["1", "3", "5", "4"], // Folio, Insert, Bookmark, Stickers
    bundlePrice: 135,
    discount: 15,
    image: "/luxury-burgundy-velvet-journal.jpg",
    category: "Journal Folios",
  },
]

export function getBundle(id: string): Bundle | undefined {
  return bundlesDatabase.find((b) => b.id === id)
}

export function getBundlesByCategory(category: string): Bundle[] {
  return bundlesDatabase.filter((b) => b.category === category)
}

export function calculateBundleSavings(bundle: Bundle): number {
  return Math.round((bundle.bundlePrice * bundle.discount) / 100)
}
