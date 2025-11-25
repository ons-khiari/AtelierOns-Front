"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/lib/auth-context"
import { Heart, ChevronLeft } from "lucide-react"
import { useEffect } from "react"

export default function FavoritesPage() {
  const router = useRouter()
  const { isLoggedIn, favorites, removeFromFavorites } = useAuth()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn) return null

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/account"
              className="inline-flex items-center gap-2 text-primary hover:text-accent transition mb-4"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Account
            </Link>
            <h1 className="font-serif text-4xl font-bold text-foreground mb-2">My Favorites</h1>
            <p className="text-muted-foreground">Items you've saved</p>
          </div>

          {/* Favorites Grid */}
          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((item) => (
                <div
                  key={item.id}
                  className="bg-card border border-border rounded-lg overflow-hidden hover-lift transition"
                >
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="font-serif font-bold text-foreground mb-2">{item.name}</h3>
                    <p className="text-primary font-semibold mb-4">${item.price}</p>
                    <div className="flex gap-2">
                      <Link
                        href={`/products/${item.id}`}
                        className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-center font-semibold hover:bg-primary/90 transition text-sm"
                      >
                        View Product
                      </Link>
                      <button
                        onClick={() => removeFromFavorites(item.id)}
                        className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition"
                      >
                        <Heart className="w-5 h-5 fill-primary text-primary" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted rounded-lg border border-border">
              <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground mb-4">You haven't added any favorites yet</p>
              <Link
                href="/all-products"
                className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
              >
                Explore Products
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
