"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { ChevronDown, LogOut, User, Heart, ShoppingBag } from "lucide-react"

export function AuthDropdown() {
  const { user, isLoggedIn, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  if (isLoggedIn && user) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded hover:bg-muted transition text-sm"
        >
          <User className="w-4 h-4" />
          <span>Hi, {user.firstName}</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-background border border-border rounded-lg shadow-lg z-50 animate-fadeIn">
            {/* User info */}
            <div className="px-4 py-3 border-b border-border">
              <p className="text-sm font-medium text-foreground">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>

            {/* Menu items */}
            <Link
              href="/account"
              className="flex items-center gap-2 px-4 py-2 text-foreground hover:bg-muted transition text-sm border-b border-border"
              onClick={() => setIsOpen(false)}
            >
              <User className="w-4 h-4" />
              My Account
            </Link>
            <Link
              href="/account/orders"
              className="flex items-center gap-2 px-4 py-2 text-foreground hover:bg-muted transition text-sm border-b border-border"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingBag className="w-4 h-4" />
              My Orders
            </Link>
            <Link
              href="/account/favorites"
              className="flex items-center gap-2 px-4 py-2 text-foreground hover:bg-muted transition text-sm border-b border-border"
              onClick={() => setIsOpen(false)}
            >
              <Heart className="w-4 h-4" />
              My Favorites
            </Link>
            <Link
              href="/account/ratings"
              className="flex items-center gap-2 px-4 py-2 text-foreground hover:bg-muted transition text-sm border-b border-border"
              onClick={() => setIsOpen(false)}
            >
              <span>★</span>
              My Reviews
            </Link>
            <button
              onClick={() => {
                logout()
                setIsOpen(false)
              }}
              className="w-full text-left px-4 py-2 text-foreground hover:bg-destructive/10 transition text-sm flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      {/* <Link href="/login" className="px-3 py-2 text-foreground hover:text-primary transition text-sm font-medium">
        Login
      </Link> */}
      <Link
        href="/register"
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition text-sm font-medium"
      >
        Sign Up
      </Link>
    </div>
  )
}
