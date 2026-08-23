import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useFlavor } from '../context/FlavorContext';
import { soundEngine } from '../utils/audio';
import { Instagram, Heart, Sparkles } from 'lucide-react';
import './SocialMoments.css';

gsap.registerPlugin(ScrollTrigger);

export const SocialMoments = () => {
  const { currentFlavorKey } = useFlavor();
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const moments = [
    {
      id: 'lifestyle-left',
      type: 'lifestyle',
      image: '/vibe-night-lifestyle.jpg',
      tag: '#MidnightRitual',
      likes: '2.4k',
      caption: 'When midnight becomes an art form. #VIBENocturne',
      aspect: 'tall',
      gridArea: 'left',
    },
    {
      id: 'texture-top-center',
      type: 'texture',
      image: '/vibe-botanical-craft.jpg',
      tag: '#BotanicalAlchemy',
      likes: '1.8k',
      caption: 'Single-estate botanicals, extracted at low temperature.',
      aspect: 'square',
      gridArea: 'top-center',
    },
    {
      id: 'black-tea-top-right',
      type: 'product-black-tea',
      image: '/vibe-black-tea.png',
      tag: '#BlackTeaExpression',
      likes: '3.1k',
      caption: 'Single-estate black tea, roasted malt & charred oak.',
      aspect: 'square',
      gridArea: 'top-right',
      isProduct: true,
    },
    {
      id: 'lychee-bottom-center',
      type: 'product-lychee',
      image: '/vibe-exotic-lychee.png',
      tag: '#ExoticLychee',
      likes: '2.9k',
      caption: 'Luminous lychee nectar, velvet rose petals & citrus mist.',
      aspect: 'square',
      gridArea: 'bottom-center',
      isProduct: true,
    },
    {
      id: 'cellar-bottom-right',
      type: 'lifestyle',
      image: '/vibe-night-lifestyle.jpg',
      tag: '#PrivateCellar',
      likes: '1.5k',
      caption: 'Reserved for private tastings and nocturnal conversation.',
      aspect: 'square',
      gridArea: 'bottom-right',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const grid = gridRef.current;
      if (!section || !grid) return;

      const cards = grid.querySelectorAll('.social-moment-card');

      // Sequential card entrance: opacity 0 -> 1, y: 30 -> 0, scale: 0.94 -> 1, blur 8px -> 0px
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 30,
          scale: 0.94,
          filter: 'blur(8px)',
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`social-moments-stage ${currentFlavorKey}`}
      aria-label="Social Moments Gallery"
    >
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

        <div ref={gridRef} className="social-masonry-grid">
          {moments.map((item) => (
            <div
              key={item.id}
              className={`social-moment-card glass-panel card-${item.gridArea} aspect-${item.aspect} ${item.isProduct ? 'card-product' : ''}`}
              onMouseEnter={() => soundEngine.playClick(850)}
              data-cursor-text="VIBE"
            >
              {/* Card Ambient Glow on Hover */}
              <div className="moment-card-glow" aria-hidden="true" />

              {/* Image Container with precise product vs photo handling */}
              <div className={`moment-img-wrapper ${item.isProduct ? 'product-img-wrapper' : ''}`}>
                <img
                  src={item.image}
                  alt={item.tag}
                  className={`moment-img ${item.isProduct ? 'product-bottle-img' : 'lifestyle-photo-img'}`}
                  loading="lazy"
                />
              </div>

              {/* Hover Overlay with Tag & Caption */}
              <div className="moment-overlay">
                <div className="moment-top">
                  <span className="moment-vibe-tag font-nav">{item.tag}</span>
                  <div className="moment-social-icon">
                    <Instagram size={15} />
                  </div>
                </div>

                <div className="moment-bottom">
                  <p className="moment-caption">{item.caption}</p>
                  <div className="moment-likes">
                    <Heart size={13} className="like-icon" />
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
