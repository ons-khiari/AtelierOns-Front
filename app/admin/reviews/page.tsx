"use client"

import { useState } from "react"
import { Eye, Trash2 } from "lucide-react"

interface AdminReview {
  id: string
  productName: string
  customerName: string
  rating: number
  comment: string
  status: "approved" | "pending" | "hidden"
}

export default function ReviewsManagement() {
  const [reviews, setReviews] = useState<AdminReview[]>([])

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold text-foreground">Reviews Management</h1>
        <p className="text-muted-foreground mt-2">Moderate and manage product reviews</p>
      </div>

      {/* Reviews Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-border bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Product</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Customer</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Rating</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Comment</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                  No reviews yet.
                </td>
              </tr>
            ) : (
              reviews.map((review) => (
                <tr key={review.id} className="border-b border-border hover:bg-muted/50 transition">
                  <td className="px-6 py-4 text-foreground">{review.productName}</td>
                  <td className="px-6 py-4 text-foreground">{review.customerName}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.rating ? "text-accent" : "text-muted-foreground"}>
                          ★
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-foreground text-sm max-w-xs truncate">{review.comment}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        review.status === "approved"
                          ? "bg-green-500/20 text-green-700"
                          : review.status === "pending"
                            ? "bg-yellow-500/20 text-yellow-700"
                            : "bg-red-500/20 text-red-700"
                      }`}
                    >
                      {review.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <button className="p-2 hover:bg-muted rounded transition" title="View">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-destructive/10 rounded transition" title="Delete">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
