/**
 * DigiDoodle theme types
 * Simple symmetrical pixel-art avatar generator
 */

import type { GeneratorOptions } from '../../core/types.js';

/**
 * DigiDoodle generator options
 */
export interface DigiDoodleOptions extends GeneratorOptions {
  /** Grid size (number of pixels per side, default: 8) */
  gridSize?: number;
  /** Pixel fill probability 0-1 (default: 0.5) */
  density?: number;
  /** Enable vertical mirror symmetry (default: true) */
  symmetry?: boolean;
}

/**
 * Default DigiDoodle options
 */
export const DEFAULT_DIGIDOODLE_OPTIONS: Required<Omit<DigiDoodleOptions, 'id' | 'size'>> = {
  gridSize: 8,
  density: 0.5,
  symmetry: true,
};
