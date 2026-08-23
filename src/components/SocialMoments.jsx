import React from 'react';
import { useFlavor } from '../context/FlavorContext';
import { soundEngine } from '../utils/audio';
import { Instagram, Sparkles, Heart } from 'lucide-react';
import './SocialMoments.css';

export const SocialMoments = () => {
  const { currentFlavorKey } = useFlavor();

  const moments = [
    {
      id: 1,
      image: '/vibe-night-lifestyle.jpg',
      tag: '#MidnightRitual',
      likes: '2.4k',
      caption: 'When midnight becomes an art form. #VIBENocturne',
      aspect: 'tall',
    },
    {
      id: 2,
      image: '/vibe-botanical-craft.jpg',
      tag: '#BotanicalAlchemy',
      likes: '1.8k',
      caption: 'Single-estate botanicals, extracted at low temperature.',
      aspect: 'square',
    },
    {
      id: 3,
      image: '/vibe-black-tea.png',
      tag: '#BlackTeaExpression',
      likes: '3.1k',
      caption: 'Slow extraction, roasted malt & charred oak.',
      aspect: 'square',
    },
    {
      id: 4,
      image: '/vibe-exotic-lychee.png',
      tag: '#ExoticLychee',
      likes: '2.9k',
      caption: 'Luminous lychee nectar, velvet rose petals & citrus mist.',
      aspect: 'tall',
    },
    {
      id: 5,
      image: '/vibe-night-lifestyle.jpg',
      tag: '#PrivateCellar',
      likes: '1.5k',
      caption: 'Reserved for private tastings and nocturnal conversation.',
      aspect: 'wide',
    },
  ];

  return (
    <section className={`social-moments-stage ${currentFlavorKey}`} aria-label="Social Moments Gallery">
      <div className="container">
        <div className="social-header">
          <div className="badge-pill">
            <span className="badge-dot" />
            <span>COMMUNITY & MOMENTS</span>
          </div>
          <h2 className="social-title font-editorial">SHARE THE VIBE</h2>
          <p className="social-lead">
            Glimpses from private rooftop tastings, cocktail lounges, and evening gatherings around the globe.
          </p>
        </div>

        <div className="social-masonry-grid">
          {moments.map((item) => (
            <div
              key={item.id}
              className={`social-moment-card glass-panel aspect-${item.aspect}`}
              onMouseEnter={() => soundEngine.playClick(850)}
              data-cursor-text="VIBE"
            >
              <img
                src={item.image}
                alt={item.tag}
                className="moment-img"
                loading="lazy"
              />

              <div className="moment-overlay">
                <div className="moment-top">
                  <span className="moment-vibe-tag font-nav">{item.tag}</span>
                  <div className="moment-social-icon">
                    <Instagram size={16} />
                  </div>
                </div>

                <div className="moment-bottom">
                  <p className="moment-caption">{item.caption}</p>
                  <div className="moment-likes">
                    <Heart size={14} className="like-icon" />
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
