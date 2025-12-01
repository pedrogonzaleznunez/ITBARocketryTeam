'use client';

/**
 * Componente de Navegación
 * 
 * Barra de navegación sticky con efecto blur.
 * Incluye logo de la marca y botón CTA.
 */

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollTo = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'glass shadow-subtle border-b border-gray-800/20'
          : 'bg-transparent'
      )}
    >
      <nav className="container-custom py-4 md:py-6">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <a
            href="#hero"
            onClick={(e) => scrollTo(e, 'hero')}
            className={clsx(
              "flex items-center focus-ring rounded-lg px-2 -ml-2 transition-all duration-700 ease-in-out",
              "gap-3"
            )}
            aria-label="ITBA Rocketry Team - Inicio"
          >
            <div className="relative w-16 h-16 md:w-20 md:h-20 pointer-events-none overflow-hidden">
              <Image
                src="/sequence/ITBA_Rocketry_Team-Redondo.webp"
                alt="ITBA Rocketry Team Logo"
                width={80}
                height={80}
                className="w-full h-full object-contain"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                priority
              />
            </div>
            <span className="text-xl md:text-2xl font-bold tracking-tight text-gradient whitespace-nowrap transition-all duration-700 ease-in-out">
              ITBA Rocketry
            </span>
          </a>

          {/* CTA Button */}
          <a
            href="#cta"
            onClick={(e) => scrollTo(e, 'cta')}
            className={clsx(
              "btn-primary transition-all duration-700 ease-in-out",
              "flex items-center justify-center",
              "px-2.5 py-2 md:px-4 md:py-2.5",
              "text-xs md:text-base",
              "whitespace-nowrap"
            )}
            aria-label="Conocer más sobre ITBA Rocketry Team"
          >
            Conocer más
          </a>
        </div>
      </nav>
    </header>
  );
}

