import { useEffect, useRef } from 'react';

const COLORS = [
  'rgba(0, 212, 255, 0.3)',
  'rgba(123, 47, 255, 0.3)',
  'rgba(0, 230, 118, 0.2)',
];

export default function Particles({ count = 30 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const size = Math.random() * 4 + 2;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background = color;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${Math.random() * 15 + 10}s`;
      particle.style.animationDelay = `${Math.random() * 10}s`;
      container.appendChild(particle);
    }

    return () => {
      container.innerHTML = '';
    };
  }, [count]);

  return <div className="bg-particles" ref={containerRef} />;
}
