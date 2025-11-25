"use client"

import { useState } from "react"
import { Plus, Edit, Trash2 } from "lucide-react"

interface AdminBundle {
  id: string
  name: string
  price: number
  products: number
  discount: number
}

export default function BundlesManagement() {
  const [bundles, setBundles] = useState<AdminBundle[]>([])
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-4xl font-bold text-foreground">Bundles Management</h1>
          <p className="text-muted-foreground mt-2">Create and manage product bundles</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
        >
          <Plus className="w-5 h-5" />
          Create Bundle
        </button>
      </div>

      {/* Bundles Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-border bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Bundle Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Products</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Price</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Discount</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bundles.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                  No bundles created yet.
                </td>
              </tr>
            ) : (
              bundles.map((bundle) => (
                <tr key={bundle.id} className="border-b border-border hover:bg-muted/50 transition">
                  <td className="px-6 py-4 text-foreground font-medium">{bundle.name}</td>
                  <td className="px-6 py-4 text-foreground">{bundle.products} products</td>
                  <td className="px-6 py-4 text-foreground">${bundle.price}</td>
                  <td className="px-6 py-4 text-accent font-medium">${bundle.discount} off</td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <button className="p-2 hover:bg-muted rounded transition" title="Edit">
                      <Edit className="w-4 h-4" />
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
