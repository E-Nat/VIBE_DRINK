import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useFlavor } from '../context/FlavorContext';
import { soundEngine } from '../utils/audio';
import { Bottle } from './Bottle';
import { FlavorSelector } from './FlavorSelector';
import { Button } from './Button';
import { Sparkles, Compass, ShieldCheck, ArrowRight, Volume2 } from 'lucide-react';
import './Hero.css';

export const Hero = () => {
  const {
    currentProduct,
    currentFlavorKey,
    addToCart,
    isAudioActive,
    toggleAudio,
  } = useFlavor();

  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const metaRef = useRef(null);
  const watermarkRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        watermarkRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 0.12, scale: 1, duration: 1.4, ease: 'power2.out' }
      )
        .fromTo(
          '.hero-badge',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=1.0'
        )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.5'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          metaRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.3'
        )
        .fromTo(
          '.hero-bottle-column',
          { opacity: 0, scale: 0.9, y: 50 },
          { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'power3.out' },
          '-=0.9'
        )
        .fromTo(
          '.hero-selector-column',
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.8 },
          '-=0.7'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className={`hero-section ${currentFlavorKey}`} aria-label="Hero Showcase">
      {/* Massive Kinetic Typography Watermark */}
      <div
        ref={watermarkRef}
        className="hero-kinetic-watermark font-editorial"
        aria-hidden="true"
      >
        VIBE
      </div>

      <div className="container hero-container">
        {/* Left Column: Editorial Brand Typography */}
        <div className="hero-content-column">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            <span className="hero-badge-text">{currentProduct.badge}</span>
          </div>

          <h1 ref={titleRef} className="hero-title">
            <span className="hero-title-script font-display">Feel</span>
            <span className="hero-title-main">VIBE</span>
          </h1>

          <p ref={descRef} className="hero-description">
            A distinctive spirit with a bold personality. Discover the rich
            botanical depth of <strong className="text-highlight">Black Tea</strong>{' '}
            and the luminous floral radiance of{' '}
            <strong className="text-highlight">Exotic Lychee</strong>.
          </p>

          <div ref={ctaRef} className="hero-cta-group">
            <Button
              to="/flavours"
              variant="primary"
              size="lg"
              showArrow
              cursorText="EXPLORE"
            >
              Explore Portfolio
            </Button>

            <button
              type="button"
              className="hero-reserve-pill-btn"
              onClick={() => addToCart(currentFlavorKey)}
              data-cursor-text="RESERVE"
            >
              <span>Reserve Allocation ($145)</span>
            </button>
          </div>

          {/* Quick Sensory Notes Bar */}
          <div ref={metaRef} className="hero-notes-bar glass-panel">
            <div className="hero-note-item">
              <span className="hero-note-label">EXPRESSION</span>
              <span className="hero-note-val">{currentProduct.flavor}</span>
            </div>
            <div className="hero-note-divider" />
            <div className="hero-note-item">
              <span className="hero-note-label">STRENGTH</span>
              <span className="hero-note-val">{currentProduct.abv}</span>
            </div>
            <div className="hero-note-divider" />
            <div className="hero-note-item">
              <span className="hero-note-label">VOLUME</span>
              <span className="hero-note-val">{currentProduct.volume}</span>
            </div>
          </div>
        </div>

        {/* Center Column: 3D Interactive Floating Bottle */}
        <div className="hero-bottle-column">
          <Bottle size="hero" interactive={true} />
        </div>

        {/* Right Column: Flavor Switcher Cards */}
        <div className="hero-selector-column">
          <FlavorSelector layout="vertical" />

          {/* Live Tasting Note Highlight */}
          <div className="hero-live-note glass-panel">
            <div className="live-note-header">
              <Sparkles size={14} className="live-note-icon" />
              <span>Aromatic Signature</span>
            </div>
            <p className="live-note-aroma">"{currentProduct.profile.aroma}"</p>
          </div>
        </div>
      </div>

      {/* Hero Scroll Down Indicator */}
      <div className="hero-scroll-indicator" aria-hidden="true">
        <span className="scroll-indicator-text">SCROLL INTO THE EXPERIENCE</span>
        <div className="scroll-indicator-line">
          <div className="scroll-indicator-dot" />
        </div>
      </div>
    </section>
  );
};
