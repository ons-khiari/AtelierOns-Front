"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/lib/auth-context"
import { Star, ChevronLeft } from "lucide-react"
import { useEffect } from "react"

export default function RatingsPage() {
  const router = useRouter()
  const { user, isLoggedIn, getRatings } = useAuth()
  const ratings = getRatings()

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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/account"
              className="inline-flex items-center gap-2 text-primary hover:text-accent transition mb-4"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Account
            </Link>
            <h1 className="font-serif text-4xl font-bold text-foreground mb-2">My Reviews</h1>
            <p className="text-muted-foreground">All reviews and ratings you've submitted</p>
          </div>

          {/* Reviews List */}
          {ratings.length > 0 ? (
            <div className="space-y-6">
              {ratings.map((rating) => (
                <div key={rating.id} className="bg-card border border-border rounded-lg p-6 hover-lift transition">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={rating.productImage || "/placeholder.svg"}
                        alt={rating.productName}
                        className="w-24 h-24 object-cover rounded"
                      />
                    </div>

                    {/* Review Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-serif text-lg font-bold text-foreground">{rating.productName}</h3>
                          <p className="text-sm text-muted-foreground">{rating.date}</p>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < rating.rating ? "fill-accent text-accent" : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <h4 className="font-semibold text-foreground mb-2">{rating.title}</h4>
                      <p className="text-muted-foreground">{rating.comment}</p>

                      <Link
                        href={`/products/${rating.productId}`}
                        className="inline-block mt-4 text-sm text-primary hover:text-accent transition"
                      >
                        View Product →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted rounded-lg border border-border">
              <p className="text-muted-foreground mb-4">You haven't written any reviews yet</p>
              <Link
                href="/all-products"
                className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
              >
                Browse Products
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
