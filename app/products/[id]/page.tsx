"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ReviewsSection } from "@/components/reviews-section";
import {
  ShoppingCart,
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useFavorites } from "@/lib/favorites-context";
import { ProductCard } from "@/components/product-card";
import {
  getProductById,
  getProductsByCategory,
  type Product,
} from "@/lib/products";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFavoritesToast, setShowFavoritesToast] = useState(false);
  const [isAnimatingHeart, setIsAnimatingHeart] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedSize, setSelectedSize] = useState<"small" | "medium">(
    "medium"
  );
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  const { addToCart } = useCart();
  const { isFavorited, addToFavorites, removeFromFavorites } = useFavorites();

  useEffect(() => {
    const fetchProduct = async () => {
      setMounted(true);

      const resolvedParams = await params;
      const id = resolvedParams.id;
      setProductId(id);

      const prod = getProductById(id);

      if (prod) {
        setProduct(prod);

        const related = getProductsByCategory(prod.category)
          .filter((p) => p.id !== id)
          .slice(0, 4);

        setRelatedProducts(related);
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    fetchProduct();
  }, [params]);

  const handleAddToCart = () => {
    if (!product || product.stock === 0) return;

    const cartItem = {
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.thumbnailImage,
      quantity,
      ...(product.category === "Journal Folios" && {
        size: (selectedSize.charAt(0).toUpperCase() + selectedSize.slice(1)) as
          | "Small"
          | "Medium",
      }),
    };
    addToCart(cartItem);
    setQuantity(1);
  };

  const handleWishlistToggle = () => {
    if (!product) return;

    setIsAnimatingHeart(true);

    if (isFavorited(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.thumbnailImage,
        category: product.category,
      });
    }

    setShowFavoritesToast(true);
    setTimeout(() => setIsAnimatingHeart(false), 500);
    setTimeout(() => setShowFavoritesToast(false), 2000);
  };

  const nextImage = () => {
    if (!product) return;
    setCurrentImageIndex((prev) => (prev + 1) % product.galleryImages.length);
  };

  const prevImage = () => {
    if (!product) return;
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + product.galleryImages.length) % product.galleryImages.length
    );
  };

  if (!mounted || !product) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading product...</p>
        </div>
        <Footer />
      </main>
    );
  }

  const isFav = isFavorited(product.id);
  const isSoldOut = product.stock === 0;
  const selectedSizeStock =
    product.variantStock?.[selectedSize] ?? product.stock;
  const isSizeOutOfStock =
    product.category === "Journal Folios" && selectedSizeStock === 0;

  const categorySlug = product.category.toLowerCase().replace(/\s+/g, "-");

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {showFavoritesToast && (
        <div className="fixed top-20 right-4 z-50 animate-popIn">
          <div className="bg-primary text-primary-foreground px-4 py-3 rounded shadow-lg">
            <p className="font-semibold text-sm">
              {isFav ? "❤️ Added to Favorites" : "♡ Removed from Favorites"}
            </p>
          </div>
        </div>
      )}

      <nav className="px-4 py-4 text-sm text-muted-foreground border-b border-border">
        <div className="max-w-7xl mx-auto flex gap-2 items-center">
          <Link href="/" className="hover:text-primary transition">
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/${categorySlug}`}
            className="hover:text-primary transition"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground truncate">{product.title}</span>
        </div>
      </nav>

      {/* Product Content */}
      <div className="flex-1 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="relative bg-muted rounded overflow-hidden mb-4 aspect-square">
              <img
                src={
                  product.galleryImages[currentImageIndex] ||
                  product.thumbnailImage
                }
                alt={product.title}
                className="w-full h-full object-cover"
              />

              {isSoldOut && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white font-serif font-bold text-xl">
                    Sold Out
                  </span>
                </div>
              )}

              {product.galleryImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full transition"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full transition"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.galleryImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`aspect-square rounded overflow-hidden border-2 transition ${
                      idx === currentImageIndex
                        ? "border-primary"
                        : "border-border"
                    }`}
                  >
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`${product.title} - image ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <div className="mb-6">
              <p className="text-accent uppercase tracking-widest text-xs font-semibold mb-2">
                {product.category}
              </p>
              <h1 className="font-serif text-4xl font-bold text-foreground mb-4">
                {product.title}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  (24 reviews)
                </span>
              </div>

              <p className="font-serif text-3xl text-primary mb-4">
                ${product.price}
              </p>

              <div className="mb-6">
                {isSoldOut ? (
                  <div className="text-red-500 font-semibold">Out of Stock</div>
                ) : product.stock < 5 ? (
                  <div className="text-amber-600 font-semibold">
                    Only {product.stock} left in stock
                  </div>
                ) : (
                  <div className="text-green-600 font-semibold">In Stock</div>
                )}
              </div>

              <p className="text-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {product.category === "Journal Folios" && product.variantStock && (
              <div className="mb-8 pb-8 border-b border-border">
                <h3 className="font-serif font-bold text-foreground mb-4">
                  Size
                </h3>
                <div className="flex gap-3">
                  {Object.entries(product.variantStock).map(([size, stock]) => {
                    const sizeLabel =
                      size.charAt(0).toUpperCase() + size.slice(1);
                    const sizeKey = size as "small" | "medium";
                    const isSoldOut = stock === 0;

                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(sizeKey)}
                        disabled={isSoldOut}
                        className={`px-6 py-2 rounded font-serif font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed ${
                          selectedSize === sizeKey
                            ? "bg-primary text-primary-foreground"
                            : "border-2 border-border text-foreground hover:border-primary"
                        }`}
                      >
                        {sizeLabel} {isSoldOut && "(Out of Stock)"}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex items-center border border-border rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={isSoldOut || isSizeOutOfStock}
                  className="px-4 py-2 text-foreground hover:bg-muted transition disabled:opacity-50"
                >
                  −
                </button>
                <span className="flex-1 text-center font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={isSoldOut || isSizeOutOfStock}
                  className="px-4 py-2 text-foreground hover:bg-muted transition disabled:opacity-50"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isSoldOut || isSizeOutOfStock}
                className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded font-serif font-bold hover:bg-primary/90 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5" />
                {isSoldOut || isSizeOutOfStock ? "Sold Out" : "Add to Cart"}
              </button>

              <button
                onClick={handleWishlistToggle}
                className={`px-6 py-3 border-2 rounded font-serif font-bold transition flex items-center justify-center gap-2 ${
                  isFav
                    ? "bg-primary/10 border-primary text-primary"
                    : "border-primary text-primary hover:bg-primary/5"
                } ${isAnimatingHeart ? "animate-heartPulse" : ""}`}
              >
                <Heart className={`w-5 h-5 ${isFav ? "fill-current" : ""}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="max-w-7xl mx-auto mt-16">
          <ReviewsSection />

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-20">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-8">
                Similar Products
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
