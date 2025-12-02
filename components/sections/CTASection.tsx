'use client';

/**
 * Sección CTA
 * 
 * Call-to-action final con botones primario y secundario.
 * Microinteracciones en hover.
 */

import Section from '@/components/Section';
import Reveal from '@/components/Reveal';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

export default function CTASection() {
  const scrollTo = useSmoothScroll();

  return (
    <Section id="cta" className="bg-[#111727] text-white">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <h2 className="text-fluid-4xl lg:text-fluid-6xl font-bold tracking-tight mb-6 lg:mb-8">
            ¿Listo para despegar?
          </h2>
          <p className="text-fluid-lg lg:text-fluid-2xl text-gray-300 mb-8 lg:mb-12 leading-relaxed">
            Únete a nuestro equipo o sigue nuestros próximos lanzamientos.
            <br />
            La próxima misión está por comenzar.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="mailto:rocketry@itba.edu.ar"
              className="group relative btn-base bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold overflow-hidden"
            >
              <span className="relative z-10">Contáctanos</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            </a>

            <a
              href="#hero"
              onClick={(e) => scrollTo(e, 'hero')}
              className="btn-ghost border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg"
            >
              Volver al inicio
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

