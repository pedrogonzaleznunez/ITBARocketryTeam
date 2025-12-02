'use client';

/**
 * Sección Hero
 * 
 * Hero de viewport completo con:
 * - Título grande y subtítulo a la izquierda
 * - Secuencia de imágenes en canvas a la derecha (controlada por scroll)
 * - Comportamiento sticky con ScrollTrigger
 */

import { useEffect, useRef } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

import CanvasSequence from '@/components/CanvasSequence';
import { gsap } from '@/lib/gsap';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { useGoogleCalendar } from '@/hooks/useGoogleCalendar';
import { useLanguage } from '@/components/LanguageContext';

import Countdown from '../Countdown';
import SocialLinks from '../SocialLinks';


export default function HeroSection() {
  const scrollTo = useSmoothScroll();
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const { t } = useLanguage();

  // Configuración del evento
  const eventDate = new Date('2026-06-15T00:00:00');
  const eventEndDate = new Date('2026-06-15T23:59:59'); // Mismo día, fin del día
  const eventTitle = t('hero.event_title');
  const eventDescription = t('hero.event_description');
  const eventLocation = 'Spaceport America, Truth or Consequences, New Mexico, USA';

  const calendarLink = useGoogleCalendar({
    title: eventTitle,
    startDate: eventDate,
    endDate: eventEndDate,
    description: eventDescription,
    location: eventLocation,
  });

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

  /**
   * Función para hacer scroll suave y lento al primer StarsDivider
   * Usa GSAP para controlar la velocidad del scroll con animación personalizada
   */
  const scrollToFirstDivider = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLElement).blur();

    // Protección contra clics múltiples
    if (isScrollingRef.current) return;

    const target = document.getElementById('first-stars-divider');
    if (!target) return;

    isScrollingRef.current = true;
    const startPosition = window.scrollY;
    const targetPosition = target.getBoundingClientRect().top + startPosition;

    // Crear un objeto proxy para animar el scroll con GSAP
    const scrollObj = { y: startPosition };

    gsap.to(scrollObj, {
      y: targetPosition,
      duration: 1, // Scroll más lento
      ease: 'power2.out',
      onUpdate: () => {
        window.scrollTo(0, scrollObj.y);
      },
      onComplete: () => {
        isScrollingRef.current = false;
      },
    });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
    >
      <div
        ref={backgroundRef}
        className="pointer-events-none absolute inset-0 -z-10 bg-cover will-change-transform"
        style={{
          backgroundImage: 'url(/sequence/Launch.webp)',
          backgroundPosition: 'center 15%',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/45 to-black/60"
        aria-hidden
      />

      {/* Contenedor de contenido - será fijado por CanvasSequence ScrollTrigger */}
      <div className="relative min-h-screen flex items-center py-20 md:py-0 md:h-screen">
        <div className="container-custom w-full">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Izquierda: Título y texto */}
            <div className="space-y-6 lg:space-y-8 pt-20 lg:pt-0 text-[#f5f5f7]">
              <h1
                className="text-fluid-5xl lg:text-fluid-7xl font-bold leading-[1.1] tracking-tight text-[#f5f5f7]"
                style={{ textShadow: '0 8px 24px rgba(0,0,0,0.35)' }}
              >
                {t('hero.title_1')}
                <br />
                <span className="text-gradient">{t('hero.title_2')}</span>
              </h1>

              <p
                className="text-fluid-lg lg:text-fluid-xl text-[rgba(245,245,247,0.85)] max-w-xl leading-relaxed"
                style={{ textShadow: '0 6px 20px rgba(0,0,0,0.35)' }}
              >
                {t('hero.description')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href="#first-stars-divider" onClick={scrollToFirstDivider} className="btn-primary">
                  {t('hero.cta_work')}
                </a>
                <a
                  href="#cta"
                  onClick={(e) => scrollTo(e, 'cta')}
                  className="btn-ghost min-[1000px]:hidden bg-white/20 border border-white/40 backdrop-blur-md hover:bg-white/30"
                >
                  {t('nav.cta')}
                </a>
                {/* <a href="#highlights" onClick={(e) => scrollTo(e, 'highlights')} className="btn-ghost">
                  Conocer más
                </a> */}
              </div>
            </div>
            {/* Derecha: Countdown posicionado en la parte inferior */}
            <div className="flex flex-col items-center justify-center lg:items-end lg:justify-end pt-8 md:pt-12 lg:pt-0">
              <div className="w-full max-w-md">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                  <div className="text-center mb-4">
                    <p className="text-sm md:text-base text-white/90 uppercase tracking-wider mb-2">
                      {t('hero.next_mission')}
                    </p>
                    <p className="text-lg md:text-xl font-semibold text-white">
                      {t('hero.date')}
                    </p>
                    <p className="text-sm text-white/70 mt-1">
                      {t('hero.location')}
                    </p>
                  </div>
                  <Countdown targetDate={eventDate} />
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <a
                      href={calendarLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl px-4 py-3 text-sm md:text-base font-medium text-white transition-all duration-200 border border-white/30 hover:border-white/40 shadow-lg hover:shadow-xl"
                    >
                      <FaCalendarAlt className="w-5 h-5" />
                      {t('hero.add_calendar')}
                    </a>
                  </div>
                </div>
              </div>
              {/* Iconos de Redes Sociales */}
              <SocialLinks variant="hero" className="mt-6 lg:mt-8" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

