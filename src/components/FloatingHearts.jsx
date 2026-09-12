import React, { useEffect, useState } from 'react';

export const FloatingHearts = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    // Generate static floating items on mount to avoid heavy re-renders
    const items = Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 18 + 10,
      duration: Math.random() * 15 + 12,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.4 + 0.15,
      type: i % 3 === 0 ? 'sparkle' : i % 5 === 0 ? 'orb' : 'heart'
    }));
    setElements(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Soft romantic background gradients */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#4a121a]/30 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-[#f4a5b7]/15 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-3/4 left-1/3 w-80 h-80 bg-[#e6c594]/10 rounded-full blur-3xl" />

      {/* Floating particles */}
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute bottom-0 animate-float-slow"
          style={{
            left: `${el.left}%`,
            animationDuration: `${el.duration}s`,
            animationDelay: `${el.delay}s`,
            opacity: el.opacity,
          }}
        >
          {el.type === 'heart' && (
            <svg
              width={el.size}
              height={el.size}
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-[#f4a5b7]"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}

          {el.type === 'sparkle' && (
            <svg
              width={el.size}
              height={el.size}
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-[#e6c594]"
            >
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          )}

          {el.type === 'orb' && (
            <div
              className="rounded-full bg-[#fce8ec]/40 blur-[1px]"
              style={{ width: `${el.size / 2}px`, height: `${el.size / 2}px` }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

