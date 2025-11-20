'use client';

/**
 * CanvasSequence Component
 * 
 * Renders an image sequence on a canvas, controlled by scroll position.
 * Uses GSAP ScrollTrigger to create a "flipbook" effect.
 * 
 * Features:
 * - Preloads all frames with progress tracking
 * - High-DPI (Retina) display support
 * - Responsive canvas sizing
 * - Fallback gradient if images are missing
 * - Proper cleanup of ScrollTrigger instances
 * 
 * Usage:
 * Place numbered frames in /public/sequence/:
 * - frame_0001.jpg, frame_0002.jpg, ..., frame_00NN.jpg
 */

import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface CanvasSequenceProps {
  frameCount: number;
  pathTemplate?: string;
  className?: string;
}

export default function CanvasSequence({
  frameCount,
  pathTemplate = '/sequence/frame_####.jpg',
  className,
}: CanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef(0);
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [hasImages, setHasImages] = useState(true);

  // Preload all frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    const updateProgress = () => {
      loadedCount++;
      setLoadProgress(Math.round((loadedCount / frameCount) * 100));
      
      if (loadedCount === frameCount) {
        setIsLoaded(true);
      }
    };

    const handleError = () => {
      // If first image fails, assume no images exist
      if (images.length === 0) {
        setHasImages(false);
        setIsLoaded(true);
      } else {
        updateProgress();
      }
    };

    // Preload images
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const frameNumber = String(i).padStart(4, '0');
      const src = pathTemplate.replace('####', frameNumber);
      
      img.onload = updateProgress;
      img.onerror = handleError;
      img.src = src;
      
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      images.forEach(img => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [frameCount, pathTemplate]);

  // Setup canvas and ScrollTrigger animation
  useEffect(() => {
    if (!isLoaded || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    const images = imagesRef.current;

    // Handle canvas sizing with device pixel ratio for sharp rendering
    const resizeCanvas = () => {
      const container = containerRef.current;
      if (!container) return;

      const { width, height } = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.scale(dpr, dpr);
      
      // Redraw current frame
      drawFrame(frameIndexRef.current);
    };

    // Draw a specific frame to the canvas
    const drawFrame = (index: number) => {
      const containerWidth = canvas.width / (window.devicePixelRatio || 1);
      const containerHeight = canvas.height / (window.devicePixelRatio || 1);

      context.clearRect(0, 0, containerWidth, containerHeight);

      if (!hasImages) {
        // Draw gradient fallback
        const gradient = context.createLinearGradient(0, 0, containerWidth, containerHeight);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        context.fillStyle = gradient;
        context.fillRect(0, 0, containerWidth, containerHeight);
        
        // Add text
        context.fillStyle = '#ffffff';
        context.font = '24px Inter, sans-serif';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(
          'Agrega imágenes a /public/sequence/',
          containerWidth / 2,
          containerHeight / 2
        );
        return;
      }

      const img = images[index];
      
      // Check if image exists and is properly loaded
      if (!img || !img.complete || img.naturalWidth === 0 || img.naturalHeight === 0) {
        // Draw gradient fallback if image is broken
        const gradient = context.createLinearGradient(0, 0, containerWidth, containerHeight);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        context.fillStyle = gradient;
        context.fillRect(0, 0, containerWidth, containerHeight);
        return;
      }

      // Calculate scaling to cover the canvas while maintaining aspect ratio
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const containerAspect = containerWidth / containerHeight;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (imgAspect > containerAspect) {
        // Image is wider - fit to height
        drawHeight = containerHeight;
        drawWidth = drawHeight * imgAspect;
        offsetX = (containerWidth - drawWidth) / 2;
        offsetY = 0;
      } else {
        // Image is taller - fit to width
        drawWidth = containerWidth;
        drawHeight = drawWidth / imgAspect;
        offsetX = 0;
        offsetY = (containerHeight - drawHeight) / 2;
      }

      try {
        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      } catch (error) {
        // If drawImage fails, draw gradient fallback
        console.warn('Failed to draw image, using fallback:', error);
        const gradient = context.createLinearGradient(0, 0, containerWidth, containerHeight);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        context.fillStyle = gradient;
        context.fillRect(0, 0, containerWidth, containerHeight);
      }
    };

    // Initial setup
    resizeCanvas();

    // Create ScrollTrigger animation
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=200%',
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const frameIndex = Math.min(
          Math.floor(self.progress * frameCount),
          frameCount - 1
        );
        
        if (frameIndex !== frameIndexRef.current) {
          frameIndexRef.current = frameIndex;
          drawFrame(frameIndex);
        }
      },
    });

    // Handle window resize
    window.addEventListener('resize', resizeCanvas);

    // Cleanup
    return () => {
      trigger.kill();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isLoaded, hasImages, frameCount]);

  return (
    <div ref={containerRef} className={className}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        aria-label="Animación de secuencia de imágenes"
      />
      
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-center">
            <div className="w-32 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-500 transition-all duration-300"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Cargando {loadProgress}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

