import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hero } from '../components/Hero';
import { SectionTitle } from '../components/SectionTitle';
import { Button } from '../components/Button';
import { Bottle } from '../components/Bottle';
import { ReviewCard } from '../components/ReviewCard';
import { useFlavor } from '../context/FlavorContext';
import { products, productList } from '../data/products';
import { reviewsData } from '../data/reviews';
import { Sparkles, ArrowRight, ShieldCheck, GlassWater, Flame, Compass } from 'lucide-react';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

export const Home = () => {
  const { currentProduct, currentFlavorKey, setFlavor } = useFlavor();
  const manifestoRef = useRef(null);
  const manifestoLinesRef = useRef([]);
  const dualSectionRef = useRef(null);
  const servesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // "THE VIBE" ScrollTrigger line-by-line reveal
      if (manifestoRef.current) {
        gsap.fromTo(
          manifestoLinesRef.current,
          { opacity: 0.15, y: 40, filter: 'blur(4px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            stagger: 0.2,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: manifestoRef.current,
              start: 'top 75%',
              end: 'bottom 60%',
              scrub: 0.8,
            },
          }
        );
      }

      // Parallax and scroll fades for feature sections
      gsap.fromTo(
        '.dual-feature-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: dualSectionRef.current,
            start: 'top 80%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="home-page-root">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. THE VIBE - Cinematic Scroll Statement Section */}
      <section ref={manifestoRef} className="manifesto-section section" aria-label="Brand Manifesto">
        <div className="container manifesto-container">
          <div className="manifesto-badge">
            <span className="badge-dot" />
            <span>THE VIBE</span>
          </div>

          <div className="manifesto-content">
            <p
              ref={(el) => (manifestoLinesRef.current[0] = el)}
              className="manifesto-line font-editorial"
            >
              Not just a drink.
            </p>
            <p
              ref={(el) => (manifestoLinesRef.current[1] = el)}
              className="manifesto-line manifesto-line-accent font-display"
            >
              A feeling.
            </p>
            <p
              ref={(el) => (manifestoLinesRef.current[2] = el)}
              className="manifesto-subline font-body"
            >
              Conceived for those who seek character over conformity. Every drop is crafted to command the room, evoke deep conversation, and elevate the nocturnal hours.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Dual Expressions - Side-by-Side Showcase */}
      <section ref={dualSectionRef} className="dual-showcase-section section" aria-label="Flavor Expressions">
        <div className="container">
          <SectionTitle
            badge="The Collection"
            title="DUAL EXPRESSIONS"
            subtitle="Two contrasting personalities, each engineered to transform the moment."
            align="center"
          />

          <div className="dual-cards-grid">
            {/* Black Tea Expression Card */}
            <div
              className={`dual-feature-card glass-panel-interactive ${currentFlavorKey === 'blackTea' ? 'active-flavor' : ''}`}
              onClick={() => setFlavor('blackTea')}
              data-cursor-text="BLACK TEA"
            >
              <div className="dual-card-top">
                <span className="dual-expression-badge bt">01 • BOLD & RICH</span>
                <h3 className="dual-card-title">VIBE Black Tea</h3>
                <p className="dual-card-tagline">Slow-extracted botanicals, roasted malt & warm oak.</p>
              </div>

              <div className="dual-card-bottle-stage">
                <img
                  src="/vibe-black-tea.png"
                  alt="VIBE Black Tea"
                  className="dual-bottle-img"
                  loading="lazy"
                />
                <div className="dual-bottle-glow bt-glow" />
              </div>

              <div className="dual-card-notes">
                <div className="dual-note-pill">Smoked Honey</div>
                <div className="dual-note-pill">Ceylon Tea</div>
                <div className="dual-note-pill">Charred Oak</div>
              </div>

              <Button
                to="/flavours"
                variant="glass"
                size="sm"
                showArrow
                cursorText="VIEW"
                className="dual-card-btn"
              >
                Discover Black Tea
              </Button>
            </div>

            {/* Exotic Lychee Expression Card */}
            <div
              className={`dual-feature-card glass-panel-interactive ${currentFlavorKey === 'exoticLychee' ? 'active-flavor' : ''}`}
              onClick={() => setFlavor('exoticLychee')}
              data-cursor-text="LYCHEE"
            >
              <div className="dual-card-top">
                <span className="dual-expression-badge el">02 • BRIGHT & FLORAL</span>
                <h3 className="dual-card-title">VIBE Exotic Lychee</h3>
                <p className="dual-card-tagline">Luminous lychee nectar, damask rose & citrus mist.</p>
              </div>

              <div className="dual-card-bottle-stage">
                <img
                  src="/vibe-exotic-lychee.png"
                  alt="VIBE Exotic Lychee"
                  className="dual-bottle-img"
                  loading="lazy"
                />
                <div className="dual-bottle-glow el-glow" />
              </div>

              <div className="dual-card-notes">
                <div className="dual-note-pill">Lychee Nectar</div>
                <div className="dual-note-pill">Burgundy Rose</div>
                <div className="dual-note-pill">Citrus Blossom</div>
              </div>

              <Button
                to="/flavours"
                variant="glass"
                size="sm"
                showArrow
                cursorText="VIEW"
                className="dual-card-btn"
              >
                Discover Exotic Lychee
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The Night Ritual - Editorial Split Section */}
      <section className="night-ritual-section section" aria-label="Night Experience">
        <div className="container ritual-grid">
          <div className="ritual-image-column">
            <div className="ritual-image-frame glass-panel">
              <img
                src="/vibe-night-lifestyle.jpg"
                alt="VIBE night ambiance"
                className="ritual-main-img"
                loading="lazy"
              />
              <div className="ritual-image-badge glass-panel">
                <Sparkles size={14} className="ritual-badge-icon" />
                <span>The Midnight Standard</span>
              </div>
            </div>
          </div>

          <div className="ritual-text-column">
            <div className="badge-pill">
              <span className="badge-dot" />
              <span>THE EXPERIENCE</span>
            </div>

            <h2 className="ritual-heading">
              CRAFTED FOR NIGHTS WORTH REMEMBERING
            </h2>

            <p className="ritual-desc">
              VIBE is not designed for background noise. It is designed to be the centerpiece of private gatherings, late-night conversations, and celebratory toasts where taste and style coalesce.
            </p>

            <div className="ritual-features-list">
              <div className="ritual-feat-item">
                <GlassWater className="feat-icon" size={20} />
                <div>
                  <h4 className="feat-title">Signature Crystal Pour</h4>
                  <p className="feat-desc">Designed to open up aromas when poured over heavy sculpted ice.</p>
                </div>
              </div>

              <div className="ritual-feat-item">
                <Flame className="feat-icon" size={20} />
                <div>
                  <h4 className="feat-title">Aromatic Warmth</h4>
                  <p className="feat-desc">Natural botanical essences that evolve as the drink breathes in glass.</p>
                </div>
              </div>
            </div>

            <Button
              to="/story"
              variant="primary"
              size="md"
              showArrow
              cursorText="READ"
            >
              Explore Our Philosophy
            </Button>
          </div>
        </div>
      </section>

      {/* 5. Tastemaker Impressions Preview */}
      <section className="home-reviews-section section" aria-label="Impressions">
        <div className="container">
          <SectionTitle
            badge="Voices"
            title="IMPRESSIONS"
            subtitle="Thoughts from our private tastings and evening tastemakers."
            align="center"
          />

          <div className="home-reviews-grid">
            {reviewsData.reviews.slice(0, 3).map((rev) => (
              <ReviewCard key={rev.id} review={rev} />
            ))}
          </div>

          <div className="home-reviews-cta">
            <Button
              to="/reviews"
              variant="secondary"
              size="md"
              showArrow
              cursorText="ALL REVIEWS"
            >
              View All Testimonials
            </Button>
          </div>
        </div>
      </section>

      {/* 6. High-End Final Call to Action */}
      <section className="home-cta-banner section" aria-label="Explore Invitation">
        <div className="container">
          <div className="home-cta-card glass-panel">
            <div className="cta-ambient-glow" />
            <span className="cta-badge">DISTINCTIVELY VIBE</span>
            <h2 className="cta-title">STEP INTO THE VIBE</h2>
            <p className="cta-desc">
              Experience the dual character of Black Tea and Exotic Lychee.
            </p>
            <div className="cta-btn-group">
              <Button
                to="/flavours"
                variant="primary"
                size="lg"
                showArrow
                cursorText="DISCOVER"
              >
                Discover Flavours
              </Button>
              <Button
                to="/contact"
                variant="glass"
                size="lg"
                cursorText="CONNECT"
              >
                Contact Concierge
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
