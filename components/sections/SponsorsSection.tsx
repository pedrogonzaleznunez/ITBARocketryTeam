'use client';

/**
 * Sponsors Section
 * 
 * Displays sponsor logos with random popping animation.
 * Logos appear one by one in random order when section enters viewport.
 */

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';
import { useElementVisible } from '@/hooks/useElementVisible';
import { useSequentialAnimation } from '@/hooks/useSequentialAnimation';

interface Sponsor {
  name: string;
  logo: string; // Path to logo image
}

// Tamaño de los logos (tamaño máximo en píxeles)
const LOGO_SIZE = 300;

// Array de sponsors
const sponsors: Sponsor[] = [
  { 
    name: 'Blue Origin', 
    logo: '/sequence/sponsors/Blue_Origin.webp'
  },
  { 
    name: 'Virgin Galactic', 
    logo: '/sequence/sponsors/Virgin_Galactic.webp'
  },
  { 
    name: 'Northrop Grumman', 
    logo: '/sequence/sponsors/Northrop_Grumman.webp'
  },
  { 
    name: 'Aerojet Rocketdyne', 
    logo: '/sequence/sponsors/Aerojet_Rocketdyne.webp'
  },
  { 
    name: 'Honeywell', 
    logo: '/sequence/sponsors/Honeywell.webp'
  },
  { 
    name: 'Los Alamos National Laboratory', 
    logo: '/sequence/sponsors/Los_Alamos.webp'
  },
  { 
    name: 'Marotta', 
    logo: '/sequence/sponsors/Marotta.webp'
  },
  { 
    name: 'Sandia National Laboratories', 
    logo: '/sequence/sponsors/Sandia.webp'
  },
  { 
    name: 'ANSYS', 
    logo: '/sequence/sponsors/ANSYS.webp'
  },
  { 
    name: 'SolidWorks', 
    logo: '/sequence/sponsors/SolidWorks.webp'
  },
];


/**
 * Calcula el número óptimo de columnas para el grid basado en la cantidad de items.
 * Asegura una distribución equilibrada en el patrón de ajedrez.
 */
function calculateOptimalCols(itemCount: number): number {
  if (itemCount <= 4) return 4;
  if (itemCount <= 6) return 4;
  if (itemCount <= 10) return 5;
  if (itemCount <= 12) return 6;
  if (itemCount <= 16) return 6;
  return 8;
}

/**
 * Calcula el número total de casilleros necesarios para el patrón de ajedrez.
 * En un patrón de ajedrez, aproximadamente la mitad de los casilleros son "blancos".
 */
function calculateTotalSquares(cols: number, itemCount: number): number {
  return cols * Math.ceil((itemCount * 2) / cols);
}

/**
 * Determina si un casillero en el grid es un casillero "blanco" (donde van los logos).
 */
function isWhiteSquare(row: number, col: number): boolean {
  return (row + col) % 2 === 0;
}

/**
 * Cuenta cuántos casilleros blancos hay antes de un índice dado en el grid.
 */
function countWhiteSquaresBefore(gridIndex: number, cols: number): number {
  let count = 0;
  for (let i = 0; i < gridIndex; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;
    if (isWhiteSquare(row, col)) count++;
  }
  return count;
}

export default function SponsorsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useElementVisible({ 
    elementRef: sectionRef, 
    threshold: 0.1 
  });
  
  const { visibleItems, start } = useSequentialAnimation({
    totalItems: sponsors.length,
    startOnMount: false,
    baseDelay: 100,
    randomVariation: 100,
    randomOrder: true,
  });

  // Iniciar animación cuando la sección se vuelve visible
  useEffect(() => {
    if (isVisible) {
      start();
    }
  }, [isVisible, start]);

  if (sponsors.length === 0) {
    return null;
  }

  const cols = calculateOptimalCols(sponsors.length);
  const totalSquares = calculateTotalSquares(cols, sponsors.length);

  return (
    <Section id="sponsors" className="bg-[#ffffff] text-[#111727]">
      <div ref={sectionRef} className="max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-fluid-4xl lg:text-fluid-5xl font-bold tracking-tight mb-6 lg:mb-8 text-center">
            Auspiciantes
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-fluid-lg text-gray-300 mb-12 lg:mb-16 text-center max-w-2xl mx-auto">
            Empresas e instituciones que apoyan nuestro proyecto y hacen posible la innovación.
          </p>
        </Reveal>

        {/* Sponsors Grid - Chessboard pattern */}
        <div 
          className="grid gap-x-4 lg:gap-x-6 gap-y-0 justify-center"
          style={{ 
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            maxWidth: '100%',
            rowGap: '0px'
          }}
        >
          {Array.from({ length: totalSquares }).map((_, gridIndex) => {
            const row = Math.floor(gridIndex / cols);
            const col = gridIndex % cols;
            
            if (!isWhiteSquare(row, col)) {
              return <div key={gridIndex} className="aspect-square" />;
            }
            
            const whiteSquareCount = countWhiteSquaresBefore(gridIndex, cols);
            
            if (whiteSquareCount >= sponsors.length) {
              return <div key={gridIndex} className="aspect-square" />;
            }
            
            const sponsorIndex = whiteSquareCount;
            const sponsor = sponsors[sponsorIndex];
            const isLogoVisible = visibleItems.has(sponsorIndex);

            return (
              <div
                key={gridIndex}
                className={`
                  flex items-center justify-center
                  aspect-square
                  transition-all duration-1000 ease-out
                  ${isLogoVisible 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-90 translate-y-8'
                  }
                `}
              >
                <div className="w-full h-full flex items-center justify-center p-4 relative">
                  <Image
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    width={LOGO_SIZE}
                    height={LOGO_SIZE}
                    className="object-contain"
                    style={{ 
                      maxWidth: `${LOGO_SIZE}px`, 
                      maxHeight: `${LOGO_SIZE}px`,
                      width: 'auto',
                      height: 'auto'
                    }}
                    loading="lazy"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

