import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useFlavor } from '../context/FlavorContext';
import { soundEngine } from '../utils/audio';
import { Sparkles, Gem, ShieldCheck } from 'lucide-react';
import './ProductScrollRotation.css';

gsap.registerPlugin(ScrollTrigger);

export const ProductScrollRotation = () => {
  const { currentProduct, currentFlavorKey, addToCart } = useFlavor();
  const stageRef = useRef(null);
  const bottleRef = useRef(null);
  const sheenRef = useRef(null);

  const pillars = [
    { label: 'DETAIL', sub: 'Hand-carved architectural crystal base' },
    { label: 'CHARACTER', sub: 'Single-estate botanical cold maceration' },
    { label: 'PRESENCE', sub: 'Commanding tactile weight and unmistakable finish' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stage = stageRef.current;
      const bottle = bottleRef.current;
      if (!stage || !bottle) return;

      // Scroll-driven elegant 360-degree rotation
      gsap.fromTo(
        bottle,
        { rotateY: -180, scale: 0.88 },
        {
          rotateY: 180,
          scale: 1.08,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: stage,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );

      // Light sweep sheen
      if (sheenRef.current) {
        gsap.fromTo(
          sheenRef.current,
          { x: '-100%' },
          {
            x: '200%',
            ease: 'none',
            scrollTrigger: {
              trigger: stage,
              start: 'top center',
              end: 'bottom center',
              scrub: 0.8,
            },
          }
        );
      }

      // Pillars fade up
      gsap.fromTo(
        '.rotation-pillar-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.rotation-pillars-row',
            start: 'top 80%',
          },
        }
      );
    }, stageRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={stageRef} className={`product-rotation-stage ${currentFlavorKey}`} aria-label="Crafted with Character Rotation">
      <div className="container rotation-container">
        <div className="badge-pill">
          <span className="badge-dot" />
          <span>VESSEL SCULPTING</span>
        </div>

        <h2 className="rotation-title font-editorial">
          CRAFTED WITH CHARACTER
        </h2>

        <p className="rotation-lead">
          The bottle slowly rotates as you explore the tactile architecture of our solid crystal glass.
        </p>

        {/* Center Rotating 3D Bottle Showcase */}
        <div className="rotation-bottle-stage">
          <div className="rotation-ambient-glow" />
          <div ref={bottleRef} className="rotation-bottle-wrap">
            <img
              src={currentProduct.image}
              alt={currentProduct.name}
              className="rotation-bottle-img"
              loading="lazy"
            />
            <div ref={sheenRef} className="rotation-light-sheen" />
          </div>
        </div>

        {/* 3 Pillars: DETAIL, CHARACTER, PRESENCE */}
        <div className="rotation-pillars-row">
          {pillars.map((item, idx) => (
            <div
              key={item.label}
              className="rotation-pillar-card glass-panel-interactive"
              onMouseEnter={() => soundEngine.playClick(700 + idx * 100)}
              data-cursor-text={item.label}
            >
              <span className="pillar-label-num">0{idx + 1}</span>
              <h3 className="pillar-label-title font-editorial">{item.label}</h3>
              <p className="pillar-label-sub">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
