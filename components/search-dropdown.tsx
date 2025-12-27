"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Search, X } from "lucide-react"
import { type products, searchProducts } from "@/lib/products"

export function SearchDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<typeof products>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (query.trim()) {
      const filtered = searchProducts(query)
      setResults(filtered)
      setSelectedIndex(-1)
    } else {
      setResults([])
      setSelectedIndex(-1)
    }
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0) {
          const product = results[selectedIndex]
          window.location.href = `/products/${product.id}`
          setIsOpen(false)
          setQuery("")
        }
        break
      case "Escape":
        setIsOpen(false)
        setQuery("")
        break
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => {
          setIsOpen(!isOpen)
          if (!isOpen) setTimeout(() => inputRef.current?.focus(), 0)
        }}
        className="p-2 hover:bg-muted rounded transition"
        aria-label="Search"
      >
        <Search className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-200 bg-background border border-border rounded-lg shadow-lg z-50 animate-fadeIn">
          {/* Search Input */}
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full pl-10 pr-8 py-2 bg-muted border border-border rounded text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                autoFocus
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {results.length > 0 ? (
              <ul className="divide-y divide-border">
                {results.map((product, index) => (
                  <li
                    key={product.id}
                    className={`transition ${index === selectedIndex ? "bg-muted" : "hover:bg-muted"}`}
                  >
                    <Link
                      href={`/products/${product.id}`}
                      className="flex items-center gap-3 p-3"
                      onClick={() => {
                        setIsOpen(false)
                        setQuery("")
                      }}
                    >
                      <img
                        src={product.thumbnailImage || "/placeholder.svg"}
                        alt={product.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{product.title}</p>
                        <p className="text-xs text-muted-foreground">{product.category}</p>
                      </div>
                      <p className="font-semibold text-primary whitespace-nowrap">${product.price}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : query ? (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">No products found</p>
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-muted-foreground text-sm">Start typing to search</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
