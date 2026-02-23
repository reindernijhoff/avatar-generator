/**
 * Pixels theme - Random colored pixels avatars
 */

import {SeededRandom} from '../../core/seededRandom.js';
import {getCanvas} from '../../core/canvas.js';
import type {AvatarCanvas} from '../../core/types.js';
import type {PixelsOptions} from './types.js';
import {PixelsRenderer} from './generator.js';

export * from './types.js';

/**
 * Generate Pixels avatar
 * @param options Generator options
 * @returns Canvas with generated avatar
 */
export function generateAvatar(options: PixelsOptions): AvatarCanvas {
    const {id, size, canvas: existingCanvas} = options;
    const random = new SeededRandom(id);
    const {canvas, ctx} = getCanvas(size, existingCanvas);

    const renderer = new PixelsRenderer(random, options);
    renderer.render(ctx);

    return canvas;
}

/**
 * Async variant for server-side rendering
 */
export async function generateAvatarAsync(options: PixelsOptions): Promise<AvatarCanvas> {
    return generateAvatar(options);
}
