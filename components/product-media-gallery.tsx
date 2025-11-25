"use client"

import { useState } from "react"
import { Play } from "lucide-react"

interface Media {
  type: "image" | "video"
  url: string
  thumbnail?: string
}

interface ProductMediaGalleryProps {
  media: Media[]
}

export function ProductMediaGallery({ media }: ProductMediaGalleryProps) {
  const [selectedMedia, setSelectedMedia] = useState(0)
  const [isPlayingVideo, setIsPlayingVideo] = useState(false)

  if (!media || media.length === 0) return null

  const currentMedia = media[selectedMedia]
  const isVideo = currentMedia.type === "video"

  return (
    <div className="space-y-4">
      {/* Main Media Display */}
      <div className="relative bg-muted rounded overflow-hidden aspect-square">
        {isVideo ? (
          isPlayingVideo ? (
            <video src={currentMedia.url} autoPlay loop controls className="w-full h-full object-cover" />
          ) : (
            <>
              <img
                src={currentMedia.thumbnail || "/placeholder.svg"}
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setIsPlayingVideo(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition"
              >
                <Play className="w-16 h-16 text-white" fill="white" />
              </button>
            </>
          )
        ) : (
          <img src={currentMedia.url || "/placeholder.svg"} alt="Product" className="w-full h-full object-cover" />
        )}
      </div>

      {/* Media Thumbnails */}
      {media.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {media.map((m, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedMedia(idx)
                setIsPlayingVideo(false)
              }}
              className={`relative aspect-square rounded overflow-hidden border-2 transition ${
                idx === selectedMedia ? "border-primary" : "border-border"
              }`}
            >
              <img
                src={m.type === "video" ? m.thumbnail || "/placeholder.svg" : m.url}
                alt="Thumbnail"
                className="w-full h-full object-cover"
              />
              {m.type === "video" && (
                <Play
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white"
                  fill="white"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
