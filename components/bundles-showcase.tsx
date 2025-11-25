"use client"

import Link from "next/link"
import { bundlesDatabase, calculateBundleSavings } from "@/lib/bundles-database"
import { ShoppingCart, Award } from "lucide-react"

export function BundlesShowcase() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <Award className="w-6 h-6 text-accent" />
            <p className="text-accent uppercase tracking-widest font-semibold">Special Collections</p>
          </div>
          <h2 className="font-serif text-4xl font-bold text-foreground mb-4">Curated Bundles</h2>
          <p className="text-muted-foreground max-w-2xl">
            Save more when you buy our thoughtfully curated bundles. Each bundle is designed to enhance your journaling
            experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bundlesDatabase.map((bundle) => {
            const savings = calculateBundleSavings(bundle)
            return (
              <Link key={bundle.id} href={`/bundles/${bundle.id}`}>
                <div className="group cursor-pointer h-full">
                  <div className="relative overflow-hidden rounded bg-card mb-4 aspect-square">
                    <img
                      src={bundle.image || "/placeholder.svg"}
                      alt={bundle.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-300" />
                    {savings > 0 && (
                      <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
                        Save ${savings}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-accent uppercase tracking-widest font-semibold">{bundle.category}</p>
                    <h3 className="font-serif font-bold text-lg text-foreground group-hover:text-primary transition">
                      {bundle.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{bundle.description}</p>

                    <div className="flex items-center justify-between pt-4">
                      <p className="font-serif text-xl text-primary font-bold">${bundle.bundlePrice.toFixed(2)}</p>
                      <button className="p-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition btn-press">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
