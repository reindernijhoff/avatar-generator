/**
 * Interference theme
 * Wave interference pattern generator
 */

import {getCanvas} from '../../core/canvas.js';
import {SeededRandom} from '../../core/seededRandom.js';
import type {InterferenceOptions} from './types.js';
import {InterferenceRenderer} from './generator.js';

export type {InterferenceOptions} from './types.js';

/**
 * Generate an interference pattern avatar
 */
export function generateAvatar(options: InterferenceOptions): HTMLCanvasElement {
    const {id, size, canvas: existingCanvas} = options;

    // Get or create canvas
    const {canvas, ctx} = getCanvas(size, existingCanvas);

    // Create seeded random
    const random = new SeededRandom(id);

    // Create and render
    const renderer = new InterferenceRenderer(random, options);
    renderer.render(ctx);

    return canvas as HTMLCanvasElement;
}
