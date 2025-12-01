import type { Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  // TODO: adaptar a modo claro en un futuro
  themeColor: '#111827', // Forzando color oscuro siempre
}

