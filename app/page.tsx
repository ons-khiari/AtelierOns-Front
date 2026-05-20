"use client";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Sparkles } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { TrendingProducts } from "@/components/trending-products";
import { BundlesShowcase } from "@/components/bundles-showcase";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const featuredProducts: Product[] = [
  {
    id: "1",
    name: "Velvet Burgundy Folio",
    price: 85,
    image: "/luxury-burgundy-velvet-journal.jpg",
    category: "Journal Folios",
  },
  {
    id: "2",
    name: "Rose Gold Leather Folio",
    price: 95,
    image: "/rose-gold-planner.jpg",
    category: "Journal Folios",
  }
];

const bestSellers: Product[] = [
  {
    id: "5",
    name: "Silk Ribbon Bookmark Set",
    price: 15,
    image: "/cream-leather-portfolio.jpg",
    category: "Bookmarks",
  },
  {
    id: "6",
    name: "Lined Insert Booklet",
    price: 18,
    image: "/dusty-rose-planner.jpg",
    category: "Inserts",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      {/* <section className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background">
          <div className="absolute top-10 right-10 w-96 h-96 rounded-full opacity-10 bg-accent blur-3xl"></div>
          <div className="absolute -bottom-20 left-10 w-80 h-80 rounded-full opacity-5 bg-primary blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="mb-6 flex items-center justify-center gap-2 text-accent">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm tracking-widest uppercase">
              Dark Romance stationery
            </span>
            <Sparkles className="w-4 h-4" />
          </div>

          <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Where Every Page Tells a Story
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover premium journal folios, inserts, and accessories crafted
            for those who appreciate the artistry of journaling. Inspired by
            vintage elegance, dark academia, and timeless beauty.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/journal-folios"
              className="px-8 py-3 bg-primary text-primary-foreground font-serif rounded hover:bg-primary/90 transition flex items-center justify-center gap-2"
            >
              Explore Collections
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 border border-primary text-primary font-serif rounded hover:bg-primary/5 transition"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section> */}

      {/* Featured Products Section */}
      {/* <section className="py-16 md:py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Featured Collections
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Handpicked selections from our exclusive range of luxury
              stationery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section> */}

      {/* <TrendingProducts /> */}

      {/* Best Sellers Section */}
      {/* <section className="py-16 md:py-24 px-4 bg-muted">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Customer Favorites
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The most loved pieces in our collection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} featured />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/journal-folios"
              className="text-primary font-serif hover:text-accent transition inline-flex items-center gap-2"
            >
              View All Products →
            </Link>
          </div>
        </div>
      </section> */}

      {/* <BundlesShowcase /> */}


      {/* Luxury Image Carousel Strip */}
      <section className="py-1 bg-white overflow-hidden border-t border-gray-100">
        <div className="relative w-full">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Track */}
          <div className="flex w-max animate-scrollXBig gap-1">
            {[...Array(2)].flatMap((_, i) =>
              [
                "/images/journal-folios/rose-gold-thumb.jpg",
                "/images/journal-folios/midnight-thumb.jpg",
                "/images/journal-folios/cream-thumb.jpg",
                "/images/journal-folios/velvet-burgundy-thumb.jpg",
              ].map((src, index) => (
                <div
                  key={`${i}-${index}`}
                  className="w-[400px] md:w-[400px] h-[400px] md:h-[400px] flex-shrink-0 overflow-hidden border border-gray-200 bg-gray-50"
                >
                  <img
                    src={src}
                    alt="collection"
                    className="w-full h-full object-cover hover:scale-105 transition duration-700"
                  />
                </div>
              )),
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
