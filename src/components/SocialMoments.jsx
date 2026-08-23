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
      id: 'card-1-lifestyle',
      number: '01',
      title: 'The Nocturnal Scene',
      image: '/vibe-night-lifestyle.jpg',
      tag: '#MidnightRitual',
      likes: '2.4k',
      caption: 'When midnight becomes an art form. #VIBENocturne',
      gridArea: 'left',
      isProduct: false,
    },
    {
      id: 'card-2-texture',
      number: '02',
      title: 'Botanical Alchemy',
      image: '/vibe-botanical-craft.jpg',
      tag: '#BotanicalCraft',
      likes: '1.8k',
      caption: 'Single-estate botanicals, extracted at low temperature.',
      gridArea: 'top-center',
      isProduct: false,
    },
    {
      id: 'card-3-black-tea',
      number: '03',
      title: 'Black Tea Expression',
      image: '/vibe-black-tea.png',
      tag: '#BlackTeaDetail',
      likes: '3.1k',
      caption: 'Single-estate tea, roasted malt & charred French oak.',
      gridArea: 'top-right',
      isProduct: true,
      productName: 'Black Tea',
    },
    {
      id: 'card-4-exotic-lychee',
      number: '04',
      title: 'Exotic Lychee Expression',
      image: '/vibe-exotic-lychee.png',
      tag: '#ExoticLycheeDetail',
      likes: '2.9k',
      caption: 'Luminous lychee nectar, velvet rose petals & citrus mist.',
      gridArea: 'bottom-center',
      isProduct: true,
      productName: 'Exotic Lychee',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const grid = gridRef.current;
      if (!section || !grid) return;

      const cards = grid.querySelectorAll('.social-moment-card');

      // Sequential card entrance: Card 1 -> Card 2 -> Card 3 -> Card 4
      // opacity 0 -> 1, y: 30 -> 0, scale: 0.94 -> 1, blur 8px -> 0px
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
          duration: 1.0,
          stagger: 0.1,
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
      aria-label="After Dark Image Gallery"
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

        {/* 4-Card Cinematic Grid Composition */}
        <div ref={gridRef} className="social-masonry-grid">
          {moments.map((item) => (
            <div
              key={item.id}
              className={`social-moment-card glass-panel card-${item.gridArea} ${item.isProduct ? 'card-product' : ''}`}
              onMouseEnter={() => soundEngine.playClick(850)}
              data-cursor-text="VIBE"
            >
              {/* Card Ambient Glow on Hover */}
              <div className="moment-card-glow" aria-hidden="true" />

              {/* Image Container with precise product vs photo handling */}
              <div className={`moment-img-wrapper ${item.isProduct ? 'product-img-wrapper' : ''}`}>
                <img
                  src={item.image}
                  alt={item.title}
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
