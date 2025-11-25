"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Heart, User } from "lucide-react"
import { useFavorites } from "@/lib/favorites-context"
import { useAuth } from "@/lib/auth-context"
import { AuthDropdown } from "./auth-dropdown"
import { SearchDropdown } from "./search-dropdown"
import { MiniCart } from "./mini-cart"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { favoritesCount } = useFavorites()
  const { user } = useAuth()

  const navLinks = [
    { href: "/journal-folios", label: "Journal Folios" },
    { href: "/bookmarks", label: "Bookmarks" },
    { href: "/stickers", label: "Stickers" },
    { href: "/journal-basics", label: "Journal Basics" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-2xl font-bold tracking-tight text-primary hover:text-accent transition"
        >
          Ons Atelier
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-foreground hover:text-primary transition">
              {link.label}
            </Link>
          ))}
          {/* Admin link for admin users */}
          {user?.role === "admin" && (
            <Link href="/admin" className="text-foreground hover:text-primary transition font-medium">
              Admin
            </Link>
          )}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <SearchDropdown />
          <Link href="/favorites" className="p-2 hover:bg-muted rounded transition relative" aria-label="Favorites">
            <Heart className="w-5 h-5" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-bold">
                {favoritesCount}
              </span>
            )}
          </Link>
          <MiniCart />
          <AuthDropdown />
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden border-t border-border bg-background px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground hover:text-primary transition"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {/* Admin link for admin users */}
          {user?.role === "admin" && (
            <Link
              href="/admin"
              className="text-foreground hover:text-primary transition font-medium"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
          )}
          <div className="border-t border-border pt-4 mt-4 space-y-4">
            <Link href="/favorites" className="text-foreground hover:text-primary transition flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Favorites {favoritesCount > 0 && `(${favoritesCount})`}
            </Link>
            <Link href="/cart" className="text-foreground hover:text-primary transition flex items-center gap-2">
              View Cart
            </Link>
            <Link href="/account" className="text-foreground hover:text-primary transition flex items-center gap-2">
              <User className="w-4 h-4" />
              Account
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
