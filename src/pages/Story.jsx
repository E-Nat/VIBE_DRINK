import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionTitle } from '../components/SectionTitle';
import { Button } from '../components/Button';
import { KineticMarquee } from '../components/KineticMarquee';
import { useFlavor } from '../context/FlavorContext';
import { storyData } from '../data/story';
import { Sparkles, Quote, Compass, ArrowRight } from 'lucide-react';
import './Story.css';

gsap.registerPlugin(ScrollTrigger);

export const Story = () => {
  const { currentFlavorKey, addToCart } = useFlavor();
  const storyRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.story-pillar-block',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.25,
          scrollTrigger: {
            trigger: '.story-pillars-grid',
            start: 'top 75%',
          },
        }
      );
    }, storyRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={storyRef} className="story-page-root">
      {/* 1. Story Editorial Hero */}
      <section className="story-hero-section section">
        <div className="container story-hero-container">
          <div className="badge-pill">
            <span className="badge-dot" />
            <span>ORIGIN & PHILOSOPHY</span>
          </div>

          <h1 className="story-hero-title font-editorial">
            {storyData.hero.title}
          </h1>

          <p className="story-hero-subtitle font-display">
            {storyData.hero.subtitle}
          </p>

          <p className="story-hero-lead">
            {storyData.hero.lead}
          </p>

          <div className="story-hero-scroll-line" />
        </div>
      </section>

      {/* Kinetic Streamer */}
      <KineticMarquee
        text1="NOT JUST A DRINK • A NOCTURNAL FEELING • TIMELESS SOPHISTICATION • "
        text2="CRAFTED FOR THOSE WHO COMMAND THE ROOM • BOLD IDENTITY • "
        tilt={-1.5}
      />

      {/* 2. Hero Visual Showcase */}
      <section className="story-visual-section">
        <div className="container">
          <div className="story-banner-frame glass-panel">
            <img
              src="/vibe-night-lifestyle.jpg"
              alt="VIBE Atmosphere"
              className="story-banner-img"
              loading="lazy"
            />
            <div className="story-banner-overlay">
              <span className="story-banner-quote">
                "Where spirit meets nocturnal elegance."
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 3 Story Pillars */}
      <section className="story-pillars-section section">
        <div className="container">
          <SectionTitle
            badge="Manifesto"
            title="THE THREE PILLARS"
            subtitle="The core tenets that guide every expression we create."
            align="center"
          />

          <div className="story-pillars-grid">
            {storyData.pillars.map((pillar) => (
              <article key={pillar.number} className="story-pillar-block glass-panel-interactive">
                <div className="pillar-header">
                  <span className="pillar-number font-editorial">{pillar.number}</span>
                  <div className="pillar-badge">
                    <span>{pillar.title}</span>
                  </div>
                </div>

                <h3 className="pillar-title">{pillar.subtitle}</h3>

                <p className="pillar-body">{pillar.body}</p>

                <div className="pillar-highlight-box">
                  <Sparkles size={14} className="pillar-highlight-icon" />
                  <span className="pillar-highlight-text">{pillar.highlight}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Luxury Quote Showcase */}
      <section className="story-quote-section section">
        <div className="container">
          <div className="story-quote-card glass-panel">
            <Quote size={36} className="story-quote-icon" />
            <blockquote className="story-quote-text font-editorial">
              "{storyData.quote.text}"
            </blockquote>
            <cite className="story-quote-author">
              — {storyData.quote.author}
            </cite>
          </div>
        </div>
      </section>

      {/* 5. Dual Bottle Visual Interlude */}
      <section className="story-duo-section section">
        <div className="container story-duo-container">
          <div className="story-duo-images">
            <div className="duo-item">
              <img
                src="/vibe-black-tea.png"
                alt="VIBE Black Tea bottle"
                className="duo-bottle"
                loading="lazy"
              />
              <span className="duo-label">Black Tea Expression</span>
            </div>
            <div className="duo-item">
              <img
                src="/vibe-exotic-lychee.png"
                alt="VIBE Exotic Lychee bottle"
                className="duo-bottle"
                loading="lazy"
              />
              <span className="duo-label">Exotic Lychee Expression</span>
            </div>
          </div>

          <div className="story-duo-action">
            <Button
              to="/flavours"
              variant="primary"
              size="lg"
              showArrow
              cursorText="EXPLORE"
            >
              Explore The Flavours
            </Button>
            <button
              type="button"
              className="story-reserve-btn"
              onClick={() => addToCart(currentFlavorKey)}
            >
              <span>Reserve Allocation ($145)</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
