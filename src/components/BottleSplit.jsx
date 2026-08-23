import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Button } from './Button';
import './BottleSplit.css';

export const BottleSplit = ({ onSelectFlavor }) => {
  const [hoveredSide, setHoveredSide] = useState(null);
  const containerRef = useRef(null);
  const leftBottleRef = useRef(null);
  const rightBottleRef = useRef(null);

  useEffect(() => {
    const isTouch = window.innerWidth < 1024;
    if (isTouch) return;

    const container = containerRef.current;
    const leftB = leftBottleRef.current;
    const rightB = rightBottleRef.current;
    if (!container || !leftB || !rightB) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      // Opposing 3D parallax reaction
      gsap.to(leftB, {
        x: normX * -25,
        y: normY * -15,
        rotateY: normX * -12,
        duration: 0.5,
        ease: 'power2.out',
      });

      gsap.to(rightB, {
        x: normX * 25,
        y: normY * 15,
        rotateY: normX * 12,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to([leftB, rightB], {
        x: 0,
        y: 0,
        rotateY: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="bottle-split-root" aria-label="Dual Bottle Interactive Showcase">
      {/* Left Bottle Column: Black Tea */}
      <div
        className={`split-side split-left ${hoveredSide === 'right' ? 'dimmed' : ''} ${hoveredSide === 'left' ? 'focused' : ''}`}
        onMouseEnter={() => setHoveredSide('left')}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={() => onSelectFlavor && onSelectFlavor('blackTea')}
        data-cursor-text="BLACK TEA"
      >
        <div className="split-ambient-glow bt-split-glow" />
        <div ref={leftBottleRef} className="split-bottle-stage">
          <img
            src="/vibe-black-tea.png"
            alt="VIBE Black Tea"
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
        <div className="split-vibe-logo">
          <span className="split-monogram-circle">V</span>
          <h2 className="split-center-title font-editorial">VIBE</h2>
          <span className="split-center-sub font-nav">THE DUALITY</span>
        </div>
      </div>

      {/* Right Bottle Column: Exotic Lychee */}
      <div
        className={`split-side split-right ${hoveredSide === 'left' ? 'dimmed' : ''} ${hoveredSide === 'right' ? 'focused' : ''}`}
        onMouseEnter={() => setHoveredSide('right')}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={() => onSelectFlavor && onSelectFlavor('exoticLychee')}
        data-cursor-text="LYCHEE"
      >
        <div className="split-ambient-glow el-split-glow" />
        <div ref={rightBottleRef} className="split-bottle-stage">
          <img
            src="/vibe-exotic-lychee.png"
            alt="VIBE Exotic Lychee"
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
