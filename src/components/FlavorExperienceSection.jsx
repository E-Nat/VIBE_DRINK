import React, { useState } from 'react';
import { useFlavor } from '../context/FlavorContext';
import { soundEngine } from '../utils/audio';
import { FullscreenFlavorModal } from './FullscreenFlavorModal';
import { Sparkles, Maximize2 } from 'lucide-react';
import './FlavorExperienceSection.css';

export const FlavorExperienceSection = () => {
  const { currentFlavorKey, setFlavor } = useFlavor();
  const [hoveredFlavor, setHoveredFlavor] = useState(null);
  const [modalFlavor, setModalFlavor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (flavor) => {
    soundEngine.playChime(flavor === 'blackTea' ? 520 : 659.25, 'sine', 1.4);
    setFlavor(flavor);
    setModalFlavor(flavor);
    setIsModalOpen(true);
  };

  return (
    <section className={`flavor-experience-stage ${hoveredFlavor || currentFlavorKey}`} aria-label="Interactive Flavor Dimension">
      {/* Background Dynamic Color Shift Halo */}
      <div className={`fe-ambient-glow ${hoveredFlavor || currentFlavorKey}`} />

      <div className="container fe-container">
        <div className="fe-header">
          <div className="badge-pill">
            <span className="badge-dot" />
            <span>IMMERSIVE TASTING</span>
          </div>

          <h2 className="fe-title font-editorial">CHOOSE YOUR VIBE</h2>
          <p className="fe-lead">
            Hover to discover character. Click either expression to launch the full-screen cinematic dimension.
          </p>
        </div>

        {/* Dual Side-by-Side Interactive Bottles */}
        <div className="fe-dual-stage">
          {/* Black Tea Bottle Pod */}
          <div
            className={`fe-pod pod-black-tea ${hoveredFlavor === 'exoticLychee' ? 'dimmed' : ''} ${hoveredFlavor === 'blackTea' ? 'enlarged' : ''}`}
            onMouseEnter={() => {
              setHoveredFlavor('blackTea');
              soundEngine.playClick(600);
            }}
            onMouseLeave={() => setHoveredFlavor(null)}
            onClick={() => handleOpenModal('blackTea')}
            data-cursor-text="EXPLORE TEA"
          >
            <div className="pod-halo bt-halo" />

            <div className="pod-bottle-wrap">
              <img
                src="/vibe-black-tea.png"
                alt="VIBE Black Tea"
                className="pod-bottle-img"
                loading="lazy"
              />
            </div>

            <div className="pod-info-stack">
              <h3 className="pod-flavor-title font-editorial">BLACK TEA</h3>
              <div className="pod-notes-row">
                <span className="note-word">BOLD</span>
                <span className="note-dot">•</span>
                <span className="note-word">RICH</span>
                <span className="note-dot">•</span>
                <span className="note-word">WARM</span>
              </div>
              <div className="pod-action-pill">
                <Maximize2 size={13} />
                <span>Fullscreen Tasting</span>
              </div>
            </div>
          </div>

          {/* Exotic Lychee Bottle Pod */}
          <div
            className={`fe-pod pod-exotic-lychee ${hoveredFlavor === 'blackTea' ? 'dimmed' : ''} ${hoveredFlavor === 'exoticLychee' ? 'enlarged' : ''}`}
            onMouseEnter={() => {
              setHoveredFlavor('exoticLychee');
              soundEngine.playClick(850);
            }}
            onMouseLeave={() => setHoveredFlavor(null)}
            onClick={() => handleOpenModal('exoticLychee')}
            data-cursor-text="EXPLORE LYCHEE"
          >
            <div className="pod-halo el-halo" />

            <div className="pod-bottle-wrap">
              <img
                src="/vibe-exotic-lychee.png"
                alt="VIBE Exotic Lychee"
                className="pod-bottle-img"
                loading="lazy"
              />
            </div>

            <div className="pod-info-stack">
              <h3 className="pod-flavor-title font-editorial">EXOTIC LYCHEE</h3>
              <div className="pod-notes-row">
                <span className="note-word">BRIGHT</span>
                <span className="note-dot">•</span>
                <span className="note-word">SMOOTH</span>
                <span className="note-dot">•</span>
                <span className="note-word">FLORAL</span>
              </div>
              <div className="pod-action-pill">
                <Maximize2 size={13} />
                <span>Fullscreen Tasting</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Flavor Experience Modal */}
      <FullscreenFlavorModal
        isOpen={isModalOpen}
        initialFlavor={modalFlavor || 'blackTea'}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
