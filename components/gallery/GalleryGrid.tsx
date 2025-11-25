'use client';

/**
 * Componente GalleryGrid
 * 
 * Grid de elementos de galería con imágenes y subtítulos.
 * Imágenes con lazy loading y animaciones de revelado.
 */

import Image from 'next/image';
import Reveal from '@/components/Reveal';

export type GalleryItem = {
  alt: string;
  caption: string;
  src?: string;
};

interface GalleryGridProps {
  items: GalleryItem[];
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  return (
    <div className="space-y-4 mt-4">
      {items.map((item, index) => (
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

              {/* Overlay al hacer hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
            </div>

            {/* Subtítulo */}
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white text-lg lg:text-xl font-medium">
                {item.caption}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

