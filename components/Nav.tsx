'use client';

/**
 * Navigation Component
 * 
 * Sticky navigation bar with blur effect.
 * Features brand logo and CTA button.
 */

import { useEffect, useState } from 'react';
import clsx from 'clsx';

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCTA = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const ctaSection = document.getElementById('cta');
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
            className="text-xl md:text-2xl font-bold tracking-tight focus-ring rounded-lg px-2 -ml-2"
            aria-label="ITBA Rocketry Team - Inicio"
          >
            <span className="text-gradient">ITBA Rocketry</span>
          </a>

          {/* CTA Button */}
          <a
            href="#cta"
            onClick={scrollToCTA}
            className="btn-primary text-sm md:text-base"
          >
            Conocer más
          </a>
        </div>
      </nav>
    </header>
  );
}

