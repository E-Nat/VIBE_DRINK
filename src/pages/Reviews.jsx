import React, { useState } from 'react';
import { SectionTitle } from '../components/SectionTitle';
import { ReviewCard } from '../components/ReviewCard';
import { Button } from '../components/Button';
import { reviewsData } from '../data/reviews';
import { Sparkles, MessageSquare, AlertCircle } from 'lucide-react';
import './Reviews.css';

export const Reviews = () => {
  const [filter, setFilter] = useState('ALL');

  const filteredReviews = reviewsData.reviews.filter((rev) => {
    if (filter === 'ALL') return true;
    if (filter === 'BLACK_TEA') return rev.expression === 'Black Tea';
    if (filter === 'EXOTIC_LYCHEE') return rev.expression === 'Exotic Lychee';
    return true;
  });

  return (
    <div className="reviews-page-root">
      {/* 1. Reviews Hero */}
      <section className="reviews-hero-section section">
        <div className="container reviews-hero-container">
          <div className="badge-pill">
            <span className="badge-dot" />
            <span>{reviewsData.header.badge}</span>
          </div>

          <h1 className="reviews-hero-title font-editorial">
            {reviewsData.header.title}
          </h1>

          <p className="reviews-hero-subtitle font-display">
            Voices of the Night
          </p>

          <p className="reviews-hero-lead">
            {reviewsData.header.subtitle}
          </p>

          {/* Sample Demo Notice */}
          <div className="reviews-disclaimer-pill glass-panel">
            <AlertCircle size={14} className="disclaimer-icon" />
            <span>{reviewsData.header.disclaimer}</span>
          </div>

          {/* Filter Tabs */}
          <div className="reviews-filter-tabs glass-panel" role="tablist">
            <button
              type="button"
              className={`filter-tab-btn ${filter === 'ALL' ? 'active' : ''}`}
              onClick={() => setFilter('ALL')}
              data-cursor-text="ALL"
            >
              All Impressions ({reviewsData.reviews.length})
            </button>
            <button
              type="button"
              className={`filter-tab-btn ${filter === 'BLACK_TEA' ? 'active' : ''}`}
              onClick={() => setFilter('BLACK_TEA')}
              data-cursor-text="TEA"
            >
              Black Tea
            </button>
            <button
              type="button"
              className={`filter-tab-btn ${filter === 'EXOTIC_LYCHEE' ? 'active' : ''}`}
              onClick={() => setFilter('EXOTIC_LYCHEE')}
              data-cursor-text="LYCHEE"
            >
              Exotic Lychee
            </button>
          </div>
        </div>
      </section>

      {/* 2. Reviews Grid */}
      <section className="reviews-grid-section section">
        <div className="container">
          <div className="reviews-cards-grid">
            {filteredReviews.map((rev) => (
              <ReviewCard key={rev.id} review={rev} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Community / Share Your Vibe CTA */}
      <section className="reviews-cta-section section">
        <div className="container">
          <div className="reviews-cta-card glass-panel">
            <MessageSquare size={32} className="reviews-cta-icon" />
            <h2 className="reviews-cta-title font-editorial">
              SHARE YOUR EXPERIENCE
            </h2>
            <p className="reviews-cta-desc">
              Have you enjoyed an evening with VIBE? We invite you to share your tasting impressions with our private concierge.
            </p>
            <Button
              to="/contact"
              variant="primary"
              size="lg"
              showArrow
              cursorText="SUBMIT"
            >
              Send Your Impression
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
