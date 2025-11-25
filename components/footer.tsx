'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Ons Atelier</h3>
            <p className="text-sm opacity-80 leading-relaxed">
              Elegantly crafted journal folios, bookmarks, and stationery for the sophisticated soul.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif text-sm font-bold mb-4">Collections</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/journal-folios" className="opacity-80 hover:opacity-100 transition">Journal Folios</Link></li>
              <li><Link href="/bookmarks" className="opacity-80 hover:opacity-100 transition">Bookmarks</Link></li>
              <li><Link href="/stickers" className="opacity-80 hover:opacity-100 transition">Stickers</Link></li>
              <li><Link href="/journal-basics" className="opacity-80 hover:opacity-100 transition">Journal Basics</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-serif text-sm font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="opacity-80 hover:opacity-100 transition">About Us</Link></li>
              <li><Link href="/contact" className="opacity-80 hover:opacity-100 transition">Contact</Link></li>
              <li><Link href="/faq" className="opacity-80 hover:opacity-100 transition">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-sm font-bold mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2 items-start opacity-80">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>hello@onsatelier.com</span>
              </li>
              <li className="flex gap-2 items-start opacity-80">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Tunis, Tunisia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row items-center justify-between text-xs opacity-75">
          <p>&copy; 2025 Ons Atelier. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:opacity-100 transition">Privacy Policy</Link>
            <Link href="#" className="hover:opacity-100 transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
