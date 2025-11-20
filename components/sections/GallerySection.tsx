'use client';

/**
 * Gallery Section
 * 
 * Edge-to-edge media showcase with captions.
 * Lazy-loaded images with reveal animations.
 */

import Image from 'next/image';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';

type GalleryItem = {
  alt: string;
  caption: string;
  src?: string;
};

const galleryItems: GalleryItem[] = [
  {
    src: '/placa_electronica.JPG',
    alt: 'Placa electrónica vista bajo microscopio',
    caption: 'Integración y pruebas de electrónica de vuelo',
  },
  {
    src: '/lucas_trabajando.JPG',
    alt: 'Lucas trabajando en el laboratorio',
    caption: 'Fabricación de componentes en el laboratorio ITBA',
  },
  {
    alt: 'Cohete en plataforma de lanzamiento',
    caption: 'Preparación final antes del despegue',
  },
  {
    alt: 'Motor de propulsión',
    caption: 'Sistema de propulsión híbrido de 2000N',
  },
  {
    alt: 'Telemetría en tiempo real',
    caption: 'Centro de control durante vuelo',
  },
];

export default function GallerySection() {
  return (
    <Section id="gallery" className="bg-[#111727]" noPadding>
      <div className="py-16 md:py-24 lg:py-32">
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

        {/* Video Section */}
        <section className="bg-black py-12 lg:py-16" aria-label="Video de lanzamiento">
          <div className="container-custom">
            <Reveal>
              <div className="rounded-3xl overflow-hidden border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.45)]">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls={false}
                  poster="/sequence/Launch.webp"
                >
                  <source src="/videos/despegue.webm" type="video/webm" />
                  <source src="/videos/despegue.mov" type="video/mp4" />
                  Tu navegador no soporta video HTML5.
                </video>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Gallery Grid */}
        <div className="space-y-4 mt-4">

          {galleryItems.map((item, index) => (
            <Reveal key={index} delay={0.1 * (index + 1)}>
              <div className="relative group overflow-hidden bg-gray-200 dark:bg-gray-800">
                <div className="aspect-[16/9] lg:aspect-[21/9] relative">
                  {item.src ? (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover object-center"
                      sizes="(min-width: 1024px) 80vw, 100vw"
                      priority={index === 0}
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                  ) : (
                    <>
                      <div
                        className="absolute inset-0 bg-gradient-to-br opacity-60"
                        style={{
                          backgroundImage: `linear-gradient(${135 + index * 30}deg, 
                            hsl(${200 + index * 20}, 70%, 50%), 
                            hsl(${250 + index * 15}, 60%, 40%))`,
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-white/80 text-6xl">
                        📸
                      </div>
                    </>
                  )}

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
                </div>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-lg lg:text-xl font-medium">
                    {item.caption}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

