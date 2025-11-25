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
import GalleryGrid from '@/components/gallery/GalleryGrid';
import { galleryItems } from '@/components/gallery/galleryData';

export default function GallerySection() {
  return (
    <Section id="gallery" className="bg-[#111727]" noPadding>
      <div className="py-16 md:py-24 lg:py-32 relative">
        <div className="container-custom mb-16 lg:mb-20">
          <Reveal>
            <h2 className="text-fluid-4xl lg:text-fluid-5xl font-bold tracking-tight text-center mb-6">
              Nuestro trabajo
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-fluid-lg text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto">
              Momentos clave de nuestros proyectos y lanzamientos.
            </p>
          </Reveal>
        </div>

        <VideoSection />
        <GalleryGrid items={galleryItems} />
      </div>
    </Section>
  );
}

