'use client';

import { useState, useEffect, useRef, CSSProperties } from 'react';

/**
 * Componente Divider con Estrellas y Estrellas Fugaces
 * 
 * Muestra un fondo estrellado con estrellas que se mueven suavemente.
 * Genera estrellas fugaces periódicamente que cruzan el divider diagonalmente.
 */

const starCount = 50;

// Configuración de estrellas fugaces
const SHOOTING_STAR_MIN_INTERVAL = 3000; // 3 segundos
const SHOOTING_STAR_MAX_INTERVAL = 8000; // 8 segundos
const SHOOTING_STAR_MIN_DURATION = 1500; // 1.5 segundos
const SHOOTING_STAR_MAX_DURATION = 2500; // 2.5 segundos
const SHOOTING_STAR_LENGTH = 80; // Longitud de la cola en píxeles
const SHOOTING_STAR_COLOR = '#5EC8E8'; // Celeste suave

const pseudoRand = (seed: number) => {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
};

const stars = Array.from({ length: starCount }, (_, i) => {
  const cx = 40 + pseudoRand(i * 137) * (1440 - 80);
  const cy = 20 + pseudoRand(i * 521) * (120 - 40);
  const r = 0.8 + pseudoRand(i * 353) * 2.2;
  const opacity = 0.4 + pseudoRand(i * 727) * 0.5;
  const delay = pseudoRand(i * 911) * 4;
  const duration = 4 + pseudoRand(i * 613) * 4;
  const driftX = (pseudoRand(i * 419) - 0.5) * 20;
  const driftY = (pseudoRand(i * 281) - 0.5) * 10;

  return { cx, cy, r, opacity, delay, duration, driftX, driftY };
});

/**
 * Interfaz para una estrella fugaz
 */
interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number;
}

/**
 * Genera una nueva estrella fugaz con parámetros aleatorios
 */
const generateShootingStar = (id: number, timestamp: number): ShootingStar => {
  const rand = pseudoRand(timestamp + id);
  const rand2 = pseudoRand(timestamp + id + 1000);
  const rand3 = pseudoRand(timestamp + id + 2000);
  
  // Determinar desde qué borde comienza (0: arriba, 1: derecha, 2: abajo, 3: izquierda)
  const edge = Math.floor(rand * 4);
  
  let startX: number, startY: number, endX: number, endY: number;
  
  switch (edge) {
    case 0: // Arriba
      startX = rand2 * 1440;
      startY = 0;
      endX = startX + (rand3 - 0.5) * 400;
      endY = 120;
      break;
    case 1: // Derecha
      startX = 1440;
      startY = rand2 * 120;
      endX = 0;
      endY = startY + (rand3 - 0.5) * 200;
      break;
    case 2: // Abajo
      startX = rand2 * 1440;
      startY = 120;
      endX = startX + (rand3 - 0.5) * 400;
      endY = 0;
      break;
    default: // Izquierda
      startX = 0;
      startY = rand2 * 120;
      endX = 1440;
      endY = startY + (rand3 - 0.5) * 200;
      break;
  }
  
  // Asegurar que el punto final esté dentro del viewBox
  endX = Math.max(0, Math.min(1440, endX));
  endY = Math.max(0, Math.min(120, endY));
  
  const duration = SHOOTING_STAR_MIN_DURATION + 
    (SHOOTING_STAR_MAX_DURATION - SHOOTING_STAR_MIN_DURATION) * rand;
  
  return {
    id,
    startX,
    startY,
    endX,
    endY,
    duration,
  };
};

