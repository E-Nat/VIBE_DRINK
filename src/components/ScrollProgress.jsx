import React, { useState, useEffect } from 'react';
import './ScrollProgress.css';

export const ScrollProgress = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [currentSection, setCurrentSection] = useState('01 HOME');

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalHeight > 0 ? (currentScroll / totalHeight) * 100 : 0;
      setScrollPercent(Math.min(100, Math.max(0, progress)));

      // Detect active section
      const sections = [
        { id: 'hero', label: '01 HOME' },
        { id: 'manifesto', label: '02 STATEMENT' },
        { id: 'dual', label: '03 FLAVOURS' },
        { id: 'story', label: '04 STORY' },
        { id: 'craft', label: '05 CRAFT' },
        { id: 'dark', label: '06 AFTER DARK' },
        { id: 'reviews', label: '07 REVIEWS' },
        { id: 'contact', label: '08 CONNECT' },
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setCurrentSection(sections[i].label);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scroll-progress-root" aria-hidden="true">
      <div className="scroll-progress-label">
        <span>{currentSection}</span>
      </div>

      <div className="scroll-progress-track">
        <div
          className="scroll-progress-bar"
          style={{ height: `${scrollPercent}%` }}
        />
      </div>
    </div>
  );
};
