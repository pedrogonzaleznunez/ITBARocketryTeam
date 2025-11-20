'use client';

import { useEffect, useRef } from 'react';

const RockerDivider = () => {
  const rocketRef = useRef<SVGGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Pequeño delay para asegurar que el DOM esté completamente renderizado
    timeoutRef.current = setTimeout(() => {
      const path = pathRef.current;
      const rocket = rocketRef.current;

      if (!path || !rocket) return;

      const pathLength = path.getTotalLength();
      const duration = 8000;
      const rocketWidth = 20;
      const rocketHeight = 80;

      let start: number | null = null;

      const animate = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const t = (elapsed % duration) / duration;

        const currentPoint = path.getPointAtLength(t * pathLength);
        const nextPoint = path.getPointAtLength((t + 0.01) * pathLength);

        const angle =
          (Math.atan2(nextPoint.y - currentPoint.y, nextPoint.x - currentPoint.x) * 180) /
          Math.PI;

        const orientationOffset = 90;
        rocket.setAttribute(
          'transform',
          `translate(${currentPoint.x - rocketWidth / 2}, ${currentPoint.y - rocketHeight / 2}) rotate(${angle + orientationOffset})`
        );

        animationFrameRef.current = requestAnimationFrame(animate);
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    }, 100);

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <svg
      width="100%"
      height="140"
      viewBox="0 0 1440 140"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <style>{`
        .orbit {
          stroke-dasharray: 10 6;
          stroke-linecap: round;
          animation: drawOrbit 6s linear infinite alternate;
        }

        @keyframes drawOrbit {
          0% { stroke-dashoffset: 0; opacity: 0.5; }
          100% { stroke-dashoffset: 60; opacity: 0.7; }
        }

        .rocket {
          transform-box: fill-box;
          transform-origin: center;
        }
      `}</style>

      {/* Fondo integrado al resto del sitio */}
      <rect width="1440" height="140" fill="#111727" />

      {/* Órbita animada */}
      <path
        ref={pathRef}
        className="orbit"
        d="M0 100 Q 360 40 720 90 T 1440 90"
        stroke="#38BDF8"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />

      {/* Grupo del cohete, forma realista y minimalista basada en la imagen */}
      <g
        ref={rocketRef}
        className="rocket"
        transform="translate(0, 0)"
      >
        {/* Nariz cónica */}
        <polygon points="10,0 14,10 6,10" fill="#D1D5DB" />

        {/* Cuerpo principal */}
        <rect x="6" y="10" width="8" height="50" rx="2" fill="#94A3B8" />

        {/* División modular (anillos) */}
        <rect x="6" y="22" width="8" height="2" fill="#CBD5E1" />
        <rect x="6" y="36" width="8" height="2" fill="#CBD5E1" />

        {/* Aletas (trapezoidales) */}
        <polygon points="6,60 2,75 6,75" fill="#9CA3AF" />
        <polygon points="14,60 18,75 14,75" fill="#9CA3AF" />

        {/* Motor base */}
        <rect x="8" y="75" width="4" height="5" fill="#0EA5E9" />
      </g>
    </svg>
  );
};

export default RockerDivider;