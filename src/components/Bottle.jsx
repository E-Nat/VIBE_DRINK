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
      defaults: { ease: 'power3.inOut' },
    });

    tl.to(bottle, {
      rotateY: 55,
      rotateZ: -4,
      scale: 0.86,
      filter: 'blur(10px)',
      opacity: 0.35,
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
          rotateZ: 4,
          scale: 0.86,
          filter: 'blur(10px)',
          opacity: 0.35,
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
        { scale: 1.25, opacity: 0.9, duration: 0.65, yoyo: true, repeat: 1, ease: 'power2.out' }
      );
    }

    return () => {
      tl.kill();
    };
  }, [currentFlavorKey, currentProduct, customImage]);

  // Pointer drag & mousemove physics loop with mobile touch gesture optimization
  useEffect(() => {
    if (!interactive) return;

    const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    const container = containerRef.current;
    const bottle = bottleRef.current;
    if (!container || !bottle) return;

    let rafId;
    let floatingTween = null;

    // On mobile / touch devices: run gentle floating levitation
    if (isTouch) {
      floatingTween = gsap.to(bottle, {
        y: -14,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    const handlePointerDown = (e) => {
      dragRef.current.isPointerDown = true;
      dragRef.current.startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      setIsDragging(true);
      soundEngine.playClick(900);
    };

    const handlePointerMove = (e) => {
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);

      if (dragRef.current.isPointerDown && clientX !== undefined) {
        const deltaX = clientX - dragRef.current.startX;
        dragRef.current.targetRotY += deltaX * (isTouch ? 0.65 : 0.45);
        dragRef.current.startX = clientX;

        // Subtle tactile click every few degrees
        const now = Date.now();
        if (now - dragRef.current.lastClickSound > 140 && Math.abs(deltaX) > 2) {
          soundEngine.playClick(600 + Math.abs(deltaX) * 12);
          dragRef.current.lastClickSound = now;
        }
      } else if (!isTouch && clientX !== undefined && clientY !== undefined) {
        const rect = container.getBoundingClientRect();
        const x = ((clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((clientY - rect.top) / rect.height) * 2 - 1;

        mouseState.current.targetX = Math.max(-1, Math.min(1, x)) * 18;
        mouseState.current.targetY = Math.max(-1, Math.min(1, y)) * 12;
        mouseState.current.targetRotateY = Math.max(-1, Math.min(1, x)) * 14;
        mouseState.current.targetRotateX = -Math.max(-1, Math.min(1, y)) * 10;
      }
    };

    const handlePointerUp = () => {
      dragRef.current.isPointerDown = false;
      setIsDragging(false);
    };

    const handleMouseLeave = () => {
      if (!dragRef.current.isPointerDown && !isTouch) {
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

      if (!isTouch) {
        s.currentX += (s.targetX - s.currentX) * lerp;
        s.currentY += (s.targetY - s.currentY) * lerp;
        s.currentRotateY += (s.targetRotateY - s.currentRotateY) * lerp;
        s.currentRotateX += (s.targetRotateX - s.currentRotateX) * lerp;
      }

      // Inertial spin lerp
      d.currentRotY += (d.targetRotY - d.currentRotY) * 0.12;

      const totalRotY = s.currentRotateY + d.currentRotY;
      const totalRotX = s.currentRotateX;

      if (bottle) {
        if (!isTouch) {
          bottle.style.transform = `
            translate3d(${s.currentX}px, ${s.currentY}px, 0px)
            rotateX(${totalRotX}deg)
            rotateY(${totalRotY}deg)
          `;
        } else {
          bottle.style.transform = `
            rotateY(${totalRotY}deg)
          `;
        }
      }

      if (lightSheenRef.current) {
        const sheenOffset = ((totalRotY % 360) / 360) * 100;
        lightSheenRef.current.style.transform = `translateX(${sheenOffset}%)`;
      }

      if (shadowRef.current && !isTouch) {
        shadowRef.current.style.transform = `
          translateX(${s.currentX * 0.7}px)
          scale(${1 + Math.abs(s.currentY) * 0.006})
        `;
      }

      rafId = requestAnimationFrame(animate);
    };

    if (!isTouch) {
      window.addEventListener('mousemove', handlePointerMove, { passive: true });
    }
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('touchend', handlePointerUp);
    container.addEventListener('pointerdown', handlePointerDown);
    container.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('touchstart', handlePointerDown, { passive: true });
    container.addEventListener('touchmove', handlePointerMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      if (floatingTween) floatingTween.kill();
      if (!isTouch) {
        window.removeEventListener('mousemove', handlePointerMove);
      }
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('touchend', handlePointerUp);
      container.removeEventListener('pointerdown', handlePointerDown);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('touchstart', handlePointerDown);
      container.removeEventListener('touchmove', handlePointerMove);
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
