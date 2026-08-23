import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useFlavor } from '../context/FlavorContext';
import { soundEngine } from '../utils/audio';
import { Sparkles, Moon, Flame } from 'lucide-react';
import './AfterDarkSection.css';

gsap.registerPlugin(ScrollTrigger);

export const AfterDarkSection = () => {
  const { currentFlavorKey, currentProduct, addToCart } = useFlavor();
  const sectionRef = useRef(null);
  const raysRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Rotating light rays
      gsap.to(raysRef.current, {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: 'none',
      });

      // Dramatic typography entrance
      gsap.fromTo(
        '.after-dark-title-line',
        { y: 80, opacity: 0, skewY: 5 },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`after-dark-stage ${currentFlavorKey}`} aria-label="After Dark Nocturnal Atmosphere">
      {/* Dynamic volumetric light rays */}
      <div ref={raysRef} className="after-dark-rays" aria-hidden="true" />
      <div className="after-dark-vignette" aria-hidden="true" />

      <div className="container after-dark-container">
        <div className="after-dark-badge">
          <Moon size={14} className="after-dark-badge-icon" />
          <span>NOCTURNAL SANCTUARY</span>
        </div>

        <div className="after-dark-hero-text">
          <h2 className="after-dark-title-line font-editorial">AFTER</h2>
          <h2 className="after-dark-title-line title-accent font-display">DARK</h2>
        </div>

        <p className="after-dark-quote font-editorial">
          "Some moments are better after dark."
        </p>

        <p className="after-dark-subline">
          When the lights dim and conversation deepens, VIBE becomes the catalyst for unforgettable memories.
        </p>

        {/* Center Glowing Bottle Stage */}
        <div className="after-dark-bottle-stage">
          <div className="after-dark-halo-pulse" />
          <img
            src={currentProduct.image}
            alt={currentProduct.name}
            className="after-dark-bottle-img"
            loading="lazy"
          />
        </div>

        <div className="after-dark-actions">
          <button
            type="button"
            className="after-dark-reserve-btn"
            onClick={() => {
              soundEngine.playChime(660, 'sine', 1.2);
              addToCart(currentFlavorKey);
            }}
            data-cursor-text="RESERVE"
          >
            <Sparkles size={16} />
            <span>Secure Midnight Bottle ($145)</span>
          </button>
        </div>
      </div>
    </section>
  );
};
