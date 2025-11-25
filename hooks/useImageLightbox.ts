'use client';

import { useState, useCallback, useRef } from 'react';

/**
 * Datos necesarios para mostrar una imagen en el lightbox
 */
export interface ImageLightboxData {
  /** Ruta de la imagen (relativa a /public o URL completa) */
  src: string;
  /** Texto alternativo para accesibilidad */
  alt: string;
  /** Título opcional que se mostrará debajo de la imagen */
  title?: string;
  /** Subtítulo opcional que se mostrará debajo del título */
  subtitle?: string;
}

/**
 * Valor de retorno del hook useImageLightbox
 */
export interface UseImageLightboxReturn {
  /** Estado que indica si el lightbox está abierto */
  isOpen: boolean;
  /** Datos de la imagen actualmente mostrada en el lightbox, o null si está cerrado */
  imageData: ImageLightboxData | null;
  /** Función para abrir el lightbox con una imagen específica */
  openLightbox: (data: ImageLightboxData) => void;
  /** Función para cerrar el lightbox */
  closeLightbox: () => void;
  /** Función para alternar (abrir/cerrar) el lightbox con una imagen específica */
  toggleLightbox: (data: ImageLightboxData) => void;
}

/**
 * Hook reutilizable para manejar el estado de un lightbox de imágenes.
 * 
 * Este hook proporciona toda la lógica necesaria para controlar un lightbox modal:
 * - Abrir/cerrar el lightbox
 * - Almacenar los datos de la imagen a mostrar
 * - Gestionar transiciones suaves con delays
 * 
 * El lightbox se activa mediante clicks en las imágenes (no hover).
 * 
 * @returns {UseImageLightboxReturn} Objeto con el estado y funciones del lightbox
 * 
 * @example
 * ```tsx
 * // Uso básico
 * function MyComponent() {
 *   const { isOpen, imageData, openLightbox, closeLightbox } = useImageLightbox();
 * 
 *   const handleImageClick = () => {
 *     openLightbox({
 *       src: '/images/photo.jpg',
 *       alt: 'Descripción de la imagen',
 *       title: 'Título opcional',
 *       subtitle: 'Subtítulo opcional'
 *     });
 *   };
 * 
 *   return (
 *     <>
 *       <img onClick={handleImageClick} src="/images/photo.jpg" alt="..." />
 *       {imageData && (
 *         <ImageLightbox
 *           isOpen={isOpen}
 *           src={imageData.src}
 *           alt={imageData.alt}
 *           title={imageData.title}
 *           subtitle={imageData.subtitle}
 *           onClose={closeLightbox}
 *         />
 *       )}
 *     </>
 *   );
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // Uso con toggle para abrir/cerrar
 * function MyComponent() {
 *   const { isOpen, imageData, toggleLightbox } = useImageLightbox();
 * 
 *   const photoData = {
 *     src: '/images/photo.jpg',
 *     alt: 'Descripción',
 *     title: 'Mi foto'
 *   };
 * 
 *   return (
 *     <>
 *       <button onClick={() => toggleLightbox(photoData)}>
 *         {isOpen ? 'Cerrar' : 'Ver imagen'}
 *       </button>
 *       {imageData && (
 *         <ImageLightbox
 *           isOpen={isOpen}
 *           src={imageData.src}
 *           alt={imageData.alt}
 *           onClose={() => toggleLightbox(photoData)}
 *         />
 *       )}
 *     </>
 *   );
 * }
 * ```
 */
export function useImageLightbox(): UseImageLightboxReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [imageData, setImageData] = useState<ImageLightboxData | null>(null);
  
  // Ref para almacenar el timeout de cierre, permite cancelarlo si es necesario
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Ref para mantener los datos de la imagen actual durante las transiciones
  const currentImageDataRef = useRef<ImageLightboxData | null>(null);

  /**
   * Abre el lightbox con los datos de la imagen proporcionados.
   * Cancela cualquier cierre pendiente para evitar conflictos.
   * 
   * @param {ImageLightboxData} data - Datos de la imagen a mostrar
   */
  const openLightbox = useCallback((data: ImageLightboxData) => {
    // Cancelar cualquier timeout de cierre pendiente
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    
    // Establecer los datos y abrir el lightbox
    currentImageDataRef.current = data;
    setImageData(data);
    setIsOpen(true);
  }, []);

  /**
   * Cierra el lightbox.
   * Mantiene los datos de la imagen durante un breve periodo (300ms)
   * para permitir transiciones de salida suaves.
   */
  const closeLightbox = useCallback(() => {
    // Cancelar cualquier timeout anterior si existe
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    // Cerrar inmediatamente
    setIsOpen(false);
    
    // Mantener imageData durante la transición para que la animación de salida funcione
    // Después de 300ms, limpiar los datos
    closeTimeoutRef.current = setTimeout(() => {
      setImageData(null);
      currentImageDataRef.current = null;
      closeTimeoutRef.current = null;
    }, 300);
  }, []);

  /**
   * Alterna el estado del lightbox para una imagen específica.
   * Si la imagen ya está abierta, la cierra. Si no, la abre.
   * 
   * @param {ImageLightboxData} data - Datos de la imagen a alternar
   */
  const toggleLightbox = useCallback((data: ImageLightboxData) => {
    // Si el lightbox está abierto y es la misma imagen, cerrarlo
    if (isOpen && imageData?.src === data.src) {
      closeLightbox();
    } else {
      // Si no, abrir con los nuevos datos
      openLightbox(data);
    }
  }, [isOpen, imageData, openLightbox, closeLightbox]);

  return {
    isOpen,
    imageData,
    openLightbox,
    closeLightbox,
    toggleLightbox,
  };
}