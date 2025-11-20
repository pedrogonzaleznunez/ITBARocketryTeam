'use client';

/**
 * CTA Section
 * 
 * Final call-to-action with primary and secondary buttons.
 * Microinteractions on hover.
 */

import Section from '@/components/Section';
import Reveal from '@/components/Reveal';

export default function CTASection() {
  return (
    <Section id="cta" className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <h2 className="text-fluid-4xl lg:text-fluid-6xl font-bold tracking-tight mb-6 lg:mb-8">
            ¿Listo para despegar?
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-fluid-lg lg:text-fluid-2xl text-gray-300 mb-8 lg:mb-12 leading-relaxed">
            Únete a nuestro equipo o sigue nuestros próximos lanzamientos.
            <br />
            La próxima misión está por comenzar.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="mailto:info@itbarocketry.com"
              className="group relative btn-base bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold overflow-hidden"
            >
              <span className="relative z-10">Contáctanos</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            </a>

            <a
              href="#hero"
              className="btn-ghost border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg"
            >
              Ver más
            </a>
          </div>
        </Reveal>

        {/* Stats */}
        <Reveal delay={0.3}>
          <div className="grid grid-cols-3 gap-8 mt-20 lg:mt-24 pt-16 border-t border-gray-700">
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-gradient mb-2">
                50+
              </div>
              <div className="text-sm lg:text-base text-gray-400">
                Lanzamientos exitosos
              </div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-gradient mb-2">
                3.5km
              </div>
              <div className="text-sm lg:text-base text-gray-400">
                Altitud máxima
              </div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-gradient mb-2">
                25+
              </div>
              <div className="text-sm lg:text-base text-gray-400">
                Miembros del equipo
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

