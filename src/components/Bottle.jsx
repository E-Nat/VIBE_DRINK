import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useFlavor } from '../context/FlavorContext';
import './Bottle.css';

export const Bottle = ({
  size = 'hero', // 'hero' | 'showcase' | 'compact'
  interactive = true,
  customImage = null,
  customAlt = null,
  className = '',
}) => {
  const { currentProduct, currentFlavorKey, isSwitching } = useFlavor();
  const bottleRef = useRef(null);
  const containerRef = useRef(null);
  const glowRef = useRef(null);
  const shadowRef = useRef(null);
  const reflectionRef = useRef(null);

  const [displayImage, setDisplayImage] = useState(customImage || currentProduct.image);
  const [displayAlt, setDisplayAlt] = useState(customAlt || currentProduct.name);

  // Mouse tracking with smooth lerp
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
    if (customImage) return; // Do not auto-switch if static customImage is provided

    const bottle = bottleRef.current;
    const glow = glowRef.current;
    if (!bottle) return;

    // Timeline for flavor transition
    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
    });

    tl.to(bottle, {
      rotateY: 45,
      rotateZ: -4,
      scale: 0.88,
      filter: 'blur(8px)',
      opacity: 0.4,
      duration: 0.35,
    })
      .add(() => {
        // Change image at peak of turn
        setDisplayImage(currentProduct.image);
        setDisplayAlt(currentProduct.name);
      })
      .fromTo(
        bottle,
        {
          rotateY: -45,
          rotateZ: 4,
          scale: 0.88,
          filter: 'blur(8px)',
          opacity: 0.4,
        },
        {
          rotateY: 0,
          rotateZ: 0,
          scale: 1,
          filter: 'blur(0px)',
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
        }
      );

    if (glow) {
      gsap.fromTo(
        glow,
        { scale: 0.8, opacity: 0.2 },
        { scale: 1.15, opacity: 0.85, duration: 0.6, yoyo: true, repeat: 1 }
      );
    }

    return () => {
      tl.kill();
    };
  }, [currentFlavorKey, currentProduct, customImage]);

  // Mouse move tilt interaction
  useEffect(() => {
    if (!interactive) return;

    const container = containerRef.current;
    const bottle = bottleRef.current;
    if (!container || !bottle) return;

    let rafId;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      // Center coordinates (-1 to 1)
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      // Soft constraints
      mouseState.current.targetX = Math.max(-1, Math.min(1, x)) * 18;
      mouseState.current.targetY = Math.max(-1, Math.min(1, y)) * 14;
      mouseState.current.targetRotateY = Math.max(-1, Math.min(1, x)) * 12; // tilt left/right
      mouseState.current.targetRotateX = -Math.max(-1, Math.min(1, y)) * 10; // tilt up/down
    };

    const handleMouseLeave = () => {
      mouseState.current.targetX = 0;
      mouseState.current.targetY = 0;
      mouseState.current.targetRotateY = 0;
      mouseState.current.targetRotateX = 0;
    };

    // Smooth physics loop
    const animate = () => {
      const s = mouseState.current;
      // Interpolation factor
      const lerp = 0.075;

      s.currentX += (s.targetX - s.currentX) * lerp;
      s.currentY += (s.targetY - s.currentY) * lerp;
      s.currentRotateY += (s.targetRotateY - s.currentRotateY) * lerp;
      s.currentRotateX += (s.targetRotateX - s.currentRotateX) * lerp;

      if (bottle) {
        bottle.style.transform = `
          translate3d(${s.currentX}px, ${s.currentY}px, 0px)
          rotateX(${s.currentRotateX}deg)
          rotateY(${s.currentRotateY}deg)
        `;
      }

      if (shadowRef.current) {
        shadowRef.current.style.transform = `
          translateX(${s.currentX * 0.7}px)
          scale(${1 + Math.abs(s.currentY) * 0.005})
        `;
      }

      rafId = requestAnimationFrame(animate);
    };

    const targetElement = window; // Global window mousemove feels more natural
    targetElement.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      targetElement.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className={`bottle-component-root bottle-size-${size} ${className}`}
      data-cursor-text="VIBE"
    >
      {/* Ambient Halo Glow */}
      <div
        ref={glowRef}
        className={`bottle-ambient-glow ${currentFlavorKey}`}
      />

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

          {/* Subtle light reflection sheen */}
          <div className="bottle-light-sheen" />
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
    </div>
  );
};
