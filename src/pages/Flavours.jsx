import React, { useState } from 'react';
import { SectionTitle } from '../components/SectionTitle';
import { Button } from '../components/Button';
import { Bottle } from '../components/Bottle';
import { KineticMarquee } from '../components/KineticMarquee';
import { useFlavor } from '../context/FlavorContext';
import { soundEngine } from '../utils/audio';
import { products } from '../data/products';
import { Sparkles, GlassWater, Droplets, Wind, Layers, Check, ArrowRight } from 'lucide-react';
import './Flavours.css';

export const Flavours = () => {
  const { currentFlavorKey, setFlavor, addToCart } = useFlavor();
  const [activeTab, setActiveTab] = useState(currentFlavorKey);

  const handleTabChange = (key) => {
    setActiveTab(key);
    setFlavor(key);
    soundEngine.playClick(850);
  };

  const product = products[activeTab];

  return (
    <div className="flavours-page-root">
      {/* 1. Page Header */}
      <section className="flavours-hero-section section">
        <div className="container flavours-hero-container">
          <div className="badge-pill">
            <span className="badge-dot" />
            <span>THE PORTFOLIO</span>
          </div>

          <h1 className="flavours-hero-title font-editorial">
            DISCOVER YOUR VIBE
          </h1>

          <p className="flavours-hero-subtitle font-display">
            Two Distinct Characters
          </p>

          <p className="flavours-hero-lead">
            Explore the rich depth of single-batch Black Tea or the vibrant floral radiance of Exotic Lychee.
          </p>

          {/* Luxury Tab Switcher */}
          <div className="flavour-switcher-tabs glass-panel" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'blackTea'}
              className={`flavour-tab-btn ${activeTab === 'blackTea' ? 'active bt' : ''}`}
              onClick={() => handleTabChange('blackTea')}
              data-cursor-text="BLACK TEA"
            >
              <span className="flavour-tab-dot bt-dot" />
              <span>VIBE Black Tea</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'exoticLychee'}
              className={`flavour-tab-btn ${activeTab === 'exoticLychee' ? 'active el' : ''}`}
              onClick={() => handleTabChange('exoticLychee')}
              data-cursor-text="LYCHEE"
            >
              <span className="flavour-tab-dot el-dot" />
              <span>VIBE Exotic Lychee</span>
            </button>
          </div>
        </div>
      </section>

      {/* Kinetic Marquee Interlude */}
      <KineticMarquee
        text1="SINGLE-ESTATE HARVEST • SLOW DISTILLATION • NOCTURNAL ESSENCE • "
        text2="UNCOMPROMISING CHARACTER • PURE BOTANICAL DEPTH • 70CL LUXURY • "
        tilt={-1}
      />

      {/* 2. Active Flavor Showcase */}
      <section className="flavour-details-section section" key={activeTab}>
        <div className="container flavour-details-grid">
          {/* Bottle Column */}
          <div className="flavour-bottle-column">
            <div className="flavour-bottle-showcase glass-panel">
              <Bottle
                size="showcase"
                customImage={product.image}
                customAlt={product.name}
                interactive={true}
              />
              <div className="flavour-badge-overlay">
                <span className="flavour-overlay-text">{product.abv}</span>
                <span className="flavour-overlay-vol">{product.volume}</span>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="flavour-info-column">
            <div className="flavour-meta-header">
              <span className="flavour-tagline">{product.tagline}</span>
              <h2 className="flavour-title font-editorial">{product.name}</h2>
              <p className="flavour-desc">{product.description}</p>
            </div>

            {/* Sensory Tasting Profile */}
            <div className="flavour-profile-box glass-panel">
              <h3 className="profile-box-title">
                <Sparkles size={16} className="profile-icon" />
                <span>Sensory Profile</span>
              </h3>

              <div className="profile-notes-list">
                <div className="profile-note-row">
                  <span className="note-label">Aroma</span>
                  <p className="note-val">{product.profile.aroma}</p>
                </div>
                <div className="profile-note-row">
                  <span className="note-label">Palate</span>
                  <p className="note-val">{product.profile.palate}</p>
                </div>
                <div className="profile-note-row">
                  <span className="note-label">Finish</span>
                  <p className="note-val">{product.profile.finish}</p>
                </div>
              </div>
            </div>

            {/* Sensory Radar Bars */}
            <div className="flavour-radar-box glass-panel">
              <h3 className="radar-title">Character Intensity</h3>
              <div className="radar-bars">
                {product.sensoryRadar.map((item) => (
                  <div key={item.attribute} className="radar-bar-item">
                    <div className="radar-bar-header">
                      <span className="radar-attr">{item.attribute}</span>
                      <span className="radar-val">{item.value}%</span>
                    </div>
                    <div className="radar-bar-track">
                      <div
                        className={`radar-bar-fill ${activeTab}`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tasting Notes Tags */}
            <div className="flavour-tags-wrap">
              <span className="tags-label">Key Notes:</span>
              <div className="tags-list">
                {product.tastingNotes.map((note) => (
                  <span key={note} className="tasting-tag">
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Serve Ritual Box */}
            <div className="flavour-serve-box glass-panel">
              <div className="serve-box-header">
                <GlassWater size={18} className="serve-icon" />
                <span className="serve-tag">SIGNATURE SERVE</span>
              </div>
              <h4 className="serve-name font-editorial">{product.serveRitual.name}</h4>
              <p className="serve-glass">Glassware: {product.serveRitual.glass}</p>
              <p className="serve-prep">{product.serveRitual.prep}</p>
            </div>

            <div className="flavour-actions">
              <button
                type="button"
                className="flavour-reserve-direct-btn"
                onClick={() => addToCart(activeTab)}
                data-cursor-text="RESERVE"
              >
                <span>Reserve {product.flavor} ($145)</span>
                <ArrowRight size={16} />
              </button>
              <Button
                to="/craft"
                variant="glass"
                size="lg"
                cursorText="CRAFT"
              >
                Distillation Alchemy
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Side-by-Side Quick Compare Matrix */}
      <section className="flavour-compare-section section">
        <div className="container">
          <SectionTitle
            badge="At a Glance"
            title="EXPRESSION MATRIX"
            subtitle="Compare both expressions side-by-side to select the character for your evening."
            align="center"
          />

          <div className="compare-grid">
            {Object.values(products).map((prod) => (
              <div
                key={prod.id}
                className={`compare-card glass-panel-interactive ${prod.id === activeTab ? 'active-compare' : ''}`}
                onClick={() => handleTabChange(prod.id)}
              >
                <div className="compare-card-header">
                  <h3 className="compare-name font-editorial">{prod.name}</h3>
                  <span className="compare-tagline">{prod.tagline}</span>
                </div>

                <div className="compare-bottle-img-wrap">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="compare-bottle-img"
                    loading="lazy"
                  />
                </div>

                <ul className="compare-spec-list">
                  <li><strong>Style:</strong> {prod.flavor}</li>
                  <li><strong>Aroma:</strong> {prod.tastingNotes[0]}, {prod.tastingNotes[1]}</li>
                  <li><strong>Serving:</strong> {prod.serveRitual.name}</li>
                  <li><strong>ABV:</strong> {prod.abv}</li>
                </ul>

                <button
                  type="button"
                  className="compare-reserve-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(prod.id);
                  }}
                >
                  Reserve {prod.flavor} ($145)
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
