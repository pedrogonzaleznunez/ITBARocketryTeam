'use client';

/**
 * Team Section
 *
 * Mirrors the structure of Highlights ("Tecnología de punta") with
 * centered heading plus content blocks, while showcasing the group photo.
 */

import Section from '@/components/Section';
import Reveal from '@/components/Reveal';

const teamStats = [
  { value: '30+', label: 'Integrantes activos' },
  { value: '6', label: 'Sub-equipos especializados' },
  { value: '1000+', label: 'Horas de ensayo al año' },
];

export default function TeamSection() {
  return (
    <Section id="team" className="bg-gray-50 dark:bg-gray-900/40">
      <div className="text-center mb-16 lg:mb-20">
        {/* <Reveal>
          <p className="text-sm uppercase tracking-[0.35em] text-primary-500 mb-4">
            Nuestro equipo
          </p>
        </Reveal> */}
        <Reveal delay={0.1}>
          <h2 className="text-fluid-4xl lg:text-fluid-5xl font-bold tracking-tight mb-6">
            Tecnología y talento trabajando en conjunto
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-fluid-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Somos estudiantes del ITBA apasionados por la ingeniería aeroespacial.
            Cada lanzamiento es el resultado de equipos coordinados de propulsión,
            aviónica, estructuras, simulación y operaciones.
          </p>
        </Reveal>
      </div>

      <div className="grid lg:grid-cols-[1.15fr,0.85fr] gap-10 lg:gap-16 items-stretch">
        <Reveal>
          <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl border border-white/50 dark:border-white/10">
            <img
              src="/sequence/team_sdt.jpeg"
              alt="Equipo ITBA Rocketry"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white text-left">
              <p className="text-lg font-semibold">ITBA Rocketry Team</p>
              <p className="text-sm text-white/80">Campus ITBA · SDT</p>
            </div>
          </div>
        </Reveal>

        <div className="space-y-6 h-full">
          <Reveal delay={0.05}>
            <div className="bg-white/80 dark:bg-gray-900/60 backdrop-blur-md rounded-3xl p-8 lg:p-10 shadow-subtle border border-gray-200/50 dark:border-gray-800/60 text-left h-full flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-fluid-2xl font-bold">
                  Ingeniería colaborativa
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Integramos investigación, diseño y pruebas en ciclos rápidos para
                  llevar los cohetes estudiantiles de Latinoamérica a un nuevo nivel.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-200/60 dark:border-gray-800/60">
                {teamStats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}


