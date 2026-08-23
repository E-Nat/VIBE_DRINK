import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';
import './AgeGate.css';

export const AgeGate = ({ onVerified }) => {
  const [hasDeclined, setHasDeclined] = useState(false);
  const cardRef = useRef(null);
  const backdropRef = useRef(null);
  const lightMaskRef = useRef(null);
  const yesBtnRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out', delay: 0.15 }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleConfirm = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = rect.left + rect.width / 2;
    const clickY = rect.top + rect.height / 2;

    const tl = gsap.timeline({
      onComplete: () => {
        try {
          localStorage.setItem('vibeAgeVerified', 'true');
        } catch (err) {
          console.warn('LocalStorage unavailable', err);
        }
        onVerified();
      },
    });

    // 1. Button expansion
    tl.to(yesBtnRef.current, {
      scale: 1.15,
      filter: 'brightness(1.5)',
      duration: 0.25,
      ease: 'power2.out',
    })
      // 2. Card fade down
      .to(cardRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.35,
        ease: 'power2.in',
      }, '-=0.1')
      // 3. Circular light expansion mask
      .set(lightMaskRef.current, {
        display: 'block',
        left: clickX,
        top: clickY,
      })
      .fromTo(
        lightMaskRef.current,
        { scale: 0, opacity: 0.8 },
        {
          scale: 45,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.inOut',
        }
      )
      // 4. Reveal homepage
      .to(backdropRef.current, {
        opacity: 0,
        duration: 0.45,
        ease: 'power2.out',
      }, '-=0.2');
  };

  const handleDecline = () => {
    setHasDeclined(true);
  };

  return (
    <aside
      ref={backdropRef}
      className="agegate-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Age Verification"
    >
      {/* Background moving ambient lighting */}
      <div className="agegate-ambient-glow" />

      {/* Expanding circular light mask on confirm */}
      <div ref={lightMaskRef} className="agegate-expanding-light" />

      <div ref={cardRef} className="agegate-card glass-panel">
        <div className="agegate-brand-header">
          <div className="agegate-halo-glow" />
          <div className="agegate-monogram">V</div>
          <span className="agegate-brand-title font-editorial">VIBE</span>
          <span className="agegate-brand-tagline">ULTRA-PREMIUM SPIRIT</span>
        </div>

        <div className="agegate-divider" />

        {!hasDeclined ? (
          <div className="agegate-content">
            <div className="agegate-badge">
              <Sparkles size={13} className="agegate-badge-icon" />
              <span>ENTER THE VIBE</span>
            </div>

            <h2 className="agegate-heading font-editorial">Are you of legal drinking age?</h2>
            <p className="agegate-description">
              You must be of legal drinking age in your country of residence to enter this experience.
            </p>

            <div className="agegate-actions">
              <button
                ref={yesBtnRef}
                type="button"
                className="agegate-btn agegate-btn-primary"
                onClick={handleConfirm}
                data-cursor-text="ENTER"
              >
                <span>YES, ENTER</span>
              </button>

              <button
                type="button"
                className="agegate-btn agegate-btn-secondary"
                onClick={handleDecline}
                data-cursor-text="EXIT"
              >
                <span>NO, EXIT</span>
              </button>
            </div>

            <p className="agegate-disclaimer">
              By entering, you accept our Terms of Service & Privacy Policy. Please enjoy responsibly.
            </p>
          </div>
        ) : (
          <div className="agegate-declined-content">
            <div className="agegate-declined-icon-wrapper">
              <AlertCircle size={32} />
            </div>
            <h2 className="agegate-declined-heading font-editorial">Access Restricted</h2>
            <p className="agegate-declined-text">
              Sorry, you must be of legal drinking age to enter this website.
            </p>
            <p className="agegate-declined-subtext">
              We advocate responsible enjoyment. You may close this window.
            </p>
            <button
              type="button"
              className="agegate-btn agegate-btn-secondary agegate-btn-retry"
              onClick={() => setHasDeclined(false)}
            >
              <span>Back to Confirmation</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
