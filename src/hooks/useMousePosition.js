import { useState, useEffect } from 'react';

export const useMousePosition = () => {
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
    normalizedX: 0, // -1 (left) to 1 (right)
    normalizedY: 0, // -1 (top) to 1 (bottom)
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const normalizedX = (e.clientX / innerWidth) * 2 - 1;
      const normalizedY = (e.clientY / innerHeight) * 2 - 1;

      setMousePos({
        x: e.clientX,
        y: e.clientY,
        normalizedX,
        normalizedY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePos;
};
