import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './CinematicIntro.css';

export const CinematicIntro = ({ onComplete }) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const lightRef = useRef(null);
  const tagRef = useRef(null);
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    // Check if user already saw intro this session
    const hasSeen = sessionStorage.getItem('vibeIntroSeen');
    if (hasSeen) {
      onComplete();
      return;
    }

    const container = containerRef.current;
    const logo = logoRef.current;
    const light = lightRef.current;
    const tag = tagRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('vibeIntroSeen', 'true');
        onComplete();
      },
    });

    // 1. Initial black & fade in logo
    tl.set(container, { opacity: 1 })
      .set(logo, { opacity: 0, scale: 0.92, filter: 'blur(10px)' })
      .set(tag, { opacity: 0, y: 15 })
      .set(light, { left: '-100%', opacity: 0 })
      // Logo slowly emerges with light
      .to(logo, {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.7,
        ease: 'power3.out',
      })
      // Light sweep
      .to(light, {
        opacity: 0.8,
        left: '200%',
        duration: 0.65,
        ease: 'power2.inOut',
      }, '-=0.3')
      // "CRAFT YOUR VIBE" text reveals
      .to(tag, {
        opacity: 1,
        y: 0,
        letterSpacing: '0.35em',
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.4')
      // Slight expansion and dramatic reveal
      .to(logo, {
        scale: 1.08,
        duration: 0.4,
        ease: 'power2.inOut',
      })
      // Screen curtain lifts
      .to(container, {
        yPercent: -100,
        duration: 0.6,
        ease: 'expo.inOut',
      }, '+=0.1');

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  const handleSkip = () => {
    setSkipped(true);
    sessionStorage.setItem('vibeIntroSeen', 'true');
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: onComplete,
    });
  };

  return (
    <div ref={containerRef} className="cinematic-intro-root" aria-hidden="true">
      {/* Film grain layer */}
      <div className="intro-grain" />

      {/* Skip Button */}
      <button type="button" onClick={handleSkip} className="intro-skip-btn">
        <span>SKIP INTRO</span>
      </button>

      {/* Center Cinematic Logo Stage */}
      <div className="intro-center-stage">
        <div ref={logoRef} className="intro-logo-wrapper">
          <div className="intro-monogram">V</div>
          <h1 className="intro-brand-name font-editorial">VIBE</h1>
          <div ref={lightRef} className="intro-light-sweep" />
        </div>

        <p ref={tagRef} className="intro-tagline font-nav">
          CRAFT YOUR VIBE
        </p>
      </div>

      <div className="intro-vignette" />
    </div>
  );
};
