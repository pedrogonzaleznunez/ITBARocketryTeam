'use client';

/**
 * Sección de Estadísticas
 * 
 * Muestra estadísticas clave con números animados.
 * Aparece antes de SpecsSection para mostrar logros.
 */

import Section from '@/components/Section';
import Reveal from '@/components/Reveal';
import AnimatedNumber from '@/components/AnimatedNumber';
import { useLanguage } from '@/components/LanguageContext';

const duration_stats = 3000;

export default function StatsSection() {
  const { t } = useLanguage();

  return (
    <Section id="stats" className="bg-[#111727] text-white">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <h2 className="text-fluid-4xl lg:text-fluid-5xl font-bold tracking-tight mb-6 lg:mb-8">
            {t('stats.title')}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-fluid-lg text-gray-300 mb-12 lg:mb-16 max-w-2xl mx-auto">
            {t('stats.description')}
          </p>
        </Reveal>

        {/* Estadísticas */}
        <Reveal delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            <div>
              <AnimatedNumber
                value="50+"
                duration={duration_stats}
                className="text-4xl lg:text-5xl font-bold text-gradient mb-2"
              />
              <div className="text-sm lg:text-base text-gray-400">
                {t('stats.launches')}
              </div>
            </div>
            <div>
              <AnimatedNumber
                value="3.5km"
                duration={duration_stats}
                className="text-4xl lg:text-5xl font-bold text-gradient mb-2"
              />
              <div className="text-sm lg:text-base text-gray-400">
                {t('stats.altitude')}
              </div>
            </div>
            <div>
              <AnimatedNumber
                value="25+"
                duration={duration_stats}
                className="text-4xl lg:text-5xl font-bold text-gradient mb-2"
              />
              <div className="text-sm lg:text-base text-gray-400">
                {t('stats.members')}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

