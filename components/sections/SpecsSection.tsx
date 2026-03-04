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
import { useLanguage } from '@/components/LanguageContext';

export default function SpecsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [needsCompactLayout, setNeedsCompactLayout] = useState(false);
  const { t } = useLanguage();

  const steps = [
    {
      title: t('specs.design_title'),
      description: t('specs.design_desc'),
      stat: t('specs.design_stat'),
      label: t('specs.design_label'),
    },
    {
      title: t('specs.construction_title'),
      description: t('specs.construction_desc'),
      stat: t('specs.construction_stat'),
      label: t('specs.construction_label'),
    },
    {
      title: t('specs.testing_title'),
      description: t('specs.testing_desc'),
      stat: t('specs.testing_stat'),
      label: t('specs.testing_label'),
    },
    {
      title: t('specs.launch_title'),
      description: t('specs.launch_desc'),
      stat: t('specs.launch_stat'),
      label: t('specs.launch_label'),
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Calcular el porcentaje de scroll según el tamaño de pantalla
    // En móvil requiere menos scroll (50% por paso), en desktop mantiene 100%
    const isMobile = window.innerWidth < 1024; // lg breakpoint
    const scrollPercentage = isMobile ? 50 : 100;

    // Create pin effect
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${steps.length * scrollPercentage}%`,
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
  }, [steps.length]);

  // Ajustar tamaño del texto solo en desktop cuando el contenido se corta
  // Evaluar una sola vez al montar para mantener consistencia entre todas las secciones
  useEffect(() => {
    const checkContentFit = () => {
      // Solo aplicar en desktop (web)
      if (window.innerWidth < 1024) {
        setNeedsCompactLayout(false);
        return;
      }

      const checkFit = () => {
        const navHeight = 100; // Altura aproximada de la navbar
        const paddingTop = window.innerWidth >= 1024 ? 144 : 128; // pt-32 (128px) o lg:pt-36 (144px)
        const paddingBottom = 64; // pb-16 (64px)
        const availableHeight = window.innerHeight - navHeight - paddingTop - paddingBottom;

        // Estimar altura máxima basándose en la sección más larga
        // Usar la descripción más larga como referencia para mantener consistencia
        const maxDescriptionLength = Math.max(...steps.map(step => step.description.length));

        // Estimar altura: número (100px) + título (80px) + descripción (~24px por línea) + stat (100px) + espaciado (80px)
        // Asumir que la descripción más larga puede ocupar ~3-4 líneas
        const estimatedLines = Math.ceil(maxDescriptionLength / 50);
        const estimatedMaxHeight = 100 + 80 + (estimatedLines * 28) + 100 + 80;

        // Si la altura estimada es mayor que el espacio disponible, usar layout compacto
        // Esto asegura que todas las secciones tengan el mismo tamaño
        setNeedsCompactLayout(estimatedMaxHeight > availableHeight);
      };

      // Verificar después de un pequeño delay para asegurar que el DOM esté listo
      const timeoutId = setTimeout(checkFit, 100);
      window.addEventListener('resize', checkFit);
      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('resize', checkFit);
      };
    };

    checkContentFit();
  }, [steps]);

  return (
    <div ref={sectionRef} className="relative min-h-screen bg-[#111727] text-white">
      <Section noPadding>
        {/* Mobile: Minimalista con progress bar */}
        <div className="lg:hidden min-h-screen flex flex-col justify-center px-4 sm:px-6 py-8 sm:py-12">
          <div className="grid grid-cols-[1fr_auto] gap-9 sm:gap-11 items-center overflow-visible">
            {/* Contenido del paso activo - Izquierda */}
            <div className="space-y-6 sm:space-y-8 flex flex-col justify-center overflow-visible">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                {steps[activeStep].title}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
                {steps[activeStep].description}
              </p>
              <div className="pt-6 sm:pt-8 pb-3 sm:pb-4 border-t border-gray-800 overflow-visible">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-gradient leading-tight overflow-visible" style={{ lineHeight: '1.1', paddingBottom: '0.5rem' }}>
                  {steps[activeStep].stat}
                </div>
                <div className="text-lg sm:text-xl text-gray-400 mt-3">
                  {steps[activeStep].label}
                </div>
              </div>
            </div>

            {/* Progress bar vertical con números - Derecha */}
            <div className="flex flex-col items-center justify-center">
              {steps.map((_, index) => (
                <div key={index} className="flex flex-col items-center">
                  {/* Número */}
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold transition-all duration-500 ${index === activeStep
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-800 text-gray-500'
                      }`}
                  >
                    {index + 1}
                  </div>
                  {/* Línea conectora - siempre gris */}
                  {index < steps.length - 1 && (
                    <div className="w-1 h-20 sm:h-24 md:h-28 bg-gray-800" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: Diseño completo */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-start min-h-screen pt-32 pb-12 lg:pt-36 lg:pb-16 overflow-visible">
          {/* Left: Current step info */}
          <div
            ref={contentRef}
            className={`flex flex-col justify-center transition-all duration-300 overflow-visible ${needsCompactLayout ? 'space-y-6' : 'space-y-8'
              }`}
          >
            <div className="flex items-baseline gap-4">
              <span className={`font-bold text-primary-400 ${needsCompactLayout ? 'text-6xl' : 'text-7xl'
                }`}>
                {String(activeStep + 1).padStart(2, '0')}
              </span>
              <span className={`text-gray-500 ${needsCompactLayout ? 'text-lg' : 'text-xl'
                }`}>/ {steps.length}</span>
            </div>

            <h2 className={`font-bold tracking-tight ${needsCompactLayout ? 'text-4xl lg:text-5xl' : 'text-fluid-6xl'
              }`}>
              {steps[activeStep].title}
            </h2>

            <p className={`text-gray-300 leading-relaxed ${needsCompactLayout ? 'text-lg lg:text-xl' : 'text-fluid-xl'
              }`}>
              {steps[activeStep].description}
            </p>

            <div className={`border-t border-gray-800 overflow-visible ${needsCompactLayout ? 'pt-6 pb-4' : 'pt-8 pb-5'
              }`}>
              <div className={`font-bold text-gradient leading-tight overflow-visible ${needsCompactLayout ? 'text-5xl' : 'text-6xl'
                }`} style={{ lineHeight: '1.1', paddingBottom: '0.5rem' }}>
                {steps[activeStep].stat}
              </div>
              <div className={`text-gray-400 mt-2 ${needsCompactLayout ? 'text-lg' : 'text-xl'
                }`}>
                {steps[activeStep].label}
              </div>
            </div>
          </div>

          {/* Right: Step indicators */}
          <div className="space-y-6 flex flex-col justify-center">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl border-2 transition-all duration-500 ${index === activeStep
                    ? 'border-primary-500 bg-primary-500/10'
                    : 'border-gray-800 bg-gray-800/30'
                  }`}
              >
                <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                <p
                  className={`text-sm transition-all duration-500 ${index === activeStep ? 'text-gray-300' : 'text-gray-500'
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
