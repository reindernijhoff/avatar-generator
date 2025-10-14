/**
 * DigiDoodle theme types
 */

import type { GeneratorOptions } from '../../core/types.js';

/**
 * DigiDoodle generator options
 */
export interface DigiDoodleOptions extends GeneratorOptions {
  /** Grid size (number of pixels per side) */
  gridSize?: number;
  /** Spacing between pixels (0-1, relative to pixel size) */
  spacing?: number;
  /** Margin around grid (0-1, relative to canvas size) */
  margin?: number;
  /** Pixel fill probability (0-1) */
  density?: number;
  /** Use vertical symmetry */
  symmetryVertical?: boolean;
  /** Use horizontal symmetry */
  symmetryHorizontal?: boolean;
  /** Use diagonal symmetry (top-left to bottom-right) */
  symmetryDiagonalLeft?: boolean;
  /** Use diagonal symmetry (top-right to bottom-left) */
  symmetryDiagonalRight?: boolean;
  /** Use rotational symmetry (90 degrees) */
  symmetryRotational?: boolean;
  /** Minimum saturation for colors (0-100) */
  minSaturation?: number;
  /** Maximum saturation for colors (0-100) */
  maxSaturation?: number;
  /** Minimum lightness for colors (0-100) */
  minLightness?: number;
  /** Maximum lightness for colors (0-100) */
  maxLightness?: number;
  /** Number of colors */
  colorCount?: number;
}

/**
 * Default DigiDoodle options
 */
export const DEFAULT_DIGIDOODLE_OPTIONS: Required<Omit<DigiDoodleOptions, 'id' | 'size'>> = {
  gridSize: 8,
  spacing: 0.1,
  margin: 0.05,
  density: 0.5,
  symmetryVertical: false,
  symmetryHorizontal: false,
  symmetryDiagonalLeft: true,
  symmetryDiagonalRight: true,
  symmetryRotational: true,
  minSaturation: 60,
  maxSaturation: 90,
  minLightness: 40,
  maxLightness: 70,
  colorCount: 3,
};
