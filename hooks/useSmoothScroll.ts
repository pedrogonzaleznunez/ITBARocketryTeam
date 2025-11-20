'use client';

import { useRef } from 'react';

interface UseSmoothScrollOptions {
  /**
   * Tiempo en milisegundos antes de permitir otro scroll (default: 1000)
   */
  cooldown?: number;
  /**
   * Comportamiento del scroll (default: 'smooth')
   */
  behavior?: ScrollBehavior;
}

/**
 * Hook para realizar scroll suave a secciones con protección contra clics múltiples
 * 
 * @example
 * // Uso básico
 * const scrollTo = useSmoothScroll();
 * 
 * <a href="#hero" onClick={(e) => scrollTo(e, 'hero')}>
 *   Ir al Hero
 * </a>
 * 
 * @example
 * // Con opciones personalizadas
 * const scrollTo = useSmoothScroll({ cooldown: 500, behavior: 'smooth' });
 * 
 * @example
 * // En un componente
 * const scrollToSection = useSmoothScroll();
 * 
 * const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
 *   scrollToSection(e, sectionId);
 * };
 */
export function useSmoothScroll(options: UseSmoothScrollOptions = {}) {
  const { cooldown = 1000, behavior = 'smooth' } = options;
  const isScrollingRef = useRef(false);

  /**
   * Función para hacer scroll suave a una sección
   * 
   * @param e - Evento del mouse (opcional, se puede pasar null si no se necesita)
   * @param sectionId - ID de la sección a la que hacer scroll
   */
  const scrollTo = (
    e: React.MouseEvent<HTMLAnchorElement> | null,
    sectionId: string
  ) => {
    // Prevenir comportamiento por defecto si hay evento
    if (e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Quitar el focus del enlace para evitar que quede en estado activo
      (e.currentTarget as HTMLElement).blur();
    }

    // Protección contra clics múltiples
    if (isScrollingRef.current) return;

    isScrollingRef.current = true;
    const section = document.getElementById(sectionId);
    
    if (section) {
      section.scrollIntoView({ behavior });
      // Resetear el flag después del cooldown
      setTimeout(() => {
        isScrollingRef.current = false;
      }, cooldown);
    } else {
      // Si no se encuentra la sección, resetear inmediatamente
      isScrollingRef.current = false;
    }
  };

  return scrollTo;
}

