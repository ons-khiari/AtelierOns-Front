"use client"

import { Star } from "lucide-react"
import { useState } from "react"

interface ReviewImage {
  url: string
  alt: string
}

interface ReviewWithImagesProps {
  rating: number
  username: string
  date: string
  text: string
  images?: ReviewImage[]
}

export function ReviewWithImages({ rating, username, date, text, images = [] }: ReviewWithImagesProps) {
  const [expandedImages, setExpandedImages] = useState(false)

  return (
    <div className="border border-border rounded-lg p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-accent text-accent" : "text-muted-foreground"}`} />
            ))}
          </div>
          <p className="font-semibold text-foreground">{username}</p>
          <p className="text-xs text-muted-foreground">{date}</p>
        </div>
      </div>

      {/* Review Text */}
      <p className="text-foreground mb-4">{text}</p>

      {/* Review Images */}
      {images.length > 0 && (
        <div className="mt-4">
          <div className="grid grid-cols-3 gap-2 mb-2">
            {images.map((image, idx) => (
              <img
                key={idx}
                src={image.url || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80 transition"
                onClick={() => setExpandedImages(!expandedImages)}
              />
            ))}
          </div>
          {expandedImages && (
            <div className="grid grid-cols-2 gap-3">
              {images.map((image, idx) => (
                <img
                  key={idx}
                  src={image.url || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-40 object-cover rounded"
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
