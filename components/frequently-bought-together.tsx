"use client"
import { ProductCard } from "./product-card"
import { useCart } from "@/lib/cart-context"
import { ShoppingCart } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
}

interface FrequentlyBoughtTogetherProps {
  currentProductId: string
  currentProductCategory: string
}

// Bundle suggestions based on product category
const bundleSuggestions: { [key: string]: Product[] } = {
  "Journal Folios": [
    {
      id: "3",
      name: "Weekly Planner Insert",
      price: 22,
      image: "/vintage-journal-with-lace-textures-and-old-paper-b.jpg",
      category: "Inserts",
    },
    {
      id: "4",
      name: "Vintage Romance Sticker Sheet",
      price: 8,
      image: "/vintage-romance-sticker-pack-dark-romance-aestheti.jpg",
      category: "Stickers",
    },
    {
      id: "5",
      name: "Silk Ribbon Bookmark Set",
      price: 15,
      image: "/rose-gold-embossed-journal.jpg",
      category: "Bookmarks",
    },
  ],
  Bookmarks: [
    {
      id: "1",
      name: "Velvet Burgundy Folio",
      price: 85,
      image: "/luxury-burgundy-velvet-journal.jpg",
      category: "Journal Folios",
    },
    {
      id: "6",
      name: "Lined Insert Booklet",
      price: 18,
      image: "/dusty-rose-planner.jpg",
      category: "Inserts",
    },
  ],
  Stickers: [
    {
      id: "1",
      name: "Velvet Burgundy Folio",
      price: 85,
      image: "/luxury-burgundy-velvet-journal.jpg",
      category: "Journal Folios",
    },
    {
      id: "3",
      name: "Weekly Planner Insert",
      price: 22,
      image: "/vintage-journal-with-lace-textures-and-old-paper-b.jpg",
      category: "Inserts",
    },
  ],
  Inserts: [
    {
      id: "1",
      name: "Velvet Burgundy Folio",
      price: 85,
      image: "/luxury-burgundy-velvet-journal.jpg",
      category: "Journal Folios",
    },
    {
      id: "5",
      name: "Silk Ribbon Bookmark Set",
      price: 15,
      image: "/rose-gold-embossed-journal.jpg",
      category: "Bookmarks",
    },
  ],
}

export function FrequentlyBoughtTogether({ currentProductCategory }: FrequentlyBoughtTogetherProps) {
  const { addToCart } = useCart()
  const suggestions = bundleSuggestions[currentProductCategory] || []

  if (suggestions.length === 0) return null

  const handleAddAllToCart = () => {
    suggestions.forEach((product) => {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    })
  }

  const bundleTotal = suggestions.reduce((sum, p) => sum + p.price, 0)

  return (
    <div className="mt-20 py-12 bg-muted rounded-lg px-6">
      <h2 className="font-serif text-3xl font-bold text-foreground mb-2">Frequently Bought Together</h2>
      <p className="text-muted-foreground mb-8">These items pair beautifully with your selection</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {suggestions.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-background p-4 rounded">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Bundle Price:</p>
          <p className="font-serif text-2xl font-bold text-primary">${bundleTotal.toFixed(2)}</p>
        </div>
        <button
          onClick={handleAddAllToCart}
          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded font-serif font-bold hover:bg-primary/90 btn-press transition"
        >
          <ShoppingCart className="w-5 h-5" />
          Add Bundle to Cart
        </button>
      </div>
    </div>
  )
}
