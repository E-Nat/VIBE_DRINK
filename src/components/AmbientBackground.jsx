import React, { useEffect, useRef } from 'react';
import { useFlavor } from '../context/FlavorContext';
import './AmbientBackground.css';

export const AmbientBackground = () => {
  const { currentFlavorKey } = useFlavor();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Particle system (floating luminous embers / dust)
    const particleCount = window.innerWidth < 768 ? 20 : 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.6 + 0.4,
      speedY: Math.random() * 0.35 + 0.1,
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.5 + 0.15,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      pulseVal: Math.random() * Math.PI,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isLychee = currentFlavorKey === 'exoticLychee';
      const particleColor = isLychee
        ? '232, 154, 170'
        : '215, 164, 91';

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.pulseVal += p.pulseSpeed;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        const currentOpacity =
          p.opacity * (0.6 + 0.4 * Math.sin(p.pulseVal));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${currentOpacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${particleColor}, 0.6)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [currentFlavorKey]);

  return (
    <div className="ambient-background-root" aria-hidden="true">
      {/* Dynamic Ambient Color Blobs */}
      <div className={`ambient-glow-orb orb-primary ${currentFlavorKey}`} />
      <div className={`ambient-glow-orb orb-secondary ${currentFlavorKey}`} />
      <div className={`ambient-glow-orb orb-tertiary ${currentFlavorKey}`} />

      {/* Subtle canvas particles */}
      <canvas ref={canvasRef} className="ambient-particles-canvas" />

      {/* Vignette Overlay */}
      <div className="ambient-vignette" />
    </div>
  );
};
