import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useFlavor } from '../context/FlavorContext';
import { soundEngine } from '../utils/audio';
import { Sparkles, Compass } from 'lucide-react';
import './BrandPhilosophy.css';

gsap.registerPlugin(ScrollTrigger);

export const BrandPhilosophy = () => {
  const { currentFlavorKey } = useFlavor();
  const stageRef = useRef(null);

  const words = [
    { word: 'NIGHT', anim: 'fade', hint: 'The nocturnal sanctuary' },
    { word: 'ENERGY', anim: 'scale', hint: 'Electric conversation & presence' },
    { word: 'STYLE', anim: 'slide', hint: 'Unapologetic character' },
    { word: 'MOMENTS', anim: 'rotate', hint: 'Shared toasts that endure' },
    { word: 'PEOPLE', anim: 'blur', hint: 'Those who stand apart' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. NIGHT -> fade
      gsap.fromTo(
        '.ph-word-fade',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.ph-word-fade', start: 'top 85%' },
        }
      );

      // 2. ENERGY -> scale
      gsap.fromTo(
        '.ph-word-scale',
        { scale: 0.6, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'back.out(1.7)',
          scrollTrigger: { trigger: '.ph-word-scale', start: 'top 85%' },
        }
      );

      // 3. STYLE -> slide
      gsap.fromTo(
        '.ph-word-slide',
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.ph-word-slide', start: 'top 85%' },
        }
      );

      // 4. MOMENTS -> rotate
      gsap.fromTo(
        '.ph-word-rotate',
        { rotateZ: -12, scale: 0.9, opacity: 0 },
        {
          rotateZ: 0,
          scale: 1,
          opacity: 1,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.ph-word-rotate', start: 'top 85%' },
        }
      );

      // 5. PEOPLE -> blur
      gsap.fromTo(
        '.ph-word-blur',
        { filter: 'blur(20px)', opacity: 0 },
        {
          filter: 'blur(0px)',
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.ph-word-blur', start: 'top 85%' },
        }
      );
    }, stageRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={stageRef} className={`brand-philosophy-stage ${currentFlavorKey}`} aria-label="Brand Philosophy Pillars">
      <div className="container philosophy-container">
        <div className="badge-pill">
          <span className="badge-dot" />
          <span>PHILOSOPHY DECONSTRUCTED</span>
        </div>

        <h2 className="philosophy-main-title font-editorial">
          WHAT IS VIBE?
        </h2>

        <div className="philosophy-words-grid">
          {words.map((item, idx) => (
            <div
              key={item.word}
              className={`philosophy-word-card glass-panel-interactive ph-word-${item.anim}`}
              onMouseEnter={() => soundEngine.playClick(600 + idx * 80)}
              data-cursor-text={item.word}
            >
              <div className="card-top-index font-nav">0{idx + 1}</div>
              <h3 className="philosophy-word font-editorial">{item.word}</h3>
              <p className="philosophy-hint">{item.hint}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
