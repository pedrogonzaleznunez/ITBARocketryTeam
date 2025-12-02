'use client';

/**
 * Componente VideoSection
 * 
 * Reproductor de video con funcionalidad de pantalla completa expandible.
 * Cuando el usuario se detiene al hacer scroll, el video se expande a ancho completo con fondo difuminado.
 */

import { useRef, useEffect } from 'react';
import Reveal from '@/components/Reveal';
import { useVideoExpand } from '@/hooks/useVideoExpand';
import { useLanguage } from '@/components/LanguageContext';

export default function VideoSection() {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);
  const { t } = useLanguage();

  // Ajustar threshold para móviles (más bajo para que sea más fácil activar)
  const isMobile = typeof window !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const threshold = isMobile ? 0.3 : 0.5;

  const isExpanded = useVideoExpand({
    videoRef: videoContainerRef,
    idleDelay: 1200, // 1.2 segundos de inactividad para activar
    threshold,
  });

  // Sincronizar el video de fondo con el video principal
  useEffect(() => {
    const mainVideo = mainVideoRef.current;
    const bgVideo = backgroundVideoRef.current;

    if (!mainVideo || !bgVideo) return;

    let syncInterval: NodeJS.Timeout | null = null;

    // Sincronizar tiempo actual (con throttling)
    const syncTime = () => {
      if (bgVideo.readyState >= 2 && mainVideo.readyState >= 2) {
        const timeDiff = Math.abs(bgVideo.currentTime - mainVideo.currentTime);
        if (timeDiff > 0.1) {
          bgVideo.currentTime = mainVideo.currentTime;
        }
      }
    };

    // Sincronizar cuando el video principal se carga
    const syncOnLoad = () => {
      if (bgVideo.readyState >= 2 && mainVideo.readyState >= 2) {
        bgVideo.currentTime = mainVideo.currentTime;
        bgVideo.playbackRate = mainVideo.playbackRate;
      }
    };

    // Manejar play/pause del video
    const handlePlay = () => {
      if (isExpanded) {
        syncOnLoad();
        bgVideo.play().catch(() => {
          // Ignorar errores de autoplay
        });
      }
    };

    const handlePause = () => {
      bgVideo.pause();
    };

    // Event listeners para sincronización de eventos del video
    mainVideo.addEventListener('play', handlePlay);
    mainVideo.addEventListener('pause', handlePause);
    mainVideo.addEventListener('seeked', syncOnLoad);
    mainVideo.addEventListener('loadedmetadata', syncOnLoad);
    mainVideo.addEventListener('timeupdate', syncTime);

    // Sincronizar periódicamente cuando está expandido
    if (isExpanded) {
      syncInterval = setInterval(syncTime, 100);
      // Iniciar el video de fondo cuando se expande
      if (mainVideo.readyState >= 2) {
        syncOnLoad();
        bgVideo.play().catch(() => {
          // Ignorar errores de autoplay
        });
      }
    } else {
      // Pausar el video de fondo cuando se contrae
      bgVideo.pause();
    }

    // Sincronizar inicialmente si está expandido
    if (isExpanded && mainVideo.readyState >= 2) {
      syncOnLoad();
    }

    return () => {
      mainVideo.removeEventListener('play', handlePlay);
      mainVideo.removeEventListener('pause', handlePause);
      mainVideo.removeEventListener('seeked', syncOnLoad);
      mainVideo.removeEventListener('loadedmetadata', syncOnLoad);
      mainVideo.removeEventListener('timeupdate', syncTime);
      if (syncInterval) {
        clearInterval(syncInterval);
      }
    };
  }, [isExpanded]);

  return (
    <section
      className="relative"
      aria-label={t('gallery.video_label')}
    >
      {/* Video de fondo con blur - solo visible cuando está expandido */}
      <div
        className={`
          fixed inset-0 z-[44] overflow-hidden
          transition-opacity duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
        }}
        aria-hidden="true"
      >
        <video
          ref={backgroundVideoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          poster="/sequence/Launch.webp"
          style={{
            filter: 'blur(30px) brightness(0.6)',
            transform: 'scale(1.15)',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            minWidth: '100%',
            minHeight: '100%',
          }}
        >
          <source src="/videos/despegue.webm" type="video/webm" />
          <source src="/videos/despegue.mp4" type="video/mp4" />
        </video>
        {/* Overlay oscuro adicional para mejor contraste */}
        <div
          className="absolute inset-0 bg-black/40"
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
          }}
        />
      </div>

      <div
        ref={videoContainerRef}
        className={`
          transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)]
          will-change-transform
          ${isExpanded
            ? 'fixed left-0 right-0 top-1/2 -translate-y-1/2 z-50 w-screen flex items-center justify-center'
            : 'relative z-10 w-full'
          }
        `}
      >
        <Reveal>
          <div
            className={`
              relative group overflow-hidden
              transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)]
              will-change-[border-radius,box-shadow,width,background-color]
              ${isExpanded
                ? 'rounded-none shadow-none w-full max-w-full bg-transparent'
                : 'w-full bg-gray-800'
              }
            `}
          >
            <div className="aspect-[16/9] lg:aspect-[21/9] relative">
              <video
                ref={mainVideoRef}
                className={`
                  w-full h-full transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)]
                  will-change-[object-fit,height,max-height]
                  ${isExpanded
                    ? 'object-contain h-auto max-h-[90vh] mx-auto relative z-10'
                    : 'object-cover'
                  }
                `}
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                poster="/sequence/Launch.webp"
              >
                <source src="/videos/despegue.webm" type="video/webm" />
                <source src="/videos/despegue.mp4" type="video/mp4" />
                {t('gallery.video_unsupported')}
              </video>

              {/* Overlay al hacer hover - igual que las fotos, desactivado cuando está expandido */}
              {!isExpanded && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