const StarsDivider = () => {
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const idCounterRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    /**
     * Función para crear una nueva estrella fugaz
     */
    const createShootingStar = () => {
      const id = idCounterRef.current++;
      const newStar = generateShootingStar(id, Date.now());
      
      setShootingStars((prev) => [...prev, newStar]);
      
      // Remover la estrella después de que termine su animación
      setTimeout(() => {
        setShootingStars((prev) => prev.filter((star) => star.id !== id));
      }, newStar.duration);
    };

    /**
     * Programa la próxima estrella fugaz con intervalo aleatorio
     */
    const scheduleNextStar = () => {
      const interval = SHOOTING_STAR_MIN_INTERVAL + 
        Math.random() * (SHOOTING_STAR_MAX_INTERVAL - SHOOTING_STAR_MIN_INTERVAL);
      
      intervalRef.current = setTimeout(() => {
        createShootingStar();
        scheduleNextStar();
      }, interval);
    };

    // Iniciar el ciclo de estrellas fugaces
    scheduleNextStar();

    // Cleanup al desmontar el componente
    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, []);

  return (
    <svg width="100%" height="120" viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="starGlow" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="blurred" />
          <feColorMatrix
            in="blurred"
            type="matrix"
            values="0 0 0 0 0.2  0 0 0 0 0.6  0 0 0 0 1  0 0 0 1 0"
            result="glow"
          />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="shootingStarGlow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blurred" />
          <feColorMatrix
            in="blurred"
            type="matrix"
            values="0 0 0 0 0.37  0 0 0 0 0.78  0 0 0 0 0.91  0 0 0 1 0"
            result="glow"
          />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Gradiente para la cola de la estrella fugaz */}
        {shootingStars.map((star) => {
          const dx = star.endX - star.startX;
          const dy = star.endY - star.startY;
          const length = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          
          return (
            <linearGradient
              key={`gradient-${star.id}`}
              id={`shootingGradient-${star.id}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor={SHOOTING_STAR_COLOR} stopOpacity="0" />
              <stop offset="20%" stopColor={SHOOTING_STAR_COLOR} stopOpacity="0.8" />
              <stop offset="100%" stopColor={SHOOTING_STAR_COLOR} stopOpacity="1" />
            </linearGradient>
          );
        })}
      </defs>
      <style>{`
        @keyframes starDrift {
          0% { transform: translate(0, 0); opacity: var(--twinkle-start); }
          50% { opacity: var(--twinkle-mid); }
          100% { transform: translate(var(--drift-x), var(--drift-y)); opacity: var(--twinkle-end); }
        }
        @keyframes shootingStarMove {
          0% {
            transform: translate(var(--start-x), var(--start-y));
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(var(--end-x), var(--end-y));
            opacity: 0;
          }
        }
        .star {
          transform-box: fill-box;
          transform-origin: center;
          animation-name: starDrift;
          animation-iteration-count: infinite;
          animation-direction: alternate;
          animation-timing-function: ease-in-out;
          animation-fill-mode: both;
          filter: url(#starGlow);
        }
        .shooting-star {
          transform-box: fill-box;
          transform-origin: 0 0;
          animation-name: shootingStarMove;
          animation-timing-function: linear;
          animation-fill-mode: both;
          filter: url(#shootingStarGlow);
        }
      `}</style>
      <rect width="1440" height="120" fill="#111727" />
      {stars.map((star, index) => (
        <circle
          key={index}
          className="star"
          cx={star.cx}
          cy={star.cy}
          r={star.r}
          fill="white"
          style={
            {
              opacity: star.opacity,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
              '--drift-x': `${star.driftX}px`,
              '--drift-y': `${star.driftY}px`,
              '--twinkle-start': star.opacity,
              '--twinkle-mid': Math.min(1, star.opacity + 0.25),
              '--twinkle-end': star.opacity * 0.9,
            } as CSSProperties
          }
        />
      ))}
      {shootingStars.map((star) => {
        const dx = star.endX - star.startX;
        const dy = star.endY - star.startY;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        
        return (
          <g
            key={star.id}
            className="shooting-star"
            style={
              {
                '--start-x': `${star.startX}px`,
                '--start-y': `${star.startY}px`,
                '--end-x': `${star.endX}px`,
                '--end-y': `${star.endY}px`,
                animationDuration: `${star.duration}ms`,
              } as CSSProperties
            }
          >
            <line
              x1={0}
              y1={0}
              x2={length}
              y2={0}
              stroke={`url(#shootingGradient-${star.id})`}
              strokeWidth="2"
              strokeLinecap="round"
              transform={`rotate(${angle})`}
            />
          </g>
        );
      })}
    </svg>
  );
};

export default StarsDivider;