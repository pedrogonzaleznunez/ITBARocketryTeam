'use client';

/**
 * Sección Highlights
 * 
 * Grid de características que muestra las capacidades clave.
 * Cada tarjeta entra con animación Reveal.
 * Efecto parallax sutil en las imágenes.
 */

import { useEffect, useRef } from 'react';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';
import { gsap } from '@/lib/gsap';
import { FaRocket, FaPlane, FaSatellite, FaParachuteBox } from 'react-icons/fa';

const highlights = [
  {
    title: 'Propulsión Avanzada',
    description: 'Motores Híbridos de desarrollo propio validados a través de ensayos de banco y simulación',
    icon: FaRocket,
  },
  {
    title: 'Aerodinámica',
    description: 'Diseño computacional CFD para máxima eficiencia y estabilidad en vuelo supersónico.',
    icon: FaPlane,
  },
  {
    title: 'Telemetría en Tiempo Real',
    description: 'Sistemas de comunicación avanzados para monitoreo completo durante todas las fases del vuelo.',
    icon: FaSatellite,
  },
  {
    title: 'Recuperación Inteligente',
    description: 'Sistema dual de paracaídas con despliegue automatizado basado en altitud y velocidad.',
    icon: FaParachuteBox,
  },
];

export default function HighlightsSection() {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Subtle parallax on scroll for cards
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      
      gsap.to(card, {
        y: -20 * (index % 2 === 0 ? 1 : -1),
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });
  }, []);

  return (
    <Section id="highlights" className="bg-[#111727]">
      <div className="text-center mb-16 lg:mb-20">
        <Reveal>
          <h2 className="text-fluid-4xl lg:text-fluid-5xl font-bold tracking-tight mb-6">
            Tecnología de punta
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-fluid-lg text-gray-400 max-w-2xl mx-auto">
            Cada componente diseñado para alcanzar nuevos récords de altura y precisión.
          </p>
        </Reveal>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
        {highlights.map((highlight, index) => (
          <Reveal key={index} delay={0.1 * index}>
            <div
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group relative bg-gray-900 rounded-2xl p-8 lg:p-10 shadow-subtle hover:shadow-lg transition-all duration-500 border border-gray-800/50"
            >
              {/* Icon */}
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-500 text-primary-500">
                <highlight.icon />
              </div>

              {/* Content */}
              <h3 className="text-fluid-2xl font-bold mb-4 tracking-tight">
                {highlight.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {highlight.description}
              </p>

              {/* Decorative gradient on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/0 to-purple-500/0 group-hover:from-primary-500/5 group-hover:to-purple-500/5 transition-all duration-500 pointer-events-none" />
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

