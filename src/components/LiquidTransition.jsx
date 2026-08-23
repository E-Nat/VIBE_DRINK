import React from 'react';
import { useFlavor } from '../context/FlavorContext';
import './LiquidTransition.css';

export const LiquidTransition = ({ variant = 'wave', flip = false }) => {
  const { currentFlavorKey } = useFlavor();

  const isLychee = currentFlavorKey === 'exoticLychee';
  const fillColor = isLychee ? 'rgba(56, 18, 37, 0.5)' : 'rgba(58, 22, 9, 0.5)';
  const strokeColor = isLychee ? 'rgba(232, 154, 170, 0.3)' : 'rgba(215, 164, 91, 0.3)';

  return (
    <div
      className={`liquid-transition-root ${flip ? 'flipped' : ''} ${currentFlavorKey}`}
      aria-hidden="true"
    >
      <svg
        className="liquid-wave-svg"
        viewBox="0 0 1440 160"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          className="liquid-path-bg"
          d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,101.3C960,117,1056,139,1152,133.3C1248,128,1344,96,1392,80L1440,64L1440,160L1392,160C1344,160,1248,160,1152,160C1056,160,960,160,864,160C768,160,672,160,576,160C480,160,384,160,288,160C192,160,96,160,48,160L0,160Z"
          fill={fillColor}
        />
        <path
          className="liquid-path-accent"
          d="M0,96L60,106.7C120,117,240,139,360,138.7C480,139,600,117,720,96C840,75,960,53,1080,58.7C1200,64,1320,96,1380,112L1440,128"
          stroke={strokeColor}
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
};
