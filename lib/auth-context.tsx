"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: string
  role: "user" | "admin"
}

export interface UserRating {
  id: string
  productId: string
  productName: string
  productImage: string
  rating: number
  title: string
  comment: string
  date: string
  images?: string[]
}

export interface Order {
  id: string
  date: string
  total: number
  items: Array<{ name: string; price: number; quantity: number }>
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  customerEmail?: string
  customerName?: string
  customerPhone?: string
}

interface AuthContextType {
  user: UserProfile | null
  isLoggedIn: boolean
  isAdmin: boolean
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<string | null>
  login: (email: string, password: string) => Promise<string | null>
  logout: () => void
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>
  addRating: (rating: UserRating) => void
  getRatings: () => UserRating[]
  orders: Order[]
  favorites: Array<{ id: string; name: string; price: number; image: string }>
  addToFavorites: (item: any) => void
  removeFromFavorites: (id: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [ratings, setRatings] = useState<UserRating[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [favorites, setFavorites] = useState<Array<{ id: string; name: string; price: number; image: string }>>([])
  const [mounted, setMounted] = useState(false)

  // Load auth data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    const savedRatings = localStorage.getItem("ratings")
    const savedOrders = localStorage.getItem("orders")
    const savedFavorites = localStorage.getItem("accountFavorites")

    if (savedUser) setUser(JSON.parse(savedUser))
    if (savedRatings) setRatings(JSON.parse(savedRatings))
    if (savedOrders) setOrders(JSON.parse(savedOrders))
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
    setMounted(true)
  }, [])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user))
      } else {
        localStorage.removeItem("user")
      }
    }
  }, [user, mounted])

  // Save ratings to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("ratings", JSON.stringify(ratings))
    }
  }, [ratings, mounted])

  // Save favorites to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("accountFavorites", JSON.stringify(favorites))
    }
  }, [favorites, mounted])

  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<string | null> => {
    // Check if email already exists
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]")
    if (existingUsers.some((u: any) => u.email === email)) {
      return "Email already in use"
    }

    const isFirstUser = existingUsers.length === 0

    const newUser: UserProfile = {
      id: Date.now().toString(),
      email,
      firstName,
      lastName,
      phoneNumber: "",
      address: "",
      role: isFirstUser ? "admin" : "user",
    }

    // Save user account
    const users = [...existingUsers, { email, password, ...newUser }]
    localStorage.setItem("users", JSON.stringify(users))
    setUser(newUser)
    return null
  }

  const login = async (email: string, password: string): Promise<string | null> => {
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const foundUser = users.find((u: any) => u.email === email && u.password === password)

    if (!foundUser) {
      return "Invalid email or password"
    }

    const { password: _, ...userWithoutPassword } = foundUser
    setUser(userWithoutPassword)
    return null
  }

  const logout = () => {
    setUser(null)
  }

  const updateProfile = async (profile: Partial<UserProfile>) => {
    if (user) {
      const updatedUser = { ...user, ...profile }
      setUser(updatedUser)

      // Update in users list
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const updatedUsers = users.map((u: any) => (u.id === user.id ? { ...u, ...profile } : u))
      localStorage.setItem("users", JSON.stringify(updatedUsers))
    }
  }

  const addRating = (rating: UserRating) => {
    setRatings((prev) => [...prev, { ...rating, id: Date.now().toString() }])
  }

  const getRatings = () => ratings

  const addToFavorites = (item: any) => {
    setFavorites((prev) => {
      const exists = prev.find((f) => f.id === item.id)
      if (exists) return prev
      return [...prev, item]
    })
  }

  const removeFromFavorites = (id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isAdmin: user?.role === "admin" ?? false,
        register,
        login,
        logout,
        updateProfile,
        addRating,
        getRatings,
        orders,
        favorites,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
