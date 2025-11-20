/**
 * GSAP Configuration
 * 
 * Registers GSAP plugins and exports configured instance.
 * Import this instead of 'gsap' directly to ensure ScrollTrigger is registered.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

