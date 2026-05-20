"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Heart,
  ShoppingBag,
  Instagram,
  Youtube,
  User,
  Music,
  Search,
  Facebook,
} from "lucide-react";
import { useFavorites } from "@/lib/favorites-context";
import { useAuth } from "@/lib/auth-context";
import { AuthDropdown } from "./auth-dropdown";
import { SearchDropdown } from "./search-dropdown";
import { MiniCart } from "./mini-cart";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { favorites, favoritesCount } = useFavorites();
  const { user } = useAuth();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/journal-folios", label: "Journal Folios" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/faq", label: "FAQ" },
  ];

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="border-b border-gray bg-background sticky top-0 z-50">
      {/* first navbar */}
      <div className="bg-[#1f2937] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="h-12 flex items-center justify-center relative">
            {/* Decorative Lines */}
            <div className="hidden md:block absolute left-0 w-24 h-px bg-gradient-to-r from-transparent to-white/30" />
            <div className="hidden md:block absolute right-0 w-24 h-px bg-gradient-to-l from-transparent to-white/30" />

            {/* Content */}
            <div className="flex items-center gap-4 md:gap-6">
              <span className="text-[11px] md:text-xs uppercase tracking-[0.35em] font-medium text-white/90">
                Get 25% Off An Item
              </span>

              <div className="w-px h-4 bg-white/20" />

              <button className="group relative overflow-hidden border border-white/20 px-5 py-1.5 text-[10px] md:text-[11px] uppercase tracking-[0.25em] hover:border-white/40 transition-all duration-300">
                {/* Hover Background */}
                <span className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />

                {/* Text */}
                <span className="relative z-10 text-white group-hover:text-[#1f2937] transition-colors duration-300">
                  Unlock Offer
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* second navbar */}
      <div className="bg-[#f8f5ef] ">
        <div className="max-w-7xl mx-auto h-12 px-5 lg:px-8 flex items-center justify-between">
          {/* Left — Social & Contact */}
          <div className="flex items-center gap-5 min-w-fit">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="group"
            >
              <Instagram className="w-[15px] h-[15px] text-[#7b6a58] transition-all duration-300 group-hover:text-[#3e2f23] group-hover:scale-110" />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="group"
            >
              <Facebook className="w-[15px] h-[15px] text-[#7b6a58] transition-all duration-300 group-hover:text-[#3e2f23] group-hover:scale-110" />
            </a>

            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="group"
            >
              <Music className="w-[15px] h-[15px] text-[#7b6a58] transition-all duration-300 group-hover:text-[#3e2f23] group-hover:scale-110" />
            </a>

            <div className="hidden lg:block w-px h-4 bg-[#d8cbb8]" />

            <span className="hidden lg:block text-[11px] tracking-[0.18em] uppercase text-[#8b7763]">
              Since 2026
            </span>
          </div>

          {/* Center — Elegant Marquee */}
          <div className="hidden md:flex flex-1 mx-10 overflow-hidden relative">
            {/* Fade Left */}
            <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#f8f5ef] to-transparent z-10 pointer-events-none" />

            {/* Fade Right */}
            <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#f8f5ef] to-transparent z-10 pointer-events-none" />

            <div className="victorian-marquee flex items-center">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center shrink-0">
                  <span className="mx-12 text-[11px] uppercase tracking-[0.28em] text-[#6d5c4a] whitespace-nowrap">
                    Free Shipping On All Orders above 200TND
                  </span>

                  <span className="text-[#c2b4a2] text-[10px]">✦</span>

                  <span className="mx-12 text-[11px] uppercase tracking-[0.28em] text-[#6d5c4a] whitespace-nowrap">
                    New Arrivals Every Month
                  </span>

                  <span className="text-[#c2b4a2] text-[10px]">✦</span>

                  <span className="mx-12 text-[11px] uppercase tracking-[0.28em] text-[#6d5c4a] whitespace-nowrap">
                    Handcrafted in Tunisia with Love
                  </span>

                  <span className="text-[#c2b4a2] text-[10px]">✦</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Language & Currency */}
          <div className="flex items-center gap-4 lg:gap-5 min-w-fit">
            <div className="relative">
              <a className="appearance-none bg-transparent pr-0 text-[11px] uppercase tracking-[0.18em] text-[#7b6a58] hover:text-[#3e2f23] transition-colors cursor-pointer focus:outline-none">
                TND د.ت
              </a>

              {/* <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[8px] text-[#b7a895] pointer-events-none">
                ▼
              </span> */}
            </div>

            <div className="w-px h-4 bg-[#d8cbb8]" />

            <div className="relative">
              <a className="appearance-none bg-transparent pr-0 text-[11px] uppercase tracking-[0.18em] text-[#7b6a58] hover:text-[#3e2f23] transition-colors cursor-pointer focus:outline-none">
                English
              </a>

              {/* <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[8px] text-[#b7a895] pointer-events-none">
                ▼
              </span> */}
            </div>
          </div>
        </div>
      </div>

      {/* third navbar */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-14 flex items-center justify-between">
          {/* LEFT: Search Bar */}
          <div className="flex items-center w-100 max-w-md border border-gray-300 bg-gray-50">
            {/* Button */}
            <button className="h-10 px-3 text-gray-600 hover:text-black transition">
              <Search className="w-4 h-4" />
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-gray-300" />

            {/* Input */}
            <input
              type="text"
              placeholder="Search"
              className="w-full h-10 px-3 text-sm tracking-wide bg-transparent focus:outline-none placeholder:text-gray-400"
            />
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-6">
            <div className="relative group">
              {/* Heart */}
              <Link
                href="/favorites"
                className="relative text-gray-700 hover:text-black transition"
                aria-label="Favorites"
              >
                <Heart className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />

                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Cart */}
            <MiniCart />

            {/* SIGN UP BUTTON (Luxury sharp style) */}
            <AuthDropdown />
          </div>
        </div>
      </div>

      {/* main navbar */}
      <div className="border-t border-black/10 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-[72px] flex items-center justify-between">
            {/* Left */}
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.slice(0, 3).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-[11px] uppercase tracking-[0.32em] text-black/70 hover:text-[#7a1f3d] transition-colors duration-300"
                >
                  {link.label}

                  <span className="absolute left-0 -bottom-3 h-px w-0 bg-[#7a1f3d] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Center */}
            {/* <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 text-[28px] font-serif font-bold text-black"
            >
              Atelier Ons
            </Link> */}

            {/* Right */}
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.slice(3).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-[11px] uppercase tracking-[0.32em] text-black/70 hover:text-[#7a1f3d] transition-colors duration-300"
                >
                  {link.label}

                  <span className="absolute left-0 -bottom-3 h-px w-0 bg-[#7a1f3d] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}

              {user?.role === "admin" && (
                <Link
                  href="/admin"
                  className="text-[11px] uppercase tracking-[0.32em] text-black/70 hover:text-[#7a1f3d] transition-colors"
                >
                  Admin
                </Link>
              )}
            </nav>

            {/* Mobile */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-black"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
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
            <Link
              href="/favorites"
              className="text-foreground hover:text-primary transition flex items-center gap-2"
            >
              <Heart className="w-4 h-4" />
              Favorites {favoritesCount > 0 && `(${favoritesCount})`}
            </Link>
            <Link
              href="/cart"
              className="text-foreground hover:text-primary transition flex items-center gap-2"
            >
              View Cart
            </Link>
            <Link
              href="/account"
              className="text-foreground hover:text-primary transition flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Account
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
