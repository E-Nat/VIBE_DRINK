import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useFlavor } from '../context/FlavorContext';
import { soundEngine } from '../utils/audio';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import './HorizontalScrollSection.css';

gsap.registerPlugin(ScrollTrigger);

export const HorizontalScrollSection = () => {
  const { currentFlavorKey, setFlavor, addToCart } = useFlavor();
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  const panels = [
    {
      id: 'bt',
      title: 'BLACK TEA',
      category: '01 • THE EXPRESSION',
      tagline: 'Bold • Rich • Warm',
      desc: 'Single-estate tea leaves slow cold-macerated and layered with charred French oak.',
      image: '/vibe-black-tea.png',
      flavorKey: 'blackTea',
    },
    {
      id: 'el',
      title: 'EXOTIC LYCHEE',
      category: '02 • THE EXPRESSION',
      tagline: 'Bright • Smooth • Floral',
      desc: 'Sun-ripened royal lychee nectar infused with damask rose petals and white citrus mist.',
      image: '/vibe-exotic-lychee.png',
      flavorKey: 'exoticLychee',
    },
    {
      id: 'night',
      title: 'THE NIGHT',
      category: '03 • THE ATMOSPHERE',
      tagline: 'The Nocturnal Sanctuary',
      desc: 'Conceived to command the room and elevate the quiet hours into an art form.',
      image: '/vibe-night-lifestyle.jpg',
      flavorKey: 'blackTea',
    },
    {
      id: 'moment',
      title: 'THE MOMENT',
      category: '04 • THE COALESCENCE',
      tagline: 'Unapologetic Presence',
      desc: 'Shared toasts that linger long after the glass is empty. Crafted for lasting memories.',
      image: '/vibe-botanical-craft.jpg',
      flavorKey: 'exoticLychee',
    },
    {
      id: 'exp',
      title: 'THE EXPERIENCE',
      category: '05 • THE RITUAL',
      tagline: 'Hand-Carved Crystal Sphere',
      desc: 'Poured over heavy sculpted ice to unlock the full evolution of botanical aromas.',
      image: '/vibe-black-tea.png',
      flavorKey: 'blackTea',
    },
  ];

  // Desktop Pinned GSAP ScrollTrigger
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const totalScrollWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalScrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${totalScrollWidth + 300}`,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMobileScroll = (e) => {
    const el = e.target;
    const itemWidth = el.offsetWidth * 0.85;
    const index = Math.round(el.scrollLeft / itemWidth);
    if (index !== activeMobileIndex && index >= 0 && index < panels.length) {
      setActiveMobileIndex(index);
    }
  };

  const scrollToPanel = (idx) => {
    if (trackRef.current) {
      const itemWidth = trackRef.current.offsetWidth * 0.85;
      trackRef.current.scrollTo({
        left: idx * itemWidth,
        behavior: 'smooth',
      });
      setActiveMobileIndex(idx);
      soundEngine.playClick(700);
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`horizontal-scroll-stage ${currentFlavorKey}`}
      aria-label="Find Your Vibe Horizontal Experience"
    >
      <div className="horizontal-header-overlay">
        <div className="badge-pill">
          <span className="badge-dot" />
          <span>EXPEDITION</span>
        </div>
        <h2 className="horizontal-title font-editorial">FIND YOUR VIBE</h2>
        <span className="horizontal-indicator-hint font-nav">
          SWIPE OR SCROLL TO EXPLORE →
        </span>
      </div>

      <div
        ref={trackRef}
        className="horizontal-track"
        onScroll={handleMobileScroll}
      >
        {panels.map((panel, idx) => (
          <div
            key={panel.id}
            className="horizontal-panel-item"
            data-cursor-text={panel.title}
          >
            <div className="horizontal-card glass-panel">
              <div className="panel-category-row">
                <span className="panel-cat-text">{panel.category}</span>
                <span className="panel-index font-editorial">0{idx + 1}</span>
              </div>

              <h3 className="panel-title font-editorial">{panel.title}</h3>
              <p className="panel-tagline font-display">{panel.tagline}</p>
              <p className="panel-desc">{panel.desc}</p>

              <div className="panel-image-stage">
                <img
                  src={panel.image}
                  alt={panel.title}
                  className="panel-img"
                  loading="lazy"
                />
                <div className="panel-ambient-glow" />
              </div>

              <div className="panel-action-row">
                <button
                  type="button"
                  className="panel-select-btn"
                  onClick={() => {
                    setFlavor(panel.flavorKey);
                    soundEngine.playClick(800);
                  }}
                >
                  <span>Select Atmosphere</span>
                </button>
                <button
                  type="button"
                  className="panel-reserve-btn"
                  onClick={() => addToCart(panel.flavorKey)}
                >
                  <span>Reserve ($145)</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Touch Carousel Dots */}
      <div className="mobile-carousel-dots" aria-hidden="true">
        {panels.map((p, idx) => (
          <button
            key={p.id}
            type="button"
            className={`carousel-dot ${idx === activeMobileIndex ? 'active' : ''}`}
            onClick={() => scrollToPanel(idx)}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
