'use client';

import { useEffect, useState, useCallback } from 'react';

interface UseSequentialAnimationOptions {
  /**
   * Número total de elementos a animar
   */
  totalItems: number;
  /**
   * Si true, inicia la animación inmediatamente
   * Si false, espera a que se active manualmente
   * @default false
   */
  startOnMount?: boolean;
  /**
   * Delay base en milisegundos entre cada elemento
   * @default 100
   */
  baseDelay?: number;
  /**
   * Variación aleatoria del delay en milisegundos
   * El delay final será: baseDelay * position + random(0, randomVariation)
   * @default 100
   */
  randomVariation?: number;
  /**
   * Si true, los elementos aparecen en orden aleatorio
   * Si false, aparecen en orden secuencial
   * @default true
   */
  randomOrder?: boolean;
}

/**
 * Hook para animar elementos de forma secuencial con orden aleatorio opcional.
 * Retorna un Set con los índices de los elementos que ya deben ser visibles.
 *
 * @example
 * // Animación con orden aleatorio
 * const visibleItems = useSequentialAnimation({
 *   totalItems: 10,
 *   startOnMount: false,
 *   baseDelay: 100,
 *   randomVariation: 100
 * });
 *
 * // Usar con un trigger externo
 * const [hasStarted, setHasStarted] = useState(false);
 * const visibleItems = useSequentialAnimation({
 *   totalItems: sponsors.length,
 *   startOnMount: hasStarted
 * });
 */
export function useSequentialAnimation({
  totalItems,
  startOnMount = false,
  baseDelay = 100,
  randomVariation = 100,
  randomOrder = true,
}: UseSequentialAnimationOptions) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [hasStarted, setHasStarted] = useState(startOnMount);

  useEffect(() => {
    if (!hasStarted || totalItems === 0) return;

    // Crear array de índices
    const indices = Array.from({ length: totalItems }, (_, i) => i);
    
    // Shuffle si se requiere orden aleatorio
    const order = randomOrder ? shuffleArray([...indices]) : indices;

    // Programar la aparición de cada elemento
    const timeouts: NodeJS.Timeout[] = [];
    
    order.forEach((itemIndex, position) => {
      const delay = position * baseDelay + Math.random() * randomVariation;
      
      const timeout = setTimeout(() => {
        setVisibleItems((prev) => new Set([...prev, itemIndex]));
      }, delay);
      
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [hasStarted, totalItems, baseDelay, randomVariation, randomOrder]);

  /**
   * Función para iniciar la animación manualmente
   */
  const start = useCallback(() => {
    setHasStarted((prev) => {
      if (!prev) return true;
      return prev;
    });
  }, []);

  /**
   * Función para reiniciar la animación
   */
  const reset = useCallback(() => {
    setVisibleItems(new Set());
    setHasStarted(false);
  }, []);

  return {
    visibleItems,
    hasStarted,
    start,
    reset,
  };
}

/**
 * Función auxiliar para mezclar un array usando el algoritmo Fisher-Yates
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

