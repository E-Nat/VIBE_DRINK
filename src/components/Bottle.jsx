import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useFlavor } from '../context/FlavorContext';
import { soundEngine } from '../utils/audio';
import { Sparkles, RotateCw } from 'lucide-react';
import './Bottle.css';

export const Bottle = ({
  size = 'hero', // 'hero' | 'showcase' | 'compact'
  interactive = true,
  customImage = null,
  customAlt = null,
  showEngraving = true,
  className = '',
}) => {
  const { currentProduct, currentFlavorKey, isSwitching, engravingText } = useFlavor();
  const bottleRef = useRef(null);
  const containerRef = useRef(null);
  const glowRef = useRef(null);
  const shadowRef = useRef(null);
  const reflectionRef = useRef(null);
  const lightSheenRef = useRef(null);

  const [displayImage, setDisplayImage] = useState(customImage || currentProduct.image);
  const [displayAlt, setDisplayAlt] = useState(customAlt || currentProduct.name);
  const [isDragging, setIsDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);

  // Physics state
  const dragRef = useRef({
    startX: 0,
    currentRotY: 0,
    targetRotY: 0,
    isPointerDown: false,
    lastClickSound: 0,
  });

  const mouseState = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    targetRotateY: 0,
    targetRotateX: 0,
    currentRotateY: 0,
    currentRotateX: 0,
  });

  // Handle Flavor Switching GSAP Timeline
  useEffect(() => {
    if (customImage) return;

    const bottle = bottleRef.current;
    const glow = glowRef.current;
    if (!bottle) return;

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
    });

    tl.to(bottle, {
      rotateY: 55,
      rotateZ: -5,
      scale: 0.86,
      filter: 'blur(10px)',
      opacity: 0.3,
      duration: 0.35,
    })
      .add(() => {
        setDisplayImage(currentProduct.image);
        setDisplayAlt(currentProduct.name);
      })
      .fromTo(
        bottle,
        {
          rotateY: -55,
          rotateZ: 5,
          scale: 0.86,
          filter: 'blur(10px)',
          opacity: 0.3,
        },
        {
          rotateY: 0,
          rotateZ: 0,
          scale: 1,
          filter: 'blur(0px)',
          opacity: 1,
          duration: 0.55,
          ease: 'power3.out',
        }
      );

    if (glow) {
      gsap.fromTo(
        glow,
        { scale: 0.75, opacity: 0.2 },
        { scale: 1.25, opacity: 0.9, duration: 0.65, yoyo: true, repeat: 1 }
      );
    }

    return () => {
      tl.kill();
    };
  }, [currentFlavorKey, currentProduct, customImage]);

  // Pointer drag & mousemove physics loop
  useEffect(() => {
    if (!interactive) return;

    const container = containerRef.current;
    const bottle = bottleRef.current;
    if (!container || !bottle) return;

    let rafId;

    const handlePointerDown = (e) => {
      dragRef.current.isPointerDown = true;
      dragRef.current.startX = e.clientX;
      setIsDragging(true);
      soundEngine.playClick(900);
    };

    const handlePointerMove = (e) => {
      if (dragRef.current.isPointerDown) {
        const deltaX = e.clientX - dragRef.current.startX;
        dragRef.current.targetRotY += deltaX * 0.45;
        dragRef.current.startX = e.clientX;

        // Subtle tactile click every few degrees
        const now = Date.now();
        if (now - dragRef.current.lastClickSound > 120 && Math.abs(deltaX) > 2) {
          soundEngine.playClick(600 + Math.abs(deltaX) * 15);
          dragRef.current.lastClickSound = now;
        }
      } else {
        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

        mouseState.current.targetX = Math.max(-1, Math.min(1, x)) * 20;
        mouseState.current.targetY = Math.max(-1, Math.min(1, y)) * 15;
        mouseState.current.targetRotateY = Math.max(-1, Math.min(1, x)) * 14;
        mouseState.current.targetRotateX = -Math.max(-1, Math.min(1, y)) * 12;
      }
    };

    const handlePointerUp = () => {
      dragRef.current.isPointerDown = false;
      setIsDragging(false);
    };

    const handleMouseLeave = () => {
      if (!dragRef.current.isPointerDown) {
        mouseState.current.targetX = 0;
        mouseState.current.targetY = 0;
        mouseState.current.targetRotateY = 0;
        mouseState.current.targetRotateX = 0;
      }
    };

    const animate = () => {
      const s = mouseState.current;
      const d = dragRef.current;
      const lerp = 0.08;

      s.currentX += (s.targetX - s.currentX) * lerp;
      s.currentY += (s.targetY - s.currentY) * lerp;
      s.currentRotateY += (s.targetRotateY - s.currentRotateY) * lerp;
      s.currentRotateX += (s.targetRotateX - s.currentRotateX) * lerp;

      // Inertial spin lerp
      d.currentRotY += (d.targetRotY - d.currentRotY) * 0.1;

      const totalRotY = s.currentRotateY + d.currentRotY;
      const totalRotX = s.currentRotateX;

      if (bottle) {
        bottle.style.transform = `
          translate3d(${s.currentX}px, ${s.currentY}px, 0px)
          rotateX(${totalRotX}deg)
          rotateY(${totalRotY}deg)
        `;
      }

      if (lightSheenRef.current) {
        const sheenOffset = ((totalRotY % 360) / 360) * 100;
        lightSheenRef.current.style.transform = `translateX(${sheenOffset}%)`;
      }

      if (shadowRef.current) {
        shadowRef.current.style.transform = `
          translateX(${s.currentX * 0.7}px)
          scale(${1 + Math.abs(s.currentY) * 0.006})
        `;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('pointerdown', handlePointerDown);
    container.addEventListener('mouseleave', handleMouseLeave);
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('pointerdown', handlePointerDown);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className={`bottle-component-root bottle-size-${size} ${isDragging ? 'is-dragging' : ''} ${className}`}
      data-cursor-text="ROTATE 360°"
    >
      {/* Ambient Halo Glow */}
      <div
        ref={glowRef}
        className={`bottle-ambient-glow ${currentFlavorKey}`}
      />

      {/* Floating Abstract Crystal Orbitals */}
      <div className="bottle-floating-orbitals" aria-hidden="true">
        <div className={`orbital-shard shard-1 ${currentFlavorKey}`} />
        <div className={`orbital-shard shard-2 ${currentFlavorKey}`} />
        <div className={`orbital-shard shard-3 ${currentFlavorKey}`} />
      </div>

      {/* Floating 3D Bottle Stage */}
      <div className="bottle-stage">
        <div ref={bottleRef} className="bottle-image-wrapper">
          <img
            src={displayImage}
            alt={displayAlt}
            className="bottle-render-img"
            loading="eager"
            draggable="false"
          />

          {/* Dynamic Light Sheen Flare */}
          <div ref={lightSheenRef} className="bottle-light-sheen" />

          {/* Live Custom Monogram Engraving Plate */}
          {showEngraving && engravingText && (
            <div className={`bottle-monogram-overlay ${currentFlavorKey}`}>
              <span className="monogram-text font-editorial">{engravingText}</span>
              <span className="monogram-sub font-nav">LIMITED ALLOCATION</span>
            </div>
          )}
        </div>
      </div>

      {/* Ground Floor Shadow */}
      <div ref={shadowRef} className="bottle-floor-shadow" />

      {/* Base Reflection Effect */}
      <div ref={reflectionRef} className="bottle-reflection-layer">
        <img
          src={displayImage}
          alt=""
          aria-hidden="true"
          className="bottle-reflection-img"
        />
        <div className="bottle-reflection-fade" />
      </div>

      {/* 360 Drag Interaction Badge */}
      {interactive && size === 'hero' && (
        <div className="bottle-interactive-hint">
          <RotateCw size={13} className="hint-icon spin-slow" />
          <span>DRAG 360° INTERACTIVE</span>
        </div>
      )}
    </div>
  );
};
