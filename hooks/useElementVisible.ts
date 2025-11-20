'use client';

import { useEffect, useState, useRef } from 'react';

interface UseElementVisibleOptions {
  /**
   * Ref del elemento a observar
   */
  elementRef: React.RefObject<HTMLElement>;
  /**
   * Threshold para el Intersection Observer (0-1)
   * @default 0.1
   */
  threshold?: number;
  /**
   * Root margin para el Intersection Observer
   * @default '0px'
   */
  rootMargin?: string;
  /**
   * Si true, el observer se desconecta después de la primera detección
   * @default true
   */
  once?: boolean;
}

/**
 * Hook para detectar cuando un elemento entra en el viewport usando Intersection Observer.
 * Útil para activar animaciones cuando un elemento se vuelve visible.
 *
 * @example
 * // Uso básico
 * const sectionRef = useRef<HTMLDivElement>(null);
 * const isVisible = useElementVisible({ elementRef: sectionRef });
 *
 * @example
 * // Con opciones personalizadas
 * const isVisible = useElementVisible({
 *   elementRef: sectionRef,
 *   threshold: 0.5,
 *   rootMargin: '-50px',
 *   once: false // Seguir observando después de la primera detección
 * });
 */
export function useElementVisible({
  elementRef,
  threshold = 0.1,
  rootMargin = '0px',
  once = true,
}: UseElementVisibleOptions) {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once && observerRef.current) {
              observerRef.current.disconnect();
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [elementRef, threshold, rootMargin, once]);

  return isVisible;
}

