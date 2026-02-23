/**
 * DigiDoodle theme - Symmetric pixel-art avatars
 */

import {SeededRandom} from '../../core/seededRandom.js';
import {getCanvas} from '../../core/canvas.js';
import type {AvatarCanvas} from '../../core/types.js';
import type {DigiDoodleOptions} from './types.js';
import {DigiDoodleRenderer} from './generator.js';

export * from './types.js';

/**
 * Generate DigiDoodle avatar
 * @param options Generator options
 * @returns Canvas with generated avatar
 */
export function generateAvatar(options: DigiDoodleOptions): AvatarCanvas {
    const {id, size, canvas: existingCanvas} = options;
    const random = new SeededRandom(id);
    const {canvas, ctx} = getCanvas(size, existingCanvas);

    const renderer = new DigiDoodleRenderer(random, options);
    renderer.render(ctx);

    return canvas;
}

/**
 * Async variant for server-side rendering
 */
export async function generateAvatarAsync(options: DigiDoodleOptions): Promise<AvatarCanvas> {
    return generateAvatar(options);
}
