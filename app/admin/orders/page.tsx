"use client"

import { useState } from "react"
import { Eye } from "lucide-react"

interface AdminOrder {
  id: string
  customerName: string
  customerEmail: string
  total: number
  status: string
  date: string
}

export default function OrdersManagement() {
  const [orders, setOrders] = useState<AdminOrder[]>([])

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold text-foreground">Orders Management</h1>
        <p className="text-muted-foreground mt-2">View and manage customer orders</p>
      </div>

      {/* Search & Filter */}
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Search by order ID, name, or email..."
          className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Orders Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-border bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Order ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Customer</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Total</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                  No orders yet.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-b border-border hover:bg-muted/50 transition">
                  <td className="px-6 py-4 text-foreground font-medium">{order.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-foreground">{order.customerName}</p>
                      <p className="text-muted-foreground text-sm">{order.customerEmail}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-foreground">${order.total}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-blue-500/20 text-blue-700">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-sm">{order.date}</td>
                  <td className="px-6 py-4">
                    <button className="p-2 hover:bg-muted rounded transition" title="View">
                      <Eye className="w-4 h-4" />
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
