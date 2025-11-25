'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

/**
 * Props del componente ImageLightbox
 */
export interface ImageLightboxProps {
  /** Estado que controla si el lightbox está visible */
  isOpen: boolean;
  /** Ruta de la imagen a mostrar (relativa a /public o URL completa) */
  src: string;
  /** Texto alternativo para accesibilidad (requerido) */
  alt: string;
  /** Título opcional que se mostrará debajo de la imagen */
  title?: string;
  /** Subtítulo opcional que se mostrará debajo del título */
  subtitle?: string;
  /** Función callback que se ejecuta al cerrar el lightbox */
  onClose: () => void;
}

/**
 * Componente de lightbox modal para mostrar imágenes ampliadas.
 * 
 * Este componente muestra una imagen en un overlay modal de pantalla completa
 * con fondo oscuro semitransparente. La imagen se muestra centrada y ajustada
 * para mantener su aspecto original.
 * 
 * Características:
 * - Fondo oscuro semitransparente con blur
 * - Cierre con click fuera de la imagen
 * - Cierre con tecla ESC
 * - Botón de cerrar visible en la esquina superior derecha
 * - Soporte para título y subtítulo opcionales
 * - Prevención del scroll del body cuando está abierto
 * - Totalmente accesible (ARIA labels, roles, teclado)
 * 
 * @param {ImageLightboxProps} props - Props del componente
 * 
 * @example
 * ```tsx
 * // Uso básico
 * function MyComponent() {
 *   const [isOpen, setIsOpen] = useState(false);
 * 
 *   return (
 *     <>
 *       <button onClick={() => setIsOpen(true)}>Ver imagen</button>
 *       <ImageLightbox
 *         isOpen={isOpen}
 *         src="/images/photo.jpg"
 *         alt="Descripción de la imagen"
 *         onClose={() => setIsOpen(false)}
 *       />
 *     </>
 *   );
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // Uso con título y subtítulo
 * <ImageLightbox
 *   isOpen={isOpen}
 *   src="/images/photo.jpg"
 *   alt="Equipo en acción"
 *   title="ITBA Rocketry Team"
 *   subtitle="Spaceport America Cup 2025"
 *   onClose={handleClose}
 * />
 * ```
 */
