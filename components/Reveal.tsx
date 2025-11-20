'use client';

/**
 * Reveal Component
 * 
 * Animates children into view using GSAP and ScrollTrigger.
 * Respects prefers-reduced-motion.
 * 
 * Default animation: fade in with slight upward motion.
 */

import { useEffect, useRef, ReactNode } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
}

export default function Reveal({
  children,
  delay = 0,
  duration = 0.8,
  y = 24,
  className,
}: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Skip animation if user prefers reduced motion
      gsap.set(element, { opacity: 1, y: 0 });
      return;
    }

    // Set initial state
    gsap.set(element, { opacity: 0, y });

    // Create ScrollTrigger animation
    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top bottom-=100',
      onEnter: () => {
        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
        });
      },
      once: true,
    });

    // Cleanup
    return () => {
      trigger.kill();
    };
  }, [delay, duration, y]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

