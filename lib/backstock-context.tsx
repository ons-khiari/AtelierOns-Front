"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface BackstockNotification {
  id: string
  productId: string
  productName: string
  email?: string
  phone?: string
  createdAt: number
}

interface BackstockContextType {
  notifications: BackstockNotification[]
  addNotification: (notification: Omit<BackstockNotification, "id" | "createdAt">) => void
  removeNotification: (id: string) => void
  getNotificationsForProduct: (productId: string) => BackstockNotification[]
}

const BackstockContext = createContext<BackstockContextType | undefined>(undefined)

export function BackstockProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<BackstockNotification[]>([])
  const [mounted, setMounted] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("backstock-notifications")
    if (saved) {
      setNotifications(JSON.parse(saved))
    }
    setMounted(true)
  }, [])

  // Save to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("backstock-notifications", JSON.stringify(notifications))
    }
  }, [notifications, mounted])

  const addNotification = (notification: Omit<BackstockNotification, "id" | "createdAt">) => {
    const newNotification: BackstockNotification = {
      ...notification,
      id: `${notification.productId}-${Date.now()}`,
      createdAt: Date.now(),
    }
    setNotifications((prev) => [...prev, newNotification])
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getNotificationsForProduct = (productId: string) => {
    return notifications.filter((n) => n.productId === productId)
  }

  return (
    <BackstockContext.Provider
      value={{ notifications, addNotification, removeNotification, getNotificationsForProduct }}
    >
      {children}
    </BackstockContext.Provider>
  )
}

export function useBackstock() {
  const context = useContext(BackstockContext)
  if (context === undefined) {
    throw new Error("useBackstock must be used within a BackstockProvider")
  }
  return context
}
