'use client';

import { useEffect, useState, useRef } from 'react';

interface UseSectionPassedOptions {
  /**
   * ID del elemento a observar
   */
  elementId?: string;
  /**
   * Ref del elemento a observar (alternativa a elementId)
   */
  elementRef?: React.RefObject<HTMLElement>;
  /**
   * Threshold para el Intersection Observer (0-1)
   * @default 0
   */
  threshold?: number;
  /**
   * Root margin para el Intersection Observer
   * @default '-100px 0px 0px 0px'
   */
  rootMargin?: string;
  /**
   * Si true, retorna true cuando el elemento NO está visible (se pasó)
   * Si false, retorna true cuando el elemento está visible
   * @default true
   */
  invert?: boolean;
}

/**
 * Hook para detectar cuando se pasa una sección usando Intersection Observer
 * 
 * @example
 * // Observar por ID
 * const hasPassed = useSectionPassed({ elementId: 'hero' });
 * 
 * @example
 * // Observar por ref
 * const sectionRef = useRef<HTMLElement>(null);
 * const hasPassed = useSectionPassed({ elementRef: sectionRef });
 * 
 * @example
 * // Con opciones personalizadas
 * const hasPassed = useSectionPassed({ 
 *   elementId: 'hero',
 *   rootMargin: '-50px 0px 0px 0px',
 *   threshold: 0.1
 * });
 */
export function useSectionPassed({
  elementId,
  elementRef,
  threshold = 0,
  rootMargin = '-100px 0px 0px 0px',
  invert = true,
}: UseSectionPassedOptions = {}) {
  const [hasPassed, setHasPassed] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Obtener el elemento a observar
    let element: HTMLElement | null = null;
    
    if (elementRef?.current) {
      element = elementRef.current;
    } else if (elementId) {
      element = document.getElementById(elementId);
    }

    if (!element) return;

    // Crear el Intersection Observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (invert) {
            // Si invert es true, hasPassed = true cuando NO está visible (se pasó)
            setHasPassed(!entry.isIntersecting);
          } else {
            // Si invert es false, hasPassed = true cuando está visible
            setHasPassed(entry.isIntersecting);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [elementId, elementRef, threshold, rootMargin, invert]);

  return hasPassed;
}

