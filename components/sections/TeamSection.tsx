'use client';

/**
 * Team Section
 *
 * Sección que muestra información sobre el equipo ITBA Rocketry.
 * Incluye fotos del equipo que pueden ampliarse en un lightbox al hacer click.
 * 
'use client';

/**
 * Team Section
 *
 * Sección que muestra información sobre el equipo ITBA Rocketry.
 * Incluye fotos del equipo que pueden ampliarse en un lightbox al hacer click.
 *
 * Estructura:
 * - Encabezado centrado con título y descripción
 * - Grid de fotos y tarjetas de texto alternados
 * - Integración con useImageLightbox para mostrar imágenes ampliadas
 */

import Image from 'next/image';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';
import { useImageLightbox, type ImageLightboxData } from '@/hooks/useImageLightbox';
import ImageLightbox from '@/components/gallery/ImageLightbox';
import { useLanguage } from '@/components/LanguageContext';

/**
 * Componente principal de la sección del equipo
 */
export default function TeamSection() {
  // Hook para manejar el estado del lightbox
  const lightbox = useImageLightbox();
  const { t } = useLanguage();

  // Datos de estadísticas del equipo
  const teamStats = [
    { value: '60+', label: t('team.stats.active_members') },
    { value: '7', label: t('team.stats.subteams') },
    { value: '1000+', label: t('team.stats.test_hours') },
  ];

  // Contenido destacado del equipo
  const teamHighlights = [
    {
      title: t('team.highlights.engineering_title'),
      description: t('team.highlights.engineering_desc'),
      showStats: true,
    },
    {
      title: t('team.highlights.competition_title'),
      description: t('team.highlights.competition_desc'),
      bullets: [
        t('team.highlights.bullets.0'),
        t('team.highlights.bullets.1'),
        t('team.highlights.bullets.2'),
      ],
    },
  ];

  // Fotos del equipo que pueden ampliarse
  const teamPhotos = [
    {
      src: '/sequence/Team_SDT.webp',
      alt: t('team.photos.campus_alt'),
      title: 'ITBA Rocketry Team',
      subtitle: t('team.photos.campus_subtitle'),
      heightClass: 'h-[360px] lg:h-[440px]',
    },
    {
      src: '/team_2.jpg',
      alt: t('team.photos.cup_alt'),
      title: t('team.photos.cup_title'),
      subtitle: t('team.photos.cup_subtitle'),
      heightClass: 'h-[300px] lg:h-[360px]',
    },
  ];

  return (
    <Section id="team" className="bg-gray-900/40">
      {/* Encabezado de la sección */}
      <div className="text-center mb-16 lg:mb-20">
        <Reveal delay={0.1}>
          <h2 className="text-fluid-4xl lg:text-fluid-5xl font-bold tracking-tight mb-6">
            {t('team.title')}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-fluid-lg text-gray-400 max-w-3xl mx-auto">
            {t('team.description')}
          </p>
        </Reveal>
      </div>

      {/* Grid de contenido: fotos y tarjetas de texto */}
      <div className="space-y-10 lg:space-y-12">
        {/* Fila 1: Foto izquierda, texto derecha */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          <PhotoCard
            photo={teamPhotos[0]}
            priority
            lightbox={lightbox}
          />
          <TextCard highlight={teamHighlights[0]} stats={teamStats} />
        </div>

        {/* Fila 2: Texto izquierda, foto derecha */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          <TextCard highlight={teamHighlights[1]} />
          <PhotoCard
            photo={teamPhotos[1]}
            lightbox={lightbox}
          />
        </div>
      </div>

      {/* Lightbox para mostrar imágenes ampliadas */}
      {lightbox.imageData && (
        <ImageLightbox
          isOpen={lightbox.isOpen}
          src={lightbox.imageData.src}
          alt={lightbox.imageData.alt}
          title={lightbox.imageData.title}
          subtitle={lightbox.imageData.subtitle}
          onClose={lightbox.closeLightbox}
        />
      )}
    </Section>
  );
}

// ============================================================================
// Componentes internos
// ============================================================================

/**
 * Props del componente PhotoCard
 */
type PhotoCardProps = {
  /** Datos de la foto a mostrar */
  photo: {
    src: string;
    alt: string;
    title: string;
    subtitle: string;
    heightClass: string;
  };
  /** Si es true, la imagen se carga con prioridad */
  priority?: boolean;
  /** Objeto con el estado y funciones del lightbox */
  lightbox: ReturnType<typeof useImageLightbox>;
};

/**
 * Componente que muestra una foto del equipo con capacidad de ampliarse.
 * Al hacer click en la foto, se abre el lightbox para verla en tamaño completo.
 *
 * @param {PhotoCardProps} props - Props del componente
 */
function PhotoCard({ photo, priority, lightbox }: PhotoCardProps) {
  // Preparar los datos de la imagen para el lightbox
  const photoData: ImageLightboxData = {
    src: photo.src,
    alt: photo.alt,
    title: photo.title,
    subtitle: photo.subtitle,
  };

  /**
   * Maneja el click en la foto.
   * Alterna el lightbox: si la misma imagen ya está abierta, la cierra;
   * si no, la abre.
   */
  const handleClick = () => {
    lightbox.toggleLightbox(photoData);
  };

  /**
   * Maneja eventos de teclado para accesibilidad.
   * Permite abrir el lightbox con Enter o Space.
   *
   * @param {React.KeyboardEvent} e - Evento de teclado
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <Reveal>
      <div
        className={`relative ${photo.heightClass} rounded-3xl overflow-hidden shadow-2xl border-2 border-white/10 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-primary-500`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={`Ver imagen ampliada: ${photo.title}`}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 45vw, 100vw"
          priority={priority}
        />
        {/* Overlay con gradiente para mejorar legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent pointer-events-none" />
        {/* Texto sobre la imagen */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white text-left">
          <p className="text-lg font-semibold">{photo.title}</p>
          <p className="text-sm text-white/80">{photo.subtitle}</p>
        </div>
        {/* Indicador visual de hover */}
        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
      </div>
    </Reveal>
  );
}

/**
 * Props del componente TextCard
 */
type TextCardProps = {
  /** Datos del highlight a mostrar */
  highlight: {
    title: string;
    description: string;
    showStats?: boolean;
    bullets?: string[];
  };
  stats?: { value: string; label: string }[];
};

/**
 * Componente que muestra una tarjeta de texto con información del equipo.
 * Puede incluir estadísticas o una lista de viñetas dependiendo del highlight.
 *
 * @param {TextCardProps} props - Props del componente
 */
function TextCard({ highlight, stats }: TextCardProps) {
  return (
    <Reveal delay={0.05}>
      <div className="bg-gray-900/60 backdrop-blur-md rounded-3xl p-8 lg:p-10 shadow-subtle border border-gray-800/60 text-left h-full flex flex-col justify-between">
        <div className="space-y-4">
          <h3 className="text-fluid-2xl font-bold">{highlight.title}</h3>
          <p className="text-gray-400 leading-relaxed">
            {highlight.description}
          </p>
        </div>

        {/* Estadísticas del equipo */}
        {highlight.showStats && stats && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-800/60 mt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-white">
                  {stat.value}
                </p>
                <p className="text-sm uppercase tracking-wide text-gray-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Lista de viñetas */}
        {highlight.bullets && (
          <ul className="space-y-2 pt-8 border-t border-gray-800/60 mt-8">
            {highlight.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 text-gray-400">
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