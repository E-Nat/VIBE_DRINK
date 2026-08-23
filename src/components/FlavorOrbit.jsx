import React, { useState } from 'react';
import { useFlavor } from '../context/FlavorContext';
import { Sparkles, Compass, Wind, Flame } from 'lucide-react';
import './FlavorOrbit.css';

export const FlavorOrbit = () => {
  const { currentProduct, currentFlavorKey } = useFlavor();
  const [activeOrbit, setActiveOrbit] = useState(0);

  const orbitItems = [
    {
      id: 'aroma',
      title: 'AROMA',
      icon: <Wind size={16} />,
      desc: currentProduct.profile.aroma,
      angle: 0,
    },
    {
      id: 'character',
      title: 'CHARACTER',
      icon: <Sparkles size={16} />,
      desc: currentProduct.tagline,
      angle: 90,
    },
    {
      id: 'finish',
      title: 'FINISH',
      icon: <Flame size={16} />,
      desc: currentProduct.profile.finish,
      angle: 180,
    },
    {
      id: 'experience',
      title: 'EXPERIENCE',
      icon: <Compass size={16} />,
      desc: currentProduct.serveRitual.prep,
      angle: 270,
    },
  ];

  return (
    <div className="flavor-orbit-root" aria-label="Sensory Dimension Orbit">
      {/* Central Orbit Ring */}
      <div className="orbit-ring-track" />
      <div className="orbit-ring-track-secondary" />

      {/* Orbiting Nodes */}
      <div className="orbit-nodes-container">
        {orbitItems.map((item, index) => {
          const isActive = activeOrbit === index;
          return (
            <button
              key={item.id}
              type="button"
              className={`orbit-node-btn node-${index} ${isActive ? 'active' : ''}`}
              onMouseEnter={() => setActiveOrbit(index)}
              onClick={() => setActiveOrbit(index)}
              data-cursor-text={item.title}
            >
              <div className="node-icon-box">{item.icon}</div>
              <span className="node-title font-nav">{item.title}</span>
            </button>
          );
        })}
      </div>

      {/* Central Active Note Display */}
      <div className="orbit-center-card glass-panel">
        <div className="orbit-card-badge">
          <span className="orbit-card-dot" />
          <span>{orbitItems[activeOrbit].title} DIMENSION</span>
        </div>
        <p className="orbit-card-desc">"{orbitItems[activeOrbit].desc}"</p>
      </div>
    </div>
  );
};
