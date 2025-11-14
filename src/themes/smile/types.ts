/**
 * Smile theme types
 * Simple uniform color renderer
 */

import type { GeneratorOptions } from '../../core/types.js';
import type { ColorOptions } from '../../core/colors.js';

/**
 * Smile generator options
 */
export interface SmileOptions extends GeneratorOptions, ColorOptions {
  // No additional options needed for simple uniform color
}

/**
 * Default Smile options
 */
export const DEFAULT_SMILE_OPTIONS = {
  // No default options needed
};
