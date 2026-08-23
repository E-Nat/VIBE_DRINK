import React from 'react';
import { Star, Quote } from 'lucide-react';
import './ReviewCard.css';

export const ReviewCard = ({ review }) => {
  return (
    <article className="review-card glass-panel-interactive" data-cursor-text="READ">
      <div className="review-card-header">
        <div className="review-stars" aria-label={`Rating: ${review.rating} out of 5 stars`}>
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} size={14} className="star-icon" fill="currentColor" />
          ))}
        </div>
        <span className={`review-expression-tag ${review.expression === 'Black Tea' ? 'bt' : 'el'}`}>
          {review.expression}
        </span>
      </div>

      <Quote size={24} className="review-quote-icon" />

      <p className="review-text">"{review.quote}"</p>

      <div className="review-author-meta">
        <div className="review-author-avatar">
          {review.author.charAt(0)}
        </div>
        <div className="review-author-info">
          <span className="review-author-name">{review.author}</span>
          <span className="review-author-role">{review.role}</span>
        </div>
      </div>
    </article>
  );
};
