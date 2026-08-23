import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import { products } from '../data/products';
import { useScrollLock } from '../hooks/useScrollLock';
import './FullscreenFlavorModal.css';

export const FullscreenFlavorModal = ({ isOpen, onClose, initialFlavor = 'blackTea' }) => {
  const [activeFlavor, setActiveFlavor] = React.useState(initialFlavor);
  const modalRef = useRef(null);
  const bottleRef = useRef(null);
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);
  const tagsRef = useRef(null);
  const descRef = useRef(null);

  useScrollLock(isOpen);

  const product = products[activeFlavor];

  useEffect(() => {
    if (initialFlavor) {
      setActiveFlavor(initialFlavor);
    }
  }, [initialFlavor]);

  // Entrance and switch animation
  useEffect(() => {
    if (!isOpen) return;

    const modal = modalRef.current;
    const bottle = bottleRef.current;
    const t1 = titleLine1Ref.current;
    const t2 = titleLine2Ref.current;
    const tags = tagsRef.current;
    const desc = descRef.current;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.4 })
      .fromTo(
        bottle,
        { scale: 0.8, y: 60, opacity: 0, rotateY: 30 },
        { scale: 1, y: 0, opacity: 1, rotateY: 0, duration: 0.9, ease: 'power3.out' },
        '-=0.2'
      )
      .fromTo(
        [t1, t2],
        { y: 60, opacity: 0, skewY: 4 },
        { y: 0, opacity: 1, skewY: 0, duration: 0.7, stagger: 0.15 },
        '-=0.6'
      )
      .fromTo(
        tags,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.4'
      )
      .fromTo(
        desc,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.3'
      );

    return () => {
      tl.kill();
    };
  }, [isOpen, activeFlavor]);

  if (!isOpen) return null;

  const isBlackTea = activeFlavor === 'blackTea';

  const handleToggle = () => {
    setActiveFlavor(isBlackTea ? 'exoticLychee' : 'blackTea');
  };

  return (
    <div
      ref={modalRef}
      className={`fullscreen-flavor-stage ${activeFlavor}`}
      role="dialog"
      aria-modal="true"
    >
      {/* Background ambient lighting */}
      <div className={`fs-ambient-halo ${activeFlavor}`} />

      {/* Top Bar Actions */}
      <div className="fs-top-bar">
        <div className="fs-badge">
          <Sparkles size={14} className="fs-badge-icon" />
          <span>IMMERSIVE TASTING EXPERIENCE</span>
        </div>

        <div className="fs-top-controls">
          <button
            type="button"
            className="fs-switch-pill"
            onClick={handleToggle}
            data-cursor-text="SWITCH"
          >
            <RotateCcw size={14} />
            <span>Switch to {isBlackTea ? 'Exotic Lychee' : 'Black Tea'}</span>
          </button>

          <button
            type="button"
            className="fs-close-btn"
            onClick={onClose}
            aria-label="Close modal"
            data-cursor-text="CLOSE"
          >
            <X size={22} />
          </button>
        </div>
      </div>

      {/* Main Center Stage */}
      <div className="fs-content-container">
        {/* Left Side: Editorial Typography */}
        <div className="fs-left-typography">
          <span className="fs-edition-tag font-nav">SIGNATURE EXPRESSION</span>

          <div className="fs-title-wrapper">
            <h2 ref={titleLine1Ref} className="fs-title-line font-editorial">
              {isBlackTea ? 'BLACK' : 'EXOTIC'}
            </h2>
            <h2 ref={titleLine2Ref} className="fs-title-line fs-title-accent font-display">
              {isBlackTea ? 'TEA' : 'LYCHEE'}
            </h2>
          </div>

          {/* Three Key Pillar Words */}
          <div ref={tagsRef} className="fs-pillar-tags">
            {isBlackTea ? (
              <>
                <span className="fs-pillar-word">BOLD</span>
                <span className="fs-dot">•</span>
                <span className="fs-pillar-word">RICH</span>
                <span className="fs-dot">•</span>
                <span className="fs-pillar-word">WARM</span>
              </>
            ) : (
              <>
                <span className="fs-pillar-word">BRIGHT</span>
                <span className="fs-dot">•</span>
                <span className="fs-pillar-word">SMOOTH</span>
                <span className="fs-dot">•</span>
                <span className="fs-pillar-word">FLORAL</span>
              </>
            )}
          </div>

          <p ref={descRef} className="fs-description font-body">
            {product.description}
          </p>

          <div className="fs-meta-pill-group">
            <div className="fs-meta-chip">
              <span className="fs-chip-label">STRENGTH</span>
              <span className="fs-chip-val">{product.abv}</span>
            </div>
            <div className="fs-meta-chip">
              <span className="fs-chip-label">SERVE</span>
              <span className="fs-chip-val">{product.serveRitual.name}</span>
            </div>
          </div>
        </div>

        {/* Center: Hero Bottle Showcase */}
        <div className="fs-center-bottle">
          <div ref={bottleRef} className="fs-bottle-wrap">
            <img
              src={product.image}
              alt={product.name}
              className="fs-bottle-render"
              loading="eager"
            />
            <div className="fs-bottle-floor-glow" />
          </div>
        </div>

        {/* Right Side: Key Notes List */}
        <div className="fs-right-notes">
          <span className="fs-notes-label font-nav">TASTING MATRIX</span>
          <div className="fs-notes-grid">
            {product.tastingNotes.map((note, i) => (
              <div key={note} className="fs-note-card glass-panel">
                <span className="fs-note-index">0{i + 1}</span>
                <span className="fs-note-title">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
