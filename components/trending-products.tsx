"use client"

import { Flame } from "lucide-react"
import { ProductCard } from "./product-card"

interface TrendingProduct {
  id: string
  name: string
  price: number
  image: string
  category: string
  trendScore: number // Calculated from favorites + purchases + views
}

interface TrendingProductsProps {
  products?: TrendingProduct[]
}

const defaultTrendingProducts: TrendingProduct[] = [
  {
    id: "1",
    name: "Velvet Burgundy Folio",
    price: 85,
    image: "/luxury-burgundy-velvet-journal.jpg",
    category: "Journal Folios",
    trendScore: 95,
  },
  {
    id: "2",
    name: "Rose Gold Planner",
    price: 52,
    image: "/rose-gold-planner.jpg",
    category: "Inserts",
    trendScore: 87,
  },
  {
    id: "3",
    name: "Vintage Romance Sticker Sheet",
    price: 8,
    image: "/vintage-romance-sticker-pack-dark-romance-aestheti.jpg",
    category: "Stickers",
    trendScore: 92,
  },
  {
    id: "4",
    name: "Silk Ribbon Bookmark Set",
    price: 15,
    image: "/rose-gold-embossed-journal.jpg",
    category: "Bookmarks",
    trendScore: 78,
  },
]

export function TrendingProducts({ products = defaultTrendingProducts }: TrendingProductsProps) {
  const topTrending = products.sort((a, b) => b.trendScore - a.trendScore).slice(0, 4)

  return (
    <section className="py-16 px-4 bg-muted">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <Flame className="w-6 h-6 text-accent" />
          <p className="text-accent uppercase tracking-widest font-semibold">Trending Now</p>
        </div>

        <h2 className="font-serif text-4xl font-bold text-foreground mb-2">Customer Favorites</h2>
        <p className="text-muted-foreground mb-12">
          The most loved and sought-after pieces from our collection, handpicked by our community.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topTrending.map((product) => (
            <div key={product.id} className="relative">
              <ProductCard product={product} featured />
              <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <Flame className="w-3 h-3" />
                Trending
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
