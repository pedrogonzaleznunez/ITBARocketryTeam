'use client';

/**
 * Navigation Component
 * 
 * Sticky navigation bar with blur effect.
 * Features brand logo and CTA button.
 */

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { useSectionPassed } from '@/hooks/useSectionPassed';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollTo = useSmoothScroll();
  const hasPassedHero = useSectionPassed({
    elementId: 'hero',
    threshold: 0,
    rootMargin: '-100px 0px 0px 0px',
    invert: true, // true cuando se pasa (no está visible)
  });

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
          ? 'glass shadow-subtle border-b border-gray-200/20 dark:border-gray-800/20'
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
              hasPassedHero ? "gap-3" : "gap-0"
            )}
            aria-label="ITBA Rocketry Team - Inicio"
          >
            <div className={clsx(
              "transition-all duration-700 ease-in-out pointer-events-none overflow-hidden",
              hasPassedHero 
                ? "w-16 h-16 md:w-20 md:h-20 delay-200" 
                : "w-0"
            )}>
              <Image
                src="/sequence/ITBA_Rocketry_Team-Redondo_SinFondo.webp"
                alt="ITBA Rocketry Team Logo"
                width={80}
                height={80}
                className={clsx(
                  "w-16 h-16 md:w-20 md:h-20 transition-all duration-700 ease-in-out",
                  hasPassedHero 
                    ? "opacity-100 scale-100 translate-x-0 delay-200" 
                    : "opacity-0 scale-95 -translate-x-8"
                )}
                style={{ width: 'auto', height: 'auto' }}
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
            className="btn-primary text-sm md:text-base"
          >
            Conocer más
          </a>
        </div>
      </nav>
    </header>
  );
}

