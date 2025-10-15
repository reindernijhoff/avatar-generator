/**
 * Interference theme
 * Wave interference pattern generator
 */

import { createCanvas } from '../../core/canvas.js';
import { SeededRandom } from '../../core/seededRandom.js';
import type { InterferenceOptions } from './types.js';
import { InterferenceRenderer } from './generator.js';

export type { InterferenceOptions } from './types.js';

/**
 * Generate an interference pattern avatar
 */
export function generateAvatar(options: InterferenceOptions): HTMLCanvasElement {
  const { id, size } = options;
  
  // Create canvas
  const { canvas, ctx } = createCanvas(size);
  
  // Create seeded random
  const random = new SeededRandom(id);
  
  // Create and render
  const renderer = new InterferenceRenderer(random, options);
  renderer.render(ctx);
  
  return canvas as HTMLCanvasElement;
}
