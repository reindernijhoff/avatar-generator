/**
 * DigiDoodle avatar generator
 * Simple symmetrical pixel-art pattern generator
 */

import { SeededRandom } from '../../core/seededRandom.js';
import type { AvatarContext } from '../../core/types.js';
import type { DigiDoodleOptions } from './types.js';
import { DEFAULT_DIGIDOODLE_OPTIONS } from './types.js';
import { pickBackgroundColor, pickColors, colorToString, type Color } from '../../core/colors.js';

/**
 * DigiDoodle renderer - generates symmetric pixel patterns
 */
export class DigiDoodleRenderer {
  private random: SeededRandom;
  private options: DigiDoodleOptions & typeof DEFAULT_DIGIDOODLE_OPTIONS;
  private grids: boolean[][][]; // Array of grids (one per layer)
  private backgroundColor: Color;
  private foregroundColors: Color[];

  constructor(random: SeededRandom, options: DigiDoodleOptions) {
    this.random = random;
    this.options = { ...DEFAULT_DIGIDOODLE_OPTIONS, ...options };
    this.grids = [];
    this.backgroundColor = { r: 255, g: 255, b: 255 };
    this.foregroundColors = [];
  }

  /**
   * Render avatar on canvas
   */
  render(ctx: AvatarContext): void {
    const { size, gridSize, layers } = this.options;
    
    // Pick colors using the color system
    this.backgroundColor = pickBackgroundColor(this.options, this.random);
    this.foregroundColors = pickColors(this.options, this.random, layers);
    
    // Render background
    ctx.fillStyle = colorToString(this.backgroundColor);
    ctx.fillRect(0, 0, size, size);

    // Generate grids for each layer
    this.initializeGrids();

    // Apply vertical symmetry to all grids
    if (this.options.symmetry) {
      this.applySymmetry();
    }

    // Render all layers
    this.renderLayers(ctx);
  }

  /**
   * Generate grids for all layers
   */
  private initializeGrids(): void {
    const { gridSize, density, layers } = this.options;
    let { borderMargin } = this.options;
    if (borderMargin === undefined) borderMargin = 0;
    
    this.grids = [];
    for (let layer = 0; layer < layers; layer++) {
      const grid: boolean[][] = [];
      for (let y = 0; y < gridSize; y++) {
        grid[y] = [];
        for (let x = 0; x < gridSize; x++) {
          if (
            x >= borderMargin &&
            y >= borderMargin &&
            x <= gridSize - 1 - borderMargin &&
            y <= gridSize - 1 - borderMargin
          ) {
            grid[y][x] = this.random.randomBoolean(density);
          }
          else {
            grid[y][x] = false;
          }
        }
      }
      this.grids.push(grid);
    }
  }

  /**
   * Apply symmetry to all grids
   */
  private applySymmetry(): void {
    const { gridSize } = this.options;
    const mid = Math.floor(gridSize / 2);
    
    for (const grid of this.grids) {
      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < mid; x++) {
          grid[y][gridSize - 1 - x] = grid[y][x];
        }
      }
    }
  }

  /**
   * Render all layers
   */
  private renderLayers(ctx: AvatarContext): void {
    const { size, gridSize } = this.options;
    const pixelSize = size / gridSize;

    for (let layer = 0; layer < this.grids.length; layer++) {
      ctx.fillStyle = colorToString(this.foregroundColors[layer]);
      const grid = this.grids[layer];
      
      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          if (grid[y][x]) {
            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
          }
        }
      }
    }
  }

}
