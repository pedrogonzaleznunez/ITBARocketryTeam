'use client';

/**
 * Specs Section
 * 
 * Sticky step-by-step story section.
 * Text changes as user scrolls through different steps.
 * Pin effect with GSAP ScrollTrigger.
 */

import { useEffect, useRef, useState } from 'react';
import Section from '@/components/Section';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const steps = [
  {
    title: 'Diseño',
    description: 'Modelado CAD 3D de precisión con análisis estructural completo. Cada componente optimizado para mínimo peso y máxima resistencia.',
    stat: '1000+ horas',
    label: 'de ingeniería',
  },
  {
    title: 'Construcción',
    description: 'Fabricación con materiales aeroespaciales: fibra de carbono, aluminio 7075 y composites avanzados.',
    stat: '50+ piezas',
    label: 'mecanizadas',
  },
  {
    title: 'Pruebas',
    description: 'Tests exhaustivos de propulsión, resistencia estructural y sistemas de recuperación antes de cada lanzamiento.',
    stat: '100% seguridad',
    label: 'certificada',
  },
  {
    title: 'Lanzamiento',
    description: 'Despegue vertical con telemetría en vivo. Alcance de altitudes superiores a 3000 metros con precisión milimétrica.',
    stat: '3.5 km',
    label: 'de altitud',
  },
];

export default function SpecsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Create pin effect
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${steps.length * 100}%`,
      pin: true,
      onUpdate: (self) => {
        const step = Math.floor(self.progress * steps.length);
        setActiveStep(Math.min(step, steps.length - 1));
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative min-h-screen bg-gray-900 text-white">
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen">
          {/* Left: Current step info */}
          <div className="space-y-8">
            <div className="flex items-baseline gap-4">
              <span className="text-6xl lg:text-7xl font-bold text-primary-400">
                {String(activeStep + 1).padStart(2, '0')}
              </span>
              <span className="text-xl text-gray-500">/ {steps.length}</span>
            </div>

            <h2 className="text-fluid-4xl lg:text-fluid-6xl font-bold tracking-tight">
              {steps[activeStep].title}
            </h2>

            <p className="text-fluid-lg lg:text-fluid-xl text-gray-300 leading-relaxed">
              {steps[activeStep].description}
            </p>

            <div className="pt-8 border-t border-gray-800">
              <div className="text-5xl lg:text-6xl font-bold text-gradient">
                {steps[activeStep].stat}
              </div>
              <div className="text-xl text-gray-400 mt-2">
                {steps[activeStep].label}
              </div>
            </div>
          </div>

          {/* Right: Step indicators */}
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl border-2 transition-all duration-500 ${
                  index === activeStep
                    ? 'border-primary-500 bg-primary-500/10'
                    : 'border-gray-800 bg-gray-800/30'
                }`}
              >
                <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                <p
                  className={`text-sm transition-all duration-500 ${
                    index === activeStep ? 'text-gray-300' : 'text-gray-500'
                  }`}
                >
                  {step.stat}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}

