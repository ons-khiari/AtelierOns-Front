"use client"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Sparkles } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { TrendingProducts } from "@/components/trending-products"
import { BundlesShowcase } from "@/components/bundles-showcase"

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
}

const featuredProducts: Product[] = [
  {
    id: "1",
    name: "Velvet Burgundy Folio",
    price: 85,
    image: "/luxury-burgundy-velvet-journal.jpg",
    category: "Journal Folios",
  },
  {
    id: "2",
    name: "Rose Gold Leather Folio",
    price: 95,
    image: "/rose-gold-planner.jpg",
    category: "Journal Folios",
  },
  {
    id: "3",
    name: "Weekly Planner Insert",
    price: 22,
    image: "/midnight-pearl-pen-set.jpg",
    category: "Inserts",
  },
  {
    id: "4",
    name: "Vintage Romance Sticker Sheet",
    price: 8,
    image: "/vintage-lace-notebook.jpg",
    category: "Stickers",
  },
]

const bestSellers: Product[] = [
  {
    id: "5",
    name: "Silk Ribbon Bookmark Set",
    price: 15,
    image: "/cream-leather-portfolio.jpg",
    category: "Bookmarks",
  },
  {
    id: "6",
    name: "Lined Insert Booklet",
    price: 18,
    image: "/dusty-rose-planner.jpg",
    category: "Inserts",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background">
          <div className="absolute top-10 right-10 w-96 h-96 rounded-full opacity-10 bg-accent blur-3xl"></div>
          <div className="absolute -bottom-20 left-10 w-80 h-80 rounded-full opacity-5 bg-primary blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="mb-6 flex items-center justify-center gap-2 text-accent">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm tracking-widest uppercase">Dark Romance Elegance</span>
            <Sparkles className="w-4 h-4" />
          </div>

          <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Where Every Page Tells a Story
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover premium journal folios, inserts, and accessories crafted for those who appreciate the artistry of
            journaling. Inspired by vintage elegance, dark academia, and timeless beauty.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/journal-folios"
              className="px-8 py-3 bg-primary text-primary-foreground font-serif rounded hover:bg-primary/90 transition flex items-center justify-center gap-2"
            >
              Explore Collections
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 border border-primary text-primary font-serif rounded hover:bg-primary/5 transition"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Featured Collections</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Handpicked selections from our exclusive range of luxury stationery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <TrendingProducts />

      {/* Best Sellers Section */}
      <section className="py-16 md:py-24 px-4 bg-muted">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Customer Favorites</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">The most loved pieces in our collection</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} featured />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/journal-folios"
              className="text-primary font-serif hover:text-accent transition inline-flex items-center gap-2"
            >
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      <BundlesShowcase />

      {/* Brand Story Section */}
      <section className="py-16 md:py-24 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <img src="/cream-leather-portfolio.jpg" alt="Brand story" className="rounded w-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-3xl font-bold text-foreground mb-4">Our Inspiration</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Velour & Ink celebrates the beauty of the written word through premium journal folios and accessories
                that honor vintage elegance and dark romance. Each piece is crafted with intention—inspired by old love
                letters, dark academia libraries, and the timeless aesthetics of feminine sophistication.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We believe in slowing down, savoring moments, and expressing yourself through beautiful, artisanal
                writing instruments and journals.
              </p>
              <Link
                href="/about"
                className="text-primary font-serif hover:text-accent transition inline-flex items-center gap-2"
              >
                Read Our Full Story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
