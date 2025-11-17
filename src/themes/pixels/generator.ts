/**
 * Pixels avatar generator
 * Simple random colored pixels pattern generator
 */

import {SeededRandom} from '../../core/seededRandom.js';
import type {AvatarContext} from '../../core/types.js';
import type {PixelsOptions} from './types.js';
import {DEFAULT_PIXELS_OPTIONS} from './types.js';
import {pickBackgroundColor, pickForegroundColor, colorToString, type Color} from '../../core/colors.js';

/**
 * Pixels renderer - generates random colored pixels
 */
export class PixelsRenderer {
    private random: SeededRandom;
    private options: PixelsOptions & typeof DEFAULT_PIXELS_OPTIONS;
    private backgroundColor: Color;

    constructor(random: SeededRandom, options: PixelsOptions) {
        this.random = random;
        this.options = {...DEFAULT_PIXELS_OPTIONS, ...options};
        this.backgroundColor = {r: 255, g: 255, b: 255};
    }

    /**
     * Render avatar on canvas
     */
    render(ctx: AvatarContext): void {
        const {size, gridSize} = this.options;

        // Pick colors using the color system
        // We'll generate more colors to have variety for each pixel
        const colorCount = Math.min(gridSize * gridSize, 256);
        this.backgroundColor = pickBackgroundColor(this.options, this.random);

        // Render background
        ctx.fillStyle = colorToString(this.backgroundColor);
        ctx.fillRect(0, 0, size, size);

        // Render pixels
        this.renderPixels(ctx);
    }

    /**
     * Render all pixels with random colors
     */
    private renderPixels(ctx: AvatarContext): void {
        const {size, gridSize} = this.options;
        const pixelSize = size / gridSize;

        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                // Pick a random color for each pixel
                const color = pickForegroundColor(this.options, this.random)

                ctx.fillStyle = colorToString(color);

                const px = x * pixelSize | 0;
                const py = y * pixelSize | 0;
                const width = ((x + 1) * pixelSize | 0) - px;
                const height = ((y + 1) * pixelSize | 0) - py;
                ctx.fillRect(px, py, width, height);
            }
        }
    }
}
