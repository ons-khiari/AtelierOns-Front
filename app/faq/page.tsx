'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'What is the material of your journals?',
    answer:
      'Our journals feature premium paper with a weight of 120gsm+, providing a luxurious writing experience. Covers are crafted from high-quality materials including velvet, leather, and matte finishes with elegant foil accents.',
  },
  {
    question: 'How long does shipping take?',
    answer:
      'We offer standard shipping within 5-7 business days and expedited shipping within 2-3 business days. International orders typically arrive within 10-14 business days. You will receive tracking information once your order ships.',
  },
  {
    question: 'Do you offer gift wrapping?',
    answer:
      'Yes! We offer complimentary gift wrapping for all orders. Each item is beautifully wrapped in premium tissue paper with a handwritten card if requested. You can add this option during checkout.',
  },
  {
    question: 'Can I customize or personalize products?',
    answer:
      'We offer personalization options for select items including monogramming and custom date embossing. Contact us at hello@velourandink.com to discuss your custom order. Custom orders typically take 2-3 weeks to complete.',
  },
  {
    question: 'What is your return policy?',
    answer:
      'We accept returns within 30 days of purchase for items in original condition. Personalized items cannot be returned. Once we receive your return, we will process a refund within 5-7 business days. Return shipping is free for defective items.',
  },
  {
    question: 'Are your products eco-friendly?',
    answer:
      'We are committed to sustainability. Our paper is sourced from responsibly managed forests, and we use eco-friendly inks and minimal plastic packaging. We are continuously working to reduce our environmental impact.',
  },
  {
    question: 'Do you sell wholesale or bulk orders?',
    answer:
      'Yes! We offer wholesale pricing for businesses and bulk orders. Please contact our sales team at wholesale@velourandink.com for pricing and availability.',
  },
  {
    question: 'How do I care for my journal?',
    answer:
      'We recommend storing your journal in a cool, dry place away from direct sunlight to prevent fading. Handle with care to preserve the cover finish. For velvet covers, gently brush with a soft cloth if needed. The pages will develop a beautiful patina over time.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 bg-muted border-b border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our products, shipping, and policies.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex-1 py-16 md:py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border border-border rounded hover:border-primary/50 transition">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-4 text-left font-serif font-bold text-foreground flex items-center justify-between hover:bg-muted/50 transition"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {openIndex === index && (
                  <div className="px-6 py-4 border-t border-border text-muted-foreground leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 p-8 bg-primary text-primary-foreground rounded text-center">
            <h2 className="font-serif text-2xl font-bold mb-3">Didn't find your answer?</h2>
            <p className="mb-6">
              Reach out to our customer service team and we'll be happy to help.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-primary-foreground text-primary font-serif font-bold rounded hover:bg-white transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
