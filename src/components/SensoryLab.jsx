import React, { useState } from 'react';
import { useFlavor } from '../context/FlavorContext';
import { soundEngine } from '../utils/audio';
import { products } from '../data/products';
import { Sparkles, Flame, Droplets, Wind, Compass, GlassWater } from 'lucide-react';
import './SensoryLab.css';

export const SensoryLab = () => {
  const { currentFlavorKey, currentProduct, setFlavor } = useFlavor();
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);

  const sensoryNodes = {
    blackTea: [
      {
        id: 'tannin',
        name: 'Single-Estate Tannin',
        icon: Compass,
        origin: 'High-altitude Ceylon plantations (1,800m)',
        intensity: 95,
        freq: 330,
        description: 'Slow cold-macerated tea leaves imparting velvety mouthfeel, deep structured tannin backbone, and dark mahogany color tone.',
        pairWith: 'Hand-carved clear ice sphere & charred orange peel',
      },
      {
        id: 'honey',
        name: 'Smoked Wild Honey',
        icon: Flame,
        origin: 'Wild forest apiaries, cold-smoked with applewood',
        intensity: 88,
        freq: 440,
        description: 'Delivers a subtle golden warmth and luscious mouthfeel without cloying sweetness, rounding off botanical bitterness.',
        pairWith: 'Aged dark chocolate or smoked almonds',
      },
      {
        id: 'oak',
        name: 'Charred French Oak',
        icon: Sparkles,
        origin: 'Allier forest oak staves, medium toast level 3',
        intensity: 92,
        freq: 554.37,
        description: 'Infuses natural toasted vanilla, faint toasted almond, and rich cedar wood smoke that linger effortlessly into the finish.',
        pairWith: 'Neat in heavy crystal tumbler at 16°C',
      },
      {
        id: 'malt',
        name: 'Roasted Amber Malt',
        icon: Droplets,
        origin: 'Floor-malted botanical barley infusion',
        intensity: 86,
        freq: 659.25,
        description: 'Provides a resonant biscuit and caramelized toffee foundation that binds high-toned tea florals into a harmonious whole.',
        pairWith: 'Nocturnal espresso tonic twist',
      },
    ],
    exoticLychee: [
      {
        id: 'nectar',
        name: 'Luminous Lychee Nectar',
        icon: Droplets,
        origin: 'Subtropical sun-ripened royal orchard harvests',
        intensity: 96,
        freq: 587.33,
        description: 'Cold-pressed fresh lychee nectar offering crisp tropical luminescence, silky clarity, and vibrant natural sweetness.',
        pairWith: 'Fluted coupe with artisanal sparkling mineral water',
      },
      {
        id: 'rose',
        name: 'Damask Rose Petal',
        icon: Wind,
        origin: 'Early dawn hand-picked organic rose botanicals',
        intensity: 93,
        freq: 739.99,
        description: 'Micro-distilled floral essence giving a velvet fragrance and regal perfume note that floats above the glass.',
        pairWith: 'Fresh raspberry sphere & rosemary sprig',
      },
      {
        id: 'blossom',
        name: 'Citrus Blossom Mist',
        icon: Sparkles,
        origin: 'Mediterranean bergamot and neroli blossoms',
        intensity: 90,
        freq: 880,
        description: 'Provides an ethereal burst of bright zest on the initial palate, balancing the luscious lychee with crisp citrus energy.',
        pairWith: 'Chilled signature spritz at golden hour',
      },
      {
        id: 'mineral',
        name: 'Alpine Mineral Clarity',
        icon: GlassWater,
        origin: 'Deep glacial aquifer filtration',
        intensity: 89,
        freq: 987.77,
        description: 'Imparts a pure crystalline structure and dry, invigorating finish that cleanses the palate gracefully.',
        pairWith: 'Hand-cut crystalline ice block',
      },
    ],
  };

  const activeNodes = sensoryNodes[currentFlavorKey] || sensoryNodes.blackTea;
  const currentNode = activeNodes[activeNodeIndex] || activeNodes[0];

  const handleNodeClick = (index, freq) => {
    setActiveNodeIndex(index);
    soundEngine.playChime(freq, 'sine', 1.2);
    soundEngine.playClick(900);
  };

  return (
    <div className={`sensory-lab-root glass-panel ${currentFlavorKey}`} aria-label="Interactive Sensory Dimension">
      {/* Interactive Sensory Header */}
      <div className="sensory-lab-header">
        <div className="sensory-header-left">
          <div className="badge-pill">
            <span className="badge-dot" />
            <span>MOLECULAR ALCHEMY</span>
          </div>
          <h2 className="sensory-lab-title font-editorial">
            THE SENSORY MATRIX
          </h2>
          <p className="sensory-lab-subtitle">
            Interact with the core botanical nodes to deconstruct the character of {currentProduct.name}.
          </p>
        </div>

        {/* Dynamic Flavor Switcher inside Lab */}
        <div className="sensory-flavor-toggles">
          <button
            type="button"
            className={`sensory-toggle-btn bt ${currentFlavorKey === 'blackTea' ? 'active' : ''}`}
            onClick={() => {
              setFlavor('blackTea');
              setActiveNodeIndex(0);
            }}
          >
            <span className="dot bt-dot" />
            <span>01 Black Tea</span>
          </button>
          <button
            type="button"
            className={`sensory-toggle-btn el ${currentFlavorKey === 'exoticLychee' ? 'active' : ''}`}
            onClick={() => {
              setFlavor('exoticLychee');
              setActiveNodeIndex(0);
            }}
          >
            <span className="dot el-dot" />
            <span>02 Exotic Lychee</span>
          </button>
        </div>
      </div>

      {/* Interactive Matrix Workspace */}
      <div className="sensory-lab-grid">
        {/* Left Column: Interactive Botanical Node Selector */}
        <div className="sensory-nodes-column">
          <div className="sensory-nodes-list">
            {activeNodes.map((node, index) => {
              const IconComp = node.icon;
              const isActive = index === activeNodeIndex;
              return (
                <div
                  key={node.id}
                  className={`sensory-node-card glass-panel-interactive ${isActive ? 'active' : ''}`}
                  onClick={() => handleNodeClick(index, node.freq)}
                  data-cursor-text="INSPECT"
                >
                  <div className="node-card-left">
                    <div className="node-icon-box">
                      <IconComp size={20} className="node-icon" />
                    </div>
                    <div>
                      <h4 className="node-name">{node.name}</h4>
                      <span className="node-origin">{node.origin}</span>
                    </div>
                  </div>

                  <div className="node-intensity-badge">
                    <span className="intensity-val">{node.intensity}%</span>
                    <span className="intensity-label">PURITY</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Architectural Node Inspector */}
        <div className="sensory-inspector-column glass-panel">
          <div className="inspector-ambient-glow" />

          <div className="inspector-top">
            <span className="inspector-index font-editorial">
              0{activeNodeIndex + 1} / 04
            </span>
            <div className="inspector-badge">
              <Sparkles size={13} />
              <span>ACTIVE COMPONENT</span>
            </div>
          </div>

          <h3 className="inspector-title font-editorial">{currentNode.name}</h3>

          <p className="inspector-desc">{currentNode.description}</p>

          {/* Intensity Meter Bar */}
          <div className="inspector-meter-box">
            <div className="meter-header">
              <span className="meter-label">Aromatic Potency</span>
              <span className="meter-pct">{currentNode.intensity}%</span>
            </div>
            <div className="meter-track">
              <div
                className="meter-fill"
                style={{ width: `${currentNode.intensity}%` }}
              />
            </div>
          </div>

          {/* Sommelier Pairing Recommendation */}
          <div className="inspector-pairing-card">
            <div className="pairing-header">
              <GlassWater size={16} className="pairing-icon" />
              <span className="pairing-label">RECOMMENDED SERVE RITUAL</span>
            </div>
            <p className="pairing-text font-body">{currentNode.pairWith}</p>
          </div>

          <div className="inspector-footer-note">
            <span>Harmonic Resonance: {currentNode.freq} Hz</span>
          </div>
        </div>
      </div>
    </div>
  );
};