export default function ImageLightbox({
  isOpen,
  src,
  alt,
  title,
  subtitle,
  onClose,
}: ImageLightboxProps) {
  // Estado para rastrear si la imagen está cargando
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Resetear el estado de carga cuando cambia la imagen o se abre el lightbox
  useEffect(() => {
    if (isOpen && src) {
      setIsLoading(true);
      setImageError(false);
    }
  }, [isOpen, src]);

  // Efecto para manejar el teclado y el scroll del body
  useEffect(() => {
    // Si el lightbox no está abierto, no hacer nada
    if (!isOpen) return;

    /**
     * Maneja el evento de tecla presionada
     * Cierra el lightbox si se presiona ESC
     */
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    /**
     * Previene el scroll en móviles cuando el lightbox está abierto
     * Previene todo el scroll ya que la imagen se ajusta al viewport
     */
    const preventScroll = (e: TouchEvent) => {
      e.preventDefault();
    };

    // Guardar el valor original del scroll para restaurarlo después
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyOverflowY = document.body.style.overflowY;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const scrollY = window.scrollY;

    // Prevenir scroll del body cuando el lightbox está abierto
    document.body.style.overflow = 'hidden';
    document.body.style.overflowY = 'hidden';
    
    // Prevenir scroll en el documento raíz (útil para móviles y algunos navegadores)
    document.documentElement.style.overflow = 'hidden';
    
    // En móviles, también fijar la posición para evitar que el scroll se desplace
    // Guardamos la posición actual antes de fijar
    if (scrollY > 0) {
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    }

    // Agregar listener para la tecla ESC
    window.addEventListener('keydown', handleEscape);
    
    // Prevenir scroll en móviles con touchmove
    // Usamos passive: false para poder prevenir el comportamiento por defecto
    document.addEventListener('touchmove', preventScroll, { passive: false });

    // Cleanup: restaurar scroll y remover listeners
    return () => {
      // Restaurar estilos del body
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.overflowY = originalBodyOverflowY;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      // Restaurar scroll del documento raíz
      document.documentElement.style.overflow = originalHtmlOverflow;
      
      // Restaurar la posición de scroll si estaba fijada
      if (scrollY > 0) {
        window.scrollTo(0, scrollY);
      }
      
      // Remover listeners
      window.removeEventListener('keydown', handleEscape);
      document.removeEventListener('touchmove', preventScroll);
    };
  }, [isOpen, onClose]);

  // No renderizar nada si el lightbox no está abierto
  if (!isOpen) return null;

  /**
   * Maneja el click/touch en el overlay (fuera de la imagen)
   * Cierra el lightbox solo si se hace click/touch en el fondo
   */
  const handleOverlayClick = () => {
    onClose();
  };

  /**
   * Previene que el click/touch en la imagen cierre el lightbox
   * (stopPropagation evita que el evento llegue al overlay)
   */
  const handleImageContainerClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20 transition-opacity duration-300 touch-none overflow-hidden"
      onClick={handleOverlayClick}
      onTouchStart={(e) => {
        // En móviles, cerrar solo si se toca fuera de la imagen
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      {/* Imagen de fondo expandida y difuminada - mantiene los colores de la imagen */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div 
          className="absolute inset-0 w-[200%] h-[200%] -left-1/2 -top-1/2"
          style={{
            filter: 'blur(60px)',
            opacity: 0.8,
          }}
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover"
            sizes="200vw"
            priority
            quality={40}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Overlay semitransparente para mejor contraste - más sutil para mantener colores */}
      <div className="absolute inset-0 bg-black/10 z-[1]" aria-hidden="true" />

      {/* Contenedor de la imagen - previene el cierre al hacer click/touch en la imagen */}
      <div
        className="relative w-[95vw] h-[95vh] sm:w-auto sm:h-auto sm:max-w-[90vw] sm:max-h-[90vh] mx-auto my-auto px-2 sm:px-4 touch-manipulation flex items-center justify-center z-[2]"
        onClick={handleImageContainerClick}
        onTouchStart={handleImageContainerClick}
      >
        {/* Botón de cerrar - mejor posicionado para móviles */}
        <button
          onClick={onClose}
          className="absolute top-1 right-1 sm:top-2 sm:right-2 lg:top-4 lg:right-4 z-10 text-white hover:text-gray-300 active:text-gray-400 transition-colors p-1.5 sm:p-2 rounded-full hover:bg-white/10 active:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 touch-manipulation"
          aria-label="Cerrar lightbox"
          type="button"
        >
          <FaTimes className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
        </button>

        {/* Contenedor de imagen y texto */}
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          {/* Indicador de carga */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="flex flex-col items-center gap-4 animate-pulse">
                {/* Spinner animado con efecto suave */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16">
                  <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
                  <div 
                    className="absolute inset-0 border-4 border-transparent border-t-primary-500 rounded-full animate-spin" 
                    style={{ animationDuration: '0.8s', animationTimingFunction: 'ease-in-out' }}
                  ></div>
                </div>
                {/* Texto de carga */}
                <p className="text-white/80 text-xs sm:text-sm font-medium">Cargando imagen...</p>
              </div>
            </div>
          )}

          {/* Imagen principal - ajustada para móviles */}
          <div className="relative w-full flex-1 flex items-center justify-center min-h-0 max-h-[calc(100%-80px)] sm:max-h-[calc(100%-100px)]">
            <Image
              src={src}
              alt={alt}
              width={1920}
              height={1080}
              className={`object-contain w-full h-full max-h-full rounded-lg transition-opacity duration-300 ${
                isLoading ? 'opacity-0' : 'opacity-100'
              }`}
              sizes="(max-width: 640px) 95vw, (max-width: 1024px) 90vw, 85vw"
              priority
              quality={95}
              onLoad={() => {
                setIsLoading(false);
                setImageError(false);
              }}
              onError={() => {
                setIsLoading(false);
                setImageError(true);
              }}
            />
          </div>

          {/* Información de la imagen (título y subtítulo) - más compacto en móviles */}
          {(title || subtitle) && (
            <div className="mt-2 sm:mt-3 lg:mt-4 text-center text-white max-w-2xl px-1 sm:px-2 flex-shrink-0">
              {title && (
                <h3 className="text-sm sm:text-lg lg:text-2xl font-semibold mb-0.5 sm:mb-1 leading-tight">{title}</h3>
              )}
              {subtitle && (
                <p className="text-xs sm:text-sm lg:text-lg text-white/80 leading-tight">{subtitle}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}