import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import './AgeGate.css';

export const AgeGate = ({ onVerified }) => {
  const [hasDeclined, setHasDeclined] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const cardRef = useRef(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    // Initial entrance animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleConfirm = () => {
    setIsExiting(true);
    gsap.to(cardRef.current, {
      opacity: 0,
      y: -20,
      scale: 0.96,
      duration: 0.5,
      ease: 'power2.in',
    });
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
      delay: 0.1,
      onComplete: () => {
        try {
          localStorage.setItem('vibeAgeVerified', 'true');
        } catch (e) {
          console.warn('LocalStorage unavailable', e);
        }
        onVerified();
      },
    });
  };

  const handleDecline = () => {
    setHasDeclined(true);
  };

  return (
    <aside
      ref={backdropRef}
      className={`agegate-overlay ${isExiting ? 'exiting' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Age Verification"
    >
      <div className="agegate-backdrop-blur" />

      <div ref={cardRef} className="agegate-card glass-panel">
        <div className="agegate-brand-header">
          <div className="agegate-monogram">V</div>
          <span className="agegate-brand-title">VIBE</span>
          <span className="agegate-brand-tagline">ULTRA-PREMIUM SPIRIT</span>
        </div>

        <div className="agegate-divider" />

        {!hasDeclined ? (
          <div className="agegate-content">
            <div className="agegate-badge">
              <ShieldCheck size={14} className="agegate-badge-icon" />
              <span>Age Verification</span>
            </div>

            <h2 className="agegate-heading">Welcome to VIBE</h2>
            <p className="agegate-description">
              Are you of legal drinking age in your country?
            </p>

            <div className="agegate-actions">
              <button
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
              By entering this website, you agree to our Terms of Use and Privacy Policy. Please enjoy responsibly.
            </p>
          </div>
        ) : (
          <div className="agegate-declined-content">
            <div className="agegate-declined-icon-wrapper">
              <AlertCircle size={32} />
            </div>
            <h2 className="agegate-declined-heading">Access Restricted</h2>
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
