import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useFlavor } from '../context/FlavorContext';
import { soundEngine } from '../utils/audio';
import { products } from '../data/products';
import { Button } from './Button';
import { Sparkles, Sliders, ArrowLeftRight, Check } from 'lucide-react';
import './DualityMorphStage.css';

export const DualityMorphStage = () => {
  const { currentFlavorKey, setFlavor, addToCart } = useFlavor();
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const lastSideRef = useRef(currentFlavorKey === 'blackTea' ? 'left' : 'right');

  const handlePointerDown = (e) => {
    setIsDragging(true);
    soundEngine.playClick(800);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handlePointerMove = (e) => {
      if (!isDragging) return;
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      if (clientX === undefined) return;

      const offsetX = clientX - rect.left;
      const pct = Math.max(5, Math.min(95, (offsetX / rect.width) * 100));
      setSliderPos(pct);

      // Determine active side
      const side = pct > 50 ? 'left' : 'right';
      if (side !== lastSideRef.current) {
        lastSideRef.current = side;
        if (side === 'left') {
          setFlavor('blackTea');
        } else {
          setFlavor('exoticLychee');
        }
      }
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      window.addEventListener('touchmove', handlePointerMove);
      window.addEventListener('touchend', handlePointerUp);
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [isDragging, setFlavor]);

  const snapTo = (flavor) => {
    soundEngine.playClick(900);
    if (flavor === 'blackTea') {
      setSliderPos(80);
      setFlavor('blackTea');
    } else {
      setSliderPos(20);
      setFlavor('exoticLychee');
    }
  };

  return (
    <div
      ref={containerRef}
      className={`duality-morph-root ${isDragging ? 'dragging' : ''}`}
      aria-label="Interactive Dual Expression Morph Stage"
    >
      {/* Background Abstract Geometric Crystal & Fluid Shapes Layer */}
      <div className="duality-shapes-layer" aria-hidden="true">
        {/* Left Side: Amber Geometric Facets */}
        <div className="abstract-morph-cluster cluster-left">
          <div className="abstract-facet facet-1" />
          <div className="abstract-facet facet-2" />
          <div className="abstract-crystal-ring ring-amber" />
        </div>

        {/* Right Side: Organic Rose Petals & Liquid Drops */}
        <div className="abstract-morph-cluster cluster-right">
          <div className="abstract-petal petal-1" />
          <div className="abstract-petal petal-2" />
          <div className="abstract-crystal-ring ring-rose" />
        </div>
      </div>

      {/* Duality Stage Split Canvas */}
      <div className="duality-split-canvas">
        {/* Left Half: Black Tea Domain */}
        <div
          className="duality-half half-black-tea"
          style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
        >
          <div className="duality-inner-content content-left">
            <div className="duality-text-block">
              <span className="duality-badge bt-badge">EXPRESSION 01</span>
              <h3 className="duality-name font-editorial">VIBE BLACK TEA</h3>
              <p className="duality-desc">
                Slow-extracted single-estate Ceylon botanicals, toasted malt, dark caramel & charred oak.
              </p>
              <div className="duality-note-pills">
                <span className="pill bt">Ceylon Black Tea</span>
                <span className="pill bt">Smoked Honey</span>
                <span className="pill bt">Charred Oak</span>
              </div>
              <div className="duality-action-row">
                <button
                  type="button"
                  className="duality-quick-btn bt-btn"
                  onClick={() => snapTo('blackTea')}
                >
                  <Check size={14} />
                  <span>Select Black Tea</span>
                </button>
                <button
                  type="button"
                  className="duality-reserve-btn"
                  onClick={() => addToCart('blackTea')}
                >
                  Reserve Allocation ($145)
                </button>
              </div>
            </div>

            <div className="duality-bottle-stage">
              <img
                src="/vibe-black-tea.png"
                alt="VIBE Black Tea"
                className="duality-bottle-img bottle-bt"
                draggable="false"
              />
              <div className="duality-halo bt-halo" />
            </div>
          </div>
        </div>

        {/* Right Half: Exotic Lychee Domain */}
        <div
          className="duality-half half-exotic-lychee"
          style={{ clipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)` }}
        >
          <div className="duality-inner-content content-right">
            <div className="duality-bottle-stage">
              <img
                src="/vibe-exotic-lychee.png"
                alt="VIBE Exotic Lychee"
                className="duality-bottle-img bottle-el"
                draggable="false"
              />
              <div className="duality-halo el-halo" />
            </div>

            <div className="duality-text-block">
              <span className="duality-badge el-badge">EXPRESSION 02</span>
              <h3 className="duality-name font-editorial">VIBE EXOTIC LYCHEE</h3>
              <p className="duality-desc">
                Luminous crisp lychee nectar, velvet damask rose petals, mineral clarity & citrus blossom.
              </p>
              <div className="duality-note-pills">
                <span className="pill el">Exotic Lychee Nectar</span>
                <span className="pill el">Burgundy Rose</span>
                <span className="pill el">Citrus Blossom</span>
              </div>
              <div className="duality-action-row">
                <button
                  type="button"
                  className="duality-quick-btn el-btn"
                  onClick={() => snapTo('exoticLychee')}
                >
                  <Check size={14} />
                  <span>Select Exotic Lychee</span>
                </button>
                <button
                  type="button"
                  className="duality-reserve-btn"
                  onClick={() => addToCart('exoticLychee')}
                >
                  Reserve Allocation ($145)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Draggable Divider Handle */}
      <div
        className="duality-divider-handle"
        style={{ left: `${sliderPos}%` }}
        onPointerDown={handlePointerDown}
        data-cursor-text="DRAG MORPH"
      >
        <div className="handle-line" />
        <div className="handle-knob glass-panel">
          <ArrowLeftRight size={16} className="handle-icon" />
          <span className="handle-label font-nav">MORPH</span>
        </div>
        <div className="handle-line" />
      </div>

      {/* Subtext Prompt */}
      <div className="duality-bottom-hint">
        <span>DRAG SLIDER TO MORPH BETWEEN THE TWO CHARACTERS</span>
      </div>
    </div>
  );
};
