import { useEffect, useRef } from 'react';

interface StarfieldProps {
  numStars?: number;
  className?: string;
}

export function Starfield({ numStars = 100, className = "" }: StarfieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear existing stars
    container.innerHTML = '';

    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.className = 'absolute w-0.5 h-0.5 bg-white rounded-full animate-twinkle';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.animationDelay = Math.random() * 2 + 's';
      star.style.animationDuration = (Math.random() * 3 + 2) + 's';
      container.appendChild(star);
    }
  }, [numStars]);

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
    />
  );
}
