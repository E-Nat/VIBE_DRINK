import React from 'react';
import { Sparkles, Check } from 'lucide-react';
import './FlavorSelector.css';

export const FlavorCard = ({
  product,
  isActive,
  onSelect,
  compact = false,
}) => {
  return (
    <button
      type="button"
      className={`flavor-card glass-panel-interactive ${isActive ? 'active' : ''} ${product.id}`}
      onClick={onSelect}
      data-cursor-text="SELECT"
      aria-pressed={isActive}
      aria-label={`Select flavor ${product.name}`}
    >
      {/* Active Pill Indicator */}
      <div className="flavor-card-header">
        <div className="flavor-card-pill">
          <span className="flavor-pill-dot" />
          <span className="flavor-pill-text">{product.flavor}</span>
        </div>

        {isActive && (
          <div className="flavor-card-active-tag">
            <Check size={12} />
            <span>Active</span>
          </div>
        )}
      </div>

      {/* Flavor Thumbnail */}
      <div className="flavor-card-thumb-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="flavor-card-thumb-img"
          loading="lazy"
        />
        <div className="flavor-thumb-glow" />
      </div>

      {/* Title & Descriptors */}
      <div className="flavor-card-body">
        <h3 className="flavor-card-title">{product.name}</h3>
        <p className="flavor-card-tagline">{product.tagline}</p>
        <span className="flavor-card-abv">{product.abv} • {product.volume}</span>
      </div>

      {/* Active bottom glow bar */}
      <div className="flavor-card-accent-bar" />
    </button>
  );
};
