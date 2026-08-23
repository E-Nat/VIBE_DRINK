import React, { useState } from 'react';
import { useFlavor } from '../context/FlavorContext';
import { soundEngine } from '../utils/audio';
import { Bottle } from './Bottle';
import { Sparkles, Check, ShieldCheck, Gift, Wine, ArrowRight } from 'lucide-react';
import './MonogramEngraver.css';

export const MonogramEngraver = () => {
  const {
    currentFlavorKey,
    currentProduct,
    setFlavor,
    addToCart,
    engravingText,
    setEngravingText,
  } = useFlavor();

  const [hasGiftBox, setHasGiftBox] = useState(true);
  const [includeGlassware, setIncludeGlassware] = useState(true);
  const [allocationCount, setAllocationCount] = useState(1);

  const basePrice = 145;
  const glassPrice = includeGlassware ? 65 : 0;
  const unitPrice = basePrice + glassPrice;
  const totalPrice = unitPrice * allocationCount;

  const handleEngravingChange = (e) => {
    const val = e.target.value.toUpperCase().slice(0, 18);
    setEngravingText(val);
    soundEngine.playClick(900);
  };

  const handleReserve = () => {
    soundEngine.playChime(784, 'sine', 1.5);
    addToCart(currentFlavorKey, engravingText || 'VIBE NOCTURNE', hasGiftBox);
  };

  return (
    <div className={`monogram-engraver-root glass-panel ${currentFlavorKey}`} aria-label="Bespoke Allocation & Engraving Studio">
      <div className="engraver-ambient-light" />

      <div className="engraver-grid">
        {/* Left: Live Interactive Bottle with Live Engraved Label */}
        <div className="engraver-bottle-column">
          <div className="engraver-bottle-stage">
            <Bottle
              size="showcase"
              interactive={true}
              showEngraving={true}
            />

            <div className="engraver-bottle-spec glass-panel">
              <span className="spec-item"><strong>Batch:</strong> Single Cask #04</span>
              <span className="spec-dot">•</span>
              <span className="spec-item"><strong>Strength:</strong> 40% ABV</span>
              <span className="spec-dot">•</span>
              <span className="spec-item"><strong>Bottle:</strong> 70cl</span>
            </div>
          </div>
        </div>

        {/* Right: Bespoke Customization Suite */}
        <div className="engraver-controls-column">
          <div className="badge-pill">
            <span className="badge-dot" />
            <span>BESPOKE ATELIER</span>
          </div>

          <h2 className="engraver-title font-editorial">
            CUSTOM ALLOCATION
          </h2>

          <p className="engraver-lead">
            Personalize your limited single-batch bottle with precision gold-foil monogram engraving and collector packaging.
          </p>

          {/* 1. Expression Selector */}
          <div className="engraver-field-group">
            <label className="field-label">1. CHOOSE EXPRESSION</label>
            <div className="expression-select-row">
              <button
                type="button"
                className={`expression-btn bt ${currentFlavorKey === 'blackTea' ? 'active' : ''}`}
                onClick={() => {
                  setFlavor('blackTea');
                  soundEngine.playClick(700);
                }}
              >
                <span className="expr-dot bt" />
                <span>VIBE Black Tea ($145)</span>
              </button>

              <button
                type="button"
                className={`expression-btn el ${currentFlavorKey === 'exoticLychee' ? 'active' : ''}`}
                onClick={() => {
                  setFlavor('exoticLychee');
                  soundEngine.playClick(900);
                }}
              >
                <span className="expr-dot el" />
                <span>VIBE Exotic Lychee ($145)</span>
              </button>
            </div>
          </div>

          {/* 2. Precision Monogram Engraving Input */}
          <div className="engraver-field-group">
            <div className="field-header-row">
              <label className="field-label" htmlFor="engraving-input">
                2. BOTTLE MONOGRAM ENGRAVING (OPTIONAL)
              </label>
              <span className="char-count">{engravingText.length}/18</span>
            </div>
            <div className="engraving-input-wrap">
              <input
                id="engraving-input"
                type="text"
                value={engravingText}
                onChange={handleEngravingChange}
                placeholder="E.G. YOUR NAME OR INITIALS"
                className="engraving-text-input font-editorial"
                maxLength={18}
              />
              <Sparkles size={16} className="engraving-input-icon" />
            </div>
            <span className="field-hint">
              Engraved in high-luster metallic foil onto the shoulder label.
            </span>
          </div>

          {/* 3. Bespoke Inclusions */}
          <div className="engraver-field-group">
            <label className="field-label">3. ATELIER PRESENTATION INCLUSIONS</label>
            <div className="options-stack">
              {/* Gift Box Option */}
              <div
                className={`option-card ${hasGiftBox ? 'selected' : ''}`}
                onClick={() => {
                  setHasGiftBox(!hasGiftBox);
                  soundEngine.playClick(650);
                }}
              >
                <div className="option-left">
                  <Gift size={18} className="option-icon" />
                  <div>
                    <h5 className="option-title">Collector Velvet Presentation Box</h5>
                    <p className="option-sub">Midnight black rigid box, velvet interior & wax seal.</p>
                  </div>
                </div>
                <div className="option-right">
                  <span className="option-price">Complimentary</span>
                  <div className={`checkbox-pill ${hasGiftBox ? 'checked' : ''}`}>
                    {hasGiftBox && <Check size={12} />}
                  </div>
                </div>
              </div>

              {/* Crystal Glassware Option */}
              <div
                className={`option-card ${includeGlassware ? 'selected' : ''}`}
                onClick={() => {
                  setIncludeGlassware(!includeGlassware);
                  soundEngine.playClick(750);
                }}
              >
                <div className="option-left">
                  <Wine size={18} className="option-icon" />
                  <div>
                    <h5 className="option-title">Pair of Hand-Blown Heavy Crystal Glasses</h5>
                    <p className="option-sub">
                      {currentFlavorKey === 'blackTea' ? 'Sculpted Crystal Tumblers' : 'Fluted Crystal Coupes'}
                    </p>
                  </div>
                </div>
                <div className="option-right">
                  <span className="option-price">+$65</span>
                  <div className={`checkbox-pill ${includeGlassware ? 'checked' : ''}`}>
                    {includeGlassware && <Check size={12} />}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Allocation Quantity & Reserve CTA */}
          <div className="engraver-checkout-row">
            <div className="qty-picker">
              <button
                type="button"
                className="qty-btn"
                onClick={() => {
                  if (allocationCount > 1) {
                    setAllocationCount(allocationCount - 1);
                    soundEngine.playClick(500);
                  }
                }}
              >
                -
              </button>
              <span className="qty-number font-nav">{allocationCount}</span>
              <button
                type="button"
                className="qty-btn"
                onClick={() => {
                  if (allocationCount < 6) {
                    setAllocationCount(allocationCount + 1);
                    soundEngine.playClick(700);
                  }
                }}
              >
                +
              </button>
            </div>

            <div className="total-price-wrap">
              <span className="total-label">TOTAL ALLOCATION</span>
              <span className="total-amount font-editorial">${totalPrice} USD</span>
            </div>

            <button
              type="button"
              className="engraver-reserve-cta"
              onClick={handleReserve}
              data-cursor-text="RESERVE"
            >
              <span>Reserve Custom Bottle</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="engraver-guarantee-row">
            <ShieldCheck size={15} className="guar-icon" />
            <span>Complimentary global courier shipping • Verified authenticity certificate included</span>
          </div>
        </div>
      </div>
    </div>
  );
};
