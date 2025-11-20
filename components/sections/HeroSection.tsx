'use client';

/**
 * Hero Section
 * 
 * Full-viewport hero with:
 * - Large headline and subtext on the left
 * - Canvas image sequence on the right (controlled by scroll)
 * - Sticky behavior with ScrollTrigger
 */

import { useEffect, useRef } from 'react';

import CanvasSequence from '@/components/CanvasSequence';
import { gsap } from '@/lib/gsap';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

export default function HeroSection() {
  const scrollTo = useSmoothScroll();
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !backgroundRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        backgroundRef.current,
        { scale: 1 },
        {
          scale: 1.2,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
    >
      <div
        ref={backgroundRef}
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center will-change-transform"
        style={{ backgroundImage: 'url(/sequence/Launch.webp)' }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/45 to-black/60"
        aria-hidden
      />

      {/* Content wrapper - will be pinned by CanvasSequence ScrollTrigger */}
      <div className="relative h-screen flex items-center">
        <div className="container-custom w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Headline & Copy */}
            <div className="space-y-6 lg:space-y-8 pt-20 lg:pt-0 text-[#f5f5f7]">
              <h1
                className="text-fluid-5xl lg:text-fluid-7xl font-bold leading-[1.1] tracking-tight text-[#f5f5f7]"
                style={{ textShadow: '0 8px 24px rgba(0,0,0,0.35)' }}
              >
                Más allá de
                <br />
                <span className="text-gradient">los límites</span>
              </h1>
              
              <p
                className="text-fluid-lg lg:text-fluid-xl text-[rgba(245,245,247,0.85)] max-w-xl leading-relaxed"
                style={{ textShadow: '0 6px 20px rgba(0,0,0,0.35)' }}
              >
                Diseñamos y construimos cohetes de alta potencia. 
                Innovación, precisión y pasión por la exploración espacial.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href="#cta" onClick={(e) => scrollTo(e, 'cta')} className="btn-primary">
                  Ver nuestro trabajo
                </a>
                <a href="#highlights" onClick={(e) => scrollTo(e, 'highlights')} className="btn-ghost">
                  Conocer más
                </a>
              </div>
            </div>

            {/* Right: Canvas Sequence */}
            {/* <div className="relative aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <CanvasSequence
                frameCount={30}
                pathTemplate="/sequence/Launch.webp"
                className="w-full h-full"
              />
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

