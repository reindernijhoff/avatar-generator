/**
 * DigiDoodle avatar generator
 * Generates symmetric pixel-art patterns
 */

import { SeededRandom } from '../../core/seededRandom.js';
import type { AvatarContext } from '../../core/types.js';
import type { DigiDoodleOptions } from './types.js';
import { DEFAULT_DIGIDOODLE_OPTIONS } from './types.js';

/**
 * Grid cell type
 */
interface GridCell {
  filled: boolean;
  colorIndex: number;
}

/**
 * DigiDoodle renderer
 */
export class DigiDoodleRenderer {
  private random: SeededRandom;
  private options: DigiDoodleOptions & typeof DEFAULT_DIGIDOODLE_OPTIONS;
  private grid: GridCell[][];
  private colors: string[];

  constructor(random: SeededRandom, options: DigiDoodleOptions) {
    this.random = random;
    this.options = {
      ...DEFAULT_DIGIDOODLE_OPTIONS,
      ...options,
    };
    this.grid = [];
    this.colors = [];
  }

  /**
   * Render DigiDoodle on canvas context
   */
  render(ctx: AvatarContext): void {
    const { size } = this.options;
    
    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    // Generate colors
    this.generateColors();

    // Initialize grid
    this.initializeGrid();

    // Apply symmetry
    this.applySymmetry();

    // Render pixels
    this.renderGrid(ctx);
  }

  /**
   * Generate color palette
   */
  private generateColors(): void {
    const { colorCount, minSaturation, maxSaturation, minLightness, maxLightness } = this.options;
    
    this.colors = [];
    for (let i = 0; i < colorCount; i++) {
      this.colors.push(
        this.random.randomColor({
          saturation: [minSaturation, maxSaturation],
          lightness: [minLightness, maxLightness],
        })
      );
    }
  }

  /**
   * Initialize grid with random pixels
   */
  private initializeGrid(): void {
    const { gridSize, density } = this.options;
    
    this.grid = [];
    for (let y = 0; y < gridSize; y++) {
      this.grid[y] = [];
      for (let x = 0; x < gridSize; x++) {
        this.grid[y][x] = {
          filled: this.random.randomBoolean(density),
          colorIndex: this.random.randomInt(0, this.colors.length),
        };
      }
    }
  }

  /**
   * Apply symmetry rules
   */
  private applySymmetry(): void {
    if (this.options.symmetryVertical) {
      this.applyVerticalSymmetry();
    }
    if (this.options.symmetryHorizontal) {
      this.applyHorizontalSymmetry();
    }
    if (this.options.symmetryDiagonalLeft) {
      this.applyDiagonalSymmetryLeft();
    }
    if (this.options.symmetryDiagonalRight) {
      this.applyDiagonalSymmetryRight();
    }
    if (this.options.symmetryRotational) {
      this.applyRotationalSymmetry();
    }
  }

  /**
   * Vertical symmetry (mirror left-right)
   */
  private applyVerticalSymmetry(): void {
    const { gridSize } = this.options;
    const mid = Math.floor(gridSize / 2);
    
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < mid; x++) {
        const mirrorX = gridSize - 1 - x;
        this.grid[y][mirrorX] = { ...this.grid[y][x] };
      }
    }
  }

  /**
   * Horizontal symmetry (mirror top-bottom)
   */
  private applyHorizontalSymmetry(): void {
    const { gridSize } = this.options;
    const mid = Math.floor(gridSize / 2);
    
    for (let y = 0; y < mid; y++) {
      const mirrorY = gridSize - 1 - y;
      for (let x = 0; x < gridSize; x++) {
        this.grid[mirrorY][x] = { ...this.grid[y][x] };
      }
    }
  }

  /**
   * Diagonal symmetry (top-left to bottom-right)
   */
  private applyDiagonalSymmetryLeft(): void {
    const { gridSize } = this.options;
    
    for (let y = 0; y < gridSize; y++) {
      for (let x = y + 1; x < gridSize; x++) {
        this.grid[x][y] = { ...this.grid[y][x] };
      }
    }
  }

  /**
   * Diagonal symmetry (top-right to bottom-left)
   */
  private applyDiagonalSymmetryRight(): void {
    const { gridSize } = this.options;
    
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize - y - 1; x++) {
        const mirrorX = gridSize - 1 - y;
        const mirrorY = gridSize - 1 - x;
        this.grid[mirrorY][mirrorX] = { ...this.grid[y][x] };
      }
    }
  }

  /**
   * Rotational symmetry (90 degrees)
   */
  private applyRotationalSymmetry(): void {
    const { gridSize } = this.options;
    const quadrantSize = Math.ceil(gridSize / 2);
    
    // Copy first quadrant to other three
    for (let y = 0; y < quadrantSize; y++) {
      for (let x = 0; x < quadrantSize; x++) {
        const cell = this.grid[y][x];
        
        // Rotate to other quadrants
        // 90 degrees
        const x90 = gridSize - 1 - y;
        const y90 = x;
        if (x90 >= 0 && x90 < gridSize && y90 >= 0 && y90 < gridSize) {
          this.grid[y90][x90] = { ...cell };
        }
        
        // 180 degrees
        const x180 = gridSize - 1 - x;
        const y180 = gridSize - 1 - y;
        if (x180 >= 0 && x180 < gridSize && y180 >= 0 && y180 < gridSize) {
          this.grid[y180][x180] = { ...cell };
        }
        
        // 270 degrees
        const x270 = y;
        const y270 = gridSize - 1 - x;
        if (x270 >= 0 && x270 < gridSize && y270 >= 0 && y270 < gridSize) {
          this.grid[y270][x270] = { ...cell };
        }
      }
    }
  }

  /**
   * Render grid on canvas
   */
  private renderGrid(ctx: AvatarContext): void {
    const { size, gridSize, spacing, margin } = this.options;
    
    const effectiveSize = size * (1 - margin * 2);
    const cellSize = effectiveSize / gridSize;
    const pixelSize = cellSize * (1 - spacing);
    const offset = size * margin;

    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const cell = this.grid[y][x];
        
        if (cell.filled) {
          const px = offset + x * cellSize + (cellSize - pixelSize) / 2;
          const py = offset + y * cellSize + (cellSize - pixelSize) / 2;
          
          ctx.fillStyle = this.colors[cell.colorIndex];
          ctx.fillRect(px, py, pixelSize, pixelSize);
        }
      }
    }
  }
}
