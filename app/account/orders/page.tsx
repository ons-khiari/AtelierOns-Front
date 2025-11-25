"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/lib/auth-context"
import { ChevronLeft } from "lucide-react"
import { useEffect } from "react"

export default function OrdersPage() {
  const router = useRouter()
  const { isLoggedIn, orders } = useAuth()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn) return null

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/account"
              className="inline-flex items-center gap-2 text-primary hover:text-accent transition mb-4"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Account
            </Link>
            <h1 className="font-serif text-4xl font-bold text-foreground mb-2">My Orders</h1>
            <p className="text-muted-foreground">View your purchase history</p>
          </div>

          {/* Orders List */}
          {orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-card border border-border rounded-lg p-6 hover-lift transition">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-foreground">
                        Order #{order.id.slice(0, 8).toUpperCase()}
                      </h3>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                    </div>
                    <p className="font-serif text-2xl font-bold text-primary">${order.total}</p>
                  </div>

                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <p key={idx} className="text-muted-foreground text-sm">
                        {item.name} × {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted rounded-lg border border-border">
              <p className="text-muted-foreground mb-4">You haven't placed any orders yet</p>
              <Link
                href="/all-products"
                className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
              >
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
