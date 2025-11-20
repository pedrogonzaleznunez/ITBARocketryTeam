'use client';

/**
 * Team Section
 *
 * Mirrors the structure of Highlights ("Tecnología de punta") with
 * centered heading plus content blocks, while showcasing the group photo.
 */

import Image from 'next/image';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';

const teamStats = [
  { value: '30+', label: 'Integrantes activos' },
  { value: '6', label: 'Sub-equipos especializados' },
  { value: '1000+', label: 'Horas de ensayo al año' },
];

const teamHighlights = [
  {
    title: 'Ingeniería colaborativa',
    description:
      'Integramos investigación, diseño y pruebas en ciclos rápidos para llevar los cohetes estudiantiles de Latinoamérica a un nuevo nivel.',
    showStats: true,
  },
  {
    title: 'Competencias internacionales',
    description:
      'Participamos en la Spaceport America Cup representando a Argentina con resultados destacados gracias a nuestro compromiso colectivo.',
    bullets: [
      'Primera delegación latinoamericana en la categoría híbrida',
      'Diseño propio de aviónica y propulsión',
      'Mentoría activa para nuevos integrantes',
    ],
  },
];

const teamPhotos = [
  {
    src: '/sequence/Team_SDT.webp',
    alt: 'Equipo ITBA Rocketry en el campus',
    title: 'ITBA Rocketry Team',
    subtitle: 'Campus ITBA · SDT',
    heightClass: 'h-[360px] lg:h-[440px]',
  },
  {
    src: '/team_2.jpg',
    alt: 'Equipo celebrando en Spaceport America Cup',
    title: 'Spaceport America Cup 2025',
    subtitle: 'Premiación internacional',
    heightClass: 'h-[300px] lg:h-[360px]',
  },
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

      <div className="space-y-10 lg:space-y-12">
        {/* Row 1: Foto izquierda, texto derecha */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          <PhotoCard photo={teamPhotos[0]} priority />
          <TextCard highlight={teamHighlights[0]} />
        </div>

        {/* Row 2: Texto izquierda, foto derecha */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          <TextCard highlight={teamHighlights[1]} />
          <PhotoCard photo={teamPhotos[1]} />
        </div>
      </div>
    </Section>
  );
}

type PhotoCardProps = {
  photo: (typeof teamPhotos)[number];
  priority?: boolean;
};

function PhotoCard({ photo, priority }: PhotoCardProps) {
  return (
    <Reveal>
      <div
        className={`relative ${photo.heightClass} rounded-3xl overflow-hidden shadow-2xl border border-white/50 dark:border-white/10`}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 45vw, 100vw"
          priority={priority}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white text-left">
          <p className="text-lg font-semibold">{photo.title}</p>
          <p className="text-sm text-white/80">{photo.subtitle}</p>
        </div>
      </div>
    </Reveal>
  );
}

type TextCardProps = {
  highlight: (typeof teamHighlights)[number];
};

function TextCard({ highlight }: TextCardProps) {
  return (
    <Reveal delay={0.05}>
      <div className="bg-white/80 dark:bg-gray-900/60 backdrop-blur-md rounded-3xl p-8 lg:p-10 shadow-subtle border border-gray-200/50 dark:border-gray-800/60 text-left h-full flex flex-col justify-between">
        <div className="space-y-4">
          <h3 className="text-fluid-2xl font-bold">{highlight.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {highlight.description}
          </p>
        </div>

        {highlight.showStats && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-200/60 dark:border-gray-800/60 mt-8">
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
        )}

        {highlight.bullets && (
          <ul className="space-y-2 pt-8 border-t border-gray-200/60 dark:border-gray-800/60 mt-8">
            {highlight.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                <span className="text-primary-500 mt-1">•</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Reveal>
  );
}


