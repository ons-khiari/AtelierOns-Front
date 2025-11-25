'use client';

import { useState } from 'react';
import { Star, ChevronDown } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  text: string;
}

const reviews: Review[] = [
  {
    id: '1',
    author: 'Emma S.',
    rating: 5,
    date: 'Nov 10, 2024',
    title: 'Absolutely Stunning',
    text: 'The quality is exceptional. The paper feels premium, and the velvet cover is so luxurious. Worth every penny!',
  },
  {
    id: '2',
    author: 'Isabella M.',
    rating: 5,
    date: 'Oct 28, 2024',
    title: 'Perfect Journal',
    text: 'I use this daily for my thoughts and reflections. The gold accents add such an elegant touch. Highly recommend.',
  },
  {
    id: '3',
    author: 'Sophie L.',
    rating: 4,
    date: 'Oct 15, 2024',
    title: 'Beautiful Design',
    text: 'Love the aesthetic and quality. Only wish there were more color options available.',
  },
  {
    id: '4',
    author: 'Charlotte K.',
    rating: 5,
    date: 'Sep 30, 2024',
    title: 'Gift Perfection',
    text: 'Ordered this as a gift and the recipient absolutely adores it. Packaging was also beautiful!',
  },
  {
    id: '5',
    author: 'Olivia R.',
    rating: 4,
    date: 'Sep 12, 2024',
    title: 'Great Quality',
    text: 'Exceeded my expectations. The ribbon bookmark and elastic closure are wonderful details.',
  },
];

type SortOption = 'newest' | 'topRated';

export function ReviewsSection() {
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showWriteReview, setShowWriteReview] = useState(false);

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'topRated') {
      return b.rating - a.rating;
    }
    return 0;
  });

  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section className="py-12 border-t border-border">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-8">
        <div>
          <h2 className="font-serif text-3xl font-bold text-foreground mb-4">Customer Reviews</h2>

          {/* Rating Summary */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <p className="text-4xl font-bold text-primary mb-1">{averageRating}</p>
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.round(parseFloat(averageRating)) ? 'fill-accent text-accent' : 'text-muted-foreground'}`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">Based on {reviews.length} reviews</p>
            </div>

            {/* Rating Distribution */}
            <div className="hidden sm:flex flex-col gap-2">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = reviews.filter((r) => r.rating === stars).length;
                const percentage = (count / reviews.length) * 100;
                return (
                  <div key={stars} className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground w-8">{stars}★</span>
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-accent transition-all" style={{ width: `${percentage}%` }}></div>
                    </div>
                    <span className="text-sm text-muted-foreground">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowWriteReview(!showWriteReview)}
          className="btn-press px-6 py-3 bg-primary text-primary-foreground rounded font-serif font-bold hover:bg-primary/90 transition w-fit animate-fadeIn"
        >
          Write a Review
        </button>
      </div>

      {/* Write Review Form */}
      {showWriteReview && (
        <div className="mb-8 p-6 bg-muted rounded animate-slideIn">
          <h3 className="font-serif font-bold text-foreground mb-4">Share Your Thoughts</h3>
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="px-4 py-2 border border-border rounded bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <select className="px-4 py-2 border border-border rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option>Select Rating</option>
                <option>5 Stars</option>
                <option>4 Stars</option>
                <option>3 Stars</option>
                <option>2 Stars</option>
                <option>1 Star</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Review Title"
              className="w-full px-4 py-2 border border-border rounded bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <textarea
              placeholder="Share your experience..."
              rows={4}
              className="w-full px-4 py-2 border border-border rounded bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            ></textarea>
            <div className="flex gap-2">
              <button
                type="submit"
                className="btn-press px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition"
              >
                Submit Review
              </button>
              <button
                type="button"
                onClick={() => setShowWriteReview(false)}
                className="px-4 py-2 border border-border rounded hover:bg-muted transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Sort and Reviews */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Showing {reviews.length} reviews</p>
          <div className="relative">
            <button className="flex items-center gap-2 px-3 py-2 border border-border rounded hover:bg-muted transition text-sm">
              Sort by: {sortBy === 'newest' ? 'Newest' : 'Top Rated'}
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute right-0 mt-1 w-40 bg-background border border-border rounded shadow-lg z-10 hidden hover:flex flex-col">
              <button
                onClick={() => setSortBy('newest')}
                className="px-4 py-2 text-left hover:bg-muted transition text-sm"
              >
                Newest
              </button>
              <button
                onClick={() => setSortBy('topRated')}
                className="px-4 py-2 text-left hover:bg-muted transition text-sm border-t border-border"
              >
                Top Rated
              </button>
            </div>
          </div>
        </div>

        {/* Individual Reviews */}
        <div className="space-y-4">
          {sortedReviews.map((review, idx) => (
            <div
              key={review.id}
              className="p-6 border border-border rounded hover-lift animate-fadeIn"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-foreground">{review.author}</p>
                  <p className="text-sm text-muted-foreground">{review.date}</p>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? 'fill-accent text-accent' : 'text-muted-foreground'}`}
                    />
                  ))}
                </div>
              </div>
              <h4 className="font-semibold text-foreground mb-2">{review.title}</h4>
              <p className="text-muted-foreground">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
