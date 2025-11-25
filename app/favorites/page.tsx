'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ProductCard } from '@/components/product-card';
import { useFavorites } from '@/lib/favorites-context';
import { ArrowLeft } from 'lucide-react';

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Breadcrumb */}
      <nav className="px-4 py-4 text-sm text-muted-foreground border-b border-border animate-fadeIn">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="hover:text-primary transition">
            Home
          </Link>
          {' / '}
          <span className="text-foreground">Favorites</span>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 py-12 px-4">
        <div className="max-w-7xl mx-auto animate-fadeIn">
          <div className="mb-8">
            <h1 className="font-serif text-4xl font-bold text-foreground mb-2">My Favorites</h1>
            <p className="text-muted-foreground">
              {favorites.length === 0
                ? 'You have no favorites yet. Start adding items you love!'
                : `You have ${favorites.length} item${favorites.length === 1 ? '' : 's'} in your favorites`}
            </p>
          </div>

          {favorites.length === 0 ? (
            <div className="text-center py-16">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-10 h-10 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-2">No Favorites Yet</h2>
              <p className="text-muted-foreground mb-6">
                Start building your collection by adding items you love.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded font-serif font-bold hover:bg-primary/90 btn-press transition"
              >
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {favorites.map((product, idx) => (
                <div
                  key={product.id}
                  style={{ animationDelay: `${idx * 50}ms` }}
                  className="animate-fadeIn"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
