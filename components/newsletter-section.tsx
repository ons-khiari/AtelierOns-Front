'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribed:', email);
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-12 md:py-16 px-4 bg-primary text-primary-foreground">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="font-serif text-3xl font-bold mb-3">Stay Updated</h3>
        <p className="mb-6 opacity-90">Subscribe to our newsletter for new collections, exclusive offers, and writing inspiration.</p>

        {submitted ? (
          <div className="bg-primary-foreground/20 p-4 rounded">
            <p className="font-serif font-bold">Thank you for subscribing!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-accent text-accent-foreground font-serif font-bold rounded hover:opacity-90 transition flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Mail className="w-4 h-4" />
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
