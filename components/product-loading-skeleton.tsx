export function ProductLoadingSkeleton() {
  return (
    <div className="space-y-4 animate-fadeIn">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="animate-shimmer">
          <div className="bg-muted rounded h-64 mb-4"></div>
          <div className="bg-muted rounded h-4 w-3/4 mb-2"></div>
          <div className="bg-muted rounded h-4 w-1/2 mb-4"></div>
          <div className="flex gap-2">
            <div className="bg-muted rounded h-10 flex-1"></div>
            <div className="bg-muted rounded h-10 w-10"></div>
          </div>
        </div>
      ))}
    </div>
  )
}
