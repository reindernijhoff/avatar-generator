/**
 * DigiDoodle theme types
 * Simple symmetrical pixel-art avatar generator
 */

import type { GeneratorOptions } from '../../core/types.js';
import type { ColorOptions } from '../../core/colors.js';

/**
 * DigiDoodle generator options
 */
export interface DigiDoodleOptions extends GeneratorOptions, ColorOptions {
  /** Grid size (number of pixels per side, default: 8) */
  gridSize?: number;
  /** Pixel fill probability 0-1 (default: 0.5) */
  density?: number;
  /** Enable vertical mirror symmetry (default: true) */
  symmetry?: boolean;
  /** Number of color layers to draw (default: 1) */
  layers?: number;
  /** border margin (default: 0) */
  borderMargin?: number;
}

/**
 * Default DigiDoodle options
 */
export const DEFAULT_DIGIDOODLE_OPTIONS = {
  gridSize: 8,
  density: 0.5,
  symmetry: true,
  layers: 1,
};
