/**
 * Pixels theme types
 * Simple random colored pixels generator
 */

import type {GeneratorOptions} from '../../core/types.js';
import type {ColorOptions} from '../../core/colors.js';

/**
 * Pixels generator options
 */
export interface PixelsOptions extends GeneratorOptions, ColorOptions {
    /** Grid size (number of pixels per side, default: 16) */
    gridSize?: number;
}

/**
 * Default Pixels options
 */
export const DEFAULT_PIXELS_OPTIONS = {
    gridSize: 9,
};
