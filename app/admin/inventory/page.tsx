"use client"

import { useState } from "react"
import { AlertTriangle } from "lucide-react"

interface InventoryItem {
  id: string
  name: string
  sku: string
  stock: number
  reorderLevel: number
}

export default function InventoryManagement() {
  const [inventory, setInventory] = useState<InventoryItem[]>([])

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold text-foreground">Inventory Management</h1>
        <p className="text-muted-foreground mt-2">Monitor stock levels and manage inventory</p>
      </div>

      {/* Inventory Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-border bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Product</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">SKU</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Stock</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Reorder Level</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {inventory.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                  No inventory items yet.
                </td>
              </tr>
            ) : (
              inventory.map((item) => {
                const isLowStock = item.stock < item.reorderLevel
                return (
                  <tr key={item.id} className="border-b border-border hover:bg-muted/50 transition">
                    <td className="px-6 py-4 text-foreground">{item.name}</td>
                    <td className="px-6 py-4 text-foreground">{item.sku}</td>
                    <td className="px-6 py-4 text-foreground font-medium">{item.stock}</td>
                    <td className="px-6 py-4 text-foreground">{item.reorderLevel}</td>
                    <td className="px-6 py-4">
                      {isLowStock ? (
                        <span className="flex items-center gap-1 text-destructive font-medium">
                          <AlertTriangle className="w-4 h-4" />
                          Low Stock
                        </span>
                      ) : (
                        <span className="text-green-700 font-medium">In Stock</span>
                      )}
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
