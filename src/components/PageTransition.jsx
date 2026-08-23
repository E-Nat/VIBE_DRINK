import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import './PageTransition.css';

export const PageTransition = ({ children }) => {
  const location = useLocation();
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    // Scroll to top on navigation
    window.scrollTo(0, 0);

    const overlay = overlayRef.current;
    const content = contentRef.current;
    const logo = logoRef.current;

    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

    // Page entrance curtain
    tl.set(overlay, { transformOrigin: 'top', scaleY: 1, pointerEvents: 'all', display: 'flex' })
      .set(logo, { opacity: 1, scale: 1 })
      .to(logo, {
        opacity: 0,
        scale: 0.95,
        duration: 0.25,
        delay: 0.15,
      })
      .to(overlay, {
        scaleY: 0,
        duration: 0.55,
        ease: 'expo.inOut',
      })
      .set(overlay, { display: 'none', pointerEvents: 'none' })
      .fromTo(
        content,
        { opacity: 0.8, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        '-=0.3'
      );

    return () => {
      tl.kill();
    };
  }, [location.pathname]);

  return (
    <div className="page-transition-root">
      {/* Wipe Overlay */}
      <div ref={overlayRef} className="page-transition-overlay" aria-hidden="true">
        <div ref={logoRef} className="transition-brand">
          <div className="transition-monogram">V</div>
          <span className="transition-title">VIBE</span>
        </div>
      </div>

      {/* Page Inner Content */}
      <div ref={contentRef} className="page-transition-content">
        {children}
      </div>
    </div>
  );
};
