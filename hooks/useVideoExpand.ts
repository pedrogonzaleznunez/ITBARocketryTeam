'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

interface UseVideoExpandOptions {
  /**
   * Ref del elemento de video a observar
   */
  videoRef: React.RefObject<HTMLElement>;
  /**
   * Tiempo en milisegundos que el usuario debe estar detenido antes de activar la expansión
   * @default 2000
   */
  idleDelay?: number;
  /**
   * Threshold para el Intersection Observer (0-1)
   * Define qué porcentaje del elemento debe estar visible
   * @default 0.5
   */
  threshold?: number;
  /**
   * Root margin para el Intersection Observer
   * @default '0px'
   */
  rootMargin?: string;
  /**
   * Si true, desactiva la funcionalidad del hook
   * @default false
   */
  disabled?: boolean;
}

/**
 * Hook para expandir un video a full width cuando el usuario se detiene
 * en la sección del video después de hacer scroll.
 * 
 * El hook detecta cuando:
 * 1. El video está visible en el viewport
 * 2. El usuario no ha hecho scroll por un tiempo determinado (idleDelay)
 * 3. El usuario vuelve a hacer scroll para desactivar la expansión
 * 
 * @example
 * ```tsx
 * const videoContainerRef = useRef<HTMLDivElement>(null);
 * const isExpanded = useVideoExpand({ 
 *   videoRef: videoContainerRef,
 *   idleDelay: 2500 
 * });
 * 
 * return (
 *   <div 
 *     ref={videoContainerRef}
 *     className={isExpanded ? 'expanded-video' : 'normal-video'}
 *   >
 *     <video>...</video>
 *   </div>
 * );
 * ```
 */
export function useVideoExpand({
  videoRef,
  idleDelay = 2000,
  threshold = 0.5,
  rootMargin = '0px',
  disabled = false,
}: UseVideoExpandOptions) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollYRef = useRef<number>(0);
  const isScrollingRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  /**
   * Limpia el timer de idle cuando el componente se desmonta o cambia
   */
  const clearIdleTimer = useCallback(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  }, []);

  /**
   * Inicia el timer de idle después de que el usuario deje de hacer scroll
   */
  const startIdleTimer = useCallback(() => {
    clearIdleTimer();
    
    if (!isVisible || disabled) return;

    idleTimerRef.current = setTimeout(() => {
      setIsExpanded(true);
    }, idleDelay);
  }, [isVisible, idleDelay, disabled, clearIdleTimer]);

  /**
   * Maneja el evento de scroll
   */
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Detecta si el usuario está scrolleando
    if (Math.abs(currentScrollY - lastScrollYRef.current) > 5) {
      isScrollingRef.current = true;
      lastScrollYRef.current = currentScrollY;

      // Si está expandido, desactiva la expansión inmediatamente
      if (isExpanded) {
        setIsExpanded(false);
      }

      // Limpia el timer de idle
      clearIdleTimer();

      // Limpia el timeout anterior de "dejó de scrollear"
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // En móviles, el scroll momentum puede continuar, así que esperamos un poco más
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const scrollEndDelay = isMobile ? 300 : 100;

      // Después de que el usuario deje de scrollear, reinicia el timer de idle
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        if (isVisible) {
          startIdleTimer();
        }
      }, scrollEndDelay);
    }
  }, [isExpanded, isVisible, clearIdleTimer, startIdleTimer]);

  /**
   * Maneja el evento de wheel (scroll con mouse/trackpad)
   * Esto es más preciso para detectar scrolling activo
   */
  const handleWheel = useCallback(() => {
    if (isExpanded) {
      setIsExpanded(false);
    }
    clearIdleTimer();
    
    // Reinicia el timer después de que el usuario deje de usar el wheel
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const scrollEndDelay = isMobile ? 300 : 100;
    
    scrollTimeoutRef.current = setTimeout(() => {
      if (isVisible && !isScrollingRef.current) {
        startIdleTimer();
      }
    }, scrollEndDelay);
  }, [isExpanded, isVisible, clearIdleTimer, startIdleTimer]);

  // Observa la visibilidad del elemento de video
  useEffect(() => {
    if (disabled || !videoRef.current) return;

    let previousVisible = false;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const nowVisible = entry.isIntersecting;
          
          setIsVisible((prevVisible) => {
            previousVisible = prevVisible;
            return nowVisible;
          });

          // Si el elemento acaba de volverse visible, inicia el timer
          if (nowVisible && !previousVisible) {
            // Pequeño delay para asegurar que el estado se actualizó
            setTimeout(() => {
              clearIdleTimer();
              if (!disabled) {
                idleTimerRef.current = setTimeout(() => {
                  setIsExpanded(true);
                }, idleDelay);
              }
            }, 0);
          }

          // Si el elemento deja de ser visible, desactiva la expansión
          if (!nowVisible && previousVisible) {
            setIsExpanded(false);
            clearIdleTimer();
          }
        });
      },
      { threshold, rootMargin }
    );

    observerRef.current.observe(videoRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      clearIdleTimer();
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [videoRef, threshold, rootMargin, disabled, idleDelay, clearIdleTimer]);

  // Escucha eventos de scroll
  useEffect(() => {
    if (disabled) return;

    // Handler para touchstart en móviles
    const handleTouchStart = () => {
      if (isExpanded) {
        setIsExpanded(false);
      }
      clearIdleTimer();
    };

    // Usa passive listeners para mejor rendimiento
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    // También escucha touchmove y touchstart para dispositivos móviles
    window.addEventListener('touchmove', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, [handleScroll, handleWheel, disabled, isExpanded, clearIdleTimer]);

  // Limpia los timers cuando el componente se desmonta o cuando disabled cambia
  useEffect(() => {
    if (disabled) {
      setIsExpanded(false);
      clearIdleTimer();
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    }
  }, [disabled, clearIdleTimer]);

  return isExpanded;
}

