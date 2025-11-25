"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { ProductLoadingSkeleton } from "@/components/product-loading-skeleton"
import { getProductsByCategory } from "@/lib/products"

export default function JournalFoliosPage() {
  const [sort, setSort] = useState("featured")
  const [priceRange, setPriceRange] = useState([0, 150])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [sort, priceRange])

  const allProducts = getProductsByCategory("Journal Folios")

  const filteredProducts = allProducts
    .filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])
    .sort((a, b) => {
      if (sort === "price-low") return a.price - b.price
      if (sort === "price-high") return b.price - a.price
      return 0
    })

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <section className="py-12 md:py-16 px-4 bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Journal Folios</h1>
          <p className="text-muted-foreground max-w-2xl">
            Premium leather and faux-leather folios designed to hold your most cherished inserts. Each folio is crafted
            with meticulous attention to detail and vintage elegance.
          </p>
        </div>
      </section>

      <div className="flex-1 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="sticky top-20">
                <div className="mb-8">
                  <h3 className="font-serif font-bold text-foreground mb-4">Price Range</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">
                        ${priceRange[0]} - ${priceRange[1]}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="150"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                        className="w-full accent-primary"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-serif font-bold text-foreground mb-4">Sort</h3>
                  <div className="space-y-2">
                    {[
                      { value: "featured", label: "Featured" },
                      { value: "price-low", label: "Price: Low to High" },
                      { value: "price-high", label: "Price: High to Low" },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="sort"
                          value={option.value}
                          checked={sort === option.value}
                          onChange={(e) => setSort(e.target.value)}
                          className="w-4 h-4 accent-primary"
                        />
                        <span className="text-sm text-foreground">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-3">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <ProductLoadingSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

              {!isLoading && filteredProducts.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No folios found in this price range.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
