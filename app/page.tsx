/**
 * Homepage - ITBA Rocketry Team Landing
 * 
 * Single-page landing with smooth scrolling and scroll-driven animations.
 * 
 * HOW TO ADD IMAGE SEQUENCE FRAMES:
 * 1. Create a folder: /public/sequence/
 * 2. Add numbered JPG files: frame_0001.jpg, frame_0002.jpg, ..., frame_0030.jpg
 * 3. Recommended: 30-60 frames, 1600-2000px width, optimized JPGs
 * 4. If frames are missing, a gradient fallback will display
 * 
 * SECTIONS:
 * - Hero: Full-viewport with canvas sequence
 * - Highlights: Feature grid with reveals
 * - Specs: Sticky step-by-step story
 * - Gallery: Edge-to-edge media showcase
 * - CTA: Final call-to-action
 */

import Nav from '@/components/Nav';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';
import CanvasSequence from '@/components/CanvasSequence';
import SmoothScroller from '@/components/SmoothScroller';
import HeroSection from '@/components/sections/HeroSection';
import HighlightsSection from '@/components/sections/HighlightsSection';
import StatsSection from '@/components/sections/StatsSection';
import SpecsSection from '@/components/sections/SpecsSection';
import GallerySection from '@/components/sections/GallerySection';
import CTASection from '@/components/sections/CTASection';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Home() {
  return (
    <SmoothScroller>
      <Nav />
      
      <main>
        <HeroSection />
        <HighlightsSection />
        <StatsSection />
        <SpecsSection />
        <GallerySection />
        <CTASection />
      </main>

      <footer className="py-8 border-t border-gray-200 dark:border-gray-800">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <p>&copy; 2025 ITBA Rocketry Team. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <a 
                href="https://www.instagram.com/itbarocketry/" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-gray-900 dark:hover:text-white transition-colors focus-ring rounded p-2"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/company/itba-rocketry/posts/?feedView=all" 
                aria-label="LinkedIn"
                className="hover:text-gray-900 dark:hover:text-white transition-colors focus-ring rounded p-2"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </SmoothScroller>
  );
}

