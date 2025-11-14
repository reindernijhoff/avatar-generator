/**
 * Smile theme
 * Simple uniform color renderer
 */

import { getCanvas } from '../../core/canvas.js';
import { SeededRandom } from '../../core/seededRandom.js';
import type { SmileOptions } from './types.js';
import { SmileRenderer } from './generator.js';

export type { SmileOptions } from './types.js';

/**
 * Generate a smile avatar with uniform color
 */
export function generateAvatar(options: SmileOptions): HTMLCanvasElement {
  const { id, size, canvas: existingCanvas } = options;
  
  // Get or create canvas
  const { canvas, ctx } = getCanvas(size, existingCanvas);
  
  // Create seeded random
  const random = new SeededRandom(id);
  
  // Create and render
  const renderer = new SmileRenderer(random, options);
  renderer.render(ctx);
  
  return canvas as HTMLCanvasElement;
}
