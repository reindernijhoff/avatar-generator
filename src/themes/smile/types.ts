/**
 * Smile theme types
 * Cheerful smiley face avatar generator
 */

import type {GeneratorOptions} from '../../core/types.js';
import type {ColorOptions} from '../../core/colors.js';

/**
 * Smile generator options
 */
export interface SmileOptions extends GeneratorOptions, ColorOptions {
}

/**
 * Default Smile options
 */
export const DEFAULT_SMILE_OPTIONS = {
};
