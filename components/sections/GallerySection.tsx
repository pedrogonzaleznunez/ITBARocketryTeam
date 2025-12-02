'use client';

/**
 * Sección de Galería
 * 
 * Showcase de medios edge-to-edge con subtítulos.
 * Compuesta por los componentes VideoSection y GalleryGrid.
 */

import Section from '@/components/Section';
import Reveal from '@/components/Reveal';
import VideoSection from '@/components/gallery/VideoSection';
import GalleryGrid, { type GalleryItem } from '@/components/gallery/GalleryGrid';
import { useLanguage } from '@/components/LanguageContext';

export default function GallerySection() {
  const { t } = useLanguage();

  const galleryItems: GalleryItem[] = [
    {
      src: '/placa_electronica.JPG',
      alt: t('gallery.items.electronics_alt'),
      caption: t('gallery.items.electronics_caption'),
    },
    {
      src: '/lucas_trabajando.JPG',
      alt: t('gallery.items.lab_alt'),
      caption: t('gallery.items.lab_caption'),
    },
    {
      alt: t('gallery.items.rocket_alt'),
      caption: t('gallery.items.rocket_caption'),
    },
    {
      alt: t('gallery.items.engine_alt'),
      caption: t('gallery.items.engine_caption'),
    },
    {
      alt: t('gallery.items.telemetry_alt'),
      caption: t('gallery.items.telemetry_caption'),
    },
  ];

  return (
    <Section id="gallery" className="bg-[#111727]" noPadding>
      <div className="py-16 md:py-24 lg:py-32 relative">
        <div className="container-custom mb-16 lg:mb-20">
          <Reveal>
            <h2 className="text-fluid-4xl lg:text-fluid-5xl font-bold tracking-tight text-center mb-6">
              {t('gallery.title')}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-fluid-lg text-gray-400 text-center max-w-2xl mx-auto">
              {t('gallery.description')}
            </p>
          </Reveal>
        </div>

        <VideoSection />
        <GalleryGrid items={galleryItems} />
      </div>
    </Section>
  );
}

