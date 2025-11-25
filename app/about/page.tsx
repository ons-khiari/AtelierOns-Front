'use client';

import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 bg-muted border-b border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
            Our Story
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Where elegance meets intention, where every page holds a secret, and where writing becomes art.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex-1 py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Origin Story */}
          <section className="mb-16 md:mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-4xl font-bold text-foreground mb-6">
                  The Beginning
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Velour & Ink was born from a simple observation: in our fast-paced digital world, there's a growing hunger for tactile, meaningful experiences. We noticed people yearning to slow down, to write by hand, to feel the quality of paper beneath their fingertips.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Inspired by vintage aesthetics, gothic elegance, and the timeless beauty of dark academia, we set out to create stationery that felt like an escape—a sanctuary for thoughts, dreams, and stories waiting to be told.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Each product is curated with intention, designed for those who believe that writing is not just communication—it's art, therapy, and expression all in one.
                </p>
              </div>
              <div className="relative">
                <img
                  src="/placeholder.svg?key=about1"
                  alt="Our brand origin"
                  className="rounded w-full object-cover"
                />
              </div>
            </div>
          </section>

          {/* Our Values */}
          <section className="mb-16 md:mb-24 py-12 bg-primary text-primary-foreground rounded">
            <div className="px-8">
              <h2 className="font-serif text-4xl font-bold mb-12 text-center">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <Heart className="w-12 h-12 mx-auto mb-4 text-accent" />
                  <h3 className="font-serif font-bold text-xl mb-3">Dark Romance</h3>
                  <p className="opacity-90">
                    We celebrate the mystery and elegance of darkness, blending gothic charm with feminine sophistication.
                  </p>
                </div>
                <div className="text-center">
                  <Heart className="w-12 h-12 mx-auto mb-4 text-accent" />
                  <h3 className="font-serif font-bold text-xl mb-3">Vintage Elegance</h3>
                  <p className="opacity-90">
                    Every piece honors the artistry of the past while celebrating the beauty of old-world craftsmanship.
                  </p>
                </div>
                <div className="text-center">
                  <Heart className="w-12 h-12 mx-auto mb-4 text-accent" />
                  <h3 className="font-serif font-bold text-xl mb-3">Intentional Living</h3>
                  <p className="opacity-90">
                    We believe in slowing down, savoring moments, and making each word you write truly matter.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Aesthetic */}
          <section className="mb-16 md:mb-24">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-8 text-center">
              Our Aesthetic
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed text-center max-w-2xl mx-auto">
              We draw inspiration from multiple worlds to create something uniquely ours:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Dark Academia',
                  description: 'Library whispers, leather-bound secrets, and the romance of midnight studying.',
                },
                {
                  title: 'Vintage Glamour',
                  description: 'Old-money elegance, velvet textures, and the sophistication of a bygone era.',
                },
                {
                  title: 'Feminine Power',
                  description: 'Celebrating the strength and beauty of girly aesthetics with gothic undertones.',
                },
                {
                  title: 'Mystical Charm',
                  description: 'Moody lighting, lace details, soft gold accents, and an air of mystery.',
                },
              ].map((item, i) => (
                <div key={i} className="p-6 border border-border rounded hover:border-primary transition">
                  <h3 className="font-serif font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Craftsmanship */}
          <section className="mb-16 md:mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative order-2 md:order-1">
                <img
                  src="/placeholder.svg?key=about2"
                  alt="Craftsmanship process"
                  className="rounded w-full object-cover"
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="font-serif text-4xl font-bold text-foreground mb-6">
                  Quality & Craftsmanship
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  We partner with artisans and manufacturers who share our commitment to excellence. Every journal, planner, and accessory is selected for its superior quality and attention to detail.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  From premium paper to luxurious covers, from gold foil accents to intricate embossing—we never compromise on the materials or methods used in crafting our products.
                </p>
                <ul className="space-y-3">
                  {['Premium 120gsm+ paper', 'Hand-bound hardcovers', 'Gold & rose gold accents', 'Ethical sourcing'].map((item, i) => (
                    <li key={i} className="flex gap-3 items-start text-muted-foreground">
                      <span className="text-accent font-bold flex-shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center py-12 border-t border-border">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
              Join the Velour & Ink Community
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Become part of our community of writers, dreamers, and lovers of beautiful things.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/journal-folios"
                className="px-8 py-3 bg-primary text-primary-foreground font-serif rounded hover:bg-primary/90 transition"
              >
                Shop Now
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 border border-primary text-primary font-serif rounded hover:bg-primary/5 transition"
              >
                Get in Touch
              </Link>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
