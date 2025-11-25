"use client"

export default function AnalyticsDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground mt-2">Detailed sales and performance insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="font-serif text-xl font-bold text-foreground mb-4">Sales Per Day</h2>
          <div className="h-64 flex items-center justify-center text-muted-foreground">Chart will appear here</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="font-serif text-xl font-bold text-foreground mb-4">Top Selling Products</h2>
          <div className="h-64 flex items-center justify-center text-muted-foreground">Chart will appear here</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="font-serif text-xl font-bold text-foreground mb-4">Category Sales Breakdown</h2>
          <div className="h-64 flex items-center justify-center text-muted-foreground">Chart will appear here</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="font-serif text-xl font-bold text-foreground mb-4">Returning Customers</h2>
          <div className="h-64 flex items-center justify-center text-muted-foreground">Chart will appear here</div>
        </div>
      </div>
    </div>
  )
}
