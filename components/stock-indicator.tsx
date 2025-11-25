"use client"

import { AlertCircle } from "lucide-react"

interface StockIndicatorProps {
  stock: number
  variant?: "badge" | "banner" | "inline"
}

export function StockIndicator({ stock, variant = "badge" }: StockIndicatorProps) {
  const isSoldOut = stock === 0
  const isLowStock = stock > 0 && stock < 5

  if (!isLowStock && !isSoldOut) return null

  const message = isSoldOut ? "Sold Out" : stock === 1 ? "Only 1 left" : `Only ${stock} left`

  if (variant === "badge") {
    return (
      <div
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
          isSoldOut ? "bg-muted text-muted-foreground" : "bg-accent/20 text-accent"
        }`}
      >
        {isLowStock && <AlertCircle className="w-3 h-3" />}
        {message}
      </div>
    )
  }

  if (variant === "banner") {
    return (
      <div
        className={`w-full py-3 px-4 rounded text-center font-semibold ${
          isSoldOut ? "bg-muted text-muted-foreground" : "bg-accent/10 text-accent"
        }`}
      >
        {message}
      </div>
    )
  }

  return <p className={`text-sm font-semibold ${isSoldOut ? "text-muted-foreground" : "text-accent"}`}>{message}</p>
}
