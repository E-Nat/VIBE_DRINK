import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useFlavor } from '../context/FlavorContext';
import './StoryReveal.css';

gsap.registerPlugin(ScrollTrigger);

export const StoryReveal = () => {
  const { currentFlavorKey } = useFlavor();
  const containerRef = useRef(null);
  const phraseRef = useRef(null);
  const sent1Ref = useRef(null);
  const sent2Ref = useRef(null);
  const sent3Ref = useRef(null);

  const phraseText = 'Born to stand apart.';

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      // 1. Character-by-character reveal of "Born to stand apart."
      const chars = phraseRef.current.querySelectorAll('.reveal-char');
      gsap.fromTo(
        chars,
        {
          opacity: 0.08,
          y: 25,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: 0.04,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: phraseRef.current,
            start: 'top 80%',
            end: 'bottom 55%',
            scrub: 0.8,
          },
        }
      );

      // 2. Animate each subsequent sentence separately
      const sentences = [sent1Ref.current, sent2Ref.current, sent3Ref.current];
      sentences.forEach((sent, idx) => {
        if (!sent) return;
        gsap.fromTo(
          sent,
          {
            opacity: 0,
            y: 40,
            filter: 'blur(8px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sent,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={`story-reveal-stage ${currentFlavorKey}`} aria-label="Brand Story Reveal">
      <div className="container story-reveal-container">
        {/* Subtle Ambient Halo */}
        <div className="reveal-ambient-halo" aria-hidden="true" />

        <div className="badge-pill">
          <span className="badge-dot" />
          <span>ORIGIN MANIFESTO</span>
        </div>

        {/* Character by character phrase */}
        <div ref={phraseRef} className="reveal-primary-phrase font-editorial">
          {phraseText.split('').map((char, index) => (
            <span
              key={index}
              className={`reveal-char ${char === ' ' ? 'char-space' : ''}`}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Subsequent 3 sentences animated separately */}
        <div className="reveal-sentences-stack">
          <p ref={sent1Ref} className="reveal-sentence sent-1 font-editorial">
            VIBE is about character.
          </p>
          <p ref={sent2Ref} className="reveal-sentence sent-2 font-display">
            Presence.
          </p>
          <p ref={sent3Ref} className="reveal-sentence sent-3 font-body">
            And the moments that stay with you.
          </p>
        </div>
      </div>
    </section>
  );
};
