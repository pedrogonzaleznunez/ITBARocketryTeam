'use client';

/**
 * SmoothScroller Component
 * 
 * Initializes Lenis smooth scrolling and bridges it with GSAP ScrollTrigger.
 * Respects prefers-reduced-motion media query.
 * 
 * Features:
 * - Smooth scroll with customizable duration
 * - Syncs with GSAP ScrollTrigger for animations
 * - Accessibility: disables smooth scroll if user prefers reduced motion
 * - Proper cleanup on unmount
 */

import { useEffect, useRef, ReactNode } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface SmoothScrollerProps {
  children: ReactNode;
}

export default function SmoothScroller({ children }: SmoothScrollerProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Don't initialize smooth scroll if user prefers reduced motion
      return;
    }

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Connect Lenis scroll to GSAP ScrollTrigger
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Integrate with GSAP's ticker for optimal performance
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable GSAP's default lag smoothing (Lenis handles it)
    gsap.ticker.lagSmoothing(0);

    // Cleanup function
    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      
      lenis.destroy();
      lenisRef.current = null;

      // Re-enable lag smoothing
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, []);

  return <>{children}</>;
}

