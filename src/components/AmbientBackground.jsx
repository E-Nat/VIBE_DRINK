import React, { useEffect, useRef } from 'react';
import { useFlavor } from '../context/FlavorContext';
import './AmbientBackground.css';

export const AmbientBackground = () => {
  const { currentFlavorKey } = useFlavor();
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let isPageVisible = true;

    const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) {
        render();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Track mouse only on non-touch devices
    const handleMouseMove = (e) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (!isTouch) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // Abstract Dynamic Floating Meshes & Geometry
    const isMobile = window.innerWidth < 768;
    const shapeCount = isMobile ? 3 : 7;
    const abstractShapes = Array.from({ length: shapeCount }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * (isMobile ? 60 : 140) + 50,
      points: 5,
      angles: [0.9, 1.1, 0.95, 1.05, 0.92],
      rotSpeed: (Math.random() - 0.5) * 0.003,
      rotation: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * (isMobile ? 0.15 : 0.25),
      vy: (Math.random() - 0.5) * (isMobile ? 0.12 : 0.2),
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: Math.random() * 0.012 + 0.004,
      layer: (i % 3) + 1,
    }));

    // Ambient floating embers & luminous crystal dust
    const particleCount = isMobile ? 22 : 60;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.6 + 0.4,
      speedY: Math.random() * 0.35 + 0.08,
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.55 + 0.15,
      pulseSpeed: Math.random() * 0.018 + 0.005,
      pulseVal: Math.random() * Math.PI,
      depth: Math.random() * 0.8 + 0.2,
    }));

    // Floating Prism Rings (desktop only)
    const prismRings = isMobile
      ? []
      : [
          { x: canvas.width * 0.2, y: canvas.height * 0.3, radius: 140, rot: 0, rotSpeed: 0.0025, tilt: 0.4 },
          { x: canvas.width * 0.85, y: canvas.height * 0.65, radius: 200, rot: 1, rotSpeed: -0.002, tilt: 0.6 },
        ];

    const render = () => {
      if (!isPageVisible) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!isTouch) {
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;
      }
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      const isLychee = currentFlavorKey === 'exoticLychee';
      const mainColor = isLychee ? '232, 154, 170' : '215, 164, 91';
      const secondaryColor = isLychee ? '170, 70, 110' : '160, 90, 40';
      const highlightColor = isLychee ? '255, 210, 225' : '255, 230, 180';

      // 1. Draw Abstract Morphing Liquid Meshes
      abstractShapes.forEach((shape) => {
        shape.x += shape.vx;
        shape.y += shape.vy;
        shape.rotation += shape.rotSpeed;
        shape.phase += shape.phaseSpeed;

        if (shape.x < -shape.radius * 2) shape.x = canvas.width + shape.radius;
        if (shape.x > canvas.width + shape.radius * 2) shape.x = -shape.radius;
        if (shape.y < -shape.radius * 2) shape.y = canvas.height + shape.radius;
        if (shape.y > canvas.height + shape.radius * 2) shape.y = -shape.radius;

        const px = shape.x + mx * (shape.layer * 18);
        const py = shape.y + my * (shape.layer * 14);

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(shape.rotation);

        ctx.beginPath();
        const numPoints = shape.points;
        for (let j = 0; j < numPoints; j++) {
          const angle = (j / numPoints) * Math.PI * 2;
          const wobble = Math.sin(shape.phase + j * 1.5) * (shape.radius * 0.16);
          const r = (shape.radius + wobble) * shape.angles[j % shape.angles.length];
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          if (j === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();

        const grad = ctx.createRadialGradient(0, 0, 10, 0, 0, shape.radius * 1.2);
        grad.addColorStop(0, `rgba(${mainColor}, 0.04)`);
        grad.addColorStop(0.5, `rgba(${secondaryColor}, 0.02)`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.fill();

        ctx.strokeStyle = `rgba(${highlightColor}, 0.05)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
      });

      // 2. Draw 3D Floating Prism Glass Rings (Desktop)
      prismRings.forEach((ring) => {
        ring.rot += ring.rotSpeed;
        const rx = ring.x + mx * 28;
        const ry = ring.y + my * 20;

        ctx.save();
        ctx.translate(rx, ry);
        ctx.rotate(ring.rot);
        ctx.scale(1, ring.tilt);

        ctx.beginPath();
        ctx.arc(0, 0, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${mainColor}, 0.08)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.restore();
      });

      // 3. Draw Floating Luminous Stardust & Embers
      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX + mx * p.depth * 0.15;
        p.pulseVal += p.pulseSpeed;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        const currentOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulseVal));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * p.depth, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${mainColor}, ${currentOpacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (!isTouch) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [currentFlavorKey]);

  return (
    <div className="ambient-background-root" aria-hidden="true">
      {/* Dynamic Ambient Color Orbs */}
      <div className={`ambient-glow-orb orb-primary ${currentFlavorKey}`} />
      <div className={`ambient-glow-orb orb-secondary ${currentFlavorKey}`} />
      <div className={`ambient-glow-orb orb-tertiary ${currentFlavorKey}`} />
      <div className={`ambient-glow-orb orb-quaternary ${currentFlavorKey}`} />

      {/* Canvas for dynamic abstract shapes & generative particles */}
      <canvas ref={canvasRef} className="ambient-particles-canvas" />

      {/* Radial Vignette */}
      <div className="ambient-vignette" />
    </div>
  );
};
