import React from 'react';
import './SectionTitle.css';

export const SectionTitle = ({
  badge = null,
  title,
  subtitle = null,
  align = 'center', // 'center' | 'left'
  className = '',
}) => {
  return (
    <div className={`section-title-wrapper align-${align} ${className}`}>
      {badge && (
        <div className="section-title-badge">
          <span className="badge-dot" />
          <span>{badge}</span>
        </div>
      )}

      <h2 className="section-title-heading">{title}</h2>

      {subtitle && <p className="section-title-subtitle">{subtitle}</p>}

      <div className={`section-title-line align-${align}`} />
    </div>
  );
};
