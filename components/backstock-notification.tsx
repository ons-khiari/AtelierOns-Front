"use client"

import type React from "react"

import { useState } from "react"
import { Bell, X, Mail, Phone } from "lucide-react"
import { useBackstock } from "@/lib/backstock-context"

interface BackstockNotificationProps {
  productId: string
  productName: string
  isSoldOut: boolean
}

export function BackstockNotificationForm({ productId, productName, isSoldOut }: BackstockNotificationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [notificationType, setNotificationType] = useState<"email" | "phone">("email")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { addNotification } = useBackstock()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email && !phone) return

    addNotification({
      productId,
      productName,
      email: notificationType === "email" ? email : undefined,
      phone: notificationType === "phone" ? phone : undefined,
    })

    setIsSubmitted(true)
    setTimeout(() => {
      setIsOpen(false)
      setEmail("")
      setPhone("")
      setIsSubmitted(false)
    }, 2000)
  }

  if (!isSoldOut) return null

  if (isSubmitted) {
    return (
      <div className="bg-accent/10 border border-accent rounded-lg p-4 text-center">
        <Bell className="w-5 h-5 text-accent mx-auto mb-2" />
        <p className="text-sm font-semibold text-accent">
          Notification saved! We'll notify you when this product is back in stock.
        </p>
      </div>
    )
  }

  return (
    <div className="border border-border rounded-lg p-4">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full flex items-center justify-center gap-2 text-accent font-semibold hover:text-accent/80 transition"
        >
          <Bell className="w-5 h-5" />
          Notify me when back in stock
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif font-bold text-foreground">Get Notified</h3>
            <button type="button" onClick={() => setIsOpen(false)} className="p-1 hover:bg-muted rounded transition">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Notification Type Selector */}
          <div className="flex gap-2">
            {["email", "phone"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setNotificationType(type as "email" | "phone")}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded border-2 transition ${
                  notificationType === type
                    ? "bg-primary/10 border-primary text-primary"
                    : "border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                {type === "email" ? <Mail className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                {type === "email" ? "Email" : "Phone"}
              </button>
            ))}
          </div>

          {/* Input Field */}
          <input
            type={notificationType === "email" ? "email" : "tel"}
            placeholder={notificationType === "email" ? "your@email.com" : "(555) 123-4567"}
            value={notificationType === "email" ? email : phone}
            onChange={(e) => {
              if (notificationType === "email") {
                setEmail(e.target.value)
              } else {
                setPhone(e.target.value)
              }
            }}
            className="w-full px-3 py-2 border border-border rounded bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />

          <button
            type="submit"
            disabled={notificationType === "email" ? !email : !phone}
            className="w-full bg-primary text-primary-foreground px-4 py-2 rounded font-semibold hover:bg-primary/90 transition disabled:opacity-50 btn-press"
          >
            Save Notification
          </button>

          <p className="text-xs text-muted-foreground text-center">
            We'll notify you as soon as {productName} is back in stock.
          </p>
        </form>
      )}
    </div>
  )
}
