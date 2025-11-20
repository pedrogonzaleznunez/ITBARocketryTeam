'use client';

/**
 * Hero Section
 * 
 * Full-viewport hero with:
 * - Large headline and subtext on the left
 * - Canvas image sequence on the right (controlled by scroll)
 * - Sticky behavior with ScrollTrigger
 */

import CanvasSequence from '@/components/CanvasSequence';

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen">
      {/* Content wrapper - will be pinned by CanvasSequence ScrollTrigger */}
      <div className="relative h-screen flex items-center">
        <div className="container-custom w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Headline & Copy */}
            <div className="space-y-6 lg:space-y-8 pt-20 lg:pt-0">
              <h1 className="text-fluid-5xl lg:text-fluid-7xl font-bold leading-[1.1] tracking-tight">
                Más allá de
                <br />
                <span className="text-gradient">los límites</span>
              </h1>
              
              <p className="text-fluid-lg lg:text-fluid-xl text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed">
                Diseñamos y construimos cohetes de alta potencia. 
                Innovación, precisión y pasión por la exploración espacial.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href="#cta" className="btn-primary">
                  Ver nuestro trabajo
                </a>
                <a href="#highlights" className="btn-ghost">
                  Conocer más
                </a>
              </div>
            </div>

            {/* Right: Canvas Sequence */}
            <div className="relative aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <CanvasSequence
                frameCount={30}
                pathTemplate="/sequence/frame_####.jpg"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

