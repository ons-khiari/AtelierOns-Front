"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart-context"
import { ChevronLeft } from "lucide-react"

const regions = [
  "Tunis",
  "Sfax",
  "Sousse",
  "Kairouan",
  "Gafsa",
  "Jendouba",
  "Kébili",
  "Kasserine",
  "Tataouine",
  "Sidi Bouzid",
  "Tozeur",
  "Mahdia",
  "Manouba",
  "Monastir",
  "Nabeul",
  "Bizerte",
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    building: "",
    city: "",
    region: "",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.street ||
      !formData.city ||
      !formData.region
    ) {
      alert("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    // Simulate order processing
    setTimeout(() => {
      // Store order data in session storage for thank you page
      sessionStorage.setItem(
        "orderData",
        JSON.stringify({
          formData: {
            fullName: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
            street: formData.street,
            building: formData.building,
            city: formData.city,
            region: formData.region,
            notes: formData.notes,
          },
          items,
          total,
          orderNumber: `ORD-${Date.now()}`,
          deliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        }),
      )

      clearCart()
      setIsSubmitting(false)
      router.push("/thank-you")
    }, 800)
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 py-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="font-serif text-4xl font-bold text-foreground mb-4">Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">Please add items to your cart before checkout.</p>
            <Link
              href="/journal-folios"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-serif rounded hover:bg-primary/90 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
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
          {" / "}
          <Link href="/cart" className="hover:text-primary transition">
            Cart
          </Link>
          {" / "}
          <span className="text-foreground">Checkout</span>
        </div>
      </nav>

      {/* Checkout Content */}
      <div className="flex-1 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-12">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Customer Information */}
                <div className="border border-border rounded-lg p-6">
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Delivery Information</h2>

                  <div className="space-y-4">
                    {/* First Name */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/50 transition bg-background text-foreground"
                        required
                      />
                    </div>

                    {/* Last Name */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                        className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/50 transition bg-background text-foreground"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/50 transition bg-background text-foreground"
                        required
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+216 (XX) XXX XXX"
                        className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/50 transition bg-background text-foreground"
                        required
                      />
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Street Address *</label>
                      <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        placeholder="123 Main Street"
                        className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/50 transition bg-background text-foreground"
                        required
                      />
                    </div>

                    {/* Building/Apt */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Building / Apartment (Optional)
                      </label>
                      <input
                        type="text"
                        name="building"
                        value={formData.building}
                        onChange={handleChange}
                        placeholder="Apt 4B, Suite 100, etc."
                        className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/50 transition bg-background text-foreground"
                      />
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Tunis"
                        className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/50 transition bg-background text-foreground"
                        required
                      />
                    </div>

                    {/* Governorate */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Governorate *</label>
                      <select
                        name="region"
                        value={formData.region}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/50 transition bg-background text-foreground"
                        required
                      >
                        <option value="">Select a governorate...</option>
                        {regions.map((region) => (
                          <option key={region} value={region}>
                            {region}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Special Instructions (Optional)
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Leave any special delivery instructions here..."
                        rows={4}
                        className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/50 transition bg-background text-foreground resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Back to Cart & Confirm */}
                <div className="flex gap-4 pt-6">
                  <Link
                    href="/cart"
                    className="flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded font-serif hover:bg-muted transition"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Cart
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded font-serif font-bold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    {isSubmitting ? "Processing..." : "Confirm Order"}
                  </button>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border border-border rounded-lg p-6 sticky top-20">
                <h2 className="font-serif text-xl font-bold text-foreground mb-6">Order Summary</h2>

                {/* Order Items */}
                <div className="space-y-3 pb-6 border-b border-border">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div>
                        <p className="text-foreground font-medium">{item.name}</p>
                        <p className="text-muted-foreground text-xs">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-foreground font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-3 pb-6 border-b border-border mt-6">
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

                <div className="flex justify-between text-lg font-bold mt-6">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>

                <p className="text-xs text-muted-foreground mt-4 text-center">🔒 Safe & Secure Checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
