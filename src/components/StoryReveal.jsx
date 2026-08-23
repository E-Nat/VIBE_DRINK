import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useFlavor } from '../context/FlavorContext';
import { soundEngine } from '../utils/audio';
import { Sparkles, ArrowRight, Shield } from 'lucide-react';
import './StoryReveal.css';

gsap.registerPlugin(ScrollTrigger);

export const StoryReveal = () => {
  const { currentFlavorKey, currentProduct } = useFlavor();
  const sectionRef = useRef(null);
  const geomLinesRef = useRef(null);
  const lightDriftRef = useRef(null);
  const visualWrapRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      // 1. Slow drift for background geometric lines
      if (geomLinesRef.current) {
        gsap.to(geomLinesRef.current, {
          x: 25,
          y: -15,
          duration: 12,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // 2. Slow moving atmospheric light
      if (lightDriftRef.current) {
        gsap.to(lightDriftRef.current, {
          x: 80,
          y: -40,
          duration: 9,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // 3. Main Entrance Timeline with smooth reverse on exit
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'bottom 20%',
          toggleActions: 'play reverse play reverse',
        },
        defaults: { ease: 'power3.out' },
      });

      tl.fromTo(
        '.story-reveal-badge',
        { opacity: 0, y: 30, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9 }
      )
        .fromTo(
          '.story-main-heading-line',
          { opacity: 0, y: 55, filter: 'blur(14px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, stagger: 0.15 },
          '-=0.6'
        )
        .fromTo(
          '.story-progressive-line',
          { opacity: 0, y: 40, filter: 'blur(10px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.0, stagger: 0.2 },
          '-=0.6'
        )
        .fromTo(
          '.story-editorial-paragraph',
          { opacity: 0, y: 30, filter: 'blur(6px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9 },
          '-=0.5'
        )
        .fromTo(
          '.story-cta-action',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          visualWrapRef.current,
          { opacity: 0, scale: 0.96, y: 40 },
          { opacity: 1, scale: 1.0, y: 0, duration: 1.4, ease: 'power2.out' },
          '-=1.2'
        );

      // 4. Subtle scroll-driven parallax for the bottle visual
      gsap.to(visualWrapRef.current, {
        y: -35,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`story-reveal-stage ${currentFlavorKey}`}
      aria-label="Brand Story Reveal"
    >
      {/* 1. Dark Atmospheric Background & Moving Gradient Light */}
      <div className="story-bg-layer" aria-hidden="true">
        <div ref={lightDriftRef} className={`story-light-drift ${currentFlavorKey}`} />
        <div className="story-vignette-overlay" />

        {/* 2. Geometric Background Lines */}
        <svg
          ref={geomLinesRef}
          className="story-geom-lines"
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="100" y1="0" x2="100" y2="800" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.08" />
          <line x1="400" y1="0" x2="400" y2="800" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.06" />
          <line x1="800" y1="0" x2="800" y2="800" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.06" />
          <line x1="1100" y1="0" x2="1100" y2="800" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.08" />
          <circle cx="600" cy="400" r="320" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.07" strokeDasharray="4 8" />
          <circle cx="600" cy="400" r="180" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.05" />
          <line x1="0" y1="400" x2="1200" y2="400" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.06" />
        </svg>

        {/* 3. Subtle Floating Luminous Particles */}
        <div className="story-floating-particles">
          <span className="story-particle p-1" />
          <span className="story-particle p-2" />
          <span className="story-particle p-3" />
          <span className="story-particle p-4" />
          <span className="story-particle p-5" />
        </div>
      </div>

      <div className="container story-content-grid">
        {/* Left Column: Progressive Typography Story */}
        <div ref={contentRef} className="story-text-column">
          <div className="story-reveal-badge badge-pill">
            <span className="badge-dot" />
            <span>ORIGIN & MANIFESTO</span>
          </div>

          <div className="story-headline-block">
            <h2 className="story-main-heading-line font-editorial">
              Born to stand apart.
            </h2>
          </div>

          {/* Progressive Sentence Stacks */}
          <div className="story-progressive-stack">
            <p className="story-progressive-line line-1 font-editorial">
              VIBE is about character.
            </p>
            <p className="story-progressive-line line-2 font-display">
              Presence.
            </p>
            <p className="story-progressive-line line-3 font-body">
              And the moments that stay with you.
            </p>
          </div>

          <p className="story-editorial-paragraph font-body">
            Conceived for nocturnal gatherings, intimate celebrations, and conversations that stretch into dawn. Every bottle represents uncompromising single-batch botanical distillation and an unwavering dedication to presence.
          </p>

          <div className="story-cta-action">
            <NavLink
              to="/story"
              className="story-explore-link"
              onClick={() => soundEngine.playClick(800)}
              data-cursor-text="STORY"
            >
              <span>Explore Our Philosophy</span>
              <ArrowRight size={16} className="link-arrow" />
            </NavLink>
          </div>
        </div>

        {/* Right Column: Subtle Bottle & Product Visual Showcase */}
        <div ref={visualWrapRef} className="story-visual-column">
          <div className="story-visual-card glass-panel">
            <div className="story-visual-halo" />

            <div className="story-bottle-container">
              <img
                src={currentProduct.image}
                alt={`VIBE ${currentProduct.name}`}
                className="story-bottle-render"
                loading="lazy"
              />
              <div className="story-bottle-floor-shadow" />
            </div>

            <div className="story-visual-footer">
              <div className="story-visual-tag font-nav">
                <Sparkles size={13} className="tag-sparkle" />
                <span>SIGNATURE NOCTURNE VESSEL</span>
              </div>
              <p className="story-visual-caption font-editorial">
                "Where spirit meets architectural glass."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
