'use client';

import { useAnimatedNumber } from '@/hooks/useAnimatedNumber';
import { HTMLAttributes } from 'react';

interface AnimatedNumberProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Valor objetivo con formato (ej: "50+", "3.5km", "25+")
   */
  value: string;
  /**
   * Duración de la animación en milisegundos (default: 2000)
   */
  duration?: number;
  /**
   * Si true, inicia la animación al montar. Si false, usa Intersection Observer (default: false)
   */
  startOnMount?: boolean;
}

/**
 * Componente para mostrar un número animado que cuenta desde 0 hasta el valor objetivo
 * 
 * @example
 * <AnimatedNumber value="50+" duration={2000} />
 * <AnimatedNumber value="3.5km" className="text-2xl" />
 */
export default function AnimatedNumber({ 
  value, 
  duration = 2000,
  startOnMount = false,
  className = '',
  ...props
}: AnimatedNumberProps) {
  const { displayValue, elementRef } = useAnimatedNumber(value, duration, startOnMount);

  return (
    <div 
      ref={elementRef} 
      className={className}
      {...props}
    >
      {displayValue}
    </div>
  );
}

