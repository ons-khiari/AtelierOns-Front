"use client"

import { useState } from "react"
import { Plus, Edit, Trash2 } from "lucide-react"

interface AdminProduct {
  id: string
  title: string
  category: string
  price: number
  stock: number
  trending: boolean
  published: boolean
}

export default function ProductsManagement() {
  const [products, setProducts] = useState<AdminProduct[]>([])
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-4xl font-bold text-foreground">Products Management</h1>
          <p className="text-muted-foreground mt-2">Manage your product catalog</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-border bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Product</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Category</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Price</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Stock</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                  No products yet. Create your first product to get started.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-b border-border hover:bg-muted/50 transition">
                  <td className="px-6 py-4 text-foreground">{product.title}</td>
                  <td className="px-6 py-4 text-foreground">{product.category}</td>
                  <td className="px-6 py-4 text-foreground">${product.price}</td>
                  <td className="px-6 py-4 text-foreground">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        product.published ? "bg-green-500/20 text-green-700" : "bg-yellow-500/20 text-yellow-700"
                      }`}
                    >
                      {product.published ? "Published" : "Draft"}
                    </span>
                  </td>
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
