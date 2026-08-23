import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

export const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.innerWidth < 1024;

    if (isTouchDevice) {
      return;
    }

    setIsEnabled(true);
    document.body.classList.add('has-custom-cursor');

    const dot = dotRef.current;
    const ring = ringRef.current;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      gsap.to(dot, {
        x: mouse.x,
        y: mouse.y,
        duration: 0.08,
        ease: 'power2.out',
      });

      gsap.to(ring, {
        x: mouse.x,
        y: mouse.y,
        duration: 0.35,
        ease: 'power3.out',
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [role="button"], .interactive-cursor, .flavor-card, .bottle-interactive');
      if (target) {
        setIsHovered(true);
        const customText = target.getAttribute('data-cursor-text') || '';
        setCursorText(customText);
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.documentElement.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.documentElement.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnterWindow);
    };
  }, [isVisible]);

  if (!isEnabled) return null;

  return (
    <div className={`custom-cursor-container ${isVisible ? 'visible' : ''}`}>
      <div
        ref={dotRef}
        className={`cursor-dot ${isClicking ? 'clicking' : ''} ${isHovered ? 'hovered' : ''}`}
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${isClicking ? 'clicking' : ''} ${isHovered ? 'hovered' : ''} ${cursorText ? 'has-text' : ''}`}
      >
        {cursorText && <span ref={labelRef} className="cursor-text">{cursorText}</span>}
      </div>
    </div>
  );
};
