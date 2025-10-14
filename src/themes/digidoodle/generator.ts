/**
 * DigiDoodle avatar generator
 * Simple symmetrical pixel-art pattern generator
 */

import { SeededRandom } from '../../core/seededRandom.js';
import type { AvatarContext } from '../../core/types.js';
import type { DigiDoodleOptions } from './types.js';
import { DEFAULT_DIGIDOODLE_OPTIONS } from './types.js';

/**
 * DigiDoodle renderer - generates symmetric pixel patterns
 */
export class DigiDoodleRenderer {
  private random: SeededRandom;
  private options: DigiDoodleOptions & typeof DEFAULT_DIGIDOODLE_OPTIONS;
  private grid: boolean[][];
  private color: string;

  constructor(random: SeededRandom, options: DigiDoodleOptions) {
    this.random = random;
    this.options = { ...DEFAULT_DIGIDOODLE_OPTIONS, ...options };
    this.grid = [];
    this.color = '';
  }

  /**
   * Render avatar on canvas
   */
  render(ctx: AvatarContext): void {
    const { size, gridSize } = this.options;
    
    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    // Pick random color
    this.color = this.random.randomColor({
      saturation: [60, 90],
      lightness: [40, 70],
    });

    // Generate random grid
    this.initializeGrid();

    // Apply vertical symmetry
    if (this.options.symmetry) {
      this.applySymmetry();
    }

    // Render pixels
    const pixelSize = size / gridSize;
    ctx.fillStyle = this.color;
    
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        if (this.grid[y][x]) {
          ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
      }
    }
  }

  /**
   * Fill grid with random pixels based on density
   */
  private initializeGrid(): void {
    const { gridSize, density } = this.options;
    
    this.grid = [];
    for (let y = 0; y < gridSize; y++) {
      this.grid[y] = [];
      for (let x = 0; x < gridSize; x++) {
        this.grid[y][x] = this.random.randomBoolean(density);
      }
    }
  }

  /**
   * Mirror left half to right half
   */
  private applySymmetry(): void {
    const { gridSize } = this.options;
    const mid = Math.floor(gridSize / 2);
    
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < mid; x++) {
        this.grid[y][gridSize - 1 - x] = this.grid[y][x];
      }
    }
  }
}
