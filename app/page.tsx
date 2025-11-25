/**
 * Página Principal - ITBA Rocketry Team Landing
 * 
 * Landing de una sola página con scroll suave y animaciones controladas por scroll.
 * 
 * CÓMO AGREGAR FRAMES DE SECUENCIA DE IMÁGENES:
 * 1. Crear una carpeta: /public/sequence/
 * 2. Agregar archivos JPG numerados: frame_0001.jpg, frame_0002.jpg, ..., frame_0030.jpg
 * 3. Recomendado: 30-60 frames, 1600-2000px de ancho, JPGs optimizados
 * 4. Si faltan frames, se mostrará un gradiente de respaldo
 * 
 * SECCIONES:
 * - Hero: Viewport completo con secuencia de canvas
 * - Highlights: Grid de características con reveals
 * - Specs: Historia paso a paso sticky
 * - Gallery: Showcase de medios edge-to-edge
 * - CTA: Call-to-action final
 */

import Nav from '@/components/Nav';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';
import CanvasSequence from '@/components/CanvasSequence';
import SmoothScroller from '@/components/SmoothScroller';
import HeroSection from '@/components/sections/HeroSection';
import TeamSection from '@/components/sections/TeamSection';
import HighlightsSection from '@/components/sections/HighlightsSection';
import StatsSection from '@/components/sections/StatsSection';
import SpecsSection from '@/components/sections/SpecsSection';
import GallerySection from '@/components/sections/GallerySection';
import SponsorsSection from '@/components/sections/SponsorsSection';
import CTASection from '@/components/sections/CTASection';
import SocialLinks from '@/components/SocialLinks';
import StarsDivider from '@/components/dividers/StarsDivider';
import RockerDivider from '@/components/dividers/RockerDivider';
import SmoothIgnitionDivider from '@/components/dividers/SmothIgnitionDivider';

export default function Home() {
  return (
    <SmoothScroller>
      <Nav />
      
      <main>
        <HeroSection />
        <StarsDivider />
        <TeamSection />
        <StarsDivider />
        <SponsorsSection />
        <RockerDivider /> 
        <HighlightsSection />
        <StarsDivider />
        <StatsSection />
        <StarsDivider />
        <SpecsSection />
        <StarsDivider />
        <GallerySection />
        <CTASection />
      </main>

      <footer className="py-8 border-t border-gray-200 dark:border-gray-800">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <p>&copy; 2025 ITBA Rocketry Team. Todos los derechos reservados.</p>
            <SocialLinks variant="footer" />
          </div>
        </div>
      </footer>
    </SmoothScroller>
  );
}

