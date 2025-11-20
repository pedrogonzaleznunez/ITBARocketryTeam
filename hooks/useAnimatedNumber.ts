'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Hook para animar números desde 0 hasta un valor objetivo
 * 
 * @param targetValue - Valor objetivo con formato (ej: "50+", "3.5km", "25+")
 * @param duration - Duración de la animación en milisegundos (default: 2000)
 * @param startOnMount - Si true, inicia la animación al montar. Si false, usa Intersection Observer (default: false)
 * @returns Objeto con displayValue (valor actual animado) y elementRef (ref para el Intersection Observer)
 */
export function useAnimatedNumber(
  targetValue: string,
  duration: number = 2000,
  startOnMount: boolean = false
) {
  const [displayValue, setDisplayValue] = useState('0');
  const [hasStarted, setHasStarted] = useState(startOnMount);
  const elementRef = useRef<HTMLDivElement>(null);

  // Extraer el número y el sufijo del valor objetivo
  const parseValue = (value: string) => {
    const match = value.match(/^([\d.]+)(.*)$/);
    if (match) {
      return {
        number: parseFloat(match[1]),
        suffix: match[2] || ''
      };
    }
    return { number: 0, suffix: '' };
  };

  useEffect(() => {
    if (!hasStarted) {
      // Usar Intersection Observer para iniciar la animación cuando el elemento es visible
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasStarted) {
              setHasStarted(true);
              observer.disconnect();
            }
          });
        },
        { threshold: 0.1 }
      );

      if (elementRef.current) {
        observer.observe(elementRef.current);
      }

      return () => observer.disconnect();
    }

    if (hasStarted) {
      const { number: targetNumber, suffix } = parseValue(targetValue);
      const startTime = Date.now();
      const startNumber = 0;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Función de easing (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);

        const currentNumber = startNumber + (targetNumber - startNumber) * easeOut;

        // Formatear el número según el valor original
        if (targetValue.includes('.')) {
          // Si el valor original tiene decimales, mostrar decimales
          setDisplayValue(currentNumber.toFixed(1) + suffix);
        } else {
          // Si es entero, mostrar entero
          setDisplayValue(Math.floor(currentNumber) + suffix);
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Asegurar que llegue al valor exacto al final
          setDisplayValue(targetValue);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [hasStarted, targetValue, duration]);

  return { displayValue, elementRef };
}

