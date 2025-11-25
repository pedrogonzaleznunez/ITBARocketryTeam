'use client';

/**
 * Sección de Auspiciantes
 * 
 * Muestra logos de auspiciantes con animación aleatoria de aparición.
 * Los logos aparecen uno por uno en orden aleatorio cuando la sección entra al viewport.
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
const LOGO_SIZE = 500;

// Array de auspiciantes
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

  // Iniciar animación cuando la sección se vuelve visible en el viewport
  useEffect(() => {
    if (isVisible) {
      start();
    }
  }, [isVisible, start]);

  if (sponsors.length === 0) {
    return null;
  }

  return (
    <Section id="sponsors" className="bg-[#ffffff] text-[#111727]">
      <div ref={sectionRef} className="max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-fluid-4xl lg:text-fluid-5xl font-bold tracking-tight mb-6 lg:mb-8 text-center">
            Auspiciantes
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-fluid-lg text-gray-400 mb-12 lg:mb-16 text-center max-w-2xl mx-auto">
            Empresas e instituciones que apoyan nuestro proyecto y hacen posible la innovación.
          </p>
        </Reveal>

        {/* Grid de Auspiciantes - Grid responsive */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-8">
          {sponsors.map((sponsor, index) => {
            const isLogoVisible = visibleItems.has(index);

            return (
              <div
                key={index}
                className={`
                  flex items-center justify-center
                  aspect-square
                  p-4 lg:p-6
                  transition-all duration-1000 ease-out
                  ${isLogoVisible 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-90 translate-y-8'
                  }
                `}
              >
                <div className="w-full h-full flex items-center justify-center relative">
                  <Image
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    width={LOGO_SIZE}
                    height={LOGO_SIZE}
                    className="object-contain w-full h-full"
                    style={{ 
                      maxWidth: '100%',
                      maxHeight: '100%',
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

