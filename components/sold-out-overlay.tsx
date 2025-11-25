"use client"

interface SoldOutOverlayProps {
  isSoldOut: boolean
}

export function SoldOutOverlay({ isSoldOut }: SoldOutOverlayProps) {
  if (!isSoldOut) return null

  return (
    <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded">
      <div className="text-center">
        <p className="font-serif text-2xl font-bold text-white">Sold Out</p>
        <p className="text-sm text-white/80 mt-2">Check back soon</p>
      </div>
    </div>
  )
}
