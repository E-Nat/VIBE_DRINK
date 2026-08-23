import React from 'react';
import { SectionTitle } from '../components/SectionTitle';
import { Button } from '../components/Button';
import { craftData } from '../data/craft';
import { Sparkles, Layers, ShieldCheck, Droplets, Gem } from 'lucide-react';
import './Craft.css';

export const Craft = () => {
  return (
    <div className="craft-page-root">
      {/* 1. Craft Hero */}
      <section className="craft-hero-section section">
        <div className="container craft-hero-container">
          <div className="badge-pill">
            <span className="badge-dot" />
            <span>{craftData.hero.badge}</span>
          </div>

          <h1 className="craft-hero-title font-editorial">
            {craftData.hero.title}
          </h1>

          <p className="craft-hero-subtitle font-display">
            Designed with Character
          </p>

          <p className="craft-hero-lead">
            {craftData.hero.lead}
          </p>

          {/* Key Stats Pill Bar */}
          <div className="craft-stats-grid glass-panel">
            {craftData.stats.map((st) => (
              <div key={st.label} className="craft-stat-item">
                <span className="stat-val font-editorial">{st.value}</span>
                <span className="stat-label">{st.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Visual Macro Texture Spotlight */}
      <section className="craft-visual-section">
        <div className="container">
          <div className="craft-visual-frame glass-panel">
            <img
              src="/vibe-botanical-craft.jpg"
              alt="Artisanal botanicals and crystal essence"
              className="craft-visual-img"
              loading="lazy"
            />
            <div className="craft-visual-overlay">
              <span className="craft-visual-tagline">
                "Precision in every botanical infusion, balance in every pour."
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 4 Principles of Character */}
      <section className="craft-principles-section section">
        <div className="container">
          <SectionTitle
            badge="The Method"
            title="ELEMENTS OF MASTERY"
            subtitle="How character is sculpted into every bottle of VIBE."
            align="center"
          />

          <div className="craft-principles-grid">
            {craftData.principles.map((pr) => (
              <div key={pr.id} className="craft-principle-card glass-panel-interactive">
                <div className="principle-number font-editorial">{pr.id}</div>
                <span className="principle-tagline">{pr.tagline}</span>
                <h3 className="principle-title font-editorial">{pr.title}</h3>
                <p className="principle-desc">{pr.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. The Vessel & Crystal Glass Architecture */}
      <section className="craft-vessel-section section">
        <div className="container craft-vessel-grid">
          <div className="vessel-text-col">
            <div className="badge-pill">
              <span className="badge-dot" />
              <span>THE VESSEL</span>
            </div>

            <h2 className="vessel-title font-editorial">
              SCULPTED IN HEAVY CRYSTAL
            </h2>

            <p className="vessel-desc">
              The bottle is the tactile introduction to VIBE. Engineered with an ultra-heavy solid crystal base, sharp architectural shoulders, and a custom tactile knurled closure, it delivers an unmistakable weight in the hand.
            </p>

            <ul className="vessel-specs-list">
              <li>
                <Gem size={18} className="vessel-icon" />
                <div>
                  <strong>Solid Crystal Base</strong>
                  <p>Grounding weight and light-refracting clarity.</p>
                </div>
              </li>
              <li>
                <Sparkles size={18} className="vessel-icon" />
                <div>
                  <strong>Embossed Metallic Foiling</strong>
                  <p>Intricate gold and rose gold detailing.</p>
                </div>
              </li>
            </ul>

            <Button
              to="/flavours"
              variant="primary"
              size="md"
              showArrow
              cursorText="DISCOVER"
            >
              Explore The Expressions
            </Button>
          </div>

          <div className="vessel-image-col">
            <div className="vessel-card glass-panel">
              <img
                src="/vibe-black-tea.png"
                alt="VIBE bottle crystal close up"
                className="vessel-bottle-img"
                loading="lazy"
              />
              <div className="vessel-glow" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
