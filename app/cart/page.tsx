'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useCart } from '@/lib/cart-context';
import Link from 'next/link';
import { Trash2, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 py-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="font-serif text-4xl font-bold text-foreground mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Explore our exquisite collection of journals, planners, and stationery to add items to your cart.
            </p>
            <Link
              href="/journal-folios"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-serif rounded hover:bg-primary/90 transition"
            >
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Breadcrumb */}
      <nav className="px-4 py-4 text-sm text-muted-foreground border-b border-border">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="hover:text-primary transition">
            Home
          </Link>
          {' / '}
          <span className="text-foreground">Shopping Cart</span>
        </div>
      </nav>

      {/* Cart Content */}
      <div className="flex-1 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-8">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 border border-border rounded p-4 hover:border-primary/30 transition">
                    {/* Product Image */}
                    <Link href={`/products/${item.id}`} className="flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1">
                      <Link href={`/products/${item.id}`} className="hover:text-primary transition">
                        <h3 className="font-serif font-bold text-foreground text-lg">{item.name}</h3>
                      </Link>
                      {item.size && (
                        <p className="text-sm text-muted-foreground mt-1">Size: {item.size}</p>
                      )}
                      <p className="text-accent font-semibold mt-1">${item.price}</p>
                    </div>

                    {/* Quantity Control */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-border rounded">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-foreground hover:bg-muted transition"
                        >
                          −
                        </button>
                        <span className="px-3 py-1 text-center font-semibold min-w-12">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-foreground hover:bg-muted transition"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded transition"
                        aria-label="Remove from cart"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="flex-shrink-0 text-right">
                      <p className="font-serif font-bold text-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <Link
                href="/journal-folios"
                className="inline-flex items-center gap-2 text-primary font-serif hover:text-accent transition mt-6"
              >
                ← Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border border-border rounded p-6 sticky top-20">
                <h2 className="font-serif text-xl font-bold text-foreground mb-6">Order Summary</h2>

                <div className="space-y-3 pb-6 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground font-medium">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="text-foreground font-medium">Calculated at checkout</span>
                  </div>
                </div>

                <div className="flex justify-between text-lg font-bold mt-6 mb-6">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>

                <Link
                  href="/checkout"
                  className="block text-center w-full bg-primary text-primary-foreground px-6 py-3 rounded font-serif font-bold hover:bg-primary/90 transition mb-3"
                >
                  Proceed to Checkout
                </Link>

                <button
                  onClick={clearCart}
                  className="w-full border border-border text-foreground px-6 py-2 rounded font-serif hover:bg-muted transition text-sm"
                >
                  Clear Cart
                </button>

                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Free shipping on all orders. Safe & secure checkout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
