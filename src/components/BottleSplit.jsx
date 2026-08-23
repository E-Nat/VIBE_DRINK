import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useFlavor } from '../context/FlavorContext';
import { soundEngine } from '../utils/audio';
import './BottleSplit.css';

gsap.registerPlugin(ScrollTrigger);

export const BottleSplit = ({ onSelectFlavor }) => {
  const { currentFlavorKey, setFlavor } = useFlavor();
  const [hoveredSide, setHoveredSide] = useState(null);
  const containerRef = useRef(null);
  const leftBottleRef = useRef(null);
  const rightBottleRef = useRef(null);
  const centerLogoRef = useRef(null);
  const centerSubRef = useRef(null);
  const lightDriftRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const leftB = leftBottleRef.current;
      const rightB = rightBottleRef.current;
      const centerLogo = centerLogoRef.current;
      const centerSub = centerSubRef.current;
      if (!container || !leftB || !rightB) return;

      // 1. Entrance timeline on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'power3.out' },
      });

      // Black Tea bottle fades & scales into place
      tl.fromTo(
        leftB,
        { opacity: 0, scale: 0.93, y: 35 },
        { opacity: 1, scale: 1.0, y: 0, duration: 1.2 }
      )
        // Exotic Lychee bottle fades & scales into place with slight offset
        .fromTo(
          rightB,
          { opacity: 0, scale: 0.93, y: 35 },
          { opacity: 1, scale: 1.0, y: 0, duration: 1.2 },
          '-=0.95'
        )
        // Center VIBE mark appears slightly after the bottles
        .fromTo(
          centerLogo,
          { opacity: 0, scale: 0.88, filter: 'blur(6px)' },
          { opacity: 1, scale: 1.0, filter: 'blur(0px)', duration: 1.0, ease: 'power2.out' },
          '-=0.7'
        )
        // "THE DUALITY" reveals last
        .fromTo(
          centerSub,
          { opacity: 0, y: 12, filter: 'blur(4px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' },
          '-=0.5'
        );

      // 2. Background light slowly drifts between the two bottles
      if (lightDriftRef.current) {
        gsap.to(lightDriftRef.current, {
          x: 120,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // 3. Subtle desktop mouse parallax (calm and non-aggressive)
      const isTouch = window.innerWidth < 1024;
      if (!isTouch) {
        const handleMouseMove = (e) => {
          const rect = container.getBoundingClientRect();
          const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

          gsap.to(leftB, {
            x: normX * -14,
            y: normY * -8,
            duration: 0.6,
            ease: 'power2.out',
          });

          gsap.to(rightB, {
            x: normX * 14,
            y: normY * 8,
            duration: 0.6,
            ease: 'power2.out',
          });
        };

        const handleMouseLeave = () => {
          gsap.to([leftB, rightB], {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          });
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSelect = (flavorKey) => {
    soundEngine.playClick(flavorKey === 'blackTea' ? 600 : 850);
    if (onSelectFlavor) {
      onSelectFlavor(flavorKey);
    } else {
      setFlavor(flavorKey);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`bottle-split-root ${currentFlavorKey}`}
      aria-label="The Duality: Black Tea and Exotic Lychee"
    >
      {/* Background Soft Moving Light Drift */}
      <div ref={lightDriftRef} className="duality-light-drift" aria-hidden="true" />

      {/* Background Geometric Lines */}
      <div className="duality-geom-lines" aria-hidden="true">
        <svg viewBox="0 0 1200 600" fill="none" className="duality-lines-svg">
          <circle cx="600" cy="300" r="240" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.07" strokeDasharray="6 8" />
          <circle cx="600" cy="300" r="140" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.05" />
          <line x1="200" y1="300" x2="1000" y2="300" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.06" />
        </svg>
      </div>

      {/* Left Column: Black Tea */}
      <div
        className={`split-side split-left ${hoveredSide === 'right' ? 'dimmed' : ''} ${hoveredSide === 'left' ? 'focused' : ''}`}
        onMouseEnter={() => {
          setHoveredSide('left');
          soundEngine.playClick(600);
        }}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={() => handleSelect('blackTea')}
        data-cursor-text="BLACK TEA"
      >
        <div className="split-ambient-glow bt-split-glow" />
        <div ref={leftBottleRef} className="split-bottle-stage">
          <img
            src="/vibe-black-tea.png"
            alt="VIBE Black Tea bottle"
            className="split-bottle-img"
            loading="lazy"
          />
        </div>
        <div className="split-side-info">
          <span className="split-flavor-name font-editorial">BLACK TEA</span>
          <span className="split-flavor-tagline">Bold • Rich • Warm</span>
        </div>
      </div>

      {/* Center Brand Monogram */}
      <div className="split-center-divider">
        <div ref={centerLogoRef} className="split-vibe-logo">
          <span className="split-monogram-circle">V</span>
          <h2 className="split-center-title font-editorial">VIBE</h2>
        </div>
        <span ref={centerSubRef} className="split-center-sub font-nav">THE DUALITY</span>
      </div>

      {/* Right Column: Exotic Lychee */}
      <div
        className={`split-side split-right ${hoveredSide === 'left' ? 'dimmed' : ''} ${hoveredSide === 'right' ? 'focused' : ''}`}
        onMouseEnter={() => {
          setHoveredSide('right');
          soundEngine.playClick(850);
        }}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={() => handleSelect('exoticLychee')}
        data-cursor-text="EXOTIC LYCHEE"
      >
        <div className="split-ambient-glow el-split-glow" />
        <div ref={rightBottleRef} className="split-bottle-stage">
          <img
            src="/vibe-exotic-lychee.png"
            alt="VIBE Exotic Lychee bottle"
            className="split-bottle-img"
            loading="lazy"
          />
        </div>
        <div className="split-side-info">
          <span className="split-flavor-name font-editorial">EXOTIC LYCHEE</span>
          <span className="split-flavor-tagline">Bright • Smooth • Floral</span>
        </div>
      </div>
    </div>
  );
};
