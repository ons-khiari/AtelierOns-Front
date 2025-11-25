"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Star, Heart } from "lucide-react"
import { useFavorites } from "@/lib/favorites-context"
import type { Product } from "@/lib/products"

interface ProductCardProps {
  product: Product | any
  featured?: boolean
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const { isFavorited, addToFavorites, removeFromFavorites } = useFavorites()
  const [isFav, setIsFav] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const productId = product.id
  const productName = product.title || product.name
  const productImage = product.thumbnailImage || product.image
  const productPrice = product.price
  const productCategory = product.category

  useEffect(() => {
    setMounted(true)
    setIsFav(isFavorited(productId))
  }, [productId, isFavorited])

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsAnimating(true)

    if (isFav) {
      removeFromFavorites(productId)
      setIsFav(false)
    } else {
      addToFavorites({
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        category: productCategory,
      })
      setIsFav(true)
    }

    setShowNotification(true)
    setTimeout(() => setIsAnimating(false), 500)
    setTimeout(() => setShowNotification(false), 2000)
  }

  if (!mounted) return null

  const isSoldOut = product.stock === 0

  return (
    <>
      {showNotification && (
        <div className="fixed top-20 left-4 right-4 md:left-auto md:right-4 z-50 animate-popIn">
          <div className="bg-primary text-primary-foreground px-4 py-3 rounded shadow-lg">
            <p className="font-semibold text-sm">{isFav ? "❤️ Added to Favorites" : "♡ Removed from Favorites"}</p>
          </div>
        </div>
      )}

      <Link href={`/products/${productId}`}>
        <div className={`group cursor-pointer transition duration-300 ${featured ? "md:col-span-1" : ""}`}>
          <div
            className={`relative overflow-hidden rounded bg-card mb-4 aspect-square product-card-shimmer ${isHovering ? "animate-shimmerHover" : ""}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <img
              src={productImage || "/placeholder.svg"}
              alt={productName}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-300"></div>

            {isSoldOut && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white font-serif font-bold text-lg">Sold Out</span>
              </div>
            )}

            <button
              onClick={handleFavoriteClick}
              className="absolute top-4 right-4 p-2 bg-background/80 hover:bg-background rounded-full transition-all opacity-0 group-hover:opacity-100 btn-press"
              aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart
                className={`w-5 h-5 transition-all ${isFav ? "fill-primary text-primary" : "text-foreground"} ${isAnimating ? "animate-heartPulse" : ""}`}
              />
            </button>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-accent uppercase tracking-widest font-semibold">{productCategory}</p>
            <h3 className="font-serif font-bold text-foreground group-hover:text-primary transition">{productName}</h3>
            <div className="flex items-center justify-between">
              <p className="font-serif text-lg text-primary">${productPrice}</p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}
