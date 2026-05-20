"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export function MiniCart() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeFromCart, updateQuantity, total } = useCart();

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-96 bg-white border-l border-gray-200 z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-sm uppercase tracking-[0.3em] text-gray-700">
            Cart
          </h2>

          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-black transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={`${item.id}-${item.size || "default"}`}
                className="flex gap-4 pb-4 border-b border-gray-100"
              >
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-20 h-20 object-cover"
                />

                <div className="flex-1">
                  <h3 className="text-sm text-gray-800">{item.name}</h3>

                  <p className="text-sm text-black font-medium mt-1">
                    ${item.price}
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="text-gray-500 hover:text-black transition"
                    >
                      <Minus className="w-3 h-3" />
                    </button>

                    <span className="text-sm w-6 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-gray-500 hover:text-black transition"
                    >
                      <Plus className="w-3 h-3" />
                    </button>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto text-xs text-gray-500 hover:text-black transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
              <ShoppingBag className="w-10 h-10 mb-3 opacity-40" />
              <p>Your cart is empty</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-black font-medium">
                ${total.toFixed(2)}
              </span>
            </div>

            <Link
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="w-full border border-black bg-black text-white px-4 py-3 text-[11px] uppercase tracking-[0.25em] text-center block hover:bg-white hover:text-black transition"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>

      {/* Trigger Button (UPDATED like heart style) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative text-gray-700 hover:text-black transition group cursor-pointer"
        aria-label="Open cart"
      >
        <ShoppingBag className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />

        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>
    </>
  );
}
