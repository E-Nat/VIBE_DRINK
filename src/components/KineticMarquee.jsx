import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useFlavor } from '../context/FlavorContext';
import './KineticMarquee.css';

export const KineticMarquee = ({
  text1 = 'VIBE NOCTURNE • ARTISANAL BOTANICAL ALCHEMY • SINGLE BATCH CHARACTER • ',
  text2 = 'THE MIDNIGHT STANDARD • CONTRASTING EXPRESSIONS • TIMELESS INDULGENCE • ',
  tilt = 2,
}) => {
  const { currentFlavorKey } = useFlavor();
  const marqueeRef = useRef(null);

  return (
    <div
      ref={marqueeRef}
      className={`kinetic-marquee-container ${currentFlavorKey}`}
      style={{ transform: `rotate(${tilt}deg)` }}
      aria-hidden="true"
    >
      {/* Top Track (Moving Left) */}
      <div className="marquee-track track-left">
        <div className="marquee-content">
          <span className="marquee-text font-editorial">{text1}</span>
          <span className="marquee-text font-editorial">{text1}</span>
          <span className="marquee-text font-editorial">{text1}</span>
          <span className="marquee-text font-editorial">{text1}</span>
        </div>
      </div>

      {/* Bottom Track (Moving Right, Outlined Font) */}
      <div className="marquee-track track-right">
        <div className="marquee-content">
          <span className="marquee-text-outline font-display">{text2}</span>
          <span className="marquee-text-outline font-display">{text2}</span>
          <span className="marquee-text-outline font-display">{text2}</span>
          <span className="marquee-text-outline font-display">{text2}</span>
        </div>
      </div>
    </div>
  );
};
