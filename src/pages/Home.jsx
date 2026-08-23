import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Interactive Components
import { Hero } from '../components/Hero';
import { KineticMarquee } from '../components/KineticMarquee';
import { LiquidTransition } from '../components/LiquidTransition';
import { StoryReveal } from '../components/StoryReveal';
import { FlavorExperienceSection } from '../components/FlavorExperienceSection';
import { BottleSplit } from '../components/BottleSplit';
import { SensoryLab } from '../components/SensoryLab';
import { FlavorOrbit } from '../components/FlavorOrbit';
import { HorizontalScrollSection } from '../components/HorizontalScrollSection';
import { BrandPhilosophy } from '../components/BrandPhilosophy';
import { ProductScrollRotation } from '../components/ProductScrollRotation';
import { AfterDarkSection } from '../components/AfterDarkSection';
import { MonogramEngraver } from '../components/MonogramEngraver';
import { SocialMoments } from '../components/SocialMoments';
import { ReviewCard } from '../components/ReviewCard';
import { Button } from '../components/Button';

// Context & Data
import { useFlavor } from '../context/FlavorContext';
import { reviewsData } from '../data/reviews';
import { soundEngine } from '../utils/audio';
import { Sparkles, ArrowRight, ShieldCheck, GlassWater, Flame, Compass } from 'lucide-react';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

