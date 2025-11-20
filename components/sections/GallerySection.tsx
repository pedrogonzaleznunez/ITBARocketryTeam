'use client';

/**
 * Gallery Section
 * 
 * Edge-to-edge media showcase with captions.
 * Lazy-loaded images with reveal animations.
 */

import Section from '@/components/Section';
import Reveal from '@/components/Reveal';

const galleryItems = [
  {
    alt: 'Cohete en plataforma de lanzamiento',
    caption: 'Preparación final antes del despegue',
  },
  {
    alt: 'Motor de propulsión',
    caption: 'Sistema de propulsión híbrido de 2000N',
  },
  {
    alt: 'Equipo trabajando',
    caption: 'Nuestro equipo de ingenieros',
  },
  {
    alt: 'Lanzamiento exitoso',
    caption: 'Alcanzando nuevas alturas',
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

        {/* Gallery Grid */}
        <div className="space-y-4">
          {galleryItems.map((item, index) => (
            <Reveal key={index} delay={0.1 * index}>
              <div className="relative group overflow-hidden bg-gray-200 dark:bg-gray-800">
                {/* Placeholder with gradient (replace with actual images) */}
                <div className="aspect-[16/9] lg:aspect-[21/9] flex items-center justify-center relative">
                  {/* Gradient placeholder */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br opacity-60"
                    style={{
                      backgroundImage: `linear-gradient(${135 + index * 30}deg, 
                        hsl(${200 + index * 20}, 70%, 50%), 
                        hsl(${250 + index * 15}, 60%, 40%))`,
                    }}
                  />
                  
                  {/* Image icon */}
                  <div className="relative z-10 text-white/80 text-6xl">
                    📸
                  </div>

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

