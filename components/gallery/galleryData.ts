/**
 * Datos de la Galería
 * 
 * Datos para los elementos de la galería mostrados en GallerySection.
 */

import type { GalleryItem } from './GalleryGrid';

export const galleryItems: GalleryItem[] = [
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

