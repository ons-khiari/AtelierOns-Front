"use client"

import { useState } from "react"
import { CheckCircle } from "lucide-react"

interface BackstockRequest {
  id: string
  customerEmail: string
  productName: string
  productSize: string
  notified: boolean
  requestDate: string
}

export default function NotificationsManagement() {
  const [requests, setRequests] = useState<BackstockRequest[]>([])

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold text-foreground">Back-in-Stock Notifications</h1>
        <p className="text-muted-foreground mt-2">Manage back-in-stock notification requests</p>
      </div>

      {/* Requests Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-border bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Customer Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Product</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Size</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Notified</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                  No back-in-stock requests yet.
                </td>
              </tr>
            ) : (
              requests.map((req) => (
                <tr key={req.id} className="border-b border-border hover:bg-muted/50 transition">
                  <td className="px-6 py-4 text-foreground">{req.customerEmail}</td>
                  <td className="px-6 py-4 text-foreground">{req.productName}</td>
                  <td className="px-6 py-4 text-foreground">{req.productSize}</td>
                  <td className="px-6 py-4">
                    {req.notified ? (
                      <span className="flex items-center gap-1 text-green-700 font-medium">
                        <CheckCircle className="w-4 h-4" />
                        Yes
                      </span>
                    ) : (
                      <span className="text-yellow-700 font-medium">Pending</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-sm">{req.requestDate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
