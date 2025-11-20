'use client';

/**
 * Stats Section
 * 
 * Displays key statistics with animated numbers.
 * Appears before SpecsSection to showcase achievements.
 */

import Section from '@/components/Section';
import Reveal from '@/components/Reveal';
import AnimatedNumber from '@/components/AnimatedNumber';

const duration_stats = 3000;

export default function StatsSection() {
  return (
    <Section id="stats" className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <h2 className="text-fluid-4xl lg:text-fluid-5xl font-bold tracking-tight mb-6 lg:mb-8">
            Números que hablan
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-fluid-lg text-gray-300 mb-12 lg:mb-16 max-w-2xl mx-auto">
            Resultados que demuestran nuestro compromiso con la excelencia y la innovación.
          </p>
        </Reveal>

        {/* Stats */}
        <Reveal delay={0.2}>
          <div className="grid grid-cols-3 gap-8 lg:gap-12">
            <div>
              <AnimatedNumber 
                value="50+" 
                duration={duration_stats}
                className="text-4xl lg:text-5xl font-bold text-gradient mb-2"
              />
              <div className="text-sm lg:text-base text-gray-400">
                Lanzamientos exitosos
              </div>
            </div>
            <div>
              <AnimatedNumber 
                value="3.5km" 
                duration={duration_stats}
                className="text-4xl lg:text-5xl font-bold text-gradient mb-2"
              />
              <div className="text-sm lg:text-base text-gray-400">
                Altitud máxima
              </div>
            </div>
            <div>
              <AnimatedNumber 
                value="25+" 
                duration={duration_stats}
                className="text-4xl lg:text-5xl font-bold text-gradient mb-2"
              />
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

