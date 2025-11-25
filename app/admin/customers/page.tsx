"use client"

import { useState } from "react"
import { Eye } from "lucide-react"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  joinDate: string
  orderCount: number
}

export default function CustomersManagement() {
  const [customers, setCustomers] = useState<Customer[]>([])

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold text-foreground">Customers Management</h1>
        <p className="text-muted-foreground mt-2">View customer profiles and purchase history</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search customers..."
          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Customers Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-border bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Phone</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Orders</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Join Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                  No customers yet.
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr key={customer.id} className="border-b border-border hover:bg-muted/50 transition">
                  <td className="px-6 py-4 text-foreground font-medium">{customer.name}</td>
                  <td className="px-6 py-4 text-foreground">{customer.email}</td>
                  <td className="px-6 py-4 text-foreground">{customer.phone}</td>
                  <td className="px-6 py-4 text-foreground">{customer.orderCount}</td>
                  <td className="px-6 py-4 text-muted-foreground text-sm">{customer.joinDate}</td>
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
