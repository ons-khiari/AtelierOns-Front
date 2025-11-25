"use client"

import { useState } from "react"
import Link from "next/link"
import { X, Minus, Plus, ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"

export function MiniCart() {
  const [isOpen, setIsOpen] = useState(false)
  const { items, removeFromCart, updateQuantity, total } = useCart()

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setIsOpen(false)} />}

      {/* Mini Cart Slide-out */}
      <div
        className={`fixed right-0 top-0 h-full w-96 bg-background border-l border-border shadow-lg z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0 animate-slideInRight" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-serif text-xl font-bold text-foreground">Cart</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-muted rounded transition"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={`${item.id}-${item.size || "default"}`} className="flex gap-4 pb-4 border-b border-border">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-serif font-bold text-foreground text-sm">{item.name}</h3>
                  {item.size && <p className="text-xs text-muted-foreground">{item.size}</p>}
                  <p className="text-sm text-primary font-semibold mt-1">${item.price}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-muted rounded transition btn-press"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-muted rounded transition btn-press"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto text-xs text-muted-foreground hover:text-destructive transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-foreground">Subtotal:</span>
              <span className="font-serif text-lg text-primary font-bold">${total.toFixed(2)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="w-full bg-primary text-primary-foreground px-4 py-3 rounded font-serif font-bold hover:bg-primary/90 btn-press transition text-center block"
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full border-2 border-border text-foreground px-4 py-3 rounded font-semibold hover:bg-muted btn-press transition"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      {/* Cart Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-muted rounded transition relative"
        aria-label="Open cart"
      >
        <ShoppingCart className="w-5 h-5" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-bold animate-popIn">
            {cartCount}
          </span>
        )}
      </button>
    </>
  )
}