export const Home = () => {
  const { currentProduct, currentFlavorKey, setFlavor, addToCart } = useFlavor();
  const pageRef = useRef(null);
  const brandStatementRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const ritualImageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Brand Statement clipping mask reveal (Requirement 8)
      if (brandStatementRef.current) {
        const lines = [line1Ref.current, line2Ref.current, line3Ref.current];
        gsap.fromTo(
          lines,
          { yPercent: 120, opacity: 0, skewY: 6 },
          {
            yPercent: 0,
            opacity: 1,
            skewY: 0,
            stagger: 0.2,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: brandStatementRef.current,
              start: 'top 75%',
              end: 'bottom 60%',
              scrub: 0.8,
            },
          }
        );

        // Subtle horizontal movement on scroll scrub
        gsap.to('.statement-line-2', {
          x: -40,
          scrollTrigger: {
            trigger: brandStatementRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // 2. Night ritual image 3D parallax
      if (ritualImageRef.current) {
        gsap.fromTo(
          ritualImageRef.current,
          { y: 50, scale: 0.96 },
          {
            y: -30,
            scale: 1.04,
            scrollTrigger: {
              trigger: '.cinematic-ritual-stage',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className={`home-page-root cinematic-flow-root ${currentFlavorKey}`}>
      {/* 1. Act I: The Hero Genesis Stage (Requirements 4, 5, 6, 7) */}
      <div id="hero">
        <Hero />
      </div>

      {/* 2. Kinetic Typography Streamer (Requirements 8, 9, 21) */}
      <div className="streamer-interlude-1">
        <KineticMarquee
          text1="VIBE NOCTURNE • ARTISANAL BOTANICAL ALCHEMY • SINGLE BATCH CHARACTER • "
          text2="THE MIDNIGHT STANDARD • DUAL CONTRASTING EXPRESSIONS • TIMELESS INDULGENCE • "
          tilt={-1.5}
        />
      </div>

      {/* 3. Act II: Brand Statement Section with Clipping Mask (Requirement 8) */}
      <div id="manifesto" ref={brandStatementRef} className="brand-statement-section" aria-label="Brand Statement">
        <div className="statement-ambient-glow" aria-hidden="true" />
        <div className="container statement-container">
          <div className="badge-pill">
            <span className="badge-dot" />
            <span>THE VIBE</span>
          </div>

          <div className="statement-mask-wrapper">
            <div className="mask-line">
              <h2 ref={line1Ref} className="statement-heading font-editorial">
                NOT JUST
              </h2>
            </div>
            <div className="mask-line">
              <h2 ref={line2Ref} className="statement-heading statement-line-2 font-display">
                A DRINK.
              </h2>
            </div>
            <div className="mask-line">
              <h2 ref={line3Ref} className="statement-heading statement-line-3 font-editorial">
                A FEELING.
              </h2>
            </div>
          </div>

          <p className="statement-subtext font-body">
            Conceived for those who seek character over conformity. Every drop is crafted to command the room, evoke deep conversation, and elevate the nocturnal hours into an art form.
          </p>
        </div>
      </div>

      {/* 4. Liquid Transition (Requirement 15) */}
      <LiquidTransition />

      {/* 5. Act III: Story Reveal (Requirement 10: "Born to stand apart.") */}
      <div id="story">
        <StoryReveal />
      </div>

      {/* 6. Act IV: Immersive Flavour Experience (Requirements 11, 12: "CHOOSE YOUR VIBE") */}
      <div id="dual">
        <FlavorExperienceSection />
      </div>

      {/* 7. Act V: Interactive Bottle Split Section (Requirement 17) */}
      <div className="cinematic-split-section">
        <div className="container">
          <BottleSplit onSelectFlavor={(key) => setFlavor(key)} />
        </div>
      </div>

      {/* 8. Liquid Transition */}
      <LiquidTransition flip />

      {/* 9. Act VI: Molecular Sensory Matrix & Flavor Orbit (Requirements 14, 24) */}
      <div className="cinematic-sensory-stage">
        <div className="container">
          <SensoryLab />
        </div>
      </div>

      {/* 10. Flavor Orbit Visualization (Requirement 14) */}
      <div className="cinematic-orbit-stage">
        <div className="container">
          <div className="orbit-section-header">
            <div className="badge-pill">
              <span className="badge-dot" />
              <span>ORBITAL SENSORY HARMONY</span>
            </div>
            <h2 className="orbit-section-title font-editorial">ASTRAL DIMENSIONS</h2>
            <p className="orbit-section-lead">Hover around the nodes to inspect aroma, character, finish, and serve ritual.</p>
          </div>
          <FlavorOrbit />
        </div>
      </div>

      {/* 11. Act VII: Horizontal Scroll Section (Requirement 16: "FIND YOUR VIBE") */}
      <HorizontalScrollSection />

      {/* 12. Act VIII: Brand Philosophy (Requirement 18: "WHAT IS VIBE?") */}
      <BrandPhilosophy />

      {/* 13. Act IX: Product Scroll Rotation & Craft (Requirements 13, 25: "CRAFTED WITH CHARACTER") */}
      <div id="craft">
        <ProductScrollRotation />
      </div>

      {/* 14. Act X: The Nocturnal Ritual Spatial Horizon */}
      <div className="cinematic-ritual-stage" aria-label="Night Experience">
        <div className="container ritual-grid">
          <div className="ritual-image-column">
            <div className="ritual-image-frame glass-panel">
              <img
                ref={ritualImageRef}
                src="/vibe-night-lifestyle.jpg"
                alt="VIBE Night Experience"
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
              <span>THE RITUAL</span>
            </div>

            <h2 className="ritual-heading font-editorial">
              CRAFTED FOR NIGHTS WORTH REMEMBERING
            </h2>

            <p className="ritual-desc">
              VIBE is not designed for background noise. It is designed to be the centerpiece of private gatherings, late-night conversations, and celebratory toasts where taste, aroma, and style coalesce.
            </p>

            <div className="ritual-features-list">
              <div className="ritual-feat-item glass-panel">
                <GlassWater className="feat-icon" size={22} />
                <div>
                  <h4 className="feat-title">Signature Crystal Pour</h4>
                  <p className="feat-desc">Designed to open up aromas when poured over heavy hand-carved ice spheres.</p>
                </div>
              </div>

              <div className="ritual-feat-item glass-panel">
                <Flame className="feat-icon" size={22} />
                <div>
                  <h4 className="feat-title">Aromatic Warmth</h4>
                  <p className="feat-desc">Natural cold-extracted essences that evolve gracefully as the drink breathes in glass.</p>
                </div>
              </div>
            </div>

            <div className="ritual-action-row">
              <Button
                to="/story"
                variant="primary"
                size="md"
                showArrow
                cursorText="STORY"
              >
                Our Philosophy
              </Button>
              <Button
                to="/craft"
                variant="glass"
                size="md"
                cursorText="CRAFT"
              >
                The Distillation Craft
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 15. Act XI: After Dark Experience (Requirement 26: "AFTER DARK") */}
      <div id="dark">
        <AfterDarkSection />
      </div>

      {/* 16. Act XII: Bespoke Monogram Engraving & Allocation Atelier */}
      <div className="cinematic-atelier-stage">
        <div className="container">
          <MonogramEngraver />
        </div>
      </div>

      {/* 17. Act XIII: Social Moments Gallery (Requirement 27: "SHARE THE VIBE") */}
      <SocialMoments />

      {/* 18. Act XIV: Tastemaker Voices (Requirement 28) */}
      <div id="reviews" className="cinematic-voices-stage" aria-label="Tastemaker Impressions">
        <div className="container">
          <div className="voices-header">
            <div className="badge-pill">
              <span className="badge-dot" />
              <span>TESTIMONIALS</span>
            </div>
            <h2 className="voices-title font-editorial">TASTEMAKER IMPRESSIONS</h2>
            <p className="voices-subtitle">
              Notes from our private nocturnal tastings and evening connoisseurs.
            </p>
          </div>

          <div className="home-reviews-grid">
            {reviewsData.reviews.slice(0, 3).map((rev) => (
              <div key={rev.id} className="voice-card-wrapper">
                <ReviewCard review={rev} />
              </div>
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
      </div>

      {/* 19. Act XV: Final Spatial Invitation (Requirements 29, 30) */}
      <div id="contact" className="cinematic-final-stage" aria-label="Step Into VIBE">
        <div className="container">
          <div className="home-cta-card glass-panel">
            <div className="cta-ambient-glow" />
            <span className="cta-badge">DISTINCTIVELY VIBE</span>
            <h2 className="cta-title font-editorial">FIND YOUR VIBE</h2>
            <p className="cta-desc">
              Experience the dual character of Black Tea and Exotic Lychee in our limited single-batch allocation.
            </p>
            <div className="cta-btn-group">
              <button
                type="button"
                className="cta-primary-pill-btn"
                onClick={() => addToCart(currentFlavorKey)}
                data-cursor-text="RESERVE"
              >
                <span>Reserve Bottle ($145)</span>
                <ArrowRight size={16} />
              </button>
              <Button
                to="/flavours"
                variant="glass"
                size="lg"
                cursorText="PORTFOLIO"
              >
                Explore Full Portfolio
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
